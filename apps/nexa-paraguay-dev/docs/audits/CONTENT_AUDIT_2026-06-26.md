# Nexa Paraguay — Content Audit (June 26, 2026)

> Full inventory of `/root/paragu-ai-platform/apps/nexa-paraguay` after the prod-20260625-1801 deploy.

## TL;DR

| Dimension | Status |
|---|---|
| 4 locales (es/en/nl/de) at parity | ⚠️ Mostly — 4 parity gaps |
| Content JSON size | ~250KB each, 41-42 top-level keys |
| Hero H1s on every page | ✓ Present in all locales |
| Services page content (Luana's restore) | ✓ Has 3 groups (residency/banking/real estate) |
| Home page sections | ✓ 9 sections (hero/trust/whyCountry/process/finalCta/services/feedback/programs/testimonials) |
| FAQ coverage | ✓ 6 categories × 38 items, identical across locales |
| Image manifest coverage | ✓ 119 images referenced, 0 missing on disk |
| Blog posts (ES/EN/NL/DE) | ⚠️ Manifest↔disk mismatches |
| Placeholder text | ✓ No real lorem/TBD/placeholder (false-positives filtered) |
| API routes | 8 routes (contact/subscribe/exit-popup/health/intake/revalidate/delete-data/content) |

---

## 1. Content JSON Structure

### Per-locale size

| Locale | Bytes | Lines | Top-level keys |
|---|---|---|---|
| es.json | 246,441 | 4,408 | 41 |
| en.json | 233,694 | 4,144 | 41 |
| nl.json | 273,743 | 4,155 | 41 |
| de.json | 249,555 | 4,148 | 42 (has `_meta` marker) |

### Top-level keys (40 actual pages)

`siteName`, `tagline`, `placeholders`, `navigation`, `home`, `whyCountryPage`, `aboutPage`, `faqPage`, `contactPage`, `privacyPage`, `blog`, `footer`, `complianceDisclaimer`, `seprealadAttestation`, `whatsapp`, `resourcesPage`, `qualityOfLifePage`, `caseStudiesPage`, `comparisonPage`, `founderPage`, `glossaryPage`, `intakeWizardPage`, `beneluxPage`, `seo`, `prensa`, `servicesPage`, `processPage`, `feedbackPage`, `bookingPage`, `datosPersonalesPage`, `exitPopup`, `retainerPlans`, `familiesPage`, `guidesPage`, `teamPage`, `programasPage`, `testimoniosPage`, `agendaPage`, `termsPage`, `dutchLanding`, `deutschlandPage`

### Site.json (chrome config)

- `domain`: `nexaparaguay.com.py` ✓
- `defaultLocale`: `nl`
- `locales`: `nl, en, de, es` (NL first = primary market)
- `vertical`: `relocacion`
- `country`: `Paraguay`
- `publicUrl`: `https://nexa.paragu-ai.com` (still needs to be `https://nexaparaguay.com.py` after DNS)
- `pendingDomains`: `nexaparaguay.com.py`
- `features.blog`: **false** (parked, intentional)
- `features.whatsappFloat`: true
- GA4: `G-XE49GLEP34`

---

## 2. Locale Parity Issues (4 real gaps)

### Gap A — `complianceDisclaimer` schema divergence

| Locale | Shape |
|---|---|
| es | `{paragraphs: [...], licenseNumbers, linkText, linkHref}` (rich) |
| en | `{title, content}` (flat) |
| nl | `{title, content}` (flat) |
| de | `{title, content}` (flat) |

**Issue:** ES has a richer compliance block (paragraphs + license refs) that the other 3 lost. Either downgrade ES or upgrade EN/NL/DE.

### Gap B — `deutschlandPage` missing 3 keys

| Locale | Keys |
|---|---|
| es/en/nl | `costs, cta, hero, process, seo, targetClients, taxComparison, whySonia` (8 keys) |
| de | `cta, hero, process, seo, whySonia` (5 keys — missing `costs`, `targetClients`, `taxComparison`) |

This is the same shape as `dutchLanding` in all 4 locales (8 keys). DE deutschlandPage is **incomplete**.

### Gap C — `seo` block missing in NL

| Locale | Keys |
|---|---|
| es/en/de | `{home}` only (1 key) |
| nl | `{ogImage, siteDescription, siteKeywords, twitterHandle, home}` (5 keys — extras) |

NL has extras; ES/EN/DE are missing them. Need to align.

### Gap D — `whatsapp` field type divergence

| Locale | Value |
|---|---|
| es | string `"595982515138"` |
| en/nl/de | dict `{buttonText, message}` |

Code likely handles both shapes but this is inconsistent and a code smell.

### Gap E — `nl/prensa.hero.headline` empty

```json
"nl/prensa.hero.headline": ""
```

Empty string in NL press page hero.

---

## 3. Hero H1 Audit

✓ **All home pages have H1** in all 4 locales:
- es: "Tu mudanza a Paraguay, con quien ya la hizo"
- en: "Your relocation to Paraguay, with someone who did it"
- nl: "Jouw verhuizing naar Paraguay, met iemand die het deed"
- de: "Ihr Umzug nach Paraguay, mit jemandem, der es getan hat"

✓ **Services page has content in ES**: 3 groups (Residencia y Documentos Legales, Banca y Configuración Fiscal, Bienes Raíces Residenciales) with 8 total service items. Luana's restore is live.

✓ **whyCountryPage hero in ES**: "7 razones por las que europeos eligen Paraguay como nuevo hogar"

---

## 4. Blog Audit — Manifest vs Disk Mismatches

| Locale | Manifest | Disk | Common | Issues |
|---|---|---|---|---|
| es | 23 | 17 | 17 | 6 in manifest only |
| en | 23 | 61 | 10 | 13 in manifest only, **51 on disk only** |
| nl | 26 | 20 | 20 | 6 in manifest only |
| de | 23 | 17 | 10 | 13 in manifest only, 7 on disk only |

### Manifest-only (referenced but file missing) — broken links

- es: `constitucion-empresa, costo-vida-asuncion, cuenta-bancaria-extranjeros, guia-compra-propiedades, residencia-2025, sistema-fiscal-explicado`
- en/nl/de: similar Spanish slugs leaked into the EN/DE manifest (`constitucion-empresa`, `apertura-cuenta-bancaria-paraguay`, etc.)

### Disk-only (file exists but not in manifest) — orphaned content

- en: 51 posts! Most are real EN content (paraguay-coworking-spaces-asuncion, dac8-crypto-paraguay, fire-retire-paraguay-cheapest, etc.)
- de: 7 German posts (krankenversicherung-paraguay-rentner, sicherheit-paraguay-rentner, etc.)

**Action:** Reconcile manifest with filesystem. Either delete orphan files or add them to manifest.

### One real content bug

`en.blog.posts[22].title` is **still in Spanish**: "¿Es posible hacer todo en un solo viaje? Sí, así funciona"
- Same title in ES (correct)
- DE properly translated: "Ist es möglich, alles in einer Reise zu erledigen? Ja, so funktioniert es."
- EN needs translation

---

## 5. Image Asset Coverage

✓ **119 images referenced in `images.json`, all present on disk**

Categories with coverage:

| Category | Manifest refs | Disk files |
|---|---|---|
| ads | 22 | 44 |
| blog | 8 | 38 |
| brand | 10 | 53 |
| email | 7 | 14 |
| hero | 6 | 24 |
| office | 5 | 10 |
| press | 3 | 6 |
| process | 9 | 18 |
| programs | 4 | 8 |
| social | 6 | 12 |
| team | 12 | 16 |
| testimonials | 14 | 28 |
| trust | 4 | 8 |
| whyParaguay | 9 | 18 (in `why-paraguay/` dir — disk name differs) |

**Path note:** Manifest category is `whyParaguay` but disk dir is `why-paraguay/`. Code must handle this mapping (looks like it does — paths use `/images/why-paraguay/`).

---

## 6. Home Page Section Inventory (ES)

Home renders 9 sections + SEO meta:

1. **hero** — eyebrow + headline + subheadline + 2 CTAs + 4 stats
2. **trust** — "Residencia, cuenta y empresa — tramitadas en una jornada"
3. **whyCountry** — "Tres razones por las que Europa se muda al Cono Sur"
4. **process** — "Un proceso claro, paso a paso"
5. **finalCta** — "Dé el primer paso"
6. **services** — "Todo lo que necesitás para radicarte, operar y vivir en Paraguay"
7. **feedback** — "Casos reales, palabras reales"
8. **programs** — "Cuatro servicios, un equipo"
9. **testimonials** — "Lo que dicen nuestros clientes"

---

## 7. FAQ Coverage

Identical structure across all 4 locales — 6 categories × 38 questions:

| Category | Items |
|---|---|
| antes-de-empezar (before you start) | 9 |
| inmigracion (immigration) | 7 |
| banca (banking) | 5 |
| legal | 6 |
| propiedades (real estate) | 5 |
| vida (life) | 6 |

✓ No translation gaps in FAQ structure.

---

## 8. Seprelad Attestation Form

Full form schema present in all locales — 6 question types (text/radio/textarea/file/etc.), `submitLabel`, `successMessage`, `whatsappPhone`, `whatsappFallbackLabel`. Maps to `/es/intake` route. ✓

---

## 9. Code Surface

- 80 .tsx/.ts files (components + pages)
- 8 page.tsx files under `src/app/[locale]/`
- 8 API routes
- Routes: home, [slug], [...path], blog, intake

---

## 🔴 Real issues to fix (priority order)

| # | Severity | Issue | Fix |
|---|---|---|---|
| 1 | 🔴 High | DE `deutschlandPage` missing `costs/targetClients/taxComparison` | Copy from ES, translate |
| 2 | 🔴 High | EN blog post 22 title still in Spanish | Translate to English |
| 3 | 🟡 Med | ES `complianceDisclaimer` schema richer than other 3 | Either expand EN/NL/DE or shrink ES |
| 4 | 🟡 Med | `whatsapp` is string in ES but dict in EN/NL/DE | Pick one shape (dict is safer) |
| 5 | 🟡 Med | `seo` block: NL has extras ES/EN/DE lack | Add `ogImage/siteDescription/siteKeywords/twitterHandle` to ES/EN/DE |
| 6 | 🟡 Med | NL `prensa.hero.headline` empty | Translate or fill in |
| 7 | 🟡 Med | Blog manifest↔disk mismatches (51 orphan EN posts, 13 broken ES/EN/DE refs) | Reconcile: either add to manifest or delete |
| 8 | 🟢 Low | Spanish slugs leaked into EN/DE manifests (constitucion-empresa, etc.) | Localize slugs per language |

## ✅ Things that ARE clean

- All 119 image references resolve on disk
- All hero H1s present and translated
- Services page content restored in ES (3 groups, 8 items)
- FAQ 6×38 structure identical across all locales
- Seprelad form schema complete
- 0 real placeholder text (Lorem/TBD/PLACEHOLDER)
- WhyParaguay page hero correct
- All 9 home sections render with translated content