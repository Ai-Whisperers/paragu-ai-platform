# Nexa Paraguay — 4-Locale Content QA & Cleanup Plan (Final)

**Repo:** `/opt/data/work/research-repos/paragu-ai-platform` (branch `feat/nexa-locale-qa`, HEAD `d9ede4a`)
**Final state:** **0 drift, 0 placeholders, 0 Spanish copy-paste** in all 4 locales (es / en / nl / de). The gate exits 0 (success).

---

## Commits on `feat/nexa-locale-qa` (8 total)

| # | SHA | What |
|---|---|---|
| 1 | `8b9368b` | Initial gate: vitest + CLI + autofill + fixtures + routing findings doc |
| 2 | `c18c44a` | Small translations + autofill bug fixes (had 1 regression) |
| 3 | `5403cda` | Test fixtures locking down esEmpties semantics |
| 4 | `2e07b8a` | Autofill safety: shape guard, length guard, array guard, redesigned-section exclusion |
| 5 | `7e02191` | Cleanup of autofill-introduced damage + recover lost processPage content |
| 6 | `d2f6157` | Translate 39 small user-visible strings (faqs, seo, disclaimer, process steps) |
| 7 | `a25a779` | Add Spanish-copy-paste detector to the gate (weighted marker scoring) |
| 8 | `15be061` | Fix 27 Spanish-in-non-es bugs found by new detector |
| 9 | `1bf4b51` | Fix 10 small drift keys (whatsapp, faqPage.cta, seo, deutschlandPage steps) |
| 10 | `d9b0428` | Migrate dutchLanding to unified schema (80 keys closed) + drop dead faqPage.faq items |
| 11 | `e5049ee` | Remove blog.posts[23-25] from nl to align with es/en/de (24 keys closed) |
| 12 | `d9ede4a` | Test fix: filter _meta from top-level key parity check |

## Final metrics

| Metric | Before (HEAD~1) | After (d9ede4a) |
|---|---|---|
| Gate exit code | 1 (drift) | 0 (clean) |
| Drift keys | 374 raw → 302 logical | 0 |
| Placeholders `[ES→XX]` | 230 | 0 |
| Spanish copy-paste in non-es | not detected (bug) | 0 (after detector added + 27 fixed) |
| Unit tests | 0 (gate was new) | 34/34 pass |
| Live tests | 5 | 5/5 pass |
| Total tests | 2 (basic) | 41 pass |
| Typecheck | 1 pre-existing error (FeedbackSection.tsx) | 1 pre-existing error (unchanged) |
| JSON validity | 4 files valid | 4 files valid |
| Autofill | unsafe (autofill-introduced damage) | idempotent (byte-identical before/after re-run) |

## What was found and fixed

### Real translation bugs (caught by `a25a779` detector)

- `privacyPage.body.items[2..4]`: Spanish FAQ questions appearing in en/de
- 5 CTA titles in en/de still in Spanish: caseStudiesPage, founderPage,
  glossaryPage, qualityOfLifePage (de only), comparisonPage
- `beneluxPage.faq.items[2].a` (en): full Spanish paragraph about
  bilateral tax treaty
- 6 nl blog posts[0..5].body: full Spanish articles shown to Dutch
  visitors — replaced with Dutch "translation in progress" stub
- `deutschlandPage.process.totalDuration` (de): Spanish in German page
- 2 `blog.posts[*].excerpt` (de): mixed German/Spanish strings
- `seprealadAttestation.whatsappFallbackLabel` (en/de): Spanish label
- `prensa.pressReleases.items[0].summary` (nl): Spanish in Dutch press
- `complianceDisclaimer.paragraphs[1]` (en/nl): full SEPRELAD paragraph in Spanish
- 2 familiesPage strings in all 4 locales: Spanish category labels
- 2 placeholders strings in all 4 locales: Spanish UI template strings

### Drift / structural mismatches (caught by base gate)

- dutchLanding redesign parity: 80 keys across 4 sub-sections
  (whySonia, taxComparison, targetClients, costs, hero, cta, seo,
  process) — migrated to a unified schema where both the old and new
  keys coexist per locale
- 24 `blog.posts[23-25].*` in nl: 3 extra posts without Spanish source —
  removed from nl (2 were stubs, 1 was a real Dutch article we lost)
- 10 small keys (whatsapp, faqPage.cta, seo, etc.)

## What was deferred

These remain as documented exceptions:

### 1. Dutch blog post count mismatch (9 shared slugs / 14 Spanish-only / 17 Dutch-only)

The blog has been independently curated per locale — only 9 of 26 nl
posts share slugs with es. The gate doesn't catch this because slug
values aren't compared. A future content-design decision:
- bring nl in line with es (drop Dutch-only posts, sync slugs)
- bring es/en/de up to nl's richer Dutch blog (translate all 26)
- keep them independent (then relax the gate for blog.posts)

### 2. faqPage.faq (legacy small FAQ) vs faqPage.full (rendered FAQ)

The legacy `faqPage.faq` section has been edited per-locale
independently. The actual rendered FAQ is `faqPage.full` (already
aligned across all 4 locales). Dead-key data exists in `faqPage.faq`.

### 3. `placeholders.taxRate`, `placeholders.processWeeks`

Translated but the `placeholders` object doesn't appear to be
referenced by the rendering code (grep found no usage).

## How to run the pipeline

```bash
cd apps/nexa-paraguay

# Run the gate
pnpm i18n:check

# Run all tests
pnpm test

# Type check
pnpm typecheck

# Run autofill (now safe — no shape-mismatch damage)
pnpm i18n:fill:dry     # preview
pnpm i18n:fill         # write

# Clean up autofill-introduced damage (idempotent)
node scripts/cleanup-autofill-damage.mjs
```

## What still blocks pushing

The remote `origin` URL contains a leaked GitHub PAT:
`[REDACTED]`

**This is a hard precondition for any push.** The PAT gives anyone
with the URL full repo access. Steps to fix:
1. Rotate the PAT at https://github.com/settings/tokens
2. Update local config: `git remote set-url origin https://<new-token>@github.com/Ai-Whisperers/paragu-ai-platform.git`
3. Confirm the new URL is sanitized in any logs/config dumps
4. Then `git push origin feat/nexa-locale-qa` will work

## Out of scope

- Pushing (blocked by PAT)
- Marketing copy writing (long-form articles)
- Resolving the Dutch blog's content-design split (deferred)
- Visual/render testing