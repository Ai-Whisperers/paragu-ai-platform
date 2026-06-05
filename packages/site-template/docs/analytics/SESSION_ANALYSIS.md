# Site Template — Session Analysis & Technical Documentation

**Generated:** 2026-06-01
**Last commit:** dd5d7e0
**Build status:** ✅ Passes
**Test status:** Unit/Integration ✅ Pass (~150 tests) · E2E ❌ Never Run

---

## Part I: What Was Built — Architecture Overview

### Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 16 (App Router) | `standalone` output, Docker-ready |
| Styling | Tailwind CSS v4 | `@theme` directive in globals.css |
| Database | Supabase (Postgres) | Migrations in `supabase/migrations/` |
| Auth | WhatsApp OTP + HMAC cookies | No email/password for clients |
| Payments | Stripe Checkout | Gift card purchases |
| Data layer | JSON files (fallback) | `data/*.json` used when Supabase unavailable |
| Testing | Vitest (unit/integration) + Playwright (E2E) | 9 unit + 20 integration + 16 E2E specs |
| i18n | URL-based (`/es/` and `/en/`) | Spanish default, English partial |

### Directory Structure

```
app/
├── [lang]/                    # Language-prefixed routes (es/en)
│   ├── page.tsx               # Home page
│   ├── contacto/page.tsx       # Contact form
│   ├── nosotros/page.tsx      # About page
│   ├── reserva/page.tsx       # Booking form
│   ├── tarjetas-de-regalo/    # Gift cards
│   │   ├── page.tsx           # Gift card info
│   │   └── comprar/           # Purchase flow
│   │       ├── page.tsx       # Tier selection + checkout form
│   │       └── success/       # Post-Stripe success page
│   ├── blog/                 # Blog posts
│   ├──faq/page.tsx           # FAQ accordion
│   └── ofertas/page.tsx       # Promotions
├── admin/                     # Admin dashboard (protected)
│   ├── login/page.tsx         # WhatsApp OTP login
│   ├── page.tsx              # Dashboard stats
│   ├── bookings/page.tsx     # Booking management
│   ├── gift-cards/page.tsx    # Gift card management
│   ├── content/page.tsx       # Content CMS
│   └── promotions/page.tsx    # Promotions CMS
├── api/                       # API routes
│   ├── auth/                 # Auth: login, logout, OTP, check, me
│   ├── admin/                # Admin CRUD: bookings, gift-cards, content, stats
│   ├── booking/route.ts       # Booking creation
│   ├── cart/route.ts         # Cart session
│   ├── contact/route.ts       # Contact form submissions
│   ├── gift-card/            # Gift card: checkout, redeem, token, webhook
│   ├── products/route.ts     # Product catalog
│   ├── promo/claim/route.ts  # Promo code redemption
│   ├── referral/route.ts     # Referral tracking
│   ├── stripe/              # Stripe: checkout, verify, webhook
│   ├── subscribe/route.ts    # Email subscription
│   └── instagram/route.ts    # Instagram feed proxy
├── c/[token]/page.tsx        # Gift card claim page (public token URL)
└── blog/[id]/page.tsx       # Blog post detail (legacy)

lib/
├── config.ts                  # Site config (business info, features, i18n)
├── config.server.ts          # Server-only config helpers
├── data-store.ts             # Universal data layer (Supabase first, JSON fallback)
├── admin-auth.ts            # Admin HMAC session management
├── client-auth.ts           # Client WhatsApp HMAC session
├── otp-service.ts           # OTP generation + expiry
├── otp-store.ts             # OTP storage (memory, per-instance)
├── seo.ts                   # SEO helpers (meta, OG, JSON-LD)
└── client-kit/              # Client-side helpers
    ├── analytics/           # GA4 tracking
    ├── db/                 # Local DB
    ├── payment/            # Payment helpers
    ├── seo/               # Client SEO
    └── types/             # Shared types

components/
├── admin/                   # Admin-specific components
│   ├── content-editor.tsx   # WYSIWYG content editor
│   ├── gift-card-form.tsx   # Create gift card form
│   └── gift-card-detail.tsx # Gift card detail + redeem UI
├── booking-form.tsx          # Reservation form
├── contact-section.tsx      # Contact page section
├── faq-accordion.tsx        # FAQ with expand/collapse
├── promotions.tsx            # Active promotions display
├── whatsapp-float.tsx       # WhatsApp CTA button (floating)
└── ...                      # Other shared components

content/
├── site.json                # Branding, colors, fonts, features, navigation
├── content.json             # Page content: hero, services, testimonials
├── tokens.json              # Design tokens (palettes, typography)
├── es.json / en.json        # UI strings (i18n)
└── blog.json                # Blog posts (legacy)

data/                         # JSON fallback storage
├── bookings.json
├── contacts.json
├── gift-cards.json
├── promotions.json
└── subscribers.json

supabase/migrations/         # Database schema
├── 001_add_gallery_table.sql
├── 002_enhanced_schema.sql
└── 003_clients_giftcards_loyalty.sql

tests/
├── unit/                    # 9 files — Vitest unit tests
├── integration/            # 20 files — Vitest integration tests
├── e2e/                   # 16 spec files — Playwright E2E
│   ├── pages/             # Page objects (11 files)
│   └── helpers/           # Auth, mock-api, fixtures
└── factories/              # Data factories for tests
```

---

## Part II: Session-by-Session Commit Analysis

### Commit 1: `4084015` — feat: initial site-template
Initial project scaffold. Empty Next.js App Router project with basic component stubs, no real business logic, no tests.

### Commit 2: `738425e` — feat: granular content folder structure
Moved content into `content/` JSON files. Introduced `lib/config.ts` for site configuration. Added `ANNOTATION` comment blocks to components explaining their purpose. Set up the `@ai-whisperers/*` monorepo package imports.

### Commit 3-5: Token fixes and cleanup
`4c464b4`, `5ad34e1`, `b0d688f`, `5db4d6e`, `f9d7646`
Removed hardcoded `SITE_NAME`/`SITE_SLUG` tokens. Replaced with `siteConfig` everywhere. Cleaned up legacy routes (`app/coming-soon`, `app/servicios`, etc.). Updated content JSON files.

### Commit 6: `048cf6d` — chore: add config.example.json
Added `.env.example` / `config.example.json` with all required env vars documented.

### Commit 7: `0357112` — feat: Phase 1-4 completion
**Major work commit.** This is where most of the actual functionality was built:
- Complete admin auth (OTP + HMAC sessions)
- Admin dashboard with real data from API routes
- Content management forms
- Booking management with calendar view
- Gift card management UI
- Stripe integration (checkout, webhook, verify)
- Gift card purchase flow (tier selection → Stripe → success)
- Contact, about, promotions, FAQ pages completed
- All ANNOTATION comment blocks

**Files changed:** 129 files, +7020/-328 lines

### Commits 8-11: Fix passes
`6e3ec18` — fix: gift-card-detail ordering, admin gift-cards page, middleware auth
`b426cfa` — fix: remove unused variables, clean up lint warnings
`d6f6143` — fix: resolve lint errors, type errors, and parsing issues
`da36ea9` — fix: resolve critical ESLint/React errors (setState cascades, impure renders, Link refs)

### Commit 12: `932e1c7` — feat: Phase 5 final polish — tests, lint, build verification
**Test infrastructure commit.** Added full Vitest unit + integration suite (9 unit files, 20 integration files, ~150 tests). Added Playwright E2E infrastructure (16 spec files, page objects, helpers, factories). Added `vitest.config.ts` and `playwright.config.ts`. Fixed remaining ESLint errors. Build verified passing.

### Commit 13: `dd5d7e0` — fix: Math.random purity error in gift card purchase, add data JSON files
Current session. Wrapped `Math.random()` in `useMemo` to fix React render purity error. Added `data/*.json` files (bookings, contacts, gift-cards, promotions, subscribers) as local fallback storage.

---

## Part III: Key Architecture Decisions

### 1. WhatsApp OTP for Admin Auth
**Decision:** No email/password for admin login. Instead: enter phone number → receive WhatsApp OTP → verify OTP → HMAC session cookie.

**Why:** Paraguay market context — WhatsApp is the primary communication channel. OTP via WhatsApp is more familiar than email for the target admin users (business owners, staff).

**Implementation:**
- `lib/otp-service.ts` — generates 6-digit OTP, stores in memory with 5-minute expiry
- `lib/admin-auth.ts` — creates HMAC-signed session cookie on successful verify
- `app/api/auth/admin/send-otp/route.ts` — sends OTP via Twilio WhatsApp
- `app/api/auth/admin/verify-otp/route.ts` — verifies OTP, sets session

**Gap:** Twilio credentials not configured. OTP won't actually send in production.

### 2. JSON File Fallback (Not Supabase)
**Decision:** The data layer (`lib/data-store.ts`) tries Supabase first, falls back to local JSON files if Supabase is unavailable.

**Why:** Enables development without Supabase credentials. Makes the template work out-of-the-box for users who just want to clone and run.

**Gap:** JSON files are flat and don't support relationships, transactions, or concurrent writes. Not production-safe.

### 3. Gift Card via Stripe Checkout (Not In-App Payment)
**Decision:** Gift card purchase uses Stripe Checkout hosted page, not embedded card form.

**Why:** Simpler integration — Stripe handles PCI compliance, card security, 3D Secure. Money goes directly to business Stripe account.

**Flow:**
1. User selects tier → fills form → POST `/api/stripe/checkout`
2. Server creates Stripe Checkout session → returns URL
3. User redirected to Stripe → pays → redirected to `/success`
4. Stripe webhook fires → creates gift card record in DB
5. Success page polls `/api/stripe/verify` → shows gift card code

**Gap:** Stripe not configured in current env. Checkout returns `stripe_not_configured` error.

### 4. URL-Based i18n (`/es/` and `/en/`)
**Decision:** Language determined by URL prefix, not browser detection or cookies.

**Why:** SEO-friendly, shareable URLs, simple implementation.

**Gap:** English translations are partial. Most content only exists in `content/es.json`.

### 5. HMAC Session Cookies (Not JWT Stored in DB)
**Decision:** Admin sessions are HMAC-signed cookies, not JWTs stored in a sessions table.

**Why:** No server-side session storage needed. Stateless. Cookie tamper-proof via HMAC.

**Format:** `${expiry}.${nonce}.${phone}.${hmac_signature}`

**Gap:** If the HMAC secret is compromised, attacker can forge any session. Secret lives in env var.

---

## Part IV: Data Models

### Gift Card
```typescript
{
  id: string               // UUID
  token: string            // Public claim token (8-char uppercase)
  code: string             // Display code (e.g., "MAGNOLIA-XXXX-XXXX")
  amount: number           // Original purchase amount (PYG)
  balance: number          // Current redeemable balance (PYG)
  denomination: string     // Label: "Plata", "Oro", etc.
  status: "active" | "redeemed" | "cancelled" | "expired"
  recipient_name?: string
  recipient_email?: string
  recipient_phone?: string
  purchaser_phone?: string
  valid_until: string     // ISO date
  created_at: string      // ISO date
}
```

### Booking
```typescript
{
  id: string
  client_name: string
  phone: string           // WhatsApp format: 595981000000
  service: string
  preferred_date: string   // ISO date
  notes?: string
  status: "pending" | "confirmed" | "cancelled"
  referral_source?: string
  created_at: string
}
```

### Client (Loyalty)
```typescript
{
  id: string
  phone: string           // Primary key (WhatsApp format)
  name?: string
  email?: string
  loyalty_tier: "standard" | "silver" | "gold"
  points: number
  visit_count: number
  created_at: string
  updated_at: string
}
```

### Promotion
```typescript
{
  id: string
  title: string
  description: string
  discount_percent: number
  promo_code?: string
  valid_from: string
  valid_until: string
  max_claims: number
  claim_count: number
  active: boolean
}
```

---

## Part V: Environment Configuration

### Required Variables

```bash
# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Magnolia"
NEXT_PUBLIC_SITE_SLUG="magnoliaspa"
NEXT_PUBLIC_LANG_DEFAULT="es"
NEXT_PUBLIC_LANG_AVAILABLE="es,en"

# Stripe (for gift card purchases)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Twilio WhatsApp (for admin OTP)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_FROM=whatsapp:+1...

# Supabase (for real data storage)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# WhatsApp for client contact
NEXT_PUBLIC_WHATSAPP_NUMBER=+595981000000
WHATSAPP_MESSAGE_TEMPLATE="Hola!%20Quiero%20reservar"

# Instagram
INSTAGRAM_ACCESS_TOKEN=IGQ...
INSTAGRAM_BUSINESS_ACCOUNT_ID=...

# Admin auth
ADMIN_SECRET_KEY=site-template-admin-secret-change-me
CLIENT_SECRET_KEY=SITE_SLUG-default-secret-change-me
```

### Current State
**No credentials are configured.** The app runs with JSON file fallback. All API routes return mock/success responses based on in-memory data. Stripe checkout returns `stripe_not_configured`. WhatsApp OTP would fail silently (Twilio not configured).

---

## Part VI: Known Issues & Technical Debt

### Critical (Break Production)
1. **Stripe not configured** — gift card purchases will fail at checkout
2. **Twilio not configured** — admin OTP login won't send WhatsApp messages
3. **JSON fallback is not concurrent-safe** — multiple server instances will have data races
4. **No email sending** — gift card success page has no email delivery

### High (Should Fix Before Launch)
1. **~130 ESLint errors** — mostly `@typescript-eslint/no-explicit-any` in type annotations
2. **English translations incomplete** — most content only exists in Spanish
3. **No rate limiting** — OTP endpoint can be spammed (no per-IP or per-phone limits in OTP service)
4. **Gift card expiry not enforced** — `valid_until` stored but not checked on redemption
5. **Admin session uses short static secret** — `ADMIN_SECRET_KEY` should be rotated, not static

### Medium (Post-Launch)
1. **No image optimization** — some components use raw `<img>` instead of `next/image`
2. **Instagram feed** — uses static/mock data, real API not wired
3. **No SEO for blog posts** — dynamic blog routes may not have proper meta tags
4. **Booking has no email confirmation** — client doesn't receive booking confirmation
5. **No analytics** — GA4 is loaded but no custom events for key actions

### Low (Nice to Have)
1. **Service worker** (`public/sw.js`) — marked as "Static" in build, likely unused
2. **Cookie consent** — component exists but not wired to block analytics
3. **Dark mode toggle** — exists but no dark mode styles implemented
4. **Opening badge** — shows open/closed but may not reflect actual business hours

---

## Part VII: Security Considerations

| Concern | Status | Mitigation Needed |
|---------|--------|-----------------|
| Admin auth via WhatsApp OTP | ⚠️ Partial | Twilio not configured, OTP rate limiting missing |
| HMAC session cookies | ✅ OK | Uses SHA-256 HMAC, 24h expiry |
| CSRF on auth endpoints | ⚠️ Unknown | No CSRF tokens on POST endpoints |
| Stripe webhook signature | ✅ Verified | `stripe.webhooks.constructEvent()` used |
| SQL injection (Supabase) | ⚠️ Unknown | Need to audit Supabase queries |
| XSS in user content | ⚠️ Unknown | Need to audit dangerouslySetInnerHTML usage |
| Gift card race conditions | ⚠️ Not handled | No optimistic locking on balance updates |
| OTP brute force | ⚠️ Not mitigated | 6-digit OTP, no lockout after wrong attempts |

---

## Part VIII: What "Done" Means for This Project

### ✅ What "Done" Means for Code
- All 20 plan tasks marked complete
- Build passes with no errors
- Unit + integration tests pass
- E2E suite runs and passes
- Lint clean (0 errors)

### ✅ What "Done" Means for Deployment
- Stripe credentials configured (real or test mode)
- Twilio WhatsApp configured (real or test mode)
- Supabase DB created, migrations applied
- All env vars set
- E2E tests run against staging
- Lighthouse score > 90 on all pages

### ❌ What "Not Done" Means
- Plan shows 0/20 tasks complete (swarm tracking broken)
- E2E suite written but never executed
- Lint has 130 errors
- No CI/CD pipeline
- No performance benchmarks
- No security audit

---

## Quick Reference: Commands

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Unit + Integration tests
npx vitest run

# E2E tests (requires dev server)
npm run dev &
sleep 10
npx playwright test

# View E2E report
npx playwright show-report

# Type check
npx tsc --noEmit

# Supabase (if configured)
supabase db push
supabase secrets set STRIPE_SECRET_KEY=...
```