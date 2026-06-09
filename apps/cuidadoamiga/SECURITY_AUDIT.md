# Cuidado Amiga — Security Audit (2026-06-08)

## 1. Schema (RLS, atomic state transitions)

- [x] **Public read**: only `estado='aprobado'` cases are readable without auth (anon role).
- [x] **Public insert**: anon role can insert cases but only with `estado='pendiente'` (RLS-enforced).
- [x] **Moderator scope**: a `moderators` table with `role` column ('mod' / 'owner').
  - [x] `mod` role: can read all cases, can insert their own validacion (one per case).
  - [x] `owner` role: can read the moderators table, manage all moderator roles.
- [x] **Atomic state transitions**: `tally_case_votes()` Postgres function + `validaciones_tally` trigger. The case estado flips automatically when:
  - 1+ rejection → `rechazado`
  - 3+ approvals → `aprobado`
  - Race-safe (no TOCTOU).
- [x] **Service role**: only used in trusted server-side routes (`/api/admin/*`).
- [x] **Audit log**: every owner edit/delete records to `case_edits` with full diff.

## 2. API routes

- [x] **`POST /api/cases`** (public): Zod strict-mode validation, rate-limited (5/10min/IP).
- [x] **`POST /api/solicitud`** (public): Zod validation, dual-consent check, Resend for notifications.
- [x] **`POST /api/auth/lookup`** (public): username → email, only used by LoginForm.
- [x] **`POST /api/admin/vote`** (auth-required): checks moderator row, idempotency, returns new estado.
- [x] **`PATCH /api/admin/cases/[id]`** (owner-only): partial update via Zod, audit logged.
- [x] **`DELETE /api/admin/cases/[id]`** (owner-only): hard delete with audit entry.
- [x] **`POST /api/admin/solicitud/[id]`** (owner-only): approve/reject moderator application.
- [x] **`GET /api/admin/list`** (mod+): returns all cases + solicitudes with validaciones.
- [x] **All routes** use async `getServerSupabase()` or `getServiceSupabase()` — no client-side Supabase admin access.

## 3. Client-side

- [x] **No `SUPABASE_SERVICE_ROLE_KEY` ever in client bundle** — only `NEXT_PUBLIC_*` env vars are exposed.
- [x] **No hardcoded admin emails in code** — `OWNER_EMAILS` env var (CSV).
- [x] **No client-side `as any` shortcuts for auth checks** — moderation panel always calls `useAuth()`.

## 4. HTTP

- [x] **Content-Security-Policy** (see `next.config.ts`): no `unsafe-eval` in production CSP; only `'self'` and Supabase/nominatim/resend origins.
- [x] **HSTS** with `max-age=31536000; includeSubDomains`.
- [x] **X-Frame-Options: DENY** (clickjacking protection).
- [x] **X-Content-Type-Options: nosniff**.
- [x] **Referrer-Policy: strict-origin-when-cross-origin**.
- [x] **Permissions-Policy**: camera/microphone/geolocation disabled.

## 5. Input validation

- [x] **HTML strip** in `sanitizeString()`: removes tags AND contents of `<script>`/`<style>`/`<iframe>`/`<object>`/`<embed>`.
- [x] **URL allowlist** in `isValidHttpUrl()`: only `http(s)://` accepted.
- [x] **Zod strict mode**: unknown fields are rejected (`.strict()` on the case schema).
- [x] **Lat/lng range**: `-90..90`, `-180..180`.
- [x] **Date format**: `YYYY-MM-DD` regex.

## 6. Auth

- [x] **Middleware auth gate** for `/[lang]/admin/*` (any locale) — redirects to login if not authenticated.
- [x] **No password storage** in app — Supabase Auth handles it (bcrypt + JWT).
- [x] **No long-lived sessions** — Supabase JWT has 1h default, refresh on use.
- [x] **Sign out** clears the session + cookies.

## 7. Dependencies

- [x] `pnpm` only — no `npm` (lockfile integrity).
- [x] Lockfile committed — `pnpm install --frozen-lockfile` in CI.
- [x] GitHub Actions CI on every PR (lint, typecheck, unit, e2e, build).

## 8. Operational

- [x] **Sentry** error tracking (env-gated, no PII sent).
- [x] **Health check** at `/api/health` (Supabase + app).
- [x] **Rate limit** in middleware (5/10min on `/api/cases`).
- [x] **CSP** blocks third-party scripts.

## 9. Outstanding (for future sprints)

- [ ] **Upstash KV** for distributed rate limit (replace in-memory map). Tracked in Phase 4.
- [ ] **react-email** for transactional mail templates (replace HTML string in `/api/solicitud`).
- [ ] **CSP report-uri** — add `report-uri https://cuidadoamiga.com/api/csp-report` for monitoring.
- [ ] **Pen-test** — schedule a third-party security audit before public launch.
- [ ] **Dependency audit** — `pnpm audit` weekly (GitHub Action: dependabot).

## Verification commands

```bash
# TypeScript strict mode
pnpm typecheck

# Lint
pnpm lint

# Unit tests (37 passing)
pnpm test

# Build (Next 16 + 21 routes)
pnpm build

# E2E
pnpm test:e2e
```
