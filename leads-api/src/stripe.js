/**
 * Stripe integration for ParaguAI subscriptions.
 *
 * Endpoints:
 *   POST /api/checkout          — create a Stripe Checkout session
 *   POST /api/subscription      — alias for /api/checkout (used by /pago page)
 *   POST /api/stripe-webhook    — receive Stripe events (subscription.created, .updated, .deleted)
 *   GET  /api/billing/:slug     — get billing status for a client
 *   GET  /api/admin/subs        — list all subscriptions (admin only)
 *
 * Stripe plans (configurable in leads-api via env or DB):
 *   - Lite:       Gs. 200.000/month (price id: STRIPE_PRICE_LITE)
 *   - Pro:        Gs. 500.000/month (price id: STRIPE_PRICE_PRO)
 *   - Empresarial: Gs. 1.200.000/month (price id: STRIPE_PRICE_EMPRESA)
 *
 * Env vars:
 *   STRIPE_SECRET_KEY       — sk_test_xxx or sk_live_xxx
 *   STRIPE_WEBHOOK_SECRET   — whsec_xxx
 *   STRIPE_PRICE_LITE       — price_xxx
 *   STRIPE_PRICE_PRO        — price_xxx
 *   STRIPE_PRICE_EMPRESA    — price_xxx
 *   PUBLIC_URL              — https://paragu-ai.com (for redirect URLs)
 *
 * If Stripe is not configured (no STRIPE_SECRET_KEY), endpoints return 503 with helpful error.
 */

import Stripe from 'stripe';
import express from 'express';
import crypto from 'crypto';

let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
  });
}

const PLANS = {
  lite: {
    name: 'ParaguAI Lite',
    price: 200000, // Gs. 200.000
    priceId: process.env.STRIPE_PRICE_LITE,
    description: 'Hosting + mantenimiento básico. Ideal para sitios one-page.',
  },
  pro: {
    name: 'ParaguAI Pro',
    price: 500000,
    priceId: process.env.STRIPE_PRICE_PRO,
    description: 'Hosting + mantenimiento + cambios menores. SEO + Analytics.',
  },
  empresa: {
    name: 'ParaguAI Empresarial',
    price: 1200000,
    priceId: process.env.STRIPE_PRICE_EMPRESA,
    description: 'Multi-idioma, mantenimiento mensual, soporte prioritario.',
  },
};

const router = express.Router();

// ============================================================
// POST /api/checkout
// Create a Stripe Checkout session for a subscription
// ============================================================
router.post('/api/checkout', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({
      error: 'stripe_not_configured',
      message: 'Stripe no está configurado en este servidor. Contactanos por WhatsApp.'
    });
  }

  const { plan, slug, email, name, phone } = req.body || {};
  if (!plan || !PLANS[plan]) {
    return res.status(400).json({ error: 'invalid_plan', message: 'Plan inválido. Usá: lite, pro, empresa' });
  }
  if (!slug) {
    return res.status(400).json({ error: 'missing_slug', message: 'slug required' });
  }

  const planConfig = PLANS[plan];
  if (!planConfig.priceId) {
    return res.status(503).json({
      error: 'plan_not_configured',
      message: `El plan ${plan} no tiene un price ID configurado. Contactanos por WhatsApp.`
    });
  }

  try {
    const publicUrl = process.env.PUBLIC_URL || 'https://paragu-ai.com';
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      customer_email: email,
      metadata: {
        slug: slug,
        plan: plan,
        name: name || '',
        phone: phone || '',
      },
      success_url: `${publicUrl}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${publicUrl}/precios?canceled=1`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    res.json({
      ok: true,
      checkout_url: session.url,
      session_id: session.id,
    });
  } catch (e) {
    console.error('[stripe] checkout failed:', e.message);
    res.status(500).json({ error: 'checkout_failed', message: e.message });
  }
});

// ============================================================
// POST /api/stripe-webhook
// Stripe webhook handler (subscription lifecycle)
// ============================================================
router.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'stripe_not_configured' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      event = JSON.parse(req.body.toString());
    }
  } catch (e) {
    console.error('[stripe] webhook signature failed:', e.message);
    return res.status(400).json({ error: 'invalid_signature', message: e.message });
  }

  // Handle events
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await onCheckoutCompleted(event.data.object);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await onSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await onSubscriptionDeleted(event.data.object);
        break;
      case 'invoice.paid':
        await onInvoicePaid(event.data.object);
        break;
      case 'invoice.payment_failed':
        await onInvoicePaymentFailed(event.data.object);
        break;
      default:
        console.log(`[stripe] unhandled event: ${event.type}`);
    }
    res.json({ received: true });
  } catch (e) {
    console.error('[stripe] event handler failed:', e.message);
    res.status(500).json({ error: 'handler_failed', message: e.message });
  }
});

// ============================================================
// Subscription DB (SQLite)
// ============================================================
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DATA_DIR = process.env.DATA_DIR || '/var/lib/paragu-ai-leads';
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const billingDb = new Database(path.join(DATA_DIR, 'billing.db'));
billingDb.exec(`
  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT,
    plan TEXT NOT NULL,
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    status TEXT NOT NULL,  -- active, canceled, past_due, trialing, unpaid
    current_period_start INTEGER,
    current_period_end INTEGER,
    amount INTEGER,
    currency TEXT DEFAULT 'pyg',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_subs_slug ON subscriptions(slug);
  CREATE INDEX IF NOT EXISTS idx_subs_status ON subscriptions(status);
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    service TEXT,
    requested_date TEXT,
    notes TEXT,
    plan TEXT,
    status TEXT DEFAULT 'pending',  -- pending, confirmed, completed, canceled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_bookings_slug ON bookings(slug);
`);

async function onCheckoutCompleted(session) {
  const slug = session.metadata?.slug || 'unknown';
  const plan = session.metadata?.plan || 'unknown';
  const email = session.customer_email || session.metadata?.email;
  const phone = session.metadata?.phone;
  stmt = billingDb.prepare(`
    INSERT INTO subscriptions (slug, customer_email, customer_phone, plan, stripe_customer_id, stripe_subscription_id, status, current_period_start, current_period_end, amount, currency)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  // Note: subscription_id may not be set yet (only on subscription.created)
  stmt.run(slug, email, phone, plan, session.customer, null, 'pending', null, null, null, 'pyg');
  console.log(`[stripe] checkout completed for ${slug} (${plan})`);
}

async function onSubscriptionUpdated(sub) {
  stmt = billingDb.prepare(`
    UPDATE subscriptions SET
      status = ?,
      current_period_start = ?,
      current_period_end = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE stripe_subscription_id = ?
  `);
  stmt.run(sub.status, sub.current_period_start, sub.current_period_end, sub.id);
  console.log(`[stripe] subscription ${sub.id} → ${sub.status}`);
}

async function onSubscriptionDeleted(sub) {
  stmt = billingDb.prepare(`
    UPDATE subscriptions SET status = 'canceled', updated_at = CURRENT_TIMESTAMP
    WHERE stripe_subscription_id = ?
  `);
  stmt.run(sub.id);
  console.log(`[stripe] subscription ${sub.id} canceled`);
}

async function onInvoicePaid(invoice) {
  console.log(`[stripe] invoice ${invoice.id} paid (${invoice.amount_paid})`);
}

async function onInvoicePaymentFailed(invoice) {
  console.log(`[stripe] invoice ${invoice.id} payment failed`);
  // Mark subscription as past_due
  stmt = billingDb.prepare(`
    UPDATE subscriptions SET status = 'past_due', updated_at = CURRENT_TIMESTAMP
    WHERE stripe_subscription_id = ?
  `);
  stmt.run(invoice.subscription);
}

// ============================================================
// GET /api/billing/:slug
// Get billing info for a client
// ============================================================
router.get('/api/billing/:slug', (req, res) => {
  const { slug } = req.params;
  const subs = billingDb.prepare(
    'SELECT * FROM subscriptions WHERE slug = ? ORDER BY created_at DESC'
  ).all(slug);
  res.json({ slug, subscriptions: subs, count: subs.length });
});

// ============================================================
// GET /api/admin/subs
// List all subscriptions (admin via admin key)
// ============================================================
router.get('/api/admin/subs', (req, res) => {
  if (process.env.KIKI_API_KEY && req.query.key !== process.env.KIKI_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const subs = billingDb.prepare(
    'SELECT * FROM subscriptions ORDER BY created_at DESC LIMIT 200'
  ).all();
  const stats = {
    total: subs.length,
    active: subs.filter(s => s.status === 'active').length,
    canceled: subs.filter(s => s.status === 'canceled').length,
    past_due: subs.filter(s => s.status === 'past_due').length,
    mrr: subs.filter(s => s.status === 'active').reduce((acc, s) => acc + (s.amount || 0), 0),
  };
  res.json({ subscriptions: subs, stats });
});

// ============================================================
// GET /api/plans
// Public list of plans for the pricing page
// ============================================================
router.get('/api/plans', (req, res) => {
  res.json({
    plans: Object.entries(PLANS).map(([key, p]) => ({
      id: key,
      name: p.name,
      price: p.price,
      currency: 'pyg',
      description: p.description,
      available: !!p.priceId,
    })),
    stripe_configured: !!stripe,
  });
});

export default router;
