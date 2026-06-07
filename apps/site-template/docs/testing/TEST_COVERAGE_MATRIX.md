# Test Coverage Matrix

**Generated:** 2026-06-01
**Last updated from:** dd5d7e0

---

## How to Read This Matrix

- ✅ = Test exists and passes
- ⚠️ = Test exists but basic/incomplete
- ❌ = No test exists
- N/A = Not applicable / not implemented

---

## API Routes × Test Coverage

### Auth APIs

| Route | Method | Unit | Integration | E2E | Notes |
|-------|--------|------|-------------|-----|-------|
| `/api/auth/login` | POST | — | ✅ `api-auth.test.ts` | — | |
| `/api/auth/logout` | POST | — | ✅ `api-auth-logout.test.ts` | — | |
| `/api/auth/check` | GET | — | ✅ `api-auth-check.test.ts` | — | |
| `/api/auth/me` | GET | — | ❌ | — | Missing test |
| `/api/auth/otp/send` | POST | — | ✅ `api-auth.test.ts` | — | |
| `/api/auth/otp/verify` | POST | — | ❌ | — | Missing test |
| `/api/auth/admin/send-otp` | POST | — | ✅ `api-admin-send-otp.test.ts` | — | |
| `/api/auth/admin/verify-otp` | POST | — | ❌ | — | Missing test |

### Admin APIs

| Route | Method | Unit | Integration | E2E | Notes |
|-------|--------|------|-------------|-----|-------|
| `/api/admin/bookings` | GET | — | ✅ `api-admin-bookings.test.ts` | — | |
| `/api/admin/bookings` | POST | — | ✅ `api-admin-bookings.test.ts` | — | |
| `/api/admin/gift-cards` | GET | — | ✅ `api-gift-card.test.ts` | — | |
| `/api/admin/gift-cards` | POST | — | ✅ `api-gift-card.test.ts` | — | |
| `/api/admin/gift-cards/[id]` | GET/PUT/DELETE | — | ❌ | — | Missing |
| `/api/admin/gift-cards/[id]/redeem` | POST | — | ✅ `api-admin-gift-cards-redeem.test.ts` | — | |
| `/api/admin/content` | GET/POST | — | ❌ | — | Missing test |
| `/api/admin/content/[key]` | GET/PUT/DELETE | — | ❌ | — | Missing test |
| `/api/admin/products` | GET/POST | — | ❌ | — | Missing test |
| `/api/admin/promotions` | GET/POST | — | ❌ | — | Missing test |
| `/api/admin/stats` | GET | — | ❌ | — | Missing test |

### Public APIs

| Route | Method | Unit | Integration | E2E | Notes |
|-------|--------|------|-------------|-----|-------|
| `/api/booking` | POST | — | ✅ `api-booking.test.ts` | ⚠️ | Basic E2E in `interactive.spec.ts` |
| `/api/contact` | POST | — | ✅ `api-contact.test.ts` | ⚠️ | Basic E2E in `interactive.spec.ts` |
| `/api/cart` | GET/POST/PUT/DELETE | — | ✅ `api-cart.test.ts` | ❌ | |
| `/api/client/[phone]` | GET | — | ✅ `api-client.test.ts` | — | |
| `/api/gift-card` | GET/POST | — | ✅ `api-gift-card.test.ts` | ⚠️ | Basic E2E in `interactive.spec.ts` |
| `/api/gift-card/[token]` | GET | — | ✅ `api-gift-card-token.test.ts` | ⚠️ | |
| `/api/gift-card/redeem` | POST | — | ✅ `api-gift-card-redeem.test.ts` | ❌ | |
| `/api/gift-card/checkout` | POST | — | ✅ `api-gift-card.test.ts` | ❌ | |
| `/api/gift-card/webhook` | POST | — | ✅ `api-stripe-webhook.test.ts` | ❌ | |
| `/api/products` | GET | — | ✅ `api-products.test.ts` | ❌ | |
| `/api/promotions` | GET | — | ✅ `api-promotions.test.ts` | ❌ | |
| `/api/promo/claim` | POST | — | ✅ `api-promo-claim.test.ts` | ❌ | |
| `/api/referral` | GET/POST | — | ✅ `api-referral.test.ts` | ❌ | |
| `/api/stripe/checkout` | POST | — | ✅ `api-stripe-checkout.test.ts` | ❌ | |
| `/api/stripe/verify` | POST | — | ✅ `api-stripe-checkout.test.ts` | ❌ | |
| `/api/stripe/webhook` | POST | — | ✅ `api-stripe-webhook.test.ts` | ❌ | |
| `/api/subscribe` | POST | — | ✅ `api-subscribe.test.ts` | ⚠️ | |
| `/api/instagram` | GET | — | ✅ `api-instagram.test.ts` | ❌ | |

---

## Pages × Test Coverage

### Public Pages (es)

| Page | Route | Smoke | Interaction | Auth | Notes |
|------|-------|-------|-------------|------|-------|
| Home | `/es/` | ⚠️ `public.spec.ts` | ❌ | — | |
| Contact | `/es/contacto` | ⚠️ `public.spec.ts` | ⚠️ `interactive.spec.ts` | — | |
| About | `/es/nosotros` | ⚠️ `public.spec.ts` | ❌ | — | |
| Services | `/es/servicios` | ⚠️ `public.spec.ts` | ❌ | — | |
| Booking | `/es/reserva` | ⚠️ `public.spec.ts` | ⚠️ `interactive.spec.ts` | — | |
| Gift Cards | `/es/tarjetas-de-regalo` | ⚠️ `public.spec.ts` | ⚠️ `interactive.spec.ts` | — | |
| Gift Cards Purchase | `/es/tarjetas-de-regalo/comprar` | ⚠️ `public.spec.ts` | ⚠️ `interactive.spec.ts` | — | |
| Gift Cards Success | `/es/tarjetas-de-regalo/comprar/success` | ⚠️ `success-pages.spec.ts` | ❌ | — | |
| Gift Card Claim | `/c/[token]` | ⚠️ `public.spec.ts` | ❌ | — | |
| Offers | `/es/ofertas` | ⚠️ `public.spec.ts` | ❌ | — | |
| FAQ | `/es/faq` | ⚠️ `public.spec.ts` | ❌ | — | |
| Blog | `/es/blog` | ⚠️ `public.spec.ts` | ❌ | — | |
| Blog Post | `/es/blog/[slug]` | ⚠️ `public.spec.ts` | ❌ | — | |
| Mi Cuenta | `/es/mi-cuenta` | ⚠️ `client-portal.spec.ts` | ❌ | ⚠️ | |
| 404 | any | ⚠️ `public.spec.ts` | — | — | |

### Public Pages (en)

| Page | Route | Smoke | Interaction | Notes |
|------|-------|-------|-------------|-------|
| Home | `/en/` | ⚠️ `public.spec.ts` | ❌ | |
| Contact | `/en/contacto` | ⚠️ `public.spec.ts` | ⚠️ `interactive.spec.ts` | |
| Booking | `/en/reserva` | ⚠️ `public.spec.ts` | ⚠️ `interactive.spec.ts` | |

### Admin Pages

| Page | Route | Smoke | CRUD | Auth | Notes |
|------|-------|-------|------|------|-------|
| Admin Login | `/admin/login` | ⚠️ `admin.spec.ts` | — | ⚠️ | OTP UI tested |
| Admin Dashboard | `/admin` | ⚠️ `admin.spec.ts` | — | ⚠️ | |
| Admin Bookings | `/admin/bookings` | ⚠️ `admin.spec.ts` | ⚠️ `admin-crud.spec.ts` | — | |
| Admin Gift Cards | `/admin/gift-cards` | ⚠️ `admin.spec.ts` | ⚠️ `admin-crud.spec.ts` | — | |
| Admin Content | `/admin/content` | ⚠️ `admin.spec.ts` | ⚠️ `admin-crud.spec.ts` | — | |
| Admin Promotions | `/admin/promotions` | ⚠️ `admin.spec.ts` | ⚠️ `admin-crud.spec.ts` | — | |

### Static Pages

| Page | Route | Smoke | Notes |
|------|-------|-------|-------|
| Garantía | `/garantia` | ⚠️ `static-pages.spec.ts` | |
| Guías | `/guias` | ⚠️ `static-pages.spec.ts` | |
| Privacidad | `/privacidad` | ⚠️ `static-pages.spec.ts` | |
| Términos | `/terminos` | ⚠️ `static-pages.spec.ts` | |
| Tienda | `/tienda` | ⚠️ `static-pages.spec.ts` | |
| Tiendas | `/tiendas` | ⚠️ `static-pages.spec.ts` | |
| Portal | `/portal` | ⚠️ `static-pages.spec.ts` | |
| Producto | `/producto/[slug]` | ⚠️ `static-pages.spec.ts` | |
| Products | `/products` | ⚠️ `static-pages.spec.ts` | |
| Products Detail | `/products/[id]` | ⚠️ `static-pages.spec.ts` | |
| Promociones | `/promociones` | ⚠️ `static-pages.spec.ts` | |

---

## Feature × Test Coverage

### Authentication

| Feature | Unit | Integration | E2E | Priority |
|---------|------|-------------|-----|----------|
| Admin login page renders | — | — | ⚠️ | P1 |
| OTP send (Twilio mock) | — | ✅ | ❌ | P2 |
| OTP verify | — | ❌ | ❌ | P2 |
| Admin session cookie set | ✅ `admin-auth.test.ts` | ✅ `api-auth.test.ts` | ⚠️ | P1 |
| Client session HMAC | ✅ `client-auth.test.ts` | — | ❌ | P2 |
| Session validation | — | ✅ `api-auth-check.test.ts` | ❌ | P2 |
| Logout clears cookie | — | ✅ `api-auth-logout.test.ts` | ❌ | P2 |
| Expired session redirect | — | — | ❌ | P3 |

### Booking

| Feature | Unit | Integration | E2E | Priority |
|---------|------|-------------|-----|----------|
| Booking form renders | — | — | ⚠️ `interactive.spec.ts` | P1 |
| Booking form validation | — | ✅ `api-booking.test.ts` | ❌ | P1 |
| Booking creates record | — | ✅ `api-booking.test.ts` | ❌ | P1 |
| Booking confirmation page | — | — | ⚠️ `success-pages.spec.ts` | P1 |
| Admin bookings list | — | ✅ `api-admin-bookings.test.ts` | ⚠️ | P1 |
| Admin booking status update | — | — | ❌ | P2 |

### Gift Cards

| Feature | Unit | Integration | E2E | Priority |
|---------|------|-------------|-----|----------|
| Tier selection UI | — | — | ⚠️ `interactive.spec.ts` | P1 |
| Checkout creates Stripe session | — | ✅ `api-stripe-checkout.test.ts` | ❌ | P1 |
| Stripe webhook creates card | — | ✅ `api-stripe-webhook.test.ts` | ❌ | P1 |
| Success page shows code | — | — | ⚠️ `success-pages.spec.ts` | P1 |
| Gift card claim page | — | — | ⚠️ `public.spec.ts` | P1 |
| Gift card balance check | — | ✅ `api-gift-card-token.test.ts` | ❌ | P1 |
| Gift card redeem | — | ✅ `api-gift-card-redeem.test.ts` | ❌ | P1 |
| Admin create card | — | ✅ `api-gift-card.test.ts` | ⚠️ `admin-crud.spec.ts` | P1 |
| Admin view all cards | — | ✅ `api-gift-card.test.ts` | ⚠️ `admin.spec.ts` | P1 |
| Admin redeem card | — | ✅ `api-admin-gift-cards-redeem.test.ts` | ❌ | P1 |

### Contact

| Feature | Unit | Integration | E2E | Priority |
|---------|------|-------------|-----|----------|
| Contact form renders | — | — | ⚠️ `interactive.spec.ts` | P1 |
| Contact form validation | — | ✅ `api-contact.test.ts` | ❌ | P1 |
| Contact stores in data | — | ✅ `api-contact.test.ts` | ❌ | P1 |
| WhatsApp float button | — | — | ❌ | P2 |

### Promotions

| Feature | Unit | Integration | E2E | Priority |
|---------|------|-------------|-----|----------|
| Promotions page renders | — | — | ⚠️ `public.spec.ts` | P2 |
| Promo countdown timer | — | — | ❌ | P3 |
| Promo claim endpoint | — | ✅ `api-promo-claim.test.ts` | ❌ | P2 |
| Admin promotions CRUD | — | ❌ | ⚠️ `admin-crud.spec.ts` | P2 |

### Referral

| Feature | Unit | Integration | E2E | Priority |
|---------|------|-------------|-----|----------|
| Referral link generation | — | ✅ `api-referral.test.ts` | ❌ | P3 |
| Referral attribution | — | ✅ `api-referral.test.ts` | ❌ | P3 |
| Referral reward | — | ❌ | ❌ | P3 |

### Content Management

| Feature | Unit | Integration | E2E | Priority |
|---------|------|-------------|-----|----------|
| Admin content list | — | ❌ | ⚠️ `admin.spec.ts` | P2 |
| Admin content editor | — | ❌ | ❌ | P2 |
| Content publish/update | — | ❌ | ❌ | P2 |

---

## Test Status Summary

```
Legend: ✅ = passes   ⚠️ = partial   ❌ = missing   N/A = not applicable

Category              | Unit | Integration | E2E  | Total
----------------------+------+-------------+------+-------
API routes            | N/A  | ✅ 17/21    | N/A  | 17/21 (81%)
Admin pages           | N/A  | N/A         | ⚠️   | partial
Public pages (es)     | N/A  | N/A         | ⚠️   | partial
Public pages (en)     | N/A  | N/A         | ⚠️   | partial
Static pages          | N/A  | N/A         | ⚠️   | partial
Authentication        | ✅   | ✅          | ⚠️   | mostly done
Booking flow          | —    | ✅          | ⚠️   | partial
Gift cards            | —    | ✅          | ⚠️   | partial
Contact form          | —    | ✅          | ⚠️   | partial
Promotions            | —    | ✅          | ❌   | backend done
Referral              | —    | ✅          | ❌   | backend done
Content management    | —    | ❌          | ❌   | missing
```

---

## Missing Tests by Priority

### P1 — Critical (blocking deployment)
1. `tests/integration/api-auth-otp-verify.test.ts` — OTP verify endpoint
2. `tests/integration/api-auth-me.test.ts` — session info endpoint
3. `tests/integration/api-admin-content.test.ts` — content CRUD
4. `tests/integration/api-admin-stats.test.ts` — stats endpoint
5. E2E full gift card purchase flow (Stripe mock → success → claim)
6. E2E booking flow (form → confirmation → admin view)

### P2 — Important (should have before production)
7. E2E admin login OTP flow (send → verify → dashboard)
8. E2E language toggle (es ↔ en)
9. E2E FAQ accordion expand/collapse
10. E2E WhatsApp float button click
11. E2E promo countdown timer behavior
12. Integration tests for admin gift-cards PATCH (balance update)
13. Integration tests for admin products/promotions CRUD

### P3 — Nice to have (before release)
14. E2E client portal login → view → logout
15. E2E blog post rendering
16. Performance: Lighthouse CI on all public pages
17. Security: Auth token tampering tests
18. API rate limiting tests (OTP, booking, referral)
19. Email delivery mock verification on gift card success