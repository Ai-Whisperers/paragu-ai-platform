/**
 * ParaguAI Leads API
 *
 * Receives contact form submissions from all 19 ParaguAI lead sites,
 * stores them in SQLite, and notifies Kiki via WhatsApp.
 *
 * Endpoints:
 *   POST /api/contact       — receive a lead (CORS allows all *.paragu-ai.com)
 *   GET  /api/leads         — list all leads (Kiki's dashboard)
 *   GET  /api/leads/:slug   — list leads for one site
 *   GET  /api/stats         — aggregate stats
 *   GET  /health            — health check
 *
 * Environment:
 *   PORT                (default 3500)
 *   KIKI_WHATSAPP       (default +595981000000 — Kiki's number)
 *   CALLMEBOT_APIKEY    (for WhatsApp notification)
 *   DATA_DIR            (default /var/lib/paragu-ai-leads)
 */

import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import stripeRouter from './stripe.js';
import whatsappRouter from './whatsapp.js';
import { fileURLToPath } from 'url';
import child_process from 'child_process';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3500;
const DATA_DIR = process.env.DATA_DIR || '/var/lib/paragu-ai-leads';
const KIKI_WHATSAPP = process.env.KIKI_WHATSAPP || '+595981000000';
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY || '';

// Ensure data dir exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new Database(path.join(DATA_DIR, 'leads.db'));
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    message TEXT,
    service TEXT,
    source TEXT,
    ip TEXT,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notified INTEGER DEFAULT 0
  );
  CREATE INDEX IF NOT EXISTS idx_leads_slug ON leads(slug);
  CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
`);

const app = express();
app.use(cors({
  origin: ['https://*.paragu-ai.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Root-level redirects for clean URLs
app.get('/precios', (req, res) => res.redirect('/precios.html'));
app.get('/onboarding', (req, res) => res.redirect('/onboarding.html'));
app.get('/dashboard', (req, res) => res.redirect('/dashboard.html'));
app.get('/pago/exito', (req, res) => res.redirect('/pago-exito.html'));
app.get('/pago', (req, res) => res.redirect('/pago.html'));



// Simple rate limiter (in-memory, per IP)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10; // 10 requests per minute per IP
function checkRate(ip) {
  const now = Date.now();
  const entry = rateLimit.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }
  entry.count++;
  rateLimit.set(ip, entry);
  return entry.count <= RATE_LIMIT_MAX;
}

// ============================================================
// Notify Kiki via WhatsApp (using CallMeBot free API)
// ============================================================
async function notifyKiki(lead) {
  if (!CALLMEBOT_APIKEY) {
    console.log('[notify] CALLMEBOT_APIKEY not set, skipping WhatsApp notification');
    return false;
  }
  const text = `🆕 *Nuevo lead en ${lead.slug}*\n` +
               `👤 ${lead.name}\n` +
               `📱 ${lead.phone || '—'}\n` +
               `📧 ${lead.email || '—'}\n` +
               `💼 ${lead.service || 'general'}\n` +
               `💬 ${(lead.message || '').slice(0, 200)}\n` +
               `🕐 ${new Date().toISOString()}`;
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(KIKI_WHATSAPP)}&text=${encodeURIComponent(text)}&apikey=${CALLMEBOT_APIKEY}`;
    await axios.get(url, { timeout: 5000 });
    return true;
  } catch (e) {
    console.error('[notify] failed:', e.message);
    return false;
  }
}

// ============================================================
// Endpoints
// ============================================================

app.get('/health', (req, res) => {
  const stats = db.prepare('SELECT COUNT(*) as total FROM leads').get();
  res.json({
    status: 'ok',
    uptime_seconds: Math.floor(process.uptime()),
    total_leads: stats.total,
    data_dir: DATA_DIR,
  });
});

app.post('/api/contact', async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  if (!checkRate(ip)) {
    return res.status(429).json({ error: 'rate_limited', message: 'Too many requests' });
  }

  const { slug, name, phone, email, message, service, source } = req.body || {};
  if (!slug || !name) {
    return res.status(400).json({ error: 'invalid_payload', message: 'slug and name required' });
  }

  // Insert into DB
  const stmt = db.prepare(`
    INSERT INTO leads (slug, name, phone, email, message, service, source, ip, user_agent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    slug,
    name,
    phone || null,
    email || null,
    message || null,
    service || null,
    source || 'website_form',
    ip,
    req.headers['user-agent'] || null,
  );
  const leadId = result.lastInsertRowid;

  // Notify Kiki (async, don't block response)
  notifyKiki({ slug, name, phone, email, message, service }).then(ok => {
    if (ok) {
      db.prepare('UPDATE leads SET notified = 1 WHERE id = ?').run(leadId);
    }
  }).catch(() => {});

  res.json({
    ok: true,
    lead_id: leadId,
    message: 'Recibido. Te responderemos en breve.',
  });
});

app.get('/api/leads', (req, res) => {
  // Simple auth: require ?key=... if KIKI_API_KEY is set
  if (process.env.KIKI_API_KEY && req.query.key !== process.env.KIKI_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const { limit = 100, slug } = req.query;
  let rows;
  if (slug) {
    rows = db.prepare('SELECT * FROM leads WHERE slug = ? ORDER BY created_at DESC LIMIT ?')
      .all(slug, Number(limit));
  } else {
    rows = db.prepare('SELECT * FROM leads ORDER BY created_at DESC LIMIT ?')
      .all(Number(limit));
  }
  res.json({ leads: rows, count: rows.length });
});

app.get('/api/leads/:slug', (req, res) => {
  const { slug } = req.params;
  const rows = db.prepare('SELECT * FROM leads WHERE slug = ? ORDER BY created_at DESC LIMIT 100')
    .all(slug);
  res.json({ slug, leads: rows, count: rows.length });
});

app.get('/api/stats', (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as n FROM leads').get().n;
  const today = db.prepare(
    "SELECT COUNT(*) as n FROM leads WHERE date(created_at) = date('now')"
  ).get().n;
  const week = db.prepare(
    "SELECT COUNT(*) as n FROM leads WHERE created_at >= datetime('now', '-7 days')"
  ).get().n;
  const bySlug = db.prepare(
    'SELECT slug, COUNT(*) as n FROM leads GROUP BY slug ORDER BY n DESC'
  ).all();
  res.json({ total, today, week, by_slug: bySlug });
});

app.use(stripeRouter);
app.use(whatsappRouter);


// ============================================================
// POST /api/onboarding
// Self-service onboarding: brief JSON → order in queue
// ============================================================
app.post('/api/onboarding', async (req, res) => {
  const data = req.body || {};
  if (!data.businessName || !data.whatsapp || !data.city || !data.services) {
    return res.status(400).json({
      ok: false,
      error: 'invalid_payload',
      message: 'businessName, whatsapp, city, services son requeridos'
    });
  }

  // Generate order ID (slug + timestamp)
  const slug = data.businessName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  const orderId = `ORD-${Date.now()}-${slug}`;
  const timestamp = new Date().toISOString();

  // Save to orders table (path and fs are imported at top)
  const dataDir = process.env.DATA_DIR || '/var/lib/paragu-ai-leads';
  const ordersDir = path.join(dataDir, 'orders');
  if (!fs.existsSync(ordersDir)) fs.mkdirSync(ordersDir, { recursive: true });

  // Parse services into structured list
  let services = [];
  let prices = [];
  if (data.services) {
    services = data.services.split('\n').map(s => s.trim()).filter(Boolean);
  }
  if (data.prices) {
    prices = data.prices.split('\n').map(s => s.trim()).filter(Boolean);
  }

  // Build WEBSITE_BRIEF.md format
  const brief = `# ${data.businessName}

**Category**: ${data.category || 'other'}
**City**: ${data.city}${data.neighborhood ? ', ' + data.neighborhood : ''}
**Country**: Paraguay
**Phone**: ${data.whatsapp}
**Email**: ${data.email || ''}
**Owner**: ${data.ownerName || ''}
**Hours**: ${data.hours || ''}

## Description
${data.description || ''}

## Services
${services.map((s, i) => `- ${s}${prices[i] ? ' — ' + prices[i] : ''}`).join('\n')}

## Plan
${data.plan || 'pro'}

## Metadata
- Order ID: ${orderId}
- Submitted: ${timestamp}
- Source: paragu-ai.com/onboarding
`;

  const briefPath = path.join(ordersDir, `${orderId}.md`);
  fs.writeFileSync(briefPath, brief);

  // Also save raw JSON for the pipeline
  const rawPath = path.join(ordersDir, `${orderId}.json`);
  fs.writeFileSync(rawPath, JSON.stringify(data, null, 2));

  // Notify Kiki (already exists)
  await notifyKiki({
    slug: orderId,
    name: data.businessName,
    phone: data.whatsapp,
    email: data.email,
    service: data.plan,
    message: `🆕 NEW ORDER: ${data.businessName} (${data.plan})\nBrief: ${briefPath}`,
  });

  res.json({
    ok: true,
    order_id: orderId,
    brief_url: briefPath,
    message: 'Recibido. Te contactamos por WhatsApp en las próximas 2 horas.',
  });
});


// ============================================================
// Multi-tenant endpoints
// ============================================================

// GET /api/tenants - list all tenants (admin)
app.get('/api/tenants', (req, res) => {
  if (process.env.KIKI_API_KEY && req.query.key !== process.env.KIKI_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const tenants = db.prepare('SELECT * FROM tenants ORDER BY created_at DESC').all();
  res.json({ tenants, count: tenants.length });
});

// GET /api/tenants/:slug - get tenant details
app.get('/api/tenants/:slug', (req, res) => {
  const { slug } = req.params;
  const tenant = db.prepare('SELECT * FROM tenants WHERE slug = ?').get(slug);
  if (!tenant) return res.status(404).json({ error: 'not_found' });
  
  // Get related leads
  const leads = db.prepare('SELECT COUNT(*) as n FROM leads WHERE slug = ?').get(slug);
  res.json({ tenant, leads_count: leads.n });
});

// POST /api/tenants - register a new tenant
app.post('/api/tenants', (req, res) => {
  if (process.env.KIKI_API_KEY && req.query.key !== process.env.KIKI_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const { slug, name, domain, plan, contact_email, contact_phone } = req.body || {};
  if (!slug || !name) {
    return res.status(400).json({ error: 'missing_slug_or_name' });
  }
  try {
    const r = db.prepare(`
      INSERT INTO tenants (slug, name, domain, plan, contact_email, contact_phone, deployed_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(slug, name, domain || null, plan || 'pro', contact_email || null, contact_phone || null, Date.now());
    res.json({ ok: true, tenant_id: r.lastInsertRowid });
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) {
      return res.status(409).json({ error: 'slug_exists' });
    }
    res.status(500).json({ error: 'db_error', message: e.message });
  }
});

// PUT /api/tenants/:slug - update tenant
app.put('/api/tenants/:slug', (req, res) => {
  if (process.env.KIKI_API_KEY && req.query.key !== process.env.KIKI_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const { slug } = req.params;
  const { name, domain, plan, status, contact_email, contact_phone } = req.body || {};
  const r = db.prepare(`
    UPDATE tenants SET
      name = COALESCE(?, name),
      domain = COALESCE(?, domain),
      plan = COALESCE(?, plan),
      status = COALESCE(?, status),
      contact_email = COALESCE(?, contact_email),
      contact_phone = COALESCE(?, contact_phone)
    WHERE slug = ?
  `).run(name, domain, plan, status, contact_email, contact_phone, slug);
  if (r.changes === 0) return res.status(404).json({ error: 'not_found' });
  res.json({ ok: true });
});


// ============================================================
// POST /api/rag/query
// Natural language query over leads + tenants
// Supports queries like:
//   "leads this week"
//   "how many leads from xxgym"
//   "latest lead from clau-bellino"
//   "all tenants"
// ============================================================
app.post('/api/rag/query', async (req, res) => {
  if (process.env.KIKI_API_KEY && req.query.key !== process.env.KIKI_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const { query } = req.body || {};
  if (!query) {
    return res.status(400).json({ error: 'missing_query' });
  }
  const q = query.toLowerCase();

  try {
    // Pattern matching
    if (q.includes('how many') || q.includes('cuantos') || q.includes('total')) {
      if (q.includes('lead')) {
        const stats = db.prepare('SELECT COUNT(*) as total FROM leads').get();
        const today = db.prepare("SELECT COUNT(*) as n FROM leads WHERE date(created_at) = date('now')").get();
        const week = db.prepare("SELECT COUNT(*) as n FROM leads WHERE created_at >= datetime('now', '-7 days')").get();
        return res.json({
          answer: `Total: ${stats.total} leads. Hoy: ${today.n}. Esta semana: ${week.n}.`,
          data: { total: stats.total, today: today.n, week: week.n },
        });
      }
      if (q.includes('tenant') || q.includes('cliente')) {
        const n = db.prepare('SELECT COUNT(*) as n FROM tenants').get().n;
        return res.json({ answer: `${n} tenants registrados.`, data: { count: n } });
      }
    }

    if (q.includes('latest') || q.includes('ultimo') || q.includes('recent')) {
      const slug = extractSlug(q);
      const stmt = slug
        ? db.prepare('SELECT * FROM leads WHERE slug = ? ORDER BY created_at DESC LIMIT 5')
        : db.prepare('SELECT * FROM leads ORDER BY created_at DESC LIMIT 5');
      const leads = slug ? stmt.all(slug) : stmt.all();
      return res.json({
        answer: `Últimos ${leads.length} leads${slug ? ' de ' + slug : ''}:`,
        data: leads,
      });
    }

    if (q.includes('best') || q.includes('most') || q.includes('mas')) {
      const bySlug = db.prepare(`
        SELECT slug, COUNT(*) as n FROM leads GROUP BY slug ORDER BY n DESC LIMIT 10
      `).all();
      return res.json({
        answer: 'Top sitios con más leads:',
        data: bySlug,
      });
    }

    if (q.includes('tenant') || q.includes('cliente')) {
      const tenants = db.prepare('SELECT * FROM tenants ORDER BY name').all();
      return res.json({
        answer: `${tenants.length} tenants registrados:`,
        data: tenants,
      });
    }

    // Fallback: keyword search
    const { rows } = searchLeads(q);
    return res.json({
      answer: `${rows.length} resultados para "${query}":`,
      data: rows,
    });
  } catch (e) {
    res.status(500).json({ error: 'query_failed', message: e.message });
  }
});

function extractSlug(q) {
  // Match known slug patterns: xxxxx-xxxxx.paragu-ai.com or just slug
  const match = q.match(/([a-z][a-z0-9-]+)\.paragu-ai\.com/);
  if (match) return match[1];
  // Match by hyphenated name
  const matches = q.match(/([a-z][a-z0-9-]{4,30})/g);
  if (matches) {
    // Try to find one that exists as a slug
    for (const m of matches) {
      const exists = db.prepare('SELECT 1 FROM leads WHERE slug = ? LIMIT 1').get(m);
      if (exists) return m;
    }
  }
  return null;
}

function searchLeads(q) {
  const terms = q.split(/\s+/).filter(t => t.length > 2);
  const results = [];
  for (const term of terms) {
    const matched = db.prepare(
      'SELECT * FROM leads WHERE name LIKE ? OR phone LIKE ? OR message LIKE ? OR email LIKE ? LIMIT 20'
    ).all(`%${term}%`, `%${term}%`, `%${term}%`, `%${term}%`);
    results.push(...matched);
  }
  // Dedupe by id
  const seen = new Set();
  const unique = results.filter(r => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });
  return { rows: unique.slice(0, 20) };
}


// ============================================================
// Reseller (white-label) endpoints
// ============================================================

// POST /api/resellers - create a reseller
app.post('/api/resellers', (req, res) => {
  if (process.env.KIKI_API_KEY && req.query.key !== process.env.KIKI_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const { slug, name, contact_email, contact_phone, brand_name, brand_color, domain } = req.body || {};
  if (!slug || !name) {
    return res.status(400).json({ error: 'missing_slug_or_name' });
  }
  const apiKey = `reseller-${slug}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  try {
    const r = db.prepare(`
      INSERT INTO resellers (slug, name, contact_email, contact_phone, brand_name, brand_color, domain, api_key)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(slug, name, contact_email, contact_phone, brand_name || name, brand_color || '#7DD3FC', domain, apiKey);
    res.json({ ok: true, reseller_id: r.lastInsertRowid, api_key: apiKey });
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) {
      return res.status(409).json({ error: 'slug_exists' });
    }
    res.status(500).json({ error: 'db_error', message: e.message });
  }
});

// GET /api/resellers - list resellers
app.get('/api/resellers', (req, res) => {
  if (process.env.KIKI_API_KEY && req.query.key !== process.env.KIKI_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const resellers = db.prepare('SELECT * FROM resellers ORDER BY created_at DESC').all();
  // Don't expose full api_key in list
  const safe = resellers.map(r => ({ ...r, api_key: r.api_key ? r.api_key.slice(0, 16) + '…' : null }));
  res.json({ resellers: safe, count: safe.length });
});

// GET /api/resellers/:slug - get one reseller
app.get('/api/resellers/:slug', (req, res) => {
  const { slug } = req.params;
  const r = db.prepare('SELECT * FROM resellers WHERE slug = ?').get(slug);
  if (!r) return res.status(404).json({ error: 'not_found' });
  // Get their clients
  const clients = db.prepare('SELECT * FROM tenants WHERE domain LIKE ? OR name LIKE ? ORDER BY name').all(`%${slug}%`, `%${brand_name}%`);
  res.json({ reseller: r });
});

// Authenticate reseller via api_key
function authenticateReseller(req) {
  const key = req.query.key || req.headers['x-reseller-key'];
  if (!key) return null;
  return db.prepare('SELECT * FROM resellers WHERE api_key = ?').get(key);
}

// POST /api/reseller/:slug/clients - add a client (reseller)
app.post('/api/reseller/:slug/clients', (req, res) => {
  const reseller = db.prepare('SELECT * FROM resellers WHERE slug = ?').get(req.params.slug);
  if (!reseller) return res.status(404).json({ error: 'reseller_not_found' });
  
  const { slug: clientSlug, name, domain, plan } = req.body || {};
  if (!clientSlug || !name) {
    return res.status(400).json({ error: 'missing_slug_or_name' });
  }
  try {
    const r = db.prepare(`
      INSERT INTO tenants (slug, name, domain, plan, contact_email)
      VALUES (?, ?, ?, ?, ?)
    `).run(clientSlug, name, domain, plan || 'pro', reseller.contact_email);
    res.json({ ok: true, tenant_id: r.lastInsertRowid, reseller_id: reseller.id });
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) {
      return res.status(409).json({ error: 'client_slug_exists' });
    }
    res.status(500).json({ error: 'db_error', message: e.message });
  }
});


// ============================================================
// A/B Testing framework
// ============================================================

// Ensure experiments table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS experiments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    variants TEXT NOT NULL,  -- JSON array of {name, weight}
    active INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS experiment_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    experiment_id INTEGER NOT NULL,
    subject TEXT NOT NULL,  -- session_id or user_id
    variant TEXT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(experiment_id, subject)
  );
  CREATE TABLE IF NOT EXISTS experiment_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    experiment_id INTEGER NOT NULL,
    subject TEXT NOT NULL,
    variant TEXT NOT NULL,
    event TEXT NOT NULL,  -- pageview, click, conversion, etc.
    value REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_events_exp ON experiment_events(experiment_id, variant, event);
`);

// POST /api/experiments - create an experiment
app.post('/api/experiments', (req, res) => {
  if (process.env.KIKI_API_KEY && req.query.key !== process.env.KIKI_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const { slug, name, variants } = req.body || {};
  if (!slug || !name || !variants || !Array.isArray(variants)) {
    return res.status(400).json({ error: 'invalid_payload' });
  }
  try {
    const r = db.prepare(`
      INSERT INTO experiments (slug, name, variants) VALUES (?, ?, ?)
    `).run(slug, name, JSON.stringify(variants));
    res.json({ ok: true, experiment_id: r.lastInsertRowid });
  } catch (e) {
    res.status(500).json({ error: 'db_error', message: e.message });
  }
});

// GET /api/experiments/:slug/assign?subject=xxx - assign a variant
app.get('/api/experiments/:slug/assign', (req, res) => {
  const { slug } = req.params;
  const subject = req.query.subject || 'anon-' + Date.now();
  const exp = db.prepare('SELECT * FROM experiments WHERE slug = ? AND active = 1').get(slug);
  if (!exp) return res.status(404).json({ error: 'experiment_not_found' });

  // Check existing assignment
  const existing = db.prepare('SELECT * FROM experiment_assignments WHERE experiment_id = ? AND subject = ?')
    .get(exp.id, subject);
  if (existing) {
    return res.json({ variant: existing.variant, subject, new: false });
  }

  // Assign new variant (weighted random)
  const variants = JSON.parse(exp.variants);
  const total = variants.reduce((acc, v) => acc + (v.weight || 1), 0);
  let r = Math.random() * total;
  let chosen = variants[0].name;
  for (const v of variants) {
    r -= (v.weight || 1);
    if (r <= 0) { chosen = v.name; break; }
  }
  db.prepare('INSERT INTO experiment_assignments (experiment_id, subject, variant) VALUES (?, ?, ?)')
    .run(exp.id, subject, chosen);
  res.json({ variant: chosen, subject, new: true });
});

// POST /api/experiments/:slug/event - log an event
app.post('/api/experiments/:slug/event', (req, res) => {
  const { slug } = req.params;
  const { subject, variant, event, value } = req.body || {};
  if (!subject || !variant || !event) {
    return res.status(400).json({ error: 'missing_fields' });
  }
  const exp = db.prepare('SELECT id FROM experiments WHERE slug = ?').get(slug);
  if (!exp) return res.status(404).json({ error: 'experiment_not_found' });
  db.prepare('INSERT INTO experiment_events (experiment_id, subject, variant, event, value) VALUES (?, ?, ?, ?, ?)')
    .run(exp.id, subject, variant, event, value || null);
  res.json({ ok: true });
});

// GET /api/experiments/:slug/results - get aggregated results
app.get('/api/experiments/:slug/results', (req, res) => {
  const { slug } = req.params;
  const exp = db.prepare('SELECT * FROM experiments WHERE slug = ?').get(slug);
  if (!exp) return res.status(404).json({ error: 'experiment_not_found' });
  
  const events = db.prepare(`
    SELECT variant, event, COUNT(*) as n, AVG(value) as avg_value
    FROM experiment_events
    WHERE experiment_id = ?
    GROUP BY variant, event
    ORDER BY variant, event
  `).all(exp.id);
  
  // Calculate conversion rate per variant
  const variants = JSON.parse(exp.variants);
  const results = variants.map(v => {
    const variantEvents = events.filter(e => e.variant === v.name);
    const views = variantEvents.find(e => e.event === 'pageview')?.n || 0;
    const conversions = variantEvents.find(e => e.event === 'conversion')?.n || 0;
    const rate = views > 0 ? conversions / views : 0;
    return {
      variant: v.name,
      views,
      conversions,
      conversion_rate: rate,
      all_events: variantEvents,
    };
  });
  
  res.json({ experiment: exp, results });
});


// ============================================================
// Multi-host swarm coordination
// ============================================================

// Minimal Docker Swarm inspection (assumes docker socket is mounted)


function execShell(cmd) {
  return new Promise((resolve, reject) => {
    child_process.exec(cmd, { timeout: 5000 }, (err, stdout, stderr) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}

app.get('/api/swarm/hosts', async (req, res) => {
  try {
    const stdout = await execShell('docker node ls --format "{{.Hostname}}|{{.Status}}|{{.Availability}}|{{.ManagerStatus}}"');
    const nodes = stdout.trim().split('\n').filter(Boolean).map(line => {
      const [hostname, status, availability, managerStatus] = line.split('|');
      return { hostname, status, availability, manager: managerStatus?.includes('Leader') };
    });

    // Get services per host
    const services = await execShell('docker service ls --format "{{.Name}}|{{.Replicas}}"');
    const serviceCounts = {};
    for (const line of services.trim().split('\n').filter(Boolean)) {
      const [name, replicas] = line.split('|');
      const r = parseInt(replicas?.split('/')[0] || '0');
      serviceCounts[name] = r;
    }

    res.json({
      hosts: nodes,
      services_running: Object.keys(serviceCounts).length,
      total_replicas: Object.values(serviceCounts).reduce((a, b) => a + b, 0),
    });
  } catch (e) {
    res.json({ hosts: [], error: e.message, note: 'docker socket not available from here' });
  }
});

app.get('/api/swarm/services', async (req, res) => {
  try {
    const stdout = await execShell('docker service ls --format "{{.Name}}|{{.Replicas}}|{{.Image}}"');
    const services = stdout.trim().split('\n').filter(Boolean).map(line => {
      const [name, replicas, image] = line.split('|');
      const [running, desired] = (replicas || '0/0').split('/');
      return { name, running: parseInt(running), desired: parseInt(desired), image };
    });
    res.json({ services, count: services.length });
  } catch (e) {
    res.json({
      services: [],
      count: 0,
      error: e.message,
      note: 'docker socket not available from container'
    });
  }
});

app.get('/api/swarm/health', async (req, res) => {
  try {
    const stdout = await execShell('docker node ls --format "{{.Hostname}}|{{.Status}}"');
    const nodes = stdout.trim().split('\n').filter(Boolean).map(line => {
      const [hostname, status] = line.split('|');
      return { hostname, status, healthy: status?.includes('Ready') };
    });
    const healthy = nodes.filter(n => n.healthy).length;
    res.json({
      cluster_status: healthy === nodes.length ? 'healthy' : 'degraded',
      nodes_total: nodes.length,
      nodes_healthy: healthy,
      nodes,
    });
  } catch (e) {
    res.json({
      cluster_status: 'unknown',
      nodes_total: 0,
      nodes_healthy: 0,
      nodes: [],
      error: e.message,
      note: 'docker socket not available from container'
    });
  }
});


// ============================================================
// GET /api/status
// Public endpoint showing which credentials are configured
// (no actual values exposed)
// ============================================================
app.get('/api/status', (req, res) => {
  res.json({
    stripe: {
      configured: !!process.env.STRIPE_SECRET_KEY,
      plans_configured: [
        !!process.env.STRIPE_PRICE_LITE,
        !!process.env.STRIPE_PRICE_PRO,
        !!process.env.STRIPE_PRICE_EMPRESA,
      ],
    },
    whatsapp_business: {
      configured: !!(process.env.WABA_PHONE_NUMBER_ID && process.env.WABA_ACCESS_TOKEN),
      webhook_url: 'https://leads.paragu-ai.com/api/whatsapp-webhook',
    },
    google_analytics: {
      configured: !!process.env.NEXT_PUBLIC_GA_ID,
      // Note: NEXT_PUBLIC_GA_ID is injected at build time, not server-side
      // This will always be false here
    },
    notifications: {
      kiki_whatsapp: !!process.env.KIKI_WHATSAPP,
      callmebot: !!process.env.CALLMEBOT_APIKEY,
    },
    admin: {
      kiki_api_key_set: !!process.env.KIKI_API_KEY,
    },
    public_url: process.env.PUBLIC_URL || 'https://paragu-ai.com',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[leads-api] listening on 0.0.0.0:${PORT}`);
  console.log(`[leads-api] data dir: ${DATA_DIR}`);
});