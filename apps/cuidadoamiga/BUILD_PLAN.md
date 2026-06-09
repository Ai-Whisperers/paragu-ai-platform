# Cuidado Amiga — Build Plan

> Phased 30-40h scope for the v2 rebuild of Cuidado Amiga, hosted in the
> Paragu-AI monorepo. Inherits the platform's design system, content
> layer, i18n, and shared primitives. Cuidado Amiga is the platform's
> first non-commercial, advocacy-focused demo.

## Direction

**Monorepo integration.** Cuidado Amiga lives at
`/root/paragu-ai-platform/apps/cuidadoamiga/` and consumes the workspace
packages directly (`@ai-whisperers/ui`, `@ai-whisperers/ui-extras`,
`@ai-whisperers/content`, etc.). The legacy standalone repo
`Ai-Whisperers/cuidadoamiga-fork` is preserved as the v1 demo — not
deleted, not auto-synced.

## Phases

### Phase 0 — Scaffold (this turn) ✅

- [x] Directory structure mirroring `apps/template-nextjs-client`
- [x] `package.json` scoped to the `@ai-whisperers/*` packages cuidadoamiga needs (no e-commerce, payments, catalog, etc.)
- [x] `tsconfig.json` strict mode
- [x] `app/globals.css` — full design token set
- [x] `supabase/schema.sql` — consolidated, role-based RLS, atomic vote tally
- [x] `lib/content.ts` — single read-side API for the Lang-Driven JSON contract
- [x] `content/es/site.json` — full Spanish content
- [x] `content/_shared/{countries-latam,recursos-latam}.json` — reusable LATAM data
- [x] `lib/validation/case.ts` + `solicitud.ts` — Zod schemas
- [x] `lib/sanitize.ts` — shared helpers
- [x] `lib/supabase/{browser,server,service,index}.ts` — proper client/server boundary
- [x] Primitives: `Button`, `Card`, `Badge`, `Field` (TextField/TextAreaField/SelectField)
- [x] `Navbar`, `Footer` (Lang-Driven JSON)
- [x] `CaseMap` (Leaflet) + `CaseMapWrapper` (server fetch)
- [x] `ReportarForm`, `UnirseForm`, `LoginForm` (Lang-Driven JSON)
- [x] Pages: `/`, `/recursos`, `/como-funciona`, `/protocolo`, `/unirse`, `/reportar`, `/casos/[id]`, `/admin`, `/admin/login`
- [x] API routes: `POST /api/cases`, `POST /api/solicitud`, `POST /api/auth/lookup`
- [x] `middleware.ts` — auth gate + rate limit
- [x] Vitest + 11 schema tests
- [x] `.env.example`, `README.md`, `eslint.config.mjs`
- [x] `next.config.ts` — security headers + Content-Security-Policy
- [x] `BUILD_PLAN.md` (this file)

### Phase 1 — Full admin moderation panel (next turn)

- [ ] `/es/admin` full panel — 6 tabs (validar, pendiente, aprobado, rechazado, solicitudes, crear)
- [ ] `<Modal>` primitive (focus-trap, ESC-closable) for the edit dialog
- [ ] `<EmptyState>`, `<Skeleton>` primitives
- [ ] `useToast()` + `useAuth()` hooks
- [ ] `OWNER_EMAILS` env var (CSV) replaces hardcoded `sofiajuredare@gmail.com`
- [ ] Marker clustering on the map (`react-leaflet-cluster`)
- [ ] `next/image` for case photos
- [ ] Accessibility pass: focus traps, aria-modal, color contrast check

### Phase 2 — i18n + Lang-Driven JSON completion

- [ ] Add `content/pt/site.json` (Brazilian Portuguese) — full parity
- [ ] Add `content/en/site.json` (English) — full parity
- [ ] `LanguageSwitcher` component
- [ ] Per-page metadata translations
- [ ] Validate the contract: zero literal strings in `app/[lang]/**` that aren't from content

### Phase 3 — Tests + CI

- [ ] Unit tests for `lib/content.ts` accessors
- [ ] Unit tests for the vote-tallying logic
- [ ] Integration tests for API routes (against a test Supabase via `supabase start`)
- [ ] Playwright E2E:
  - [ ] Public case submission (full flow)
  - [ ] Moderator login → vote on case
  - [ ] Case appears on map after 3 approvals
  - [ ] Admin edit + save
- [ ] `axe-core` in Playwright — a11y gate
- [ ] GitHub Actions CI: lint, typecheck, unit, integration, e2e, build
- [ ] Bundle budget with `bundlewatch`

### Phase 4 — Polish + ship

- [ ] `sitemap.ts`, `robots.ts`
- [ ] Real `favicon.ico` + `og:image`
- [ ] `react-email` migration for transactional mail
- [ ] Move rate limit to Upstash KV (multi-instance)
- [ ] Sentry error tracking
- [ ] Vercel Analytics with consent
- [ ] Final security audit (`npm audit` + manual RLS review)
- [ ] Deploy to Vercel with custom domain

## Out of scope (separate workstreams)

- Public-data ingestion pipeline (the LATAM-data audit from the earlier review). Tracked in the `/root/cuidadoamiga/data/` directory if/when started.
- WhatsApp submission bot. Phase 2+ feature.
- Court records integration. Phase 3+ feature.
- Multi-language moderation. Defer until PT launch.

## Decisions log

- **2026-06-08** — Direction A. Monorepo. Cuidado Amiga at `/root/paragu-ai-platform/apps/cuidadoamiga/`.
- **2026-06-08** — Cuidado Amiga is the platform's first non-commercial demo. Position it as such in the README.
- **2026-06-08** — Lang-Driven JSON is non-negotiable. Components are read-only consumers of `lib/content.ts`. Future locales (en, pt) are pure content work.
- **2026-06-08** — `content/_shared/` is the right place for the LATAM hotline data. Future advocacy projects can consume it directly.
- **2026-06-08** — `/api/cases` uses anon key + RLS. The public-submission RLS policy is the security boundary. No more service-role in user-facing routes.
- **2026-06-08** — The standalone fork at `Ai-Whisperers/cuidadoamiga-fork` is kept as v1 history. No sync between repos — they're snapshots of the project at different stages.
