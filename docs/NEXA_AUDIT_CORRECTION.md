# NEXA Platform — "Missing es.json" Audit Correction

**Date:** 2026-06-15
**Original audit (REPO_COMPARISON.md):** Claimed 5 of 19 App Router apps are missing `content/es.json` and would crash at runtime.
**Verdict after re-audit:** **False alarm** — all 5 apps have content, but at non-standard locations. They render fine.

| App | Real content location | Size |
|---|---|---|
| `camilo-acosta` | Hardcoded in `src/app/page.tsx` + 4 sub-page TSX files (each with own content) | 11KB page + 4 sub-pages 5-11KB each |
| `fun4me-store` | Empty `page.tsx` placeholder (1.3KB) — **legitimately empty/scaffold**, but harmless because the site isn't deployed | 1.3KB |
| `golden-visa-advisory` | `src/content/data.json` + 9 separate components | 38KB JSON + components |
| `nudo` | `src/data/{songs,merch,events,videos,socials}.ts` (typed data) | 1-2KB each |
| `stroopwafel-huis` | `src/content/es.json` (correctly named, NOT `content/es.json`) | 13.5KB |

**Key insight:** The platform's 39 apps have **3 different content patterns**:
1. **Pages Router apps (20):** Content at `app/` + sometimes `content/`
2. **App Router apps with `content/es.json`:** Standard pattern, 7 apps
3. **App Router apps with **alternative** content patterns:** 5 apps (the ones above)

**Recommendation:** Don't enforce `content/es.json` as the standard. Instead, document the per-app patterns. Or migrate apps to the `nexa-pages/*.json` + `[locale]/[slug]` pattern from personal nexa-paraguay (the gold standard).

## Apps confirmed **legitimately empty** (no content, no real purpose)

- `fun4me-store` — only 1.3KB `page.tsx`. Confirm with Kiki if this is intended or abandoned.

## Audit impact

The REPO_COMPARISON.md "Issues in the platform" section (item #3) is wrong. Update needed.
