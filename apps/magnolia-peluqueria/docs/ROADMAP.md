# Magnolia Peluquería — Implementation Roadmap

**Version:** 1.0 | Mayo 2026  
**Based on:** AUDIT-2026.md, DEEP-AUDIT-2026.md  
**Score actual:** 6.5/10 → **Score objetivo:** 9/10

---

## Overview

This roadmap is structured in 4 phases. Each phase delivers a complete, deployable slice of value — no phase depends on a later phase being complete. Work flows: docs first → implement → verify → next.

| Phase | Focus | Impact | Effort | Revenue Impact |
|-------|-------|--------|--------|---------------|
| 0 | Quick wins | Fast credibility | 2h | Indirect |
| 1 | Revenue engine | Book more clients | 2 weeks | Direct ++ |
| 2 | Operations | Efficiency + retention | 1 week | Direct + |
| 3 | Polish + scale | Trust + authority | 1 week | Indirect |

---

## Phase 0 — Quick Wins (This Week)

> **Effort:** 2 hours | **Score delta:** +0.5 (6.5 → 7.0) | **Owner:** Erebus

### P0-1: Fix "Abierto" badge (5 min)
Show real open/closed state. Live data from opening hours, not hardcoded.

### P0-2: Google Maps embed (15 min)
Replace broken `maps/google-maps.tsx` with working iframe embed in `location.tsx`.
Coordinates: -25.2794, -57.6350 (Asunción centro).

### P0-3: Contact form WhatsApp integration (30 min)
Form currently sends email. Wire it to WhatsApp instead (or both).
Template: "Hola Magnolia! Me llamo [NOMBRE] y quiero reservar [SERVICIO] para [FECHA]."

### P0-4: Favicon update (10 min)
Replace generic Next.js favicon with Magnolia logo.

### P0-5: Schema markup audit (30 min)
Fix `aggregateRating` — no fake stars. Use `OpeningHoursSpecification` instead.
Add `LocalBusiness` schema with proper `priceRange`.

### P0-6: Meta tags on all pages (30 min)
Every route needs unique `<title>` and `<meta description>`.

### P0-7: Instagram link → real feed (1 hour)
Wire `instagram-feed.tsx` to actual Instagram profile @magnolia_peluqueria.

---

## Phase 1 — Revenue Engine (Week 1–2)

> **Effort:** 2 weeks | **Score delta:** +1.5 (7.0 → 8.5) | **Owner:** Erebus + Kiki

### Revenue levers
1. **WhatsApp booking button** — primary CTA, every page
2. **Dynamic promotion cards** → WhatsApp prefill
3. **Gift card purchase** → WhatsApp inquiry flow
4. **Service page** → "Reservar ahora" on each service

### P1-1: Supabase setup (Day 1, 1h)
- Create Supabase project
- Run schema (see SUPABASE-SCHEMA.md)
- Set up RLS policies
- Connect to Next.js via `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`

### P1-2: Booking flow (Days 1–5)
- `/booking` page with service selector + date/time picker
- Confirmation screen with WhatsApp follow-up
- Admin receives email + can view in CMS
- **Key metric:** bookings/week

### P1-3: Promotions as conversion tools (Days 3–4)
- Rewrite `promotions.tsx` to pull from Supabase
- Each promo card has a "Reservar con este descuento" button
- Pre-fills WhatsApp with: service name + discount code + expiry
- Promo codes stored in `promotions` table

### P1-4: Loyalty program (Days 4–5)
- `loyalty.tsx` — explain the program
- Card stamp system (physical cards, tracked manually for now)
- "Ya tengo X sellos" WhatsApp message template
- Future: digitize with Supabase

### P1-5: Gift cards (Days 5–6)
- `/gift-cards` page with denomination selector (Gs. 50k / 100k / 200k)
- Inquiry via WhatsApp prefill
- Kiki handles payment manually, sends code via WhatsApp
- Future: Stripe/Pyvo integration

### P1-6: Abandoned booking detection (Days 6–7)
- If user starts booking but doesn't submit → trigger WhatsApp follow-up after 30 min
- Implemented via Supabase Edge Function

---

## Phase 2 — Operations (Week 3)

> **Effort:** 1 week | **Score delta:** +0.5 (8.5 → 9.0) | **Owner:** Erebus

### P2-1: Admin CMS (Days 1–4)
- `/admin` dashboard
- View all bookings (today / week / month)
- Manage promotions (create, edit, expire)
- Manage gallery photos
- Manage team members
- Basic stats: bookings this month, top services

### P2-2: Google Business integration (Day 4)
- Verify Google Business Profile
- Embed reviews on homepage
- Add `aggregateRating` with real data

### P2-3: Email notifications (Day 5)
- Booking confirmation to client (via Resend)
- New booking alert to Magnolia (email + WhatsApp)
- Reminder 24h before appointment

---

## Phase 3 — Polish & Scale (Week 4)

> **Effort:** 1 week | **Score delta:** +0.5 (9.0 → 9.5) | **Owner:** Erebus + Kiki

### P3-1: i18n (Days 1–3)
- Spanish (default) + English
- URL structure: `/es/` and `/en/` prefixes
- All content in `content/` JSON files

### P3-2: Blog (Days 3–5)
- `/blog` with tips: "Cómo cuidar tu cabello en verano", "Qué corte me queda?"
- SEO-driven content
- Social sharing

### P3-3: Advanced SEO (Day 5)
- Google Search Console
- Core Web Vitals optimization
- Structured data for all service pages

### P3-4: Before/After gallery (Days 5–6)
- Real photos from clients (with permission)
- Slider comparison component

### P3-5: Team bios (Days 6–7)
- Real photos of stylists
- Specialties, experience, languages

---

## Phase 4 — Future (Post-Launch)

> Not in current scope. Backlog items.

### F1: Online payment
- Stripe for gift cards
- Pyvo/Moova for booking deposits

### F2: WhatsApp AI receptionist
- AgentCall integration (num.Argentinas)
- AI answers FAQs, takes bookings 24/7

### F3: Client portal
- View appointment history
- Track loyalty points digitally
- Update contact info

### F4: SMS reminders
- Via AgentCall or Twilio

---

## Implementation Checklist

### Phase 0 — Quick Wins
- [ ] P0-1: Open/closed badge (real hours)
- [ ] P0-2: Google Maps embed
- [ ] P0-3: Contact → WhatsApp
- [ ] P0-4: Favicon
- [ ] P0-5: Schema audit
- [ ] P0-6: Meta tags all pages
- [ ] P0-7: Instagram feed

### Phase 1 — Revenue Engine
- [ ] P1-1: Supabase setup
- [ ] P1-2: Booking flow
- [ ] P1-3: Promotions → WhatsApp
- [ ] P1-4: Loyalty program
- [ ] P1-5: Gift cards
- [ ] P1-6: Abandoned booking detection

### Phase 2 — Operations
- [ ] P2-1: Admin CMS
- [ ] P2-2: Google Business
- [ ] P2-3: Email notifications

### Phase 3 — Polish
- [ ] P3-1: i18n
- [ ] P3-2: Blog
- [ ] P3-3: Advanced SEO
- [ ] P3-4: Before/After
- [ ] P3-5: Team bios

---

## Revenue Metrics to Track

| Metric | Baseline | Target (Month 1) |
|--------|----------|------------------|
| Bookings/week via website | 0 | 10 |
| WhatsApp clicks/day | ~5 | 20 |
| Gift cards sold/month | 0 | 5 |
| Promo redemptions | 0 | 15 |
| Loyalty signups | 0 | 20 |
| Google Business impressions | ? | 500 |

---

*Document owner: Erebus — Ai-Whisperers*
*Last updated: Mayo 2026*