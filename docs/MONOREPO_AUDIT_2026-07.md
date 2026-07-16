# Monorepo-Wide Audit — 2026-07-16

Full-fleet inventory of paragu-ai-platform: 46 client apps, 20 `@ai-whisperers/*` packages,
shared infra, deploys, docs. Ranked by leverage; every finding actionable.

---

## 1 · Fleet Snapshot

- **46 client apps** under `apps/`. ~33 currently live on VPS (72.61.44.159 Docker Swarm).
- **20 packages** under `packages/@ai-whisperers/*` — 3 STUBS (analytics, hooks, loyalty),
  several with peerDep drift. (Earlier audit flagged an `i18n-paraguay` duplicate; that
  package does not exist in the workspace — only `@ai-whisperers/i18n` v0.2.0 ships.)
- **Framework state**: fleet is on **Next 16.2.4 / 16.2.6** with **React 18.3.1 or 19**.
  Stragglers: `nudo` (Next ^15.0.0), `depiflash` + `dayah-litworks` (^15.3.6).
- **CI**: `.github/workflows/central.yml` (330 lines) with hardcoded 35-app list — drift risk.
- **Deploy path**: VPS Docker Swarm `docker service update`. Vercel migration **blocked**
  (account suspended, `VERCEL_API_TOKEN` returns 403).
- **Multi-tenant Supabase**: 5 migrations, RLS on `business_id` + `site_slug`.

---

## 2 · Per-Cohort State

### 2a. Leaders (portable-pattern donors)

| App | Score | Why it's a donor |
|---|---|---|
| `trentina-cerveza` | A 98/100 | SEO layer, JSON-LD, sitemap/robots, hreflang, dockerfile canonical |
| `dra-gabriela` | A 95/100 | `lib/seo.ts` + `lib/content.ts` placeholder-guards — gold standard |
| `bichos-gym` | A 93/100 | LocalBusiness geo, structured metadata, a11y chrome |
| `mantra-spa` | A 93/100 | Full SEO/a11y sweep — but shares placeholder phone with cocodrilo-fitness |
| `pierce-charm` | A- | Dynamic JSON-LD (HealthAndBeautyBusiness) parsed from content; Tailwind v4 `@theme` |

### 2b. Barbershop cluster — **BROKEN, needs bulk fix**

`nde-barba`, `portas-barber`, `scott-tatuajes`, `shine-nails`, `xxgym`:
- Ship stale metadata: `"Estudio Medieval | San Lorenzo tatuajes & body piercing"`.
- Ship placeholder telephone `+595****0000`.
- `loadContent` swallows fs errors → `SectionsRenderer` renders blank on failure.
  **Violates CLAUDE.md "never silently swallow" rule.**
- All 5 stuck on React 18.3, all collide on dev port 3002.
- `shine-nails/package.json` has stray `"buildId": "portas-barber-1780001925"` — copy-paste evidence.

### 2c. E-commerce cluster

- `reina-de-copas` — reference cart pattern (`components/CartContext.tsx`, 139 lines,
  localStorage + useCallback + useMemo). But: JSON-LD `@type: "Restaurant"` for a menstrual cup
  store (wrong schema). Dockerfile still uses `npm ci` despite commit claiming pnpm migration.
  `trailingSlash: true` inconsistent with fleet. `middleware.ts` is a no-op stub — delete.
- `meal-prep` — clean nginx:alpine static-export reference (Dockerfile 6 lines + nginx.conf 26).
  Anti-pattern: `next.config.mjs` sets `typescript.ignoreBuildErrors: true` and
  `eslint.ignoreDuringBuilds: true`. **Do not port.**

### 2d. Placeholder / stubs / clones

- `fun4me-store` — 25-line "Próximamente" stub.
- README hygiene bad: `arnos` titled "Nde Barba", `cronos` titled "XXGym",
  `hidrobaby` uses "ParaguAI Lead" template.
- `trentina-cerveza` vs `trentina-site` — same brand, must pick canonical & archive the other.
- `ai-whisperers-site` has NL locale (only site with Dutch); EN 328 lines vs PT/NL 805 (asymmetric).
- `stroopwafel-huis` — OG URL mismatch (hyphenated vs non-hyphenated).
- `pitchy-website` + `depiflash` — `"use client"` on homepage → kills SSR SEO.
- `villamayor-asociados` — heavy inline `style={{}}` instead of Tailwind.

### 2e. Placeholder phone leaks (shipping to prod)

- `luis-de-leon-concept`: `0981 000 000`
- `bufete-mendez`: `+595 981 123 456`
- **shared** `595986106062` between `cocodrilo-fitness` and `mantra-spa` — copy-paste bug.

---

## 3 · Shared Infra Status

| Concern | Status | Note |
|---|---|---|
| `.github/workflows/central.yml` | ⚠ drift | Hardcoded 35-app list vs 45 apps; `dorny/paths-filter` detect works but overrides list |
| VPS deploy | ✅ working | SSH root@72.61.44.159, `docker service update <name>` |
| Vercel bulk migration script | ❌ blocked | Account suspended, 403 on API |
| Supabase multi-tenant | ✅ working | 5 SQL migs, RLS by business_id + site_slug |
| `.npmrc` `${NODE_AUTH_TOKEN}` | ⚠ warn | Non-fatal; env var unset in dev shell |
| Secrets in git history | ❌ leak | 3 PATs + Supabase key still present (per docs/CLEANUP_SUMMARY.md) |
| Docs corpus (11 files) | ✅ decent | ARCHIVED_REPOS, DEPLOY_STATUS, PLATFORM_APP_AUDIT current |

---

## 4 · Portable Patterns (ranked by leverage)

Extracted from leader apps. Rank = # of apps that would benefit × severity of not having it.

| # | Pattern | Donor | Beneficiaries | Target package |
|---|---|---|---|---|
| 1 | `lib/seo.ts` (SITE_URL, EN_TO_ES slug map, buildAlternates, buildMetadata, absoluteUrl) | `dra-gabriela` | 39 apps missing hreflang | `@ai-whisperers/site-seo` |
| 2 | `lib/content.ts` (isPlaceholder guard, whatsappLink, phoneDisplay, truncate) | `dra-gabriela` | ALL 45 (multiple placeholder leaks) | `@ai-whisperers/site-content` |
| 3 | Canonical Dockerfile (`node:20-slim` + corepack pnpm@10, 3-stage, non-root uid 1001) | `dra-gabriela` (28 lines) | 40+ apps with drifted Dockerfiles | `@ai-whisperers/dockerfiles` |
| 4 | Dynamic JSON-LD parsed from content (opening hours, price offers, geo) | `pierce-charm` layout.tsx | 13 LocalBusiness missing geo, 39 missing hreflang | Extend `@ai-whisperers/seo` |
| 5 | A11y chrome composition (SkipToContent, LiveAnnouncer, Navbar aria, CookieConsent, MobileStickyCta, BackToTop) | `dra-gabriela/app/[locale]/layout.tsx` | Barbershop cluster + template clones | `@ai-whisperers/site-chrome` |
| 6 | Tailwind v4 `@theme` tokens (color triad + deep/light, clamp() sizes, font vars, `.tap {min-height:48px}`, prefers-reduced-motion reset) | `pierce-charm/globals.css` | Fleet inconsistent | `@ai-whisperers/site-theme` |
| 7 | Cart pattern (localStorage + useCallback mutators + useMemo total/count) | `reina-de-copas/CartContext.tsx` | fun4me-store, future e-commerce | `@ai-whisperers/site-cart` |
| 8 | Bilingual `[locale]` + `dynamic="force-dynamic"` + `revalidate=0` (dodges React 19 `_global-error` `useContext` crash) | `dra-gabriela` | All bilingual apps on Next 16 + React 19 | `@ai-whisperers/i18n` |
| 9 | Content-driven pattern (`content/es.json` + `content/tokens.json`) | `pierce-charm`, `dra-gabriela` | All apps | `@ai-whisperers/site-tokens` |
| 10 | Loud loadContent errors (`throw` on fs fail, never `return null`) | New — needs writing | Barbershop cluster is the poster child for what NOT to do | `@ai-whisperers/site-content` |
| 11 | FAQ accordion (aria-expanded, ChevronDown, defaultOpen for first) | `builder/components/landing/faq-item.tsx` | All service-page apps | `@ai-whisperers/sections` (already partially there) |
| 12 | WhatsApp CTA link helper (E.164 + URL-encoded message) | `dra-gabriela/lib/content.ts` | ~30 apps hand-rolling the URL | `@ai-whisperers/whatsapp` (upgrade) |

---

## 5 · Prioritized Upgrade List

Ordered by (blast radius) × (ease):

**P0 — this week (safety + brand):**
1. Fix barbershop cluster metadata & placeholder phone (5 apps, ~30 min per app).
2. Remove silent fs error in `loadContent` fleet-wide — throw with context. Grep for
   `catch { return null }` under `apps/*/lib/content.ts` (or equivalent).
3. Replace placeholder phones: `luis-de-leon-concept`, `bufete-mendez`,
   `cocodrilo-fitness`/`mantra-spa` share — pick real numbers or explicit TODO markers.
4. Fix `reina-de-copas` JSON-LD `@type` (Store, not Restaurant).
5. Fix `shine-nails/package.json` stray `buildId`.

**P1 — next week (package extraction):**
6. Extract `@ai-whisperers/site-seo` from `dra-gabriela/lib/seo.ts`. Publish. Migrate the 4 leaders.
7. Extract `@ai-whisperers/site-content` (isPlaceholder + whatsappLink + phoneDisplay).
   Migrate leaders + barbershop cluster (barbershops need it most).
8. Extract `@ai-whisperers/dockerfiles` (canonical `node:20-slim` + pnpm@10). Migrate `reina-de-copas`.
9. ~~Deduplicate `@ai-whisperers/i18n` vs `@ai-whisperers/i18n-paraguay`~~ — moot; no
   `i18n-paraguay` package in workspace (see §1).

**P2 — this month (fleet hygiene):**
10. Bump `nudo`, `depiflash`, `dayah-litworks` off Next 15 → 16.2.6.
11. Fix `"use client"` homepage on `pitchy-website` + `depiflash` (moves SSR SEO out).
12. Fix README titles: `arnos`, `cronos`, `hidrobaby`.
13. Fix `stroopwafel-huis` OG URL hyphenation.
14. Pick canonical between `trentina-cerveza` and `trentina-site`; archive the other via
    `docs/ARCHIVED_REPOS.md` + rm.
15. Sync `.github/workflows/central.yml` hardcoded list to actual 45-app fleet (or remove list
    and rely solely on `dorny/paths-filter`).
16. Add missing `sitemap.ts` to 3 apps still lacking one (`fun4me-store`, `nudo`,
    `site-template`). Original 2026-06-11 count of 18 was pre-fleet-audit fixes.
17. Add hreflang to 39 apps.
18. Add `geo` to 13 LocalBusiness JSON-LDs.

**P3 — later:**
19. Fill 3 STUB packages (analytics, hooks, loyalty) or archive them.
20. Migrate `villamayor-asociados` inline styles → Tailwind classes.
21. Balance `ai-whisperers-site` locale content (EN 328 vs PT/NL 805).
    **Resolved 2026-07-16.** Line-count "asymmetry" was a JSON formatting artifact:
    EN was compact-formatted, ES/NL/PT pretty-printed — same top-level structure.
    NL/PT `site.json` are placeholder-English carrying `__translation_note`
    (translation coming soon, marked in-file). Real content gaps were in ES only
    (missing 1 case study, 2 open-source items, 1 pricing rate, 3 footer links)
    and in NL/PT `decisions.json` (only 1 item vs EN's 5, no intro). Fix: filled
    ES gaps in `site.json`; grew NL/PT `decisions.json` to 5 items + intro +
    cta, preserving existing native translations of item 1, with EN placeholder
    for items 2-5 flagged by `__translation_note`. Build: 61/61 static pages OK.

---

## 6 · Blockers Requiring User Decision

- **Secrets in git history**: 3 PATs + Supabase key. Cleanup needs
  `git filter-repo` + force-push to remote. **Destructive on shared history — must confirm.**
- **Vercel account suspended**: `VERCEL_API_TOKEN` returns 403. Two options — new Vercel account,
  or drop Vercel migration and standardize on VPS. Not an engineering call.
- **Trentina duplicate**: which of `trentina-cerveza` / `trentina-site` is canonical? Content
  overlap suggests one is old — user knows which brand line is live.

---

## 7 · Now-Fixed

- `pierce-charm` dev-server: missing `next` binary in workspace. Ran `pnpm install --filter
  pierce-charm` (exit 0). Dev-server ready on :3011.
- **P0 batch (2026-07-16, autonomous P0 worker)**: barbershop-cluster stale metadata,
  placeholder-phone leaks (`luis-de-leon-concept`, `bufete-mendez`, `cocodrilo-fitness` /
  `mantra-spa` shared), `reina-de-copas` JSON-LD `@type` → `Store`, `shine-nails` stray
  `buildId`. See P0 commits on `main`.
- **P1 batch (2026-07-16, autonomous P1 worker)**: `@ai-whisperers/site-seo` package
  extracted with `buildAlternates`, `buildMetadata`, `resolveSiteUrl`, `translateSlug`,
  `pathForLocale`, tsc project references. `@ai-whisperers/site-content` (isPlaceholder,
  whatsappLink, phoneDisplay) extracted. Canonical Dockerfile template landed under
  `packages/@ai-whisperers/dockerfiles`. `pnpm install` at workspace root is the pending
  prerequisite for workspace symlink pickup.
- **P2 batch (2026-07-16, autonomous P2 worker)**:
  - `trentina-cerveza` and `mantra-spa` URL normalization (metadataBase / OG / JSON-LD /
    robots / sitemap all aligned to Traefik host). Commits `71b55ef`, `3ec3def`.
  - `dra-gabriela` migrated to `@ai-whisperers/site-seo` via thin `lib/seo.ts` adapter
    (public API preserved so page callsites need no edits). Commit `4a97307`.
  - Hreflang migration playbook written: `docs/HREFLANG_MIGRATION.md` (commit `81abdf0`).
    Confirmed only 6 bilingual apps (dra-gabriela done, 5 remain: nexa-paraguay,
    ai-whisperers-site, bufete-mendez, golden-visa-advisory, maskarada). The remaining 40
    single-locale apps do NOT need migration — scope reduced from "39 apps missing
    hreflang" (§4 #1) to "5 apps".
  - `geo` GeoCoordinates added to 5 LocalBusiness JSON-LDs with existing address data:
    `pierce-charm`, `stroopwafel-huis`, `hidrobaby-spa`, `trentina-cerveza`,
    `trentina-site`. Commit `bf9a8bd`. Scope reduced from 13 → 5 after triage: the rest
    are either Organization-only (`3md-website`, `builder`), mobile-service
    (`depiflash`), no-address (`cocodrilo-fitness`, `escribania-paraguay`,
    `nexa-paraguay`), or dynamic-city (`villamayor-asociados`).

---

## 8 · How to Use This Doc

Cite section numbers in future prompts:
- "do §5 P0" → knock out the 5 safety fixes.
- "extract §4 #1" → make `@ai-whisperers/site-seo`.
- "unblock §6 secrets" → surface the filter-repo plan for approval.

Every finding above is grounded in a specific file/line; if you want the source pointer for a
row, ask by section+row (e.g. "§4 #6 source" → `apps/pierce-charm/app/globals.css:257`).
