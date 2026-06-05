# API Documentation

Universal Next.js 16 client site template API. Paraguay-first, powered by Supabase + Stripe.

## Overview

### Architecture
- **Next.js 16** App Router with Route Handlers (`app/api/*/route.ts`)
- **Supabase** primary data store with JSON file fallback
- **Stripe** for gift card payments
- **WhatsApp OTP** for client authentication

### Data Flow
1. API routes receive requests
2. Auth guards validate sessions via cookies
3. Supabase Admin client performs database operations
4. Responses return JSON with appropriate status codes

### Error Handling Convention
```json
{ "error": "Human-readable error message" }
```

Status codes: `400` (validation), `401` (unauthenticated), `404` (not found), `409` (conflict), `500` (server error)

---

## Authentication

### Admin Auth (Cookie-based)
Uses `admin_session` cookie containing a JWT signed with `ADMIN_AUTH_SECRET`.

**Flow:**
1. POST `/api/auth/admin/send-otp` → sends OTP via WhatsApp
2. POST `/api/auth/admin/verify-otp` → verifies OTP, sets `admin_session` cookie (30-day TTL)
3. All `/api/admin/*` routes check `admin_session` cookie via `requireAdminAuth()`

**Guard Implementation (`lib/admin-auth-guard.ts`):**
- Parses `cookie` header manually
- Extracts `admin_session` cookie value
- Calls `verifyToken()` from `lib/admin-auth`
- Returns `{ phone, authorized: true }` or `NextResponse.json({ error }, { status: 401 })`

### Client Auth (Cookie-based)
Uses `tu-emprendimiento_client_session` cookie containing HMAC-signed session token.

**Flow:**
1. POST `/api/auth/otp/send` → stores OTP in `otp_codes` table, returns WhatsApp link
2. POST `/api/auth/otp/verify` → verifies OTP code, creates session token, sets cookie
3. Client endpoints check session via `verifySessionToken()` from `lib/client-auth`

**Session Token Structure (`lib/client-auth.ts`):**
```
{exp}.{nonce}.{phone}.{signature}
```
- `exp`: Unix timestamp expiry (30 days from creation)
- `nonce`: 12-byte random hex
- `phone`: Client phone number
- `signature`: HMAC-SHA256 of `{exp}.{nonce}.{phone}` using `CLIENT_AUTH_SECRET`

---

## Public Endpoints (No Auth Required)

### POST /api/booking
Submit a public booking request.

**Auth:** None

**Request Body:**
```json
{
  "client_name": "string (required)",
  "phone": "string (required)",
  "service": "string (required)",
  "preferred_date": "string (optional)",
  "notes": "string (optional)"
}
```

**Response 200 (success):**
```json
{ "ok": true, "method": "database", "id": "booking-uuid" }
```

**Response 200 (fallback - DB unavailable):**
```json
{
  "ok": false,
  "error": "base_de_datos_no_disponible",
  "fallback_url": "https://wa.me/5959XXXXXXXX?text=...",
  "message": "No se pudo guardar la reserva. Podés reservar directo por WhatsApp."
}
```

**Errors:** `400` (missing required fields)

---

### GET /api/instagram
Fetch recent Instagram posts via Instagram Graph API.

**Auth:** None

**Query Params:** None

**Response 200:**
```json
{
  "posts": [
    {
      "id": "string",
      "type": "IMAGE|VIDEO",
      "url": "string",
      "caption": "string (max 80 chars)",
      "likes": number,
      "permalink": "string",
      "timestamp": "ISO8601"
    }
  ],
  "fallback": false
}
```

**Response 200 (no token configured):**
```json
{ "posts": null, "fallback": true }
```

**Caching:** Revalidates every 3600 seconds.

---

### POST /api/contact
Submit a contact form entry.

**Auth:** None

**Request Body:**
```json
{
  "email": "string (required)",
  "name": "string (required)",
  "message": "string (optional)",
  "source": "string (optional, default: 'exit-popup')"
}
```

**Response 200:**
```json
{ "ok": true }
```

**Errors:** `400` (invalid JSON, missing email/name, invalid email format)

---

### POST /api/subscribe
Add email to newsletter subscriber list.

**Auth:** None

**Request Body:**
```json
{
  "email": "string (required)",
  "name": "string (optional)",
  "lang": "string (optional, default: 'es')"
}
```

**Response 200:**
```json
{ "success": true }
```

**Errors:** `400` (invalid JSON, missing email, invalid email format)

---

### POST /api/promo/claim
Claim a promotional offer. Creates client if not exists.

**Auth:** None (rate-limited by phone)

**Request Body:**
```json
{
  "phone": "string (required)",
  "promo_slug": "string (required)"
}
```

**Response 200:**
```json
{ "ok": true, "claimed": true }
```

**Errors:**
- `400` (missing phone or promo_slug)
- `409` (already claimed): `{ "error": "Ya reclamaste esta promoción", "already_claimed": true }`
- `503` (database not configured)

---

### POST /api/referral
Record a "Traé una amiga" referral and award loyalty points.

**Auth:** None

**Request Body:**
```json
{
  "referrer_phone": "string (required)",
  "referred_phone": "string (required)"
}
```

**Response 200:**
```json
{
  "ok": true,
  "referrer_bonus": 25,
  "referred_bonus": 10
}
```

**Errors:**
- `400` (missing fields, self-referral)
- `404` (referrer or referred not found)
- `409` (already referred)
- `503` (database not configured)

**Side Effects:**
- Inserts `client_promo_claims` record
- Awards 25 points to referrer
- Awards 10 points to referred

---

### GET /api/products
Get all products with stock > 0.

**Auth:** None (uses `SUPABASE_SERVICE_ROLE_KEY`)

**Query Params:**
- `category` (optional): filter by category

**Response 200:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": number,
    "category": "string",
    "image_url": "string",
    "stock": number,
    "created_at": "ISO8601"
  }
]
```

**Errors:** `500` (Supabase error)

---

### GET /api/cart
Get cart items for a customer.

**Auth:** Requires `x-customer-id` header

**Headers:** `x-customer-id: string`

**Response 200:**
```json
[
  {
    "id": "string",
    "customer_id": "string",
    "product_id": "string",
    "quantity": number,
    "products": { ... }
  }
]
```

**Errors:**
- `401` (missing customer ID)
- `503` (database not configured)
- `500` (Supabase error)

---

### POST /api/cart
Add or update cart item.

**Auth:** Requires `x-customer-id` header

**Headers:** `x-customer-id: string`

**Request Body:**
```json
{
  "product_id": "string (required)",
  "quantity": "number (required)"
}
```

**Response 201:**
```json
{ "id": "...", "customer_id": "...", "product_id": "...", "quantity": ... }
```

**Errors:** `400` (invalid body), `401` (missing customer ID), `503`, `500`

---

### DELETE /api/cart
Remove item from cart.

**Auth:** Requires `x-customer-id` header

**Query Params:**
- `product_id` (required): product to remove

**Response 200:**
```json
{ "success": true }
```

**Errors:** `400` (missing customer ID or product_id), `503`, `500`

---

### GET /api/gift-card
Check Stripe checkout session payment status.

**Auth:** None

**Query Params:**
- `session_id` (required): Stripe checkout session ID

**Response 200:**
```json
{
  "paid": true,
  "amount": number,
  "customer_email": "string|null"
}
```

**Errors:**
- `400` (missing session_id)
- `503` (Stripe not configured)
- `500` (Stripe error)

---

### POST /api/gift-card
Create a gift card Stripe checkout session.

**Auth:** None

**Request Body:**
```json
{
  "amount": "number (required, 50000-500000 in PYG, multiples of 10000)",
  "card_name": "string (optional)",
  "buyer_phone": "string (optional)",
  "recipient_phone": "string (optional)",
  "recipient_name": "string (optional)",
  "message": "string (optional)"
}
```

**Response 200:**
```json
{ "url": "https://checkout.stripe.com/..." }
```

**Response 200 (Stripe not configured → WhatsApp fallback):**
```json
{
  "waFallback": true,
  "url": "https://wa.me/5959XXXXXXXX?text=..."
}
```

**Errors:** `400` (invalid amount range or format)

---

### GET /api/gift-card/[token]
Get gift card details by token or code.

**Auth:** None (but likely used within authenticated client flow)

**Path Params:**
- `token`: gift card token or code

**Response 200:**
```json
{
  "code": "MAGNOLIA-XXXX-XXXX",
  "amount_gs": number,
  "balance_gs": number,
  "buyer_name": "string|null",
  "recipient_name": "string|null",
  "message": "string|null",
  "design": "string|null",
  "status": "active|partial|redeemed|cancelled|expired",
  "expires_at": "ISO8601|null"
}
```

**Errors:** `404` (not found), `503` (database not configured)

---

### POST /api/gift-card/redeem
Redeem value from a gift card (admin use).

**Auth:** None (should be admin-protected in production)

**Request Body:**
```json
{
  "code": "string (required)",
  "amount_gs": "number (required)",
  "service": "string (optional)",
  "redeemed_by": "string (required)"
}
```

**Response 200:**
```json
{
  "code": "MAGNOLIA-XXXX-XXXX",
  "redeemed": 50000,
  "balance_gs": 0,
  "status": "redeemed"
}
```

**Errors:**
- `400` (missing fields, invalid amount, insufficient balance, invalid card status)
- `404` (card not found)
- `503` (database not configured)

---

### POST /api/gift-card/checkout
Alternative gift card checkout (legacy/duplicate).

**Auth:** None

**Request Body:**
```json
{
  "amount": "number (required, min 10000)",
  "recipientName": "string (required)",
  "recipientEmail": "string (required)"
}
```

**Response 200:**
```json
{ "url": "https://checkout.stripe.com/..." }
```

**Errors:** `400` (amount too low, missing fields), `500` (Stripe error)

---

### POST /api/gift-card/webhook
Stripe webhook handler for gift card checkout completion.

**Auth:** Stripe signature verification via `stripe-signature` header

**Headers:**
- `stripe-signature: string` (required)

**Handles:**
- `checkout.session.completed` → creates gift card record in Supabase

**Response 200:**
```json
{ "received": true }
```
or
```json
{ "received": true, "created": true }
```
or
```json
{ "received": true, "duplicate": true }
```

**Errors:**
- `400` (missing signature, invalid signature)
- `500` (Stripe not configured)

---

### POST /api/stripe/checkout
Create Stripe checkout session for gift card purchase.

**Auth:** None

**Request Body:**
```json
{
  "amount": "number (required, min 10000)",
  "denomination": "string (required)",
  "recipientName": "string (optional)",
  "recipientEmail": "string (optional)",
  "senderName": "string (optional)",
  "message": "string (optional)",
  "buyerPhone": "string (optional)",
  "recipientPhone": "string (optional)",
  "lang": "string (optional, default: 'es')"
}
```

**Response 200:**
```json
{ "url": "https://checkout.stripe.com/..." }
```

**Errors:** `400` (invalid amount/denomination), `503` (Stripe not configured), `500`

---

### GET /api/stripe/verify
Verify Stripe checkout session payment and create gift card.

**Auth:** None

**Query Params:**
- `session_id` (required): Stripe session ID

**Flow:**
1. Retrieves Stripe checkout session
2. If `payment_status === "paid"` and code exists, ensures gift card created in DB
3. Returns session details

**Response 200:**
```json
{
  "paid": true,
  "amount": number,
  "denomination": "string",
  "recipientName": "string",
  "recipientEmail": "string",
  "senderName": "string",
  "message": "string",
  "code": "MAGNOLIA-XXXX-XXXX|null"
}
```

**Errors:** `400` (missing session_id), `503`, `500`

---

### POST /api/stripe/webhook
Stripe webhook handler for gift card payments with email delivery.

**Auth:** Stripe signature verification

**Handles:**
- `checkout.session.completed` → creates gift card, sends email
- `payment_intent.payment_failed` → logs error

**Response 200:**
```json
{ "received": true }
```

**Email:** Sends HTML gift card email to recipient if `recipientEmail` available (demo mode logs to console if Resend not configured).

---

## Auth Endpoints

### POST /api/auth/login
Admin login with email/password via Supabase Auth.

**Auth:** None (creates session)

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response 200:**
```json
{ "ok": true, "email": "admin@example.com" }
```
Sets `admin_session` cookie (7-day TTL).

**Errors:** `400` (missing fields), `401` (invalid credentials), `503` (Supabase not configured)

---

### POST /api/auth/logout
Clear all auth cookies (admin and client).

**Auth:** None

**Response:** Redirects to `/admin/login`

Clears:
- `admin_session` cookie (maxAge: 0)
- `tu-emprendimiento_client_session` cookie (maxAge: 0)

---

### GET /api/auth/me
Check current client authentication status.

**Auth:** None (checks client session cookie)

**Response 200 (authenticated):**
```json
{ "authenticated": true, "phone": "5959XXXXXXXX" }
```

**Response 401 (not authenticated):**
```json
{ "authenticated": false }
```

---

### GET /api/auth/check
Check current admin authentication status.

**Auth:** None (checks admin session cookie)

**Response 200 (authenticated):**
```json
{ "ok": true, "authenticated": true }
```

**Response 401 (not authenticated):**
```json
{ "ok": true, "authenticated": false }
```

---

### POST /api/auth/otp/send
Send WhatsApp OTP for client login.

**Auth:** None

**Request Body:**
```json
{ "phone": "string (required, min 8 digits)" }
```

**Response 200:**
```json
{
  "ok": true,
  "waUrl": "https://wa.me/5959XXXXXXXX?text=Tu%20c%C3%B3digo%20de%20verificaci%C3%B3n%20SITE_NAME%20es%3A%20XXXXXX.%20V%C3%A1lido%20por%2010%20minutos.",
  "phone": "5959XXXXXXXX"
}
```

**Rate Limit:** 3 OTP requests per 5 minutes per phone number.

**Errors:**
- `400` (invalid phone format)
- `429` (rate limited): `{ "error": "Demasiados intentos. Esperá 5 minutos." }`
- `503` (database not configured)

---

### POST /api/auth/otp/verify
Verify client OTP and establish session.

**Auth:** None

**Request Body:**
```json
{
  "phone": "string (required)",
  "code": "string (required, 6 digits)"
}
```

**Response 200:**
```json
{ "ok": true, "phone": "5959XXXXXXXX" }
```
Sets `tu-emprendimiento_client_session` cookie (30-day TTL).

**Errors:**
- `400` (missing fields)
- `401` (invalid or expired code)
- `503` (database not configured)

---

### POST /api/auth/admin/send-otp
Send OTP for admin login (via WhatsApp).

**Auth:** None

**Request Body:**
```json
{ "phone": "string (required)" }
```

**Response 200:**
```json
{ "success": true }
```

**Rate Limit:** 5 OTPs per 10 minutes per phone.

**Errors:** `400` (invalid phone), `429` (rate limited), `500` (send failed)

---

### POST /api/auth/admin/verify-otp
Verify admin OTP and establish admin session.

**Auth:** None

**Request Body:**
```json
{
  "phone": "string (required)",
  "otp": "string (required)"
}
```

**Response 200:**
```json
{ "success": true }
```
Sets `admin_session` cookie (30-day TTL).

**Errors:** `400` (missing fields, invalid OTP), `500`

---

## Client Endpoints (Client Auth Required)

### GET /api/client/[phone]
Get client profile with visit history, gift cards, and loyalty points.

**Auth:** Requires valid `tu-emprendimiento_client_session` cookie

**Path Params:**
- `phone`: Client phone number

**Response 200:**
```json
{
  "id": "uuid",
  "phone": "5959XXXXXXXX",
  "name": "string|null",
  "email": "string|null",
  "tier": "string|null",
  "visits": number,
  "created_at": "ISO8601",
  "total_points": number,
  "recent_visits": [
    {
      "id": "uuid",
      "services": "string|null",
      "total_gs": number,
      "paid_via": "string|null",
      "created_at": "ISO8601"
    }
  ],
  "gift_cards": [
    {
      "code": "MAGNOLIA-XXXX-XXXX",
      "amount_gs": number,
      "balance_gs": number,
      "status": "string",
      "expires_at": "ISO8601|null",
      "created_at": "ISO8601"
    }
  ],
  "loyalty_history": [
    {
      "points": number,
      "reason": "string",
      "created_at": "ISO8601"
    }
  ]
}
```

**Errors:** `404` (client not found), `503` (database not configured)

---

## Admin Endpoints (Admin Auth Required)

All admin endpoints require valid `admin_session` cookie verified via `requireAdminAuth()`.

### GET /api/admin/bookings
List all bookings.

**Auth:** requireAdminAuth

**Response 200:**
```json
{
  "bookings": [
    {
      "id": "uuid",
      "client_name": "string",
      "phone": "string",
      "service": "string",
      "preferred_date": "string|null",
      "notes": "string|null",
      "status": "pending|confirmed|cancelled|completed",
      "source": "string",
      "created_at": "ISO8601"
    }
  ]
}
```

**Errors:** `500`

---

### PATCH /api/admin/bookings
Update booking status by ID query param.

**Auth:** requireAdminAuth

**Query Params:**
- `id` (required): booking UUID

**Request Body:**
```json
{ "status": "pending|confirmed|cancelled|completed" }
```

**Response 200:**
```json
{ "booking": { "id": "...", "status": "confirmed" } }
```

**Errors:** `400` (missing id or invalid status), `404` (not found), `500`

---

### DELETE /api/admin/bookings
Delete a booking by ID query param.

**Auth:** requireAdminAuth

**Query Params:**
- `id` (required): booking UUID

**Response 200:**
```json
{ "ok": true }
```

**Errors:** `400` (missing id), `404` (not found), `500`

---

### PATCH /api/admin/bookings/[id]
Update booking status by path ID.

**Auth:** requireAdminAuth

**Path Params:**
- `id`: booking UUID

**Request Body:**
```json
{ "status": "pending|confirmed|cancelled|completed" }
```

**Response 200:**
```json
{ "booking": { "id": "...", "status": "confirmed" } }
```

**Errors:** `400` (missing status or invalid status), `404` (not found), `500`

---

### GET /api/admin/content
Get site content sections.

**Auth:** requireAdminAuth

**Query Params:**
- `site` (optional, default: "default"): site identifier

**Response 200:**
```json
{
  "sections": { ... },
  "siteId": "default"
}
```

**Errors:** `500`

---

### PUT /api/admin/content
Update entire site content.

**Auth:** requireAdminAuth

**Request Body:**
```json
{
  "siteId": "string (optional, default: 'default')",
  "content": "object (required)"
}
```

**Response 200:**
```json
{
  "section": {
    "key": "default",
    "content": { ... },
    "lastUpdated": "ISO8601"
  }
}
```

**Errors:** `400` (missing content), `500`

---

### PUT /api/admin/content/[key]
Update a specific content section by key.

**Auth:** requireAdminAuth

**Path Params:**
- `key`: content section key

**Request Body:**
```json
{ "content": "object (required)" }
```

**Response 200:**
```json
{
  "section": {
    "key": "hero",
    "content": { ... },
    "lastUpdated": "ISO8601"
  }
}
```

**Errors:** `400` (missing content), `500`

---

### GET /api/admin/gift-cards
List all gift cards.

**Auth:** requireAdminAuth

**Response 200:**
```json
{
  "cards": [
    {
      "id": "uuid",
      "code": "MAGNOLIA-XXXX-XXXX",
      "token": "uuid",
      "amount_gs": number,
      "balance_gs": number,
      "buyer_name": "string|null",
      "recipient_name": "string|null",
      "recipient_phone": "string|null",
      "purchaser_phone": "string|null",
      "status": "active|partial|redeemed|cancelled|expired",
      "valid_until": "ISO8601|null",
      "created_at": "ISO8601"
    }
  ]
}
```

**Errors:** `500`

---

### POST /api/admin/gift-cards
Create a new gift card manually.

**Auth:** requireAdminAuth

**Request Body:**
```json
{
  "amount": "number (required, min 10000)",
  "recipientName": "string (optional)",
  "recipientEmail": "string (optional)",
  "recipientPhone": "string (optional)",
  "purchaserPhone": "string (optional)",
  "validMonths": "number (optional, default: 6)"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "code": "MAGNOLIA-XXXX-XXXX",
  "token": "uuid",
  "denomination": number,
  "balance": number,
  "recipient_name": "string|null",
  "recipient_phone": "string|null",
  "purchaser_phone": "string|null",
  "status": "active",
  "valid_until": "ISO8601"
}
```

**Errors:** `400` (amount below minimum), `500`

---

### PATCH /api/admin/gift-cards
Update gift card balance (add funds).

**Auth:** requireAdminAuth

**Request Body:**
```json
{
  "token": "string (required)",
  "amount": "number (required)"
}
```

**Response 200:**
```json
{ "ok": true }
```

**Errors:** `400` (missing fields), `404` (card not found), `500`

---

### GET /api/admin/gift-cards/[id]
Get gift card details with transaction history.

**Auth:** requireAdminAuth

**Path Params:**
- `id`: gift card UUID

**Response 200:**
```json
{
  "id": "uuid",
  "code": "MAGNOLIA-XXXX-XXXX",
  "amount_gs": number,
  "balance_gs": number,
  "status": "string",
  "transactions": [
    {
      "id": "uuid",
      "type": "issue|redeem|cancel|expire",
      "amount": number,
      "balance_after": number,
      "notes": "string|null",
      "redeemed_by": "string|null",
      "created_at": "ISO8601"
    }
  ]
}
```

**Errors:** `404` (card not found)

---

### PATCH /api/admin/gift-cards/[id]
Update gift card status.

**Auth:** requireAdminAuth

**Path Params:**
- `id`: gift card UUID

**Request Body:**
```json
{ "status": "active|redeemed|cancelled|expired" }
```

**Response 200:**
```json
{ "success": true }
```

**Side Effects:** Creates `gift_card_transactions` record with tx type based on status change.

**Errors:** `400` (invalid status), `404` (card not found), `500`

---

### POST /api/admin/gift-cards/[id]/redeem
Redeem amount from gift card.

**Auth:** requireAdminAuth

**Path Params:**
- `id`: gift card UUID

**Request Body:**
```json
{
  "amount": "number (required, must be positive)",
  "notes": "string (optional)",
  "redeemedBy": "string (optional)"
}
```

**Response 200:**
```json
{
  "success": true,
  "balance": number,
  "status": "active|redeemed"
}
```

**Errors:**
- `400` (amount must be positive, card not active, amount exceeds balance)
- `404` (card not found)
- `500`

---

### GET /api/admin/products
List all products from JSON file.

**Auth:** requireAdminAuth

**Response 200:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": number,
    "category": "string",
    "items": [...]
  }
]
```

**Errors:** `500`

---

### GET /api/admin/promotions
List all promotions.

**Auth:** requireAdminAuth

**Response 200:**
```json
{
  "promotions": [
    {
      "id": "uuid",
      "title": "string",
      "subtitle": "string|null",
      "badge": "string|null",
      "description": "string|null",
      "wa_message": "string|null",
      "color": "string",
      "expires_at": "ISO8601|null",
      "is_active": true,
      "sort_order": number
    }
  ]
}
```

**Errors:** `500`

---

### POST /api/admin/promotions
Create a new promotion.

**Auth:** requireAdminAuth

**Request Body:**
```json
{
  "title": "string (required)",
  "subtitle": "string (optional)",
  "badge": "string (optional)",
  "description": "string (optional)",
  "wa_message": "string (optional)",
  "color": "string (optional, default: 'secondary')",
  "expires_at": "ISO8601 (optional)",
  "is_active": "boolean (optional, default: true)",
  "sort_order": "number (optional, default: 0)"
}
```

**Response 201:** Full promotion object

**Errors:** `400` (missing title), `500`

---

### PATCH /api/admin/promotions
Update an existing promotion.

**Auth:** requireAdminAuth

**Request Body:**
```json
{
  "id": "string (required)",
  ...other fields to update
}
```

**Response 200:** Updated promotion object

**Errors:** `400` (missing id), `404` (not found), `500`

---

### DELETE /api/admin/promotions
Delete a promotion.

**Auth:** requireAdminAuth

**Query Params:**
- `id` (required): promotion UUID

**Response 200:**
```json
{ "ok": true }
```

**Errors:** `400` (missing id), `404` (not found), `500`

---

### GET /api/admin/stats
Get dashboard statistics.

**Auth:** requireAdminAuth

**Response 200:**
```json
{
  "revenue": "string (formatted with locale, e.g., '1,500,000')",
  "bookings": number,
  "productsSold": number,
  "activeUsers": number
}
```

**Data Sources:**
- `revenue`: Sum of `gift_card_transactions` with type `issue` in last 30 days (from Supabase) or sum of all gift card amounts (fallback)
- `bookings`: Total booking count
- `productsSold`: Gift cards with status `active`
- `activeUsers`: Unique clients with confirmed bookings in last 30 days

**Errors:** `500`

---

## Database Configuration

All endpoints that interact with Supabase check `isSupabaseConfigured` first:

```typescript
if (!isSupabaseConfigured || !supabaseAdmin) {
  return NextResponse.json({ error: "db_not_configured" }, { status: 503 })
}
```

This allows graceful degradation when Supabase is not configured.

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Auth
CLIENT_AUTH_SECRET=a-random-secret-at-least-24-chars
ADMIN_AUTH_SECRET=another-random-secret-at-least-24-chars

# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# Instagram
INSTAGRAM_ACCESS_TOKEN=IGQVJ...

# Site
NEXT_PUBLIC_BASE_URL=https://tu-emprendimiento.com
NEXT_PUBLIC_SITE_URL=https://tu-emprendimiento.com
```