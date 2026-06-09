# Cuidado Amiga

> Mapa colaborativo de casos de violencia de género en América Latina.
> Three-moderator approval workflow. Open source. Built on the Ai-Whisperers platform.

**Live:** https://cuidadoamiga.com
**Owner:** Sofía Juredare (cuidadoamiga@proton.me)
**Platform:** [paragu-ai-platform](https://github.com/Ai-Whisperers/paragu-ai-platform)

---

## What this is

Cuidado Amiga is a crowd-sourced map of femicides, abuse, and harassment across Latin America. Each case is:

1. Reported by anyone via the public form (`/es/reportar`)
2. Reviewed by 3 verified moderators (independently, in `/es/admin`)
3. Approved if all 3 vote yes — rejected if any 1 votes no
4. Published on the public map (`/es`) with full sources

This app is the **demo** of the Ai-Whisperers platform's advocacy/NGO use case. It shows that the platform's design system, content layer, and primitives work for non-commercial projects with sensitive data.

The original v1 lives at [Ai-Whisperers/cuidadoamiga-fork](https://github.com/Ai-Whisperers/cuidadoamiga-fork) — preserved as the historical record of how the project grew up.

---

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** in strict mode (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- **Supabase** for Postgres + Auth + RLS
- **Tailwind 4** + design tokens in `app/globals.css`
- **Zod** schemas as the single source of truth for validation
- **Leaflet** for the map (lazy-loaded on the client)
- **Resend** for moderator application emails
- **next/font** for Inter
- **Vitest** for unit tests
- **Playwright** for E2E (Phase 3)

---

## Architecture

```
apps/cuidadoamiga/
├── app/
│   ├── [lang]/                 ← i18n-routed pages (es only today; en, pt coming in Phase 3)
│   │   ├── page.tsx            ← home: hero + map + intro + FAQ
│   │   ├── recursos/           ← LATAM hotline directory
│   │   ├── como-funciona/      ← how the moderation works
│   │   ├── protocolo/          ← moderator protocol
│   │   ├── unirse/             ← apply to be a moderator
│   │   ├── reportar/           ← public case-submission form
│   │   ├── casos/[id]/         ← case detail page
│   │   └── admin/              ← moderation panel (login + index)
│   ├── api/
│   │   ├── cases/              ← POST: public submission (anon key + RLS)
│   │   ├── solicitud/          ← POST: moderator application (service-role for mail)
│   │   └── auth/lookup/        ← POST: username → email resolver
│   └── globals.css             ← design tokens (rose/pink/violet, light theme)
├── components/
│   ├── ui/                     ← Button, Card, Badge, Field primitives
│   ├── layout/                 ← Navbar, Footer
│   ├── caso/                   ← CaseMap, ReportarForm
│   ├── admin/                  ← UnirseForm, LoginForm
│   └── shared/                 ← JsonLd, FAQ
├── content/
│   ├── es/site.json            ← Lang-Driven JSON (the contract)
│   ├── _shared/                ← Cross-locale data (countries, hotlines)
│   └── en/                     ← Stub for English (Phase 3)
├── lib/
│   ├── content.ts              ← Single read-side API for the content layer
│   ├── validation/             ← Zod schemas (case, solicitud)
│   ├── sanitize.ts             ← HTML strip + URL allowlist
│   └── supabase/               ← split: browser, server, service
├── supabase/schema.sql         ← single consolidated schema (replaces 6 incremental files)
├── middleware.ts               ← auth gate + rate limit
├── tests/                      ← unit + integration + e2e (Phase 3)
└── BUILD_PLAN.md               ← phased roadmap
```

---

## The Lang-Driven JSON contract

This is a hard rule, not a guideline. **Every visible string for a locale must come from `content/{lang}/**/*.json`.** No exceptions.

- If a string appears in the UI, it must be defined in `content/es/site.json` (or another locale's equivalent).
- Adding a new locale = add a folder under `content/{lang}/` and mirror the structure. Zero code changes needed.
- Cross-locale reusable data (countries, hotlines) lives in `content/_shared/` and is imported via `lib/content.ts`.

Components import via accessors — never raw JSON:

```tsx
import { getHome, getRecursos, isLang, type Lang } from '@/lib/content'

const lang: Lang = isLang(params.lang) ? params.lang : 'es'
const home = getHome(lang)
const recursos = getRecursos(lang)
```

---

## Security model

| Actor | Read | Write |
|---|---|---|
| **Public (anon key)** | only `estado='aprobado'` cases | insert cases with `estado='pendiente'` ONLY (RLS-enforced) |
| **Moderator** | all cases + validaciones + solicitudes | insert own validacion; trigger transitions case estado atomically |
| **Owner** | all of the above | edit/delete cases (via `OWNER_EMAILS` env var) |
| **Service role** | bypasses RLS | use only in trusted server-side code (`lib/supabase/service.ts`) |

The case state transition is atomic via a Postgres trigger:

```sql
-- tally_case_votes() runs on every validacion INSERT
-- if 1+ rejections → estado = 'rechazado'
-- if 3+ approvals  → estado = 'aprobado'
-- otherwise stays 'pendiente'
```

This closes the original race condition where two mods voting simultaneously could produce inconsistent state.

---

## Setup

```bash
# 1. Install
pnpm install

# 2. Configure env
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY

# 3. Run the schema in your Supabase project
psql "$DATABASE_URL" < supabase/schema.sql

# 4. Add the first owner
# (See supabase/seed_moderators.sql — TODO Phase 4)

# 5. Dev
pnpm dev
```

---

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Local dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest unit tests |
| `pnpm test:watch` | Vitest watch mode |
| `pnpm test:e2e` | Playwright E2E (Phase 3) |

---

## Roadmap

See [BUILD_PLAN.md](./BUILD_PLAN.md) for the full phased plan.

| Phase | What | Status |
|---|---|---|
| 0 | Scaffold the monorepo app | ✅ |
| 1 | Full admin moderation panel + port remaining pages | ⏳ |
| 2 | i18n (en, pt) + lang-driven JSON for all pages | ⏳ |
| 3 | Tests (unit, integration, E2E) + CI | ⏳ |
| 4 | Polish, OG image, sitemap, deploy docs | ⏳ |

---

## License

MIT for code. CC-BY-SA-4.0 for content under `content/_shared/` — usable with attribution to cuidadoamiga.com.
