# Architecture Documentation

## Overview

Universal Next.js 16 site template for Paraguayan SMBs. Supports:
- Content-driven sites (all data from JSON files)
- i18n (Spanish/English)
- E-commerce, booking, gift cards, loyalty
- WhatsApp OTP authentication
- Supabase backend with JSON file fallback

## Directory Structure

```
site-template/
├── app/                    # Next.js App Router pages
│   ├── [lang]/            # i18n pages (es/, en/)
│   ├── admin/             # Admin dashboard UI
│   ├── api/               # API routes (36 endpoints)
│   ├── c/[token]/         # Gift card viewer by token
├── components/            # React components (50+ components)
│   ├── admin/             # Admin-specific components (3)
├── content/               # Content JSON files (i18n)
│   ├── es/                # Spanish content (20+ files)
│   ├── en/                # English content
│   └── _shared/           # Shared content (team)
├── lib/                   # Core library code
│   ├── admin-auth.ts      # Admin JWT auth (signToken, verifyToken)
│   ├── admin-auth-guard.ts # Admin route protection middleware
│   ├── client-auth.ts     # Client session management (HMAC)
│   ├── config.ts          # Content exports (re-exports JSON)
│   ├── data-store.ts      # Universal data layer (Supabase + JSON)
│   ├── otp-service.ts     # WhatsApp OTP sending
│   └── supabase.ts        # Supabase client setup
├── data/                  # JSON file storage (fallback when no DB)
├── docs/                  # This documentation
├── public/                # Static assets
├── supabase/              # Database migrations
└── tests/                 # Test files (38 test suites)
```

## Data Flow

### Universal Data Layer

```
Request → API Route → lib/data-store.ts →
    ├── Supabase (if configured)
    └── JSON files (fallback)
```

Site works WITHOUT Supabase. All data operations fall back to JSON files.

### Request Lifecycle

1. **Public API** (no auth): Request → Route Handler → Data Store → Response
2. **Client API** (WhatsApp OTP session): Request → Cookie check → verifySessionToken() → Route Handler → Response
3. **Admin API** (JWT cookie): Request → requireAdminAuth() → verifyToken() → Route Handler → Response

## Authentication Architecture

### Admin Auth (JWT)

Files: lib/admin-auth.ts, lib/admin-auth-guard.ts

Uses JWT (jose library) with HS256. Token stored in admin_session cookie (HttpOnly, 30-day TTL). Secret: ADMIN_AUTH_SECRET or ADMIN_JWT_SECRET env var. Guard function requireAdminAuth() protects all /api/admin/* routes.

### Client Auth (HMAC Session)

File: lib/client-auth.ts

Uses HMAC-SHA256 signatures. Token stored in tu-emprendimiento_client_session cookie (HttpOnly, 30-day TTL). Session = exp.nonce.phone.signature. Secret: CLIENT_AUTH_SECRET or ADMIN_AUTH_SECRET env var.

### OTP Flow (WhatsApp)

Files: lib/otp-service.ts, app/api/auth/otp/send/, app/api/auth/otp/verify/

1. Client requests OTP via POST /api/auth/otp/send with phone
2. OTP sent via WhatsApp
3. Client submits OTP via POST /api/auth/otp/verify
4. On success: create session token, set cookie

## Content System

All content stored in content/:
- content/es/ - Spanish content (hero, services, testimonials, etc.)
- content/en/ - English content
- content/_shared/ - Shared content (team.json)

Feature flags controlled via content/es/site.json → features object.

## API Routes Summary

| Category | Path Pattern | Auth | Count |
|----------|-------------|------|-------|
| Admin APIs | /api/admin/* | Admin JWT | 12 |
| Auth APIs | /api/auth/* | None | 8 |
| Client APIs | /api/client/* | Client Session | 1 |
| Public APIs | /api/* (excl. above) | None | 14 |

See docs/API_DOC.md for full endpoint documentation.

## Key Libraries

### Supabase (lib/supabase.ts)
- supabaseAdmin - Admin client (service role)
- isSupabaseConfigured - Boolean flag

### Stripe
Gift card purchases create Stripe Checkout sessions. Webhooks at /api/gift-card/webhook and /api/stripe/webhook.

### Data Store (528 lines - TOO LARGE)
File: lib/data-store.ts handles bookings, promotions, subscribers, contacts, content, gift-cards CRUD. Should be split into domain stores.

## Environment Variables

Required: CLIENT_AUTH_SECRET or ADMIN_AUTH_SECRET (24+ chars)

Optional: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_SITE_URL, DATA_DIR

## Conventions

1. All amounts in PYG (Guaraníes), integer, no decimals
2. All UI labels in Spanish by default (Paraguay context)
3. Client identity = phone number (no email/password for clients)
4. Gift card access via UUID token (/c/[token])
5. Root app/layout.tsx owns <html>/<body> — nested layouts are plain wrappers

## Tech Stack

- Next.js 16 (App Router, standalone output, Docker)
- React 19
- Tailwind CSS v4 (@theme directive, NO tailwind.config.ts)
- TypeScript 5
- Supabase (Postgres, Auth, optional)
- Stripe (payments, optional)

## Known Issues

1. data-store.ts too large (528 lines) - needs domain split
2. No middleware.ts - Auth is per-route, not centralized
3. No centralized types - Each API defines its own types inline
4. Duplicate gift-card routes - /api/gift-card/* and /api/stripe/*

See docs/DEAD_CODE_AUDIT.md for full audit.
