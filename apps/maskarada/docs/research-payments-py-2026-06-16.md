# Payment Processors — Paraguay Research

**Date:** 2026-06-16
**Status:** Research only. Kiki + Ivan to decide.
**Source:** Tiendli blog, Shoperly, CartDNA, MarketData, Tigo PY, La Prensa Paraguay (May 2026)

---

## TL;DR for non-PY readers

Paraguay is **not** like Argentina/Brazil/Chile for online payments. MercadoPago has limited PY presence. The local ecosystem is **bank-driven**: transfers + QR + a few digital wallets. Kiki's audience likely already uses Tigo Money (the most ubiquitous mobile wallet). For the first 1-2 vendors, the lowest-friction option is **WhatsApp-direct with bank transfer confirmation**, exactly what monai does today. Adding a real payment processor is a Phase 2 move.

---

## The current Monai flow (the one that works)

```
1. Customer on /tienda/monai picks a rope (size + color)
2. Clicks "Comprar por WhatsApp" → opens wa.me/595981200255 with prefilled message
3. Customer + Moñai chat directly: bank transfer, address, shipping
4. Customer sends transfer proof via WhatsApp screenshot
5. Moñai confirms and ships
```

**Pros:** Zero payment processor fees, zero integration, works today.
**Cons:** Doesn't scale (manual), no audit trail, vendor does all the work.

---

## Payment options in Paraguay (the menu)

### 1. Bank transfer (SIPAP / standard)
- **What:** Standard wire transfer between PY bank accounts (Banco Continental, Itaú, Visión, etc.)
- **Customer experience:** Get the vendor's CBU/cuenta, transfer from own bank app, send receipt via WhatsApp
- **Coverage:** ~50% of adults (those with bank accounts)
- **Fees:** 0% for SIPAP; small fee for inter-bank
- **Integration effort:** Zero — just display bank details
- **Verdict:** **The default for monai and probably the first 2-3 vendors. Works today.**

### 2. Tigo Money
- **What:** Most-used mobile wallet in PY. P2P, bill pay, online checkout
- **Customer experience:** Tap "Pay with Tigo Money" → app opens → confirm
- **Coverage:** Highest in PY (most unbanked + banked have it)
- **Fees:** ~1-2% for merchants (Tigo takes a cut)
- **Integration:** Tigo has merchant API; some e-commerce platforms have it built-in (Shopify, Tiendli)
- **Verdict:** **Best fit for v2** if we go automated. Bank transfer is for v1.

### 3. Bancard (cards + QR + interop)
- **What:** Largest local card processor. Also runs "QR Paraguay" — interoperable QR that works with 75+ local apps (Tigo Money, Mango, Eko, Personal Pay, Zimple, etc.)
- **Customer experience:** Scan QR, confirm in their app. Cards also via Stripe-style web checkout.
- **Coverage:** 70%+ of point-of-sale payments in PY
- **Fees:** ~3-4% for cards, lower for QR
- **Integration:** API. More complex than Tigo alone. Multi-week.
- **Verdict:** **Best fit for v3+** when we have 5+ vendors and need unified dashboard.

### 4. Mercado Pago
- **What:** Limited in PY. Doesn't accept Tigo Money, bocas de cobranza, or transfers. Only cards + Zimple.
- **Coverage:** Smaller than in AR/BR
- **Verdict:** **Skip.** The brief was right to flag it; Tiendli's data confirms it doesn't work in PY like in the rest of LATAM.

### 5. Stripe
- **What:** Not officially available in PY (per Stripe's coverage list)
- **Verdict:** **Skip.** Use Bancard or Tigo instead.

### 6. Pagopar
- **What:** PY aggregator. Sits between bank apps and e-commerce. "Link de pago" generator.
- **Coverage:** Local e-commerce standard
- **Integration:** API or no-code link generator
- **Verdict:** **Worth a closer look** as an alternative to Bancard for v2. Simpler.

### 7. WhatsApp-direct (the bypass)
- **What:** Customer clicks "Hablar por WhatsApp" → opens chat with vendor. Vendor gets paid by transfer, Tigo Money, or cash on delivery.
- **Customer experience:** Human, low-tech, low-friction for people who don't trust web forms
- **Verdict:** **Always available** as a "comprar por WhatsApp" button alongside any other payment method. **The brief's request.**

---

## Recommended rollout (for Kiki + Ivan to confirm)

### Phase 1 — Now (Monai + first 2 vendors)
- Bank transfer via WhatsApp-direct (current model, works)
- Display vendor's bank details on the product page (RUC, cuenta, banco, alias)
- "Hablar por WhatsApp" + "Ya hice la transferencia" buttons (already on /tienda/monai)
- **No new code needed.** Just standardize the pattern.

### Phase 2 — When 3+ vendors onboard
- Add Tigo Money deep-link button: "Pagar con Tigo Money" → opens tigo.com.py with prefilled amount
- Each vendor can opt in to Tigo (most vendors won't have a Tigo merchant account, so this stays optional)
- Add Pagopar "link de pago" as a no-code option for vendors who don't want to chat
- **Effort:** 1-2 days. New `/api/payment-link` route, vendor dashboard page.

### Phase 3 — When 5+ vendors + we want a real storefront
- Bancard integration for unified card + QR checkout
- Commission accounting (X% per vendor, tracked per sale)
- Vendor self-service dashboard (orders, payouts, inventory)
- **Effort:** 2-3 weeks. Real product work. **Defer until Phase 5 per the brief.**

---

## Open questions for Kiki

- Do you (or Moñai) have a Tigo Money merchant account? (probably yes for Moñai)
- Do you have a Bancard account? (probably no for the platform, but maybe individual vendors do)
- What's the tax/ruc situation for selling through the platform? (a Paraguay RUC for the platform is probably needed before any of this matters — Kiki to check with their contador)
- For multi-vendor, who holds the money and pays out to vendors? (Trust signal: a real legal entity, not "send via WhatsApp")

---

## Open questions for Ivan (I2 follow-up)

- What's the budget for the Phase 2 work (Tigo + Pagopar integration)?
- Are we OK with a 5-10% commission per sale to fund the platform costs, or are we 0% for now to attract the first 3 vendors?
- If we move to Vercel per I4, does the payment routing stay on the VPS, or move with the rest?

---

## What I did NOT do (and why)

- Did not contact any payment processor. This is research.
- Did not design the vendor dashboard UI (Phase 3 work, depends on Phase 2 landing first).
- Did not estimate commission math (need actual volume data first).
- Did not include crypto payments (no PY adoption, Kiki's audience unlikely to use).
