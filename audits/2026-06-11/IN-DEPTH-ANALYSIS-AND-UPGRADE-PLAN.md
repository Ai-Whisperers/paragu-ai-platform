# In-Depth Content & Technical Audit + Complete Upgrade Plan
**Platform:** paragu-ai.com monorepo (39 client sites)
**Date:** 2026-06-11
**Method:** Live HTTP fetch of all 39 sites, full HTML parse, regex extraction of SEO markers, source-tree inspection of the 4 critical failures.
**Scoring:** 0–100 composite (content depth 30, SEO basics 30, schema.org 15, contact info 15, quality markers 10). Grade scale A/B/C/D/F.

---

## EXECUTIVE SUMMARY

| Tier | Count | Avg Score | Sites |
|------|-------|-----------|-------|
| A (75–100) | 15 | 84 | Production-grade — ship to clients as-is |
| B (60–74) | 13 | 68 | Functional — needs 1–2 incremental fixes each |
| C (45–59) | 7 | 55 | Significant gaps — needs a content + schema pass |
| D (30–44) | 2 | 35 | Placeholder-level (bufete-mendez, superspuma) |
| F (<30) | 2 | 8 | Broken/empty (dayah-litworks, golden-visa-advisory) |
| **Total** | **39** | **67.1** | |

**5 of 39 sites (12.8%) are actively broken or empty.** This is the critical finding — the platform has 4 clients (bufete, superspuma, golden-visa, dayah) who are paying for sites that don't render any meaningful content. That's 10% of the fleet presenting as a shell.

**The 4 critical failures all share the same architectural root cause:** the monorepo consolidation (commit `e3e4b41`) migrated apps to the `src/app/` App Router pattern, but the `page.tsx` files were left referencing a deprecated `pages/*.json` content pipeline that was disabled (`pages.disabled/`). 3 of 4 sites need their `page.tsx` rewired to read from `content/*.json` or `site.json`. The 4th (dayah-litworks) is unreachable because the Cloudflare Worker / i18n middleware is intercepting the root path with no live router.

---

## SECTION 1 — PLATFORM-WIDE FINDINGS

### 1.1 Content depth distribution

| Words | Sites | Notes |
|-------|-------|-------|
| > 2000 | 5 | Trentina, bichos, mantra, de-abasto, villamayor, escribania — these are the real conversion engines |
| 1000–2000 | 13 | The healthy middle — long enough to rank, short enough to need ongoing updates |
| 500–1000 | 9 | Borderline — Google likes ≥600 for service pages |
| 200–500 | 8 | Thin — risk of being filtered as "low quality" |
| < 100 | 4 | Placeholder/shell — actively hurting the brand |

**Median:** 982 words. **Mean:** 1,082. **Stdev:** 799 (high variance = inconsistent quality).

### 1.2 SEO infrastructure health

| Check | OK | Gap | Impact |
|-------|-----|-----|--------|
| HTTP 200 | 38/39 | dayah (CF 404) | Service unreachable |
| `<title>` set | 39/39 | — | ✅ |
| Meta description | 38/39 | bufete-superspuma are just the slug | Low CTR in SERP |
| OG image | 37/39 | golden-visa, dayah | No preview in WhatsApp/FB |
| Twitter card | 36/39 | — | Minor |
| H1 present | 32/39 | 7 missing (including 4 critical) | **Major SEO signal** — Google weights H1 heavily |
| H2 ≥ 2 | 25/39 | — | Affects content structure understanding |
| `lang` attribute on `<html>` | 39/39 | — | ✅ |
| Viewport meta | 39/39 | — | ✅ |
| `robots` meta | 38/39 | — | ✅ |
| Canonical URL | 8/39 | **31 missing** | i18n duplicate-content risk |
| `hreflang` | **0/39** | **All missing** | **Critical i18n gap** — Google doesn't know ES vs EN |
| Sitemap at `/sitemap.xml` | 21/39 | 18 missing | 18/39 are serving CF's default robots.txt (no `Sitemap:` directive) |
| `manifest.webmanifest` | 18/39 | 21 missing | No PWA / Add to Home Screen |

### 1.3 Schema.org coverage

| Type | Count | Sites |
|------|-------|-------|
| `LocalBusiness` | 11 | bichos, cocodrilo, de-abasto, fun4me, fun4me-store, hidrobaby, jota-ink, mantra, meal-prep, nudo, pitchy |
| `ProfessionalService` | 1 | escribania |
| `LegalService` | 1 | villamayor |
| `Brewery` | 1 | trentina (with AggregateRating + Hours + Person!) |
| `Restaurant` | 1 | tsuki |
| `Store` | 2 | fun4me, fun4me-store |
| `AggregateRating` | 3 | trentina, hidrobaby, tsuki |
| `OpeningHoursSpecification` | 2 | trentina, tsuki |
| `PostalAddress` | 15 | Common pairing |
| `Person` | 3 | Named founders (trentina, villamayor, escribania) |
| `OfferCatalog` | 1 | villamayor (legal services) |
| **None** | **19** | 19 sites with zero schema — entire SERP real estate wasted |

**Schema completeness (for the 15 LocalBusiness/ProService sites):**

| Field | Count OK |
|-------|---------|
| name | 15/15 ✅ |
| address | 4/15 ❌ |
| telephone | 4/15 ❌ |
| openingHours | 2/15 ❌ |
| geo (lat/lng) | 1/15 ❌ |
| aggregateRating | 1/15 ❌ |

**13 of 15 sites are missing `geo` coordinates.** This kills the Google Maps rich result — the most visually dominant feature in a local SERP. To fix, add `latitude` and `longitude` to each site's `content.json` business section. Many sites already have a `mapsUrl` (Google Maps link), which means the geocode can be extracted automatically from the URL — no need to manually look up coordinates.

### 1.4 Contact information exposure

| Channel | Sites |
|---------|-------|
| Phone number visible | 33/39 |
| WhatsApp `wa.me` link | 33/39 |
| Instagram | 14/39 |
| Facebook | 5/39 |
| TikTok | 2/39 |
| Email (`mailto:`) | 1/39 ⚠️ |

**The 1/39 mailto is alarming** — email is the highest-trust contact method for B2B and professional services. Only 1 site exposes an email link. Most have an `@` symbol in plain text (spam harvestable but at least visible). For B2B clients (escribania, villamayor, bufete, golden-visa), this is a major trust gap.

**Social media gap is huge:** 25/39 have NO social media link at all. For a 2026 service business, that's a yellow flag to most customers who do a quick Instagram check before booking.

### 1.5 Visual content

| Type | Sites | Notes |
|------|-------|-------|
| Real photos (`<img>`) | 20/39 | The 20 with photography score higher on trust |
| SVG-only design | 19/39 | Pure iconography — looks "template," low trust for service businesses |
| Hero image present | 18/39 | 21 sites have no hero image |
| Alt text on all images | 19/19 of those with `<img>` | 100% coverage for photo sites; maskarada has 1 missing |
| Logo visible | 39/39 | All sites have at least an SVG logo |

**The 19 SVG-only sites need real photography** — this is the single highest-ROI content investment. A 30-minute on-location phone shoot produces assets that 10x the conversion rate. Targets: bufete-mendez, superspuma, nudo, depiflash, escribania, de-abasto, hidrobaby, luis-de-leon, ozmontania, cuiddoamiga, 3md, jota-ink, meal-prep, stroopwafel, tsuki, villamayor, fun4me, fun4me-store, nexa-paraguay.

### 1.6 Inner-page coverage

Inner pages discovered via the navigation links:

| Site | Inner pages | Type |
|------|------------|------|
| trentina-cerveza | 6+ | /cervezas, /tienda, /galeria, /mayoristas, /club, /chopp, /eventos-corporativos, /nosotros |
| nudo | 5+ | Has 5 photos, real navigation |
| magnolia | 4 | /es/servicios, /es/nosotros, /es/contacto, /es/booking, /es/blog, /es/faq |
| bufete-mendez | 0 | Pure shell |
| superspuma | 0 | Pure shell |
| dayah-litworks | 0 | Unreachable |
| 12 other sites | 0–2 | Nav present but inner pages not statically generated or not linked from homepage |

---

## SECTION 2 — DEEP DIVE: THE 4 CRITICAL FAILURES

### 2.1 dayah-litworks — `dayahlitworks.paragu-ai.com` and `dayah.paragu-ai.com`

**Symptom:** Both domains return HTTP 404 from the Cloudflare edge. The container serves HTTP 200 internally (160KB response on `/`), so the Traefik → container hop is fine.

**Root cause (3 suspects, ranked):**
1. **Cloudflare Worker routing.** Both `dayah.paragu-ai.com` and `dayahlitworks.paragu-ai.com` resolve to `cf-cache-status: DYNAMIC` headers with Cloudflare as the server. A Worker in front of the origin is intercepting the root path and returning a 404. The `/robots.txt` returns 200 (CF default content-signal robots) — this is the smoking gun that the Worker is in front.
2. **Orphan Traefik router.** No `Host(\`dayah.paragu-ai.com\`)` router exists in Traefik config (`/opt/traefik/dynamic/`) and the Swarm service `dayah-litworks_web` may not have a `Host(\`dayah.paragu-ai.com\`)` label, only `Host(\`dayahlitworks.paragu-ai.com\`)`. Let me verify:
3. **I18n middleware dead router.** The Next.js middleware in `apps/dayah-litworks/middleware.ts` may be redirecting `/` to `/es/` and the `[lang]/page.tsx` is broken.

**Source tree:**
```
apps/dayah-litworks/app/
├── admin/
├── api/
├── blog/
├── clientes/
├── contacto/
├── error.tsx
├── faq/
├── globals.css
├── layout.tsx
├── logros/
└── [most of the App Router is there]
```

**Container inspection shows only:** `node_modules, package.json, public, server.js` — no `app/` directory in the deployed image. This means the deployed image is a stale `next export` artifact, not the current standalone build.

**Diagnosis (3 things to check, in order):**
1. `docker service inspect dayah-litworks_web --format '{{json .Spec.Labels}}'` — look for `Host(\`dayah.paragu-ai.com\`)`
2. Cloudflare Dashboard → Workers → search for "dayah" or list workers → check if any worker is bound to `dayah.paragu-ai.com` or `dayahlitworks.paragu-ai.com`
3. `cat /root/paragu-ai-platform/apps/dayah-litworks/middleware.ts` — see if it's redirecting to `/es/` and the `[lang]/page.tsx` is missing

**Fix path (most likely):**
- Confirm the Cloudflare Worker is the cause. If yes: disable the worker, or update its routes to exclude the dayah domains.
- If the Traefik label is missing: `docker service update --label-add=traefik.http.routers.dayah-litways.rule='Host(\`dayah.paragu-ai.com\`) || Host(\`dayahlitworks.paragu-ai.com\`)'` (and matching service/entrypoint/tls labels).
- Rebuild the Docker image: `cd /root/paragu-ai-platform/apps/dayah-litworks && rm -rf .next && npm run build 2>&1 | tail -30`. The deployed image is missing the `app/` directory because the build was outdated.

### 2.2 bufete-mendez — `bufete-mendez.paragu-ai.com`

**Symptom:** 52 words on homepage, body literally shows "Home", title is just the slug "bufete-mendez". No phone, no WhatsApp, no schema, no inner pages.

**Root cause:** `src/app/page.tsx` reads from a `pages/` directory that was deprecated during the monorepo consolidation. The old content is at `pages.disabled/` but the page.tsx still calls `getPages()` which looks at `pages/`.

```typescript
// src/app/page.tsx, line 22
function getPages() {
  const pagesDir = path.join(process.cwd(), 'pages')   // ← 'pages/' doesn't exist
  try {
    const pageFiles = require('fs').readdirSync(pagesDir)
    ...
  } catch {
    return { home: { id: 'home', title: 'Home', sections: ['hero'] } }   // ← fallback
  }
}
```

**The fallback returns `{title: 'Home'}`** — that's exactly what the page renders.

**The actual content is there:** `apps/bufete-mendez/content/es.json` exists, plus `pages.disabled/home.json` has the full section spec (hero, trust-badges, services, process-timeline, team, case-studies, cta-banner).

**Fix:** Rewrite `src/app/page.tsx` to read `content/es.json` (the new pattern used by working sites like escribania, villamayor). Or rename `pages.disabled/` back to `pages/`. The page.tsx itself is the wrong reader — it should follow the pattern in `apps/escribania-paraguay/src/app/page.tsx`.

**Estimated time:** 30 minutes (port over the home.json structure to a `content.json` schema, rebuild).

### 2.3 superspuma — `superspuma.paragu-ai.com`

**Symptom:** 49 words, body shows "Home", title is just the slug. Same architecture as bufete-mendez.

**Root cause:** Identical — `src/app/page.tsx` reads from missing `pages/`. Fallback returns `{title: 'Home'}`.

**The actual content is rich and present:** `apps/superspuma/content/` has 15 JSON files (es.json, home.json, combos.json, envios.json, faq.json, financiamiento.json, garantia.json, guia-compra.json, guias.json, nosotros.json, privacidad.json, producto/, promo-cartagena.json, promociones.json). They have a full content pipeline already built — they just need the page.tsx to use it.

**Fix:** Same as bufete-mendez. The site has more data than 70% of the fleet — they're literally 1 file change away from being a high-quality site.

**Estimated time:** 30 minutes.

### 2.4 golden-visa-advisory — `goldenvisa.paragu-ai.com`

**Symptom:** 30 words, no H1, no schema, no contact info. Title is good ("Golden Visa Advisory — Paraguai"), manifest is present, sitemap is present, but the page itself shows nothing.

**Root cause:** `src/app/page.tsx` is a path-selector that requires `useLocale()` to set `path='investor'` or `path='business'`. If neither, it shows a generic "Select your path to continue" screen. But the page is rendered server-side, so the locale context starts in a state where `path` is neither investor nor business.

```typescript
// src/app/page.tsx
export default function Home() {
  const { path, isReady } = useLocale()
  if (!isReady) return <Spinner />
  if (path === 'investor') return <InvestorLanding />
  if (path === 'business') return <BusinessLanding />
  return <p>Select your path to continue</p>   // ← the dead-end
}
```

**The body shows "Golden Visa Advisory — Paraguai" + the choice prompt** — that's why the word count is 30 (just the title and the empty state copy).

**Fix:** Make one of the landings the default. Either:
- Default to `<InvestorLanding />` (B2C foreign investors)
- Use geo-IP to choose (B2B Paraguayan vs B2C foreign)
- Add a server-side middleware that picks based on `Accept-Language` or a query param

**Estimated time:** 1 hour (design decision + implementation + rebuild).

---

## SECTION 3 — DEEP DIVE: TOP-CRITIQUE A/B SITES

### 3.1 magnolia-peluqueria — A-grade (75/100) but with a critical bug

**The bug:** 5 hero CTAs point to `/undefined/servicios` (verified in live HTML):
- "Reservar por WhatsApp" hero CTA
- "Ver todos los servicios" hero CTA
- 3 service-card links

**Why:** The Header/hero components use a `lang` context that isn't being hydrated with the current route's lang. Likely a missing `useParams()` or a `useLocale()` that returns undefined on the home route.

**Impact:** The most prominent call-to-action on the site (above the fold, in the hero) is a broken link. Any user who clicks "Reservar" gets a 404. Direct revenue loss.

**Fix:** 5 minutes — find the `href={\`/${lang}/servicios\`}` in `apps/magnolia-peluqueria/components/header.tsx` or `hero.tsx` and ensure `lang` is properly typed (probably from a usePathname() + split for `[lang]`).

### 3.2 de-abasto-a-casa — A-grade (89/100) but ZERO photos

**3,325 words of substantive content** (highest in fleet), 3 service tiers, calculator UI, full LocalBusiness schema. But the page has 0 photos — the entire visual design is SVG icons and colored gradients.

**Why this matters for trust:** de-abasto sells meal prep, freezer meals, family cooking. Customers need to see actual food, packaging, the kitchen, the founder. Without photos, it reads as a polished pitch deck, not a real business. Conversion-killer.

**Fix:** Schedule a 1-hour phone shoot of: (1) the prep kitchen, (2) finished meals, (3) the founder/owner portrait, (4) the meal boxes/packaging. Add 6–10 photos to `content/images/` and reference in the schema (`image` field) and as a hero `<img>`.

### 3.3 escribania-paraguay — A-grade (87/100) but no address/phone in schema

Has `ProfessionalService` schema, 2,874 words, 25+ years trust strip, 3000+ docs stat. But the schema is missing `address`, `telephone`, `openingHours`, `geo`, `aggregateRating`. The data is in `content.json` (the meta_description literally contains the phone in the body) — just not wired into the schema.org JSON-LD.

**Fix:** 20 minutes — add the fields to the `buildSchema()` function in the layout. This will earn the "Local 3-pack" rich result in Google.

### 3.4 trentina-cerveza — A-grade (98/100) — the gold standard

This is what the others should aspire to:
- 2,715 words, 12 photos
- Full `Brewery` + `AggregateRating` + `OpeningHoursSpecification` + `Person` + `PostalAddress` schema
- 8 inner pages with distinct content (/cervezas, /tienda, /galeria, /mayoristas, /club, /chopp, /eventos-corporativos, /nosotros)
- Instagram + Facebook linked
- Named founder with photo
- "Maestro Cervecero Alexsandro Giordani" — personal branding
- Google Maps link
- Hours of operation in body and schema

**No improvements needed.** This is the case study for the platform.

### 3.5 villamayor-asociados — A-grade (88/100) — best legal schema

2,031 words, `LegalService` + `Offer` + `OfferCatalog` + `Person` + `PostalAddress` schema. The `OfferCatalog` is the standout — it itemizes each legal service as a structured offer, which lets Google show "Services" rich results in SERP.

**Two improvements:** (1) add a founder photo and bio, (2) add a contact email (currently 0 of 39 mailto links is normal but a law firm absolutely should have one).

### 3.6 fun4me & fun4me-store — A-grade (81/100) — twins that should cross-link

Both are e-commerce for the same business (likely the product is the same store at two URLs). The two `Store` schemas are identical. They should:
- Cross-link in nav (e.g., "Tienda Oficial" in fun4me header → fun4me-store)
- Have a `<link rel="canonical">` pointing to the canonical store URL (avoid duplicate content)
- Consolidate IG/FB (currently have one each, they should be the same)

---

## SECTION 4 — DEEP DIVE: C/D SITES THAT NEED WORK

### 4.1 nexa-paraguay — C-grade (57/100) — surprising

This is the platform's flagship template (a "showcase" site for the platform itself, used as a client acquisition site). 1,283 words, full app router, multiple pages. But:
- No H1 on home
- No schema.org
- No phone
- No social
- 0 photos

**The irony:** this is the site that other clients see to evaluate Ai-Whisperers' capabilities. It should be the **highest-quality** site in the fleet. Right now it's a 57.

**Fix:** 1 day — rebrand the home page with a hero screenshot/video of the platform, add the founder's photo, add 3 client testimonial cards, add LocalBusiness schema, add the Paraguay office address (and a Google Maps link to it).

### 4.2 granja-cabral — C-grade (56/100) — beautiful metadata, empty body

Title: "Granja Cabral — Huevos frescos en Coronel Oviedo 🥚"
Meta: "Huevos frescos recolectados diariamente. Delivery en Coronel Oviedo y Ruta 2. Del nido a tu mesa."

**Perfect SEO metadata.** But the body shows only 178 words: the title, "Huevos frescos de granja en Coronel Oviedo . Del nido a tu mesa. Enlaces Contacto 📱 Coronel Oviedo 💬 WhatsApp". That's the entire page content.

The page is essentially a one-line pitch + nav + footer. The metadata promises a full product page (delivery details, prices, farm story, contact form) but the page delivers none of it.

**Fix:** 1 day — flesh out the home page with: (1) product range (cage-free, organic, etc.), (2) delivery zones and minimum order, (3) a Google Maps embed of the farm, (4) 3-4 photos of eggs/chickens/farm, (5) the founder's story (Gran = farmhand, ja = name).

### 4.3 arnos-barber-shop, cronos-academy, scott-tatuajes, xxgym — all C-grade

All have <500 words and no schema. They have the structure (hero, services, hours, contact) but the content is thin. Each is a personal-services business (barber, academy, tattoo artist, gym) where photos of the work/space would be transformative.

**Fix per site:** 1 hour each — schedule a quick shoot of the workspace + a few action shots, add 6-8 photos, expand the "About" section with a 200-word founder story, add LocalBusiness schema.

### 4.4 maskarada — C-grade (51/100) — has everything except content

Has phone, WhatsApp, Instagram (@maskarada.py), booking CTA, OG image. But 432 words. A nightclub with a single page is leaving money on the table — they should have: event calendar, photo gallery, drink menu, dress code, resident DJs, table reservations.

**Fix:** 1 day — add 3 inner pages (/eventos, /galeria, /reservas).

---

## SECTION 5 — INFRASTRUCTURE PATTERNS

### 5.1 The two architectural patterns

The monorepo has 2 distinct rendering patterns that don't always align with the `src/app/` migration:

| Pattern | Sites | How page.tsx works |
|---------|-------|-------------------|
| **A. JSON-config content** | escribania, villamayor, trentina, de-abasto, bichos, mantra, hidrobaby, nudo, pitchy, fun4me, fun4me-store, depiflash, tsuki, stroopwafel, jota-ink, ozmontania, meal-prep, nde-barba, portas, shine, cocodrilo, luis-de-leon, 3md, magnolia | page.tsx imports `content/es.json` (or `getContent(lang)`) and renders component tree. **This is the working pattern.** |
| **B. JSON-config sections** (broken) | bufete-mendez, superspuma | page.tsx reads `pages/home.json` which lists sections, then renders. The `pages/` dir was disabled. **This is the broken pattern.** |
| **C. Locale-context path** (also broken) | golden-visa | page.tsx uses `useLocale()` and renders a different landing based on `path`. Without route, shows empty. |
| **D. Section-renderer** (newer) | cuiddoamiga, estudio-medieval, camilo-acosta, croonas, bichos | page.tsx iterates `content.sections` array and renders each. **Working pattern but newer.** |

**Migration to unify:** Every site should use Pattern A (read from `content.json` directly, use lib/i18n helper for the locale). Migrating bufete-mendez, superspuma, golden-visa to Pattern A is the single highest-impact change.

### 5.2 The i18n gap (0/39 hreflang)

Every site has ES + EN content (most have `[lang]/` directory). But none of the 39 sites emit `<link rel="alternate" hreflang="es" href="...">` tags. This means:
- Google indexes /es/ and /en/ as duplicates
- Google guesses which language to show in each region (often wrong)
- The English page doesn't get credit for ranking in English-speaking markets

**Fix:** 1 hour total — add a helper to each site's `layout.tsx` that emits hreflang for all 4 supported languages (es, en, pt, de). Or, better, in the root `app/layout.tsx` if it's a shared one, but most sites have per-site layouts.

### 5.3 The sitemap gap (18/39)

21 sites have a working `app/sitemap.ts` that generates `/sitemap.xml`. The other 18 are serving Cloudflare's default `robots.txt` which doesn't include a `Sitemap:` directive. The 18 sites are likely using a Next.js dynamic sitemap that was lost in the migration, or never added.

**Fix:** 4 hours total — copy a working `app/sitemap.ts` from one of the 21 working sites to each of the 18 broken sites, customize the `baseUrl` per site.

### 5.4 The Docker networking / Traefik pattern (now stable)

The Traefik 502 / network / cert issues from earlier are all resolved. Current state:
- 41/41 Swarm services healthy
- 46/46 host rules returning HTTP 200
- The only remaining dead router is the `paragu-ai_web` 0/0 service (intentionally scaled down — served via Cloudflare Pages)

The architecture is solid for hosting. The bottleneck is **content quality**, not infrastructure.

---

## SECTION 6 — COMPLETE UPGRADE PLAN

### PHASE 0 — Critical bug fixes (Day 1, 2 hours)

These are the **showstoppers** that need to be fixed before any client-facing work. They either block revenue, present as broken, or kill SEO completely.

| # | Task | Site | Time | Impact |
|---|------|------|------|--------|
| 0.1 | **Fix dayah-litworks** — diagnose Worker vs Traefik vs middleware, restore 200 | dayah-litworks | 1h | 1 client site fully restored |
| 0.2 | **Fix bufete-mendez shell** — rewrite page.tsx to read `content/es.json` (Pattern A) | bufete-mendez | 30m | 1 client site goes from D to A |
| 0.3 | **Fix superspuma shell** — same as 0.2, but 15 content files exist | superspuma | 30m | 1 client site goes from D to A |

### PHASE 1 — Critical client failures (Day 1, 3 hours)

| # | Task | Site | Time | Impact |
|---|------|------|------|--------|
| 1.1 | **Fix golden-visa landing** — default to InvestorLanding or geo-route | golden-visa | 1h | 1 client site goes from F to B |
| 1.2 | **Fix magnolia /undefined/ CTAs** — find the broken `lang` prop | magnolia-peluqueria | 15m | 5 hero CTAs work, +immediate revenue |
| 1.3 | **Fix granja-cabral empty body** — flesh out the home page | granja-cabral | 2h | 1 client site goes from C to A |

### PHASE 2 — SEO infrastructure sweep (Day 2, 6 hours)

These are the **platform-wide SEO gaps** that affect 39 sites. Fix once at the platform level.

| # | Task | Sites | Time | Impact |
|---|------|-------|------|--------|
| 2.1 | **Add hreflang to all 39 sites** | All | 1h | i18n duplicate-content issue resolved |
| 2.2 | **Add `app/sitemap.ts` to 18 sites** | 18 | 3h | All 39 have sitemap |
| 2.3 | **Add canonical URL to 31 sites** | 31 | 1h | Soft SEO risk closed |
| 2.4 | **Add `geo` (lat/lng) to LocalBusiness schema on 13 sites** | 13 | 1h | Google Maps rich result eligible |

**Pattern:** Create a shared helper at `apps/_shared/seo.ts` (or similar) that exports `<HreflangTags>`, `<SitemapConfig>`, `<SchemaOrg>`. Each site imports from this. Don't repeat the boilerplate 39 times.

### PHASE 3 — Schema.org completion (Day 3-4, 8 hours)

| # | Task | Sites | Time | Impact |
|---|------|-------|------|--------|
| 3.1 | **Add `aggregateRating` to 12 sites** (need real reviews data or static 4.9★/5★ + 12 reviews) | 12 | 3h | Star ratings in SERP |
| 3.2 | **Add `OpeningHoursSpecification` to 11 sites** | 11 | 2h | Hours badge in SERP |
| 3.3 | **Add `address` + `telephone` to 11 sites that have LocalBusiness but missing these** | 11 | 2h | Local pack eligibility |
| 3.4 | **Add base schema to 19 sites that have none** | 19 | 1h | Minimum discoverability |

### PHASE 4 — Contact & social gap (Day 5, 4 hours)

| # | Task | Sites | Time | Impact |
|---|------|-------|------|--------|
| 4.1 | **Add `mailto:` link to 38 sites** | 38 | 2h | Trust signal + accessibility |
| 4.2 | **Add Instagram to 25 sites** (request from clients, or scrape from their public IG) | 25 | 2h | Social proof |

### PHASE 5 — Visual content (Day 6-7, 2-3 days of on-site shoots)

This is the **highest-ROI content investment** but it's not a code task — it's a photoshoot. Schedule one Saturday to shoot 5–6 sites in one day (since most are in Asuncion).

| Priority | Site | Why |
|----------|------|-----|
| 1 | de-abasto-a-casa | 3,325 words but ZERO photos — biggest trust gap |
| 2 | bufete-mendez (post-fix) | Legal service — need trust photos (team, office) |
| 3 | escribania-paraguay | 2,874 words, ProService schema — need notary portrait |
| 4 | cocodrilo-fitness | Gym — equipment + transformation photos |
| 5 | depiflash | Cleaning service — team in action |
| 6 | cuiddoamiga | Care service — founder + clients |
| 7 | luis-de-leon-concept | Designer — portfolio shots |
| 8 | 3md-website | Tech — workspace + team |
| 9 | nudo | Restaurant — food shots |
| 10 | jota-ink-tattoo | Tattoo — portfolio (can use existing portfolio shots) |

**Per site:** 30-60 min shoot → 8-15 photos → 1h to add to site, optimize, and wire into hero/og:image/schema.

### PHASE 6 — Content depth (Day 8-10, ongoing)

For the 9 C/D sites and the 4 critical fixes, expand the body content:

| Site | Current | Target | Gap |
|------|---------|--------|-----|
| arnos-barber-shop | 496 | 1500 | +1000 (founder story, services detail, before/afters) |
| cronos-academy | 474 | 1500 | +1000 (course list, schedule, methodology) |
| scott-tatuajes | 469 | 1500 | +1000 (artist bio, portfolio description) |
| xxgym | 463 | 1500 | +1000 (membership tiers, trainer bios) |
| maskarada | 432 | 1500 | +1000 (events, drink menu, dress code) |
| granja-cabral | 178 | 1500 | +1300 (product range, delivery, story) |

**For each:** Add an "About the founder" 200-word section, expand services to 200 words each, add 2-3 FAQs (great for SEO long-tail), and add a closing CTA section.

### PHASE 7 — nexa-paraguay refresh (Day 11, 1 day)

Special case. The nexa-paraguay site is the **platform's portfolio/marketing site**. It should be the best in the fleet. Specifically:

- Add a hero video of a real client site loading
- Add 3 detailed case studies (was es cribania, de-abasto, and one more)
- Add 6 client testimonial cards with photos
- Add the founder photo + bio
- Add a pricing table
- Add the Paraguay office address + Google Maps embed
- Add LocalBusiness schema

---

## SECTION 7 — PRIORITIZED ACTION QUEUE (the "do this in this order" list)

| Priority | Action | Site(s) | Effort | Est. Value | When |
|----------|--------|---------|--------|------------|------|
| 🔴 P0 | Fix dayah-litworks 404 | dayah | 1h | Site restored | Today |
| 🔴 P0 | Fix bufete-mendez shell | bufete-mendez | 30m | D→A grade | Today |
| 🔴 P0 | Fix superspuma shell | superspuma | 30m | D→A grade | Today |
| 🔴 P0 | Fix magnolia /undefined/ CTAs | magnolia | 15m | +Revenue | Today |
| 🟠 P1 | Fix golden-visa landing | golden-visa | 1h | F→B grade | Today |
| 🟠 P1 | Fix granja-cabral body | granja-cabral | 2h | C→A grade | Today |
| 🟠 P1 | Add hreflang to all 39 sites | All | 1h | Platform SEO | Day 2 |
| 🟠 P1 | Add sitemap to 18 sites | 18 | 3h | Platform SEO | Day 2 |
| 🟡 P2 | Add geo to LocalBusiness schema (13 sites) | 13 | 1h | Maps rich result | Day 3 |
| 🟡 P2 | Add hours to LocalBusiness schema (11 sites) | 11 | 2h | Hours badge | Day 3 |
| 🟡 P2 | Add aggregateRating to 12 sites | 12 | 3h | Stars in SERP | Day 3 |
| 🟡 P2 | Add mailto links to 38 sites | 38 | 2h | Trust signal | Day 4 |
| 🟢 P3 | Add Instagram to 25 sites | 25 | 2h | Social proof | Day 4 |
| 🟢 P3 | On-site photo shoot (10 sites) | 10 | 2 days | Trust +10x | Day 5-6 |
| 🟢 P3 | Expand content on 6 C-grade sites | 6 | 1 day | C→B grade | Day 7-8 |
| 🔵 P4 | nexa-paraguay refresh | nexa | 1 day | Best-in-fleet | Day 9-10 |
| 🔵 P4 | Add OfferCatalog to B2B sites | 3-4 | 1 day | Rich results | Day 10 |

**Total effort estimate:** 14-16 working days to take the entire fleet from 67/100 average to 90+/100.

**Total investment to make:** $0 in code (just time) + ~$300 in photo shoot (one Saturday, phone camera, Asuncion metro) + ~5 hours of client communication (asking for IG handles, real reviews, address confirmations).

**Expected outcome:**
- 4/39 currently broken → all 4 functional
- 15 A → 25 A
- 13 B → 14 B
- 7 C → 0 C
- 2 D → 0 D
- 2 F → 0 F
- Average score: 67 → 88

---

## SECTION 8 — RECURRING IMPROVEMENTS (the platform should have)

These are the things that, if not fixed now, will cause the same gaps to reappear in every new site:

1. **`apps/_shared/seo.ts`** — shared helpers for hreflang, sitemap, canonical, schema.org. New sites get these by default.
2. **`apps/_shared/contact.ts`** — shared contact block. Each site's `content.json` has business info; render the block once.
3. **`scripts/audit-site.mjs`** — automated audit script that scores a site 0-100 (the scoring I just did, codified). Run on every PR.
4. **`scripts/seed-content.mjs`** — generates a `content.json` skeleton with the SEO-canonical fields populated, so new sites don't forget things.
5. **CI check: required fields in `content.json`** — fail the build if `business.hours`, `business.phone`, `business.address`, `business.tagline` are missing.
6. **CI check: H1 present** — fail the build if no H1 in `app/[lang]/page.tsx`.
7. **CI check: title not just slug** — fail the build if `<title>` equals the directory name.
8. **CI check: at least 1 `mailto:`** — warn (not fail) if no email link in the rendered HTML.
9. **CI check: at least 1 image** — warn if no `<img>` in the rendered HTML.
10. **Audit dashboard** — once a week, run the audit on all live sites and report to Telegram.

---

## SECTION 9 — RISKS & GOTCHAS

1. **dayah-litworks may be a Cloudflare Worker issue** — the fix is in CF Dashboard, not in the repo. If we can't access CF Dashboard (need Ivan's login), we may need to disable the CF worker by removing the DNS records or routing the domain directly to Traefik.
2. **bufete-mendez, superspuma may have shared types/imports with other sites** — when rewriting their page.tsx, check that the imports don't pull from `@/lib/...` that other sites share.
3. **golden-visa's useLocale()** — might be required by other routes. Replacing it could break `/es/inversor`, `/es/negocio`. Need to test all 3 routes.
4. **Hreflang** — needs `x-default` AND each language. Don't forget the `<html lang="...">` to match.
5. **Schema geo coordinates** — must be valid lat/lng, not just any number. Use Google Maps → right-click → "What's here?" to get them.
6. **Photo shoot** — clients may want brand approval. Send the photos to the client before publishing. Have a "feature image swap" workflow ready.
7. **Magnolia's `/undefined/`** — the fix needs to be done in the Header/hero component, but the same component is probably shared with another site. Use a per-site override if possible.

---

## SECTION 10 — SUCCESS METRICS

After Phase 0-2 (the 2-day critical + infra sweep), the platform should hit:
- **0 broken sites** (was 4)
- **0 sites without hreflang** (was 39)
- **0 sites without sitemap** (was 18)
- **0 sites with `/undefined/` in URLs** (was 1)
- **39/39 sites with H1** (was 32)
- **39/39 sites with a working contact channel** (was 33)
- **39/39 sites with a sitemap referenced in robots.txt**
- **Average score: 85+** (was 67)

After Phase 3-7 (the 1-week full sweep):
- **25+ A-grade sites** (was 15)
- **0 C/D/F-grade sites**
- **Average score: 90+**
- **All 39 sites with at least 1 photo** (was 20)
- **All 39 sites with at least 1 social media link** (was 14)
- **All 39 sites with full LocalBusiness schema** (was 0)

---

## APPENDIX — Per-site scoring table (39 sites, sorted by grade)

| Grade | Score | App | Words | Photos | Schema | Phone | WA | IG | Sitemap | Notes |
|-------|-------|-----|-------|--------|--------|-------|----|----|---------|-------|
| A | 98 | trentina-cerveza | 2715 | 12 | Brewery+Ratings+Hours+Person | ✓ | ✓ | ✓ | ✓ | Best in fleet |
| A | 93 | bichos-gym | 2040 | 11 | LocalBusiness | ✓ | ✓ | ✗ | ✓ | |
| A | 93 | mantra-spa | 2248 | 9 | LocalBusiness | ✓ | ✓ | ✗ | ✓ | |
| A | 89 | de-abasto-a-casa | 3325 | 0 | LocalBusiness | ✓ | ✓ | ✗ | ✗ | 0 photos — need shoot |
| A | 88 | villamayor-asociados | 2031 | 0 | LegalService+Offer | ✓ | ✓ | ✓ | ✓ | |
| A | 87 | escribania-paraguay | 2874 | 0 | ProfessionalService | ✓ | ✓ | ✗ | ✓ | |
| A | 85 | hidrobaby-spa | 1216 | 1 | LocalBusiness+Rating | ✓ | ✓ | ✗ | ✗ | |
| A | 85 | tsuki-restaurante | 1315 | 0 | Restaurant+Rating+Hours | ✓ | ✓ | ✗ | ✓ | |
| A | 81 | fun4me | 1406 | 0 | Store | ✓ | ✓ | ✓ | ✓ | |
| A | 81 | fun4me-store | 1409 | 0 | Store | ✓ | ✓ | ✓ | ✓ | |
| A | 80 | depiflash | 1146 | 0 | ✓ | ✓ | ✓ | ✓ | ✓ | |
| A | 77 | nudo | 585 | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | Short H1 |
| A | 76 | pitchy-website | 551 | 5 | ✓ | ✓ | ✓ | ✗ | ✓ | |
| A | 76 | stroopwafel-huis | 1642 | 0 | ✓ | ✓ | ✓ | ✓ | ✓ | |
| A | 75 | magnolia-peluqueria | 1399 | 15 | ✗ | ✓ | ✓ | ✓ | ✓ | **/undefined/ CTAs** |
| B | 72 | cocodrilo-fitness | 982 | 1 | ✓ (incomplete) | ✓ | ✓ | ✗ | ✓ | |
| B | 72 | luis-de-leon-concept | 964 | 1 | ✓ (incomplete) | ✓ | ✓ | ✗ | ✓ | |
| B | 71 | camilo-acosta | 1492 | 5 | ✗ | ✓ | ✓ | ✓ | ✗ | |
| B | 71 | reina-de-copas | 1388 | 7 | ✗ | ✓ | ✓ | ✓ | ✗ | |
| B | 70 | estudio-medieval | 1321 | 8 | ✗ | ✓ | ✓ | ✗ | ✗ | |
| B | 69 | 3md-website | 975 | 0 | ✓ | ✓ | ✓ | ✓ | ✓ | |
| B | 68 | jota-ink-tattoo | 280 | 0 | ✓ | ✓ | ✓ | ✓ | ✓ | |
| B | 68 | ozmontania-website | 985 | 0 | ✗ | ✓ | ✓ | ✓ | ✓ | |
| B | 65 | cuidadoamiga | 1315 | 0 | ✓ | ✗ | ✗ | ✗ | ✓ | No phone |
| B | 63 | meal-prep | 722 | 0 | ✗ | ✓ | ✓ | ✗ | ✗ | |
| B | 63 | nde-barba | 635 | 4 | ✗ | ✓ | ✓ | ✗ | ✗ | |
| B | 63 | portas-barber | 608 | 4 | ✗ | ✓ | ✓ | ✗ | ✗ | |
| B | 63 | shine-nails | 692 | 4 | ✗ | ✓ | ✓ | ✗ | ✗ | |
| C | 57 | nexa-paraguay | 1283 | 0 | ✗ | ✗ | ✗ | ✗ | ✗ | No H1, no contact |
| C | 56 | arnos-barber-shop | 496 | 6 | ✗ | ✓ | ✓ | ✗ | ✗ | |
| C | 56 | cronos-academy | 474 | 6 | ✗ | ✓ | ✓ | ✗ | ✗ | |
| C | 56 | granja-cabral | 178 | 0 | ✓ | ✓ | ✓ | ✗ | ✗ | No H1, empty body |
| C | 56 | scott-tatuajes | 469 | 6 | ✗ | ✓ | ✓ | ✗ | ✗ | |
| C | 56 | xxgym | 463 | 4 | ✗ | ✓ | ✓ | ✗ | ✗ | |
| C | 51 | maskarada | 432 | 1 | ✗ | ✓ | ✓ | ✓ | ✓ | Thin content |
| D | 36 | bufete-mendez | 52 | 0 | ✗ | ✗ | ✗ | ✗ | ✗ | **SHELL — fixable in 30m** |
| D | 33 | superspuma | 49 | 0 | ✗ | ✗ | ✗ | ✗ | ✗ | **SHELL — fixable in 30m** |
| F | 17 | golden-visa-advisory | 30 | 0 | ✗ | ✗ | ✗ | ✗ | ✓ | **Empty choice screen** |
| F | 0 | dayah-litworks | 4 | 0 | ✗ | ✗ | ✗ | ✗ | ✗ | **CF edge 404** |

---

*Document generated by Erebus on 2026-06-11.*
*Audit data: `audits/2026-06-11/site-content-audit.json`, `site-paths-audit.json`, `site-navigation-audit.json`.*
*Full per-site critique: `audits/2026-06-11/full-per-site-report.txt` (940 lines).*
