# Nexa Paraguay — Routing & Content Findings (2026-08-28)

This document records what the routing layer actually uses, so the locale QA
gate knows which content drift is load-bearing (renders on a real page) and
which is dead weight (sits in a JSON that no route reaches).

## Verified facts

### App structure

| Path | Purpose | Loaded by |
|---|---|---|
| `content/{es,en,nl,de}.json` | Per-locale content tree (top-level sections like `home`, `faqPage`, `aboutPage`, etc.) | `src/lib/page-data.ts:loadFromSupabase` (Supabase first), `loadJson('content', '<locale>.json')` (file fallback) |
| `nexa-pages/*.json` | Per-page section metadata. Each file describes which `content` sections a page renders. | `src/lib/page-data.ts:getPageSlugs` (lists files), `loadJson('nexa-pages', '<slug>.json')` (loads) |
| `content/blog/posts-{locale}.json` | Per-locale blog posts | `getBlogSlugs` |

### How a slug becomes a page

1. `src/app/[locale]/[slug]/page.tsx` calls `getPageSlugs()` to enumerate the set of static routes. The function lists every `.json` in `nexa-pages/`. So a page only exists at `/<locale>/<slug>` if `nexa-pages/<slug>.json` exists.
2. For a request to that route, `loadPageData(locale, slug)`:
   - loads `content/<locale>.json` (entire tree, per locale)
   - loads `nexa-pages/<slug>.json` (page-level section config)
   - `localizeDeep()` is applied to both — see the next section
   - returns `{ content, pageConfig, images, pageId, locale }`
3. `SectionsRenderer` walks `pageConfig.sections[]` and renders each. A section like `{ "id": "faq", "content": "faqPage" }` tells the renderer to pull `content.faqPage` and render it as a FAQ block.

### The per-locale sub-key pattern

`localizeDeep` (`src/lib/page-data.ts:36-42`) recognises an object whose keys are
exactly `['es','en','nl','de']` and treats it as a locale-switched value:

```ts
if (keys.length > 0 && keys.every((k) => localeKeys.includes(k))) {
  return value[locale] ?? value.en ?? value.es ?? value.nl ?? value.de ?? ''
}
```

So an entry like:

```json
"aboutPage": {
  "specialist": {
    "bio": {
      "es": "Paraguaya, casada con un ciudadano neerlandés…",
      "en": "Paraguayan, married to a Dutch national…",
      "nl": "Paraguayaanse, getrouwd met een Nederlandse…",
      "de": "Paraguayerin, verheiratet mit einem…"
    }
  }
}
```

is a single logical key (`aboutPage.specialist.bio`) that has 4 translations,
each stored under a locale-suffixed sub-key. The QA gate must NOT count this
as 4 separate drift keys — it's 1 logical key with 4 siblings.

This is what `scripts/lib/locale-parity.mjs:logicalKey()` does, and it's why
the post-collapse drift count is 302 instead of the raw 374.

### `_meta` is internal metadata

The `de.json` file (and only that file) has a top-level `_meta` block with
`notes` and `auto_filled_sections`. This is not user-facing content; it's
operational metadata the previous autofill scripts wrote. The QA gate skips
it via `isMetaKey()`.

### What pages actually use `faqPage`

`grep -rln "faqPage" nexa-pages/` finds:

- `nexa-pages/terminos.json`
- `nexa-pages/privacidad.json`

So the FAQ data is embedded as a section on the terms and privacy pages. It is
NOT a standalone `/<locale>/faq` route (no `nexa-pages/faq.json`). The 28
drift keys in `faqPage` only affect those two pages.

## Real drift picture (after Phase 1 lib changes)

```
=== DRIFT KEY BREAKDOWN ===

aboutPage             (6 keys)    # per-locale sub-key siblings (real after collapse)
blog                  (30 keys)   # per-locale post translations
comparisonPage        (90 keys)   # Dutch has 48 leaves vs 144 in others
complianceDisclaimer  (2 keys)
contactPage           (1 key)
deutschlandPage       (12 keys)
dutchLanding          (92 keys)   # Dutch landing page was redesigned; other 3 still have old design
faqPage               (28 keys)   # only used by terminos + privacidad
processPage           (15 keys)
resourcesPage         (12 keys)
seo                   (3 keys)
termsPage             (1 key)
whatsapp              (3 keys)
whyCountryPage        (7 keys)

Logical unique keys (after collapsing per-locale siblings): 302
Per-locale sub-keys remaining: 4 (i.e. only 4 of the original 68 are *not* properly handled by collapse)

Missing-in distribution:
  missing in all 4 locales: 8   (structural conflicts, mostly dutchLanding)
  missing in 1 locale:      171 (typos or single-locale gaps)
  missing in 2 locales:     0   (no partial coverage pattern)
  missing in 3 locales:     123 (only ES has it; needs translation to 3 others)

Empty / whitespace values per locale:
  es: 20   en: 14   nl: 13   de: 14
```

## What this means for Phase 2 (content cleanup)

| Section | Drift | Work type | Priority |
|---|---|---|---|
| `dutchLanding` (92) | High | **Content design decision** (Sonia) — bring other locales up to Dutch design, or pull Dutch back | P0 (blocking) |
| `comparisonPage` (90) | High | **Content design decision** — Dutch has 48 leaves, others have 144 | P0 (blocking) |
| `blog` (30) | Medium | Per-locale post translations; many will be `[ES→XX]` placeholders until translated | P1 |
| `faqPage` (28) | Low | Only used by 2 pages (terminos, privacidad) | P3 |
| `processPage`, `deutschlandPage`, `resourcesPage` (12-15 each) | Low | Per-locale gaps; autofill is fine | P2 |
| `whyCountryPage`, `aboutPage`, `contactPage` (1-7) | Low | Trivial — autofill + manual review | P2 |
| `complianceDisclaimer`, `whatsapp`, `seo` (2-3) | Low | Trivial | P3 |
| `termsPage` (1) | Low | Single key | P3 |

Empty strings (61 total) are split across the same sections, mostly in `home.hero.eyebrow`, `footer.phone`, and `*.cta.eyebrow/tagline/whatsapp`. They need real translations, not placeholders.
