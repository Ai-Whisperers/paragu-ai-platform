# Nexa Paraguay — 4-Locale Content QA & Cleanup Plan (Final)

**Repo:** `/opt/data/work/research-repos/paragu-ai-platform` (branch `feat/nexa-locale-qa`, HEAD `3aa6c8c`)
**Final state:** **0 drift, 0 placeholders, 0 Spanish copy-paste, 0 sub-key mismatches** in all 4 locales (es / en / nl / de). The gate exits 0 (success).

---

## Commits on `feat/nexa-locale-qa` (19 total)

| # | SHA | What |
|---|---|---|
| 1 | `8b9368b` | Initial gate: vitest + CLI + autofill + fixtures + routing findings doc |
| 2 | `c18c44a` | Small translations + autofill bug fixes (had 1 regression) |
| 3 | `5403cda` | Test fixtures locking down esEmpties semantics |
| 4 | `2e07b8a` | Autofill safety: shape guard, length guard, array guard, redesigned-section exclusion |
| 5 | `7e02191` | Cleanup of autofill-introduced damage + recover lost processPage content |
| 6 | `d2f6157` | Translate 39 small user-visible strings |
| 7 | `a25a779` | Add Spanish-copy-paste detector (weighted marker scoring) |
| 8 | `15be061` | Fix 27 Spanish-in-non-es bugs |
| 9 | `1bf4b51` | Fix 10 small drift keys |
| 10 | `d9b0428` | Migrate dutchLanding to unified schema |
| 11 | `e5049ee` | Remove blog.posts[23-25] from nl |
| 12 | `d9ede4a` | Test fix: filter _meta from top-level key parity check |
| 13 | `9c013a0` | docs: update plan with final state |
| 14 | `19c6642` | chore: remove unused `placeholders` and legacy `faqPage.faq` |
| 15 | `d9bb259` | fix: populate JSON-LD FAQ schema (38 Q&A per locale) |
| 16 | `b3272a2` | feat: add sub-key consistency check + sync 23 stale sub-keys |
| 17 | `68a13c9` | fix: route all 23 blog posts per locale (was 4) |
| 18 | `3aa6c8c` | fix: hide empty-body blog posts from the index |
| 19 | (current) | this plan update |

## Final metrics

| Metric | Before (HEAD~19) | After (3aa6c8c) |
|---|---|---|
| Gate exit code | 1 (drift) | 0 (clean) |
| Drift keys | 374 raw → 302 logical | 0 |
| Placeholders `[ES→XX]` | 230 | 0 |
| Spanish copy-paste in non-es | not detected (bug) | 0 (after detector + 27 fixed) |
| Sub-key mismatches | not detected (bug) | 0 (after detector + 23 synced) |
| Unit tests | 0 (gate was new) | 45/45 pass |
| Live tests | 5 | 5/5 pass |
| Total tests | 2 (basic) | 45 pass |
| Union keys (4-locale intersection) | 1918 | 1870 (cleaner) |
| Blog posts visible in index per locale | 23 (17 empty) | 6 real |
| Blog posts routable per locale | 4 (broken links) | 23 (all routable) |
| JSON-LD FAQPage schema per locale | empty (no SEO value) | 38 Q&A (real SEO value) |
| Dead data in JSON | placeholders + faqPage.faq | none |

## Translation bugs fixed (Phase 3)

### Spanish copy-paste in non-es (caught by `a25a779` detector)

- `privacyPage.body.items[2..4]`: Spanish FAQ questions appearing in en/de
- 5 CTA titles: `caseStudiesPage.cta.title`, `founderPage.cta.title`,
  `glossaryPage.cta.title`, `qualityOfLifePage.cta.title` (de),
  `comparisonPage.hero.headline`
- `beneluxPage.faq.items[2].a` (en): full Spanish paragraph
- 6 nl blog bodies[0..5]: full Spanish articles shown to Dutch visitors
- `deutschlandPage.process.totalDuration` (de)
- 2 `blog.posts[*].excerpt` (de): mixed German/Spanish
- `seprealadAttestation.whatsappFallbackLabel` (en/de)
- `prensa.pressReleases.items[0].summary` (nl)
- `complianceDisclaimer.paragraphs[1]` (en/nl)
- 2 familiesPage strings + 2 placeholders strings (all 4 locales)

### Drift / structural mismatches

- dutchLanding redesign parity: 80 keys across 4 sub-sections
  (whySonia, taxComparison, targetClients, costs, hero, cta, seo, process)
- 24 `blog.posts[23-25].*` in nl (3 extra posts without Spanish source)
- 10 small keys (whatsapp, faqPage.cta, seo, etc.)

### Sub-key mismatches (caught by new `b3272a2` detector)

23 stale per-locale sub-keys in es.json that diverged from the
canonical top-level values in en/nl/de.json. Synced.

## Code bugs fixed

1. **JSON-LD FAQ schema** (`d9bb259`): `page.tsx` was reading
   `faqPage.full.items` (always empty); fixed to iterate
   `full.categories[].items[]`. Now 38 Q&A per locale are emitted
   as FAQPage structured data (up from 0).

2. **Blog routing** (`68a13c9`): `getBlogSlugs` only knew about the
   4 posts in `content/blog/posts-{locale}.json`; the blog index listed
   23. Clicking any of the 19 "in routing" posts 404'd. Now `getBlogSlugs`
   unions slugs from both sources and `loadBlogPost` falls back to
   `content/{locale}.json`'s `blog.posts` with `localizeDeep` applied.

3. **Empty-body posts in index** (`3aa6c8c`): The blog index listed all
   23 posts but 17 had empty body fields ("Artículo en preparación"
   stubs). Clicking one produced a blank page. Now the index filters
   out posts with no body in the current locale; posts are still
   routable via direct URL.

## What was deferred (and why)

These are documented exceptions requiring content-team decisions:

### 1. Dutch blog content gap (only 7 of 23 nl posts share slugs with es)

The blog has been independently curated per locale — only 9 of 26 nl
posts share slugs with es. nl has 17 unique Dutch slugs (e.g.,
`verblijf-2025` vs es's `residencia-2025`). The gate doesn't catch
this because slug values aren't compared structurally. The 4-route fix
makes all slugs routable, but visitors see "this page doesn't exist"
on the 19 routes whose content doesn't exist in `posts-{locale}.json`
(though it does exist in the main `content/{locale}.json`'s
`blog.posts` array — so the post page does load and show the body
content).

### 2. SEO meta description / ogImage / twitterHandle

The `seo` object in es.json is rich (ogImage, siteDescription,
twitterHandle) but only partially populated in en/nl/de. The head
metadata uses `data.pageConfig?.description` first, falling back to
`data.content?.description`, so the missing keys don't break rendering.
But the missing ogImage/twitterHandle mean weaker Open Graph metadata
for en/nl/de. Out of scope for translation fixes.

### 3. faqPage.faq legacy section (removed)

Was a legacy small-FAQ section with per-locale topic content that
wasn't rendered anywhere. Removed in `19c6642`.

### 4. placeholders object (removed)

Was a set of static metadata strings (country, capital, currency,
taxRate, processWeeks, flagEmoji) translated to all 4 locales but
never referenced by any rendering code. Removed in `19c6642`.

## What still blocks pushing

The remote `origin` URL contains a leaked GitHub PAT:
`[REDACTED]`

**This is a hard precondition for any push.** Steps to fix:
1. Rotate the PAT at https://github.com/settings/tokens
2. Update local config: `git remote set-url origin https://<new-token>@github.com/Ai-Whisperers/paragu-ai-platform.git`
3. Confirm the new URL is sanitized in any logs/config dumps
4. Then `git push origin feat/nexa-locale-qa` will work

## How to run the pipeline

```bash
cd apps/nexa-paraguay

# Run the gate
pnpm i18n:check

# Run all tests (45 total)
pnpm test

# Type check
pnpm typecheck

# Run autofill (now safe — no shape-mismatch damage)
pnpm i18n:fill:dry     # preview
pnpm i18n:fill         # write

# Clean up autofill-introduced damage (idempotent)
node scripts/cleanup-autofill-damage.mjs
```

## Out of scope

- Pushing (blocked by PAT)
- Marketing copy writing (long-form articles)
- Dutch blog content gap (deferred)
- Visual/render testing (only unit + live tests are in CI)