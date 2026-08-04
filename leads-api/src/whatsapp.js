/**
 * WhatsApp Business API integration.
 *
 * Setup:
 *   1. Create a Meta Business Account: https://business.facebook.com/
 *   2. Create a WhatsApp Business API app: https://developers.facebook.com/docs/whatsapp
 *   3. Get a phone number, set up the webhook pointing to:
 *      https://leads.paragu-ai.com/api/whatsapp-webhook
 *   4. Set env vars:
 *      WABA_PHONE_NUMBER_ID
 *      WABA_ACCESS_TOKEN
 *      WABA_VERIFY_TOKEN (any random string)
 *
 * Endpoints:
 *   GET  /api/whatsapp-webhook  — webhook verification (challenge)
 *   POST /api/whatsapp-webhook  — receive incoming messages
 *   POST /api/whatsapp/send     — send a message (admin)
 *   GET  /api/whatsapp/conversations — list conversations
 */

import express from 'express';
import axios from 'axios';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const WABA_PHONE_ID = process.env.WABA_PHONE_NUMBER_ID;
const WABA_TOKEN = process.env.WABA_ACCESS_TOKEN;
const WABA_VERIFY = process.env.WABA_VERIFY_TOKEN || 'paragu-ai-verify';
const DATA_DIR = process.env.DATA_DIR || '/var/lib/paragu-ai-leads';
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const wadb = new Database(path.join(DATA_DIR, 'whatsapp.db'));
wadb.exec(`
  CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT NOT NULL,
    name TEXT,
    last_message TEXT,
    last_message_at INTEGER,
    unread_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'open',  -- open, replied, closed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_conversations_phone ON conversations(phone);
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id INTEGER NOT NULL,
    direction TEXT NOT NULL,  -- inbound, outbound
    body TEXT NOT NULL,
    from_phone TEXT,
    to_phone TEXT,
    waba_message_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
`);

// ============================================================
// GET /api/whatsapp-webhook — webhook verification
// ============================================================
router.get('/api/whatsapp-webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === WABA_VERIFY) {
    console.log('[whatsapp] webhook verified');
    return res.status(200).send(challenge);
  }
  res.status(403).send('Forbidden');
});

// ============================================================
// POST /api/whatsapp-webhook — receive incoming messages
// ============================================================
router.post('/api/whatsapp-webhook', async (req, res) => {
  // Always respond 200 quickly to avoid Meta retries
  res.status(200).send('OK');

  try {
    const body = req.body;
    if (body.object !== 'whatsapp_business_account') return;

    const entries = body.entry || [];
    for (const entry of entries) {
      const changes = entry.changes || [];
      for (const change of changes) {
        if (change.field !== 'messages') continue;
        const value = change.value;
        const messages = value.messages || [];
        const contacts = value.contacts || [];

        for (const msg of messages) {
          const from = msg.from; // phone number
          const name = contacts[0]?.profile?.name || 'Unknown';
          const body = msg.text?.body || msg.interactive?.body || '';

          // Find or create conversation
          let conv = wadb.prepare('SELECT * FROM conversations WHERE phone = ?').get(from);
          if (!conv) {
            const r = wadb.prepare('INSERT INTO conversations (phone, name, last_message, last_message_at, unread_count) VALUES (?, ?, ?, ?, 1)')
              .run(from, name, body, Date.now());
            conv = wadb.prepare('SELECT * FROM conversations WHERE id = ?').get(r.lastInsertRowid);
          } else {
            wadb.prepare('UPDATE conversations SET last_message = ?, last_message_at = ?, unread_count = unread_count + 1, status = ? WHERE phone = ?')
              .run(body, Date.now(), 'open', from);
          }

          // Save message
          wadb.prepare('INSERT INTO messages (conversation_id, direction, body, from_phone, to_phone) VALUES (?, ?, ?, ?, ?)')
            .run(conv.id, 'inbound', body, from, WABA_PHONE_ID);

          // Auto-reply
          const reply = generateAutoReply(body, name);
          await sendWhatsAppMessage(from, reply);

          // Save outbound reply
          wadb.prepare('INSERT INTO messages (conversation_id, direction, body, from_phone, to_phone) VALUES (?, ?, ?, ?, ?)')
            .run(conv.id, 'outbound', reply, WABA_PHONE_ID, from);

          // Update conversation status
          wadb.prepare('UPDATE conversations SET status = ?, unread_count = 0 WHERE id = ?')
            .run('replied', conv.id);
        }
      }
    }
  } catch (e) {
    console.error('[whatsapp] webhook handler failed:', e.message);
  }
});

function generateAutoReply(text, name) {
  const t = text.toLowerCase().trim();

  // Initial greeting
  if (['hola', 'hi', 'hello', 'buenos', 'buenas', 'que tal'].some(g => t.includes(g))) {
    return `¡Hola ${name}! 👋 Soy el asistente de ParaguAI. ¿En qué te puedo ayudar?

1️⃣ Quiero un sitio web
2️⃣ Ver precios
3️⃣ Hablar con Kiki`;
  }

  // Made a question
  if (t.includes('precio') || t.includes('costo') || t.includes('cuanto')) {
    return `¡Claro! 💰 Nuestros planes:

• Lite: Gs. 1.500.000 (pago único)
• Pro: Gs. 2.500.000 (pago único)
• Empresarial: Gs. 5.000.000+

Ver más: https://paragu-ai.com/precios

¿Querés que te armemos un sitio? https://paragu-ai.com/onboarding`;
  }

  if (t.includes('sitio') || t.includes('web') || t === '1') {
    return `¡Genial! 🚀 Armemos tu sitio. Es simple:

1. Completá el formulario: https://paragu-ai.com/onboarding
2. Te enviamos el sitio en 48hs
3. Si te gusta, empezamos.

¿Alguna duda?`;
  }

  if (t.includes('hablar') || t.includes('persona') || t.includes('kiki') || t === '3') {
    return `Te paso con Kiki 🤗. Un momento por favor.

Mientras tanto, contame qué necesitás y le dejo el mensaje.`;
  }

  // Default
  return `¡Gracias por tu mensaje! 🙏

Estoy procesando tu consulta. Mientras tanto podés:
• Ver precios: https://paragu-ai.com/precios
• Onboarding: https://paragu-ai.com/onboarding

O esperá unos minutos y Kiki te responde.`;
}

// ============================================================
// POST /api/whatsapp/send — send a message (admin)
// ============================================================
router.post('/api/whatsapp/send', async (req, res) => {
  if (process.env.KIKI_API_KEY && req.query.key !== process.env.KIKI_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const { to, body } = req.body || {};
  if (!to || !body) {
    return res.status(400).json({ error: 'missing_to_or_body' });
  }

  const ok = await sendWhatsAppMessage(to, body);
  if (ok) {
    // Save outbound message
    let conv = wadb.prepare('SELECT * FROM conversations WHERE phone = ?').get(to);
    if (!conv) {
      const r = wadb.prepare('INSERT INTO conversations (phone, last_message, last_message_at) VALUES (?, ?, ?)')
        .run(to, body, Date.now());
      conv = { id: r.lastInsertRowid };
    }
    wadb.prepare('INSERT INTO messages (conversation_id, direction, body, from_phone, to_phone) VALUES (?, ?, ?, ?, ?)')
      .run(conv.id, 'outbound', body, WABA_PHONE_ID, to);
    res.json({ ok: true });
  } else {
    res.status(500).json({ ok: false, error: 'send_failed' });
  }
});

async function sendWhatsAppMessage(to, body) {
  if (!WABA_PHONE_ID || !WABA_TOKEN) {
    console.log(`[whatsapp] (mock) → ${to}: ${body.slice(0, 80)}`);
    return true;
  }
  try {
    const url = `https://graph.facebook.com/v18.0/${WABA_PHONE_ID}/messages`;
    await axios.post(url, {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body },
    }, {
      headers: { Authorization: `Bearer ${WABA_TOKEN}` },
      timeout: 5000,
    });
    return true;
  } catch (e) {
    console.error('[whatsapp] send failed:', e.message);
    return false;
  }
}

// ============================================================
// GET /api/whatsapp/conversations
// ============================================================
router.get('/api/whatsapp/conversations', (req, res) => {
  if (process.env.KIKI_API_KEY && req.query.key !== process.env.KIKI_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const convs = wadb.prepare('SELECT * FROM conversations ORDER BY last_message_at DESC LIMIT 100').all();
  res.json({ conversations: convs, count: convs.length });
});

router.get('/api/whatsapp/conversations/:id', (req, res) => {
  if (process.env.KIKI_API_KEY && req.query.key !== process.env.KIKI_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const conv = wadb.prepare('SELECT * FROM conversations WHERE id = ?').get(req.params.id);
  const messages = wadb.prepare('SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at').all(req.params.id);
  res.json({ conversation: conv, messages });
});

export default router;
