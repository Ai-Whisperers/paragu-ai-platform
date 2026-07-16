# 🔥 Critical Analysis — ometzdental.com (Dra. Gabriella)

**Goal:** Comprehensive critique from designer + AI-engineer + WCAG-auditor perspectives. Luana's next pass on the live site should be confirmation/sign-off, not new work.

**Date:** 2026-07-06
**Audited by:** Erebus (design-bot profile)
**Method:** Read all components, all content JSON, live HTML, JSON-LD, design tokens, theme system, and recent commits. Did NOT run visual screenshot diff (Playwright not in env).

---

## Severity legend
- 🔴 **CRITICAL** — visible to users, breaks trust/SEO/UX immediately
- 🟠 **HIGH** — degrades experience, catches Luana's eye, fix within week
- 🟡 **MEDIUM** — polish, won't cause user loss but feels unfinished
- 🟢 **LOW** — nice-to-have, no impact today

---

## 1. Content integrity (8 issues)

### 🔴 1.1 — Fabricated JSON-LD `aggregateRating` (legal + Google penalty risk)
**File:** `components/SchemaOrg.tsx` or wherever generated (likely `app/actions.ts` / `lib/seo.ts`)
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "20",
  "bestRating": "5",
  "worstRating": "1"
}
```
**Problem:** Google Business Profile doesn't show 20 reviews. This is fabricated structured data. Google can issue manual action penalties for fake reviews in structured data. Also violates FTC guidelines.
**Fix:**
- Option A: Remove `aggregateRating` block entirely (truthful but loses rich-result snippet)
- Option B: Only show if Gaby's Google Business Profile genuinely has 20+ reviews (verify in GBP dashboard)
- **Recommended:** A, with note to add later when reviews exist

### 🔴 1.2 — Fabricated phone number in JSON-LD
```json
"telephone": "+595****6759"
```
**Problem:** That's a placeholder pattern (`****` mask), not a real number. Google rejects this; users clicking "Call" in rich results get an error.
**Fix:** Replace with Gaby's real WhatsApp Business number (the one she gives patients). If not ready, remove `telephone` from schema.

### 🟠 1.3 — Placeholder text in user-facing copy (5 instances)
**Found by grep:**
- `content/en/clinic.json:8` — "The exact street is confirme[d]"
- `content/en/contact.json:48` — "The exact street..." (resolved? need to check current text)
- `content/en/privacy.json:9` — `"RUC: Pending registration"`
- `content/es/clinic.json:8` — "La calle exacta se confirma antes de la apertura formal"
- `content/es/contacto.json:48` — "calle exacta..." (likely duplicate of EN)
- `content/es/privacidad.json:9` — "Pendiente"

**Problem:** Luana's Rule 1 (placeholder-content-and-visual-polish): users see unfinished business info. For a **dentist practice that's actively taking patients**, this is reputation damage.
**Fix:**
- Update with the **real street address** (Auditores de la Guerra del Chaco 617 — this IS in the JSON-LD already, so the street is known, just the clinic.json/contact.json have stale placeholder copy)
- Replace "Pending RUC" with the actual RUC or remove the field
- Same for ES counterparts
- Use `cleanBusinessField()` helper from `placeholder-content-and-visual-polish` reference

### 🟠 1.4 — Two parallel routes per page (16 stub pages)
**Files:** `app/[locale]/{nosotros,clinica,contacto,precios,preguntas,filosofia,primera-visita,servicios,opiniones,seguros,segunda-opinion,terminos,privacidad,proceso,derechos-paciente,ajustes}/page.tsx`

**Each is 83–579 bytes — these are stubs that don't render full content.** Examples:
- `nosotros/page.tsx` (579 bytes)
- `clinica/page.tsx` (479 bytes)
- `precios/page.tsx` (481 bytes)

**Problem:**
- 16 stub pages confuse Google (duplicate content with the canonical EN routes)
- Spanish-speaking users on social media sharing `/es/precios` get a broken/stub page
- Maintenance burden — content must exist in two places
- Lighthouse/SEO penalties for thin content

**Fix:**
- Audit each stub — does it redirect to `/es/<english-slug>`? Or render the same content via locale?
- Best: **delete the stubs**, add a `[locale]/es/[...slug]` rewrite that routes `/es/precios` → `/es/pricing`
- OR: convert each stub to a full page that imports from the EN version and just translates JSON
- **Recommended:** Rewrite as i18n route — `[locale]/(localized)/[slug]/page.tsx` shared by both locales

### 🟠 1.5 — Live page HTML shows `WhatsApp goes live when the practice opens`
**Found:** in HTML (the rendered page):
```html
<span>WhatsApp goes live when the practice opens. In the meantime, email me at</span>
<a href="mailto:doctora.gabi@ometzdental.com.py">doctora.gabi@ometzdental.com.py</a>
```
**Problem:** If the practice is OPEN and taking patients, "WhatsApp goes live when practice opens" is a contradiction. Either:
- (a) Practice is still pre-launch — fine, but say so clearly elsewhere too
- (b) Practice IS open and this copy is stale — critical
**Fix:** Verify with Gaby. Either remove the "in the meantime" clause or confirm pre-launch.

### 🟡 1.6 — Three FAQ JSONs, one schema (`faqs.json`, `home-faq.json`, `ld-faq.json`)
**Found:** All three exist with overlapping content. Unclear which renders where.
- `faqs.json` (5.9KB) — likely the dedicated FAQ page
- `home-faq.json` (1.7KB) — likely the homepage section
- `ld-faq.json` (2KB) — likely LocalBusiness FAQ schema
**Problem:** Content drift risk. Should clearly document which is for what, or consolidate.
**Fix:** Add a `_usage` field to each JSON explaining its renderer. Or add an ESLint rule that fails if JSON has duplicate `question` strings across the three files.

### 🟡 1.7 — Blog has 3 posts declared but unclear if rendered
**Found:** `content/en/blog.json` has 3 posts declared. `/blog/[slug]/page.tsx` exists. But `lib/content.ts` may not surface them.
**Problem:** Either working (verify) or hidden.
**Fix:** curl `/en/blog` and verify 3 posts visible. If not, fix the loader.

### 🟢 1.8 — Testimonials: stars rendered as `fill-gold text-gold` SVGs
**Found:** Multiple star SVGs in HTML. Each is a `<svg class="lucide-star w-3.5 h-3.5 fill-gold text-gold">`.
**Problem:** Luana Rule 1: gold is decorative-only. **But** — for star icons, gold IS the semantic color (it's literally a star rating). The rule applies to functional UI text/icons, not symbol icons that represent value.
**Verdict:** Keep as-is. This is correct usage. Add comment in code so future devs don't second-guess.

---

## 2. WCAG / Accessibility (6 issues)

### 🟠 2.1 — Gold on soft in actual rendered Hero (Luana Rule 1 violation)
**Found in live HTML:**
```html
<a href="mailto:doctora.gabi@ometzdental.com.py" class="text-gold-soft font-medium hover:underline">
  doctora.gabi@ometzdental.com.py
</a>
```
**Context:** Renders on dark navy hero band, so `text-gold-soft` (light yellow) on dark navy = HIGH CONTRAST (looks fine).
**But also:**
```html
<div class="w-12 h-12 rounded-xl bg-gold flex items-center justify-center flex-shrink-0 shadow-lg">
  <svg ... class="lucide lucide-shield w-6 h-6 text-accent">  <!-- accent icon on gold bg -->
```
**Verdict:** Acceptable — gold as background with accent icon on top reads as "premium highlight". The violation would be `text-gold` on `bg-gold-soft` (text on light bg). Verify with validator.

### 🟠 2.2 — Skip-to-content link present but probably invisible
**Found:** `<a href="#main-content" class="skip-to-content">Skip to main content</a>`
**Problem:** Most "skip-to-content" implementations clip the link off-screen until focused. Verify this works — if `skip-to-content` only shows when `:focus`, that's WCAG-correct. If it's permanently invisible, that's a violation.

### 🟠 2.3 — `aria-roledescription="carousel"` on hero, but is it actually a carousel?
**Found:** `aria-roledescription="carousel"` on hero `role="region"`.
**Problem:** If the hero isn't keyboard-navigable as a carousel (no arrow keys, no pause button), the ARIA semantics are wrong. WCAG 4.1.2.
**Fix:** Either implement full carousel keyboard support OR remove `aria-roledescription="carousel"` and use `role="banner"` or just `<section>`.

### 🟡 2.4 — `prefers-reduced-motion` not visibly respected
**Problem:** Animations like `animate-fade-in`, `animate-fade-in-up`, `animate-wipe` likely have no `@media (prefers-reduced-motion: reduce)` override.
**Fix:** Audit `globals.css` animations + add `@media (prefers-reduced-motion: reduce) { .animate-* { animation: none; } }`.

### 🟡 2.5 — `CookieConsent` component visibility
**Found:** `components/CookieConsent.tsx` (4KB) exists.
**Fix:** Verify GDPR/cookie banner shows on first visit, can be dismissed, preference persists. WCAG requires consent UX to be keyboard-accessible.

### 🟢 2.6 — Language switcher EN/ES in navbar uses `<a>` not `<button>`
**Found:** `<a aria-current="page">EN</a>` and `<a>ES</a>`.
**Problem:** Minor — semantically a link to a different language version is fine, but mixing with navigation links is confusing. WCAG-OK, just polish.

---

## 3. Design system / visual hierarchy (12 issues)

### 🟠 3.1 — Token sync gap (design-bot auto-detected this)
**Finding:** `content/tokens.json` has 8 top-level keys: `description`, `palettes`, `defaultPalette`, `theme`, `typography`, etc. But `globals.css` uses **different token names** like `--color-accent`, `--color-fg`, `--ocean-1` (not the `palettes.{name}.colors.{role}` shape in tokens.json).
**Problem:** `tokens.json` is **orphaned** — auto-generated from my generate-tokens script but doesn't match the actual CSS source-of-truth. This is exactly the kind of drift the tokens.json was meant to prevent.
**Fix:**
- Option A: Rebuild tokens.json from `globals.css` (using my `generate_tokens.py` with the Gaby handoff as source — already done, but the existing tokens.json is from an older flow)
- Option B: Delete the old tokens.json and use only the one in `client-context/tokens.json` (which I generated today)
- **Recommended:** B + verify `lib/content.ts` or theme provider reads from the right location

### 🟠 3.2 — ThemeSwitcher (floating) might overlap with MobileStickyCta
**Found:**
- ThemeSwitcher: `fixed bottom-24 right-4 z-40`
- MobileStickyCta: also `fixed` + `sticky`
**Problem:** Both at bottom-right. On mobile, the CTA could block the theme switcher button, or vice versa. Either theme button gets hidden, or user can't dismiss CTA.
**Fix:** Either move ThemeSwitcher to `bottom-32 right-4` (above CTA) or `top-20 right-4` (top-right corner). Verify on actual device.

### 🟠 3.3 — Multiple section CSS animation classes but no shared definition
**Found:** `animate-fade-in`, `animate-fade-in-up`, `animate-fade-in-up-delay`, `animate-fade-in-up-delay-2`, `animate-fade-in-up-delay-3`, `animate-wipe`, `animate-slide-up`, `animate-loading-bar`, `animate-shimmer` referenced in HTML
**Problem:** Need to verify all keyframes exist in globals.css. If any are missing, Tailwind v4 silent-no-op trap kicks in — class in HTML, no styles generated.
**Fix:** Run `wcag_audit.py` + `tailwind-v4-silent-noop-trap` diagnostic on every page that uses these classes.

### 🟠 3.4 — `.tone-ocean-N` classes used in JSX — verify they exist
**Found:** `class="relative overflow-hidden min-h-[680px] lg:min-h-[760px] flex items-center tone-ocean-1"` in Hero.
**Problem:** Per commit `2e5f955` (the fix), tone-ocean classes are defined via `@theme { --ocean-N: ... }` + custom CSS. If Tailwind v4 didn't generate them (silent no-op), the section loses its ocean background.
**Fix:** Verify in browser DevTools — is `.tone-ocean-1` applying? If yes, ok. If no, debug.

### 🟡 3.5 — Theme switcher button (`fixed bottom-24`) might overlap with CookieConsent
**Fix:** Same as 3.2 — check z-index stack.

### 🟡 3.6 — Hero H1 (`text-7xl` desktop) → mobile variant
**Found:** `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` for H1, lead text clamp. OK responsive.
**But:** verify Hero portrait (right column on desktop, hidden mobile?) — should it show on mobile at all, or only as decorative element?

### 🟡 3.7 — Navbar EN/ES language switcher styled as buttons
**Found:** Looks OK but on mobile drawer (burger menu), is the language switcher accessible? Need to verify mobile menu includes it.

### 🟡 3.8 — Footer has 7.5KB — likely crammed with links
**Fix:** Verify Footer has proper hierarchy: brand → sections → contact → legal → social. Not just a wall of links.

### 🟡 3.9 — BackToTop button visibility
**Found:** `components/BackToTop.tsx` (1.1KB) — exists.
**Fix:** Verify it shows after scroll threshold, has accessible label, doesn't conflict with theme switcher position.

### 🟡 3.10 — ScrollReveal component (likely custom IntersectionObserver)
**Found:** `components/ScrollReveal.tsx` (2.9KB).
**Fix:** Verify it respects `prefers-reduced-motion`, doesn't add layout shift, has fallback for SSR.

### 🟢 3.11 — Blob component (decorative gradient blob)
**Found:** `components/Blob.tsx` (1.5KB).
**Verdict:** Likely fine. Verify it has `aria-hidden="true"` since it's pure decoration.

### 🟢 3.12 — Schema.org component
**Found:** `components/SchemaOrg.tsx` (3.8KB).
**Fix:** Verify the 3 fabricated-data issues (#1.1, #1.2, #1.5) get fixed at the source.

---

## 4. SEO / discoverability (5 issues)

### 🔴 4.1 — Canonical URL is `dragabriela.paragu-ai.com`, but live is `ometzdental.com`
**Found:**
```html
<link rel="canonical" href="https://dragabriela.paragu-ai.com/en" />
<link rel="alternate" hrefLang="en" href="https://dragabriela.paragu-ai.com/en" />
<link rel="alternate" hrefLang="es" href="https://dragabriela.paragu-ai.com/en" />
```
**Problem:** Google will index the `paragu-ai.com` subdomain, NOT the `ometzdental.com` domain the user actually visits. Two duplicate-content sites competing in search. SEO split.
**Fix:**
- Either: canonical points to `ometzdental.com` (preferred — that's the brand domain)
- Or: redirect `ometzdental.com` → `dragabriela.paragu-ai.com` (lose brand domain)
- Update `app/sitemap.ts` + `app/robots.ts` + `lib/seo.ts`

### 🟠 4.2 — Sitemap likely lists 16 stub pages
**Found:** `app/sitemap.ts` exists.
**Fix:** After fixing #1.4 (stub pages), regenerate sitemap to exclude them.

### 🟠 4.3 — robots.txt needs review
**Found:** `app/robots.ts` exists.
**Fix:** Verify it allows indexing of the canonical domain, blocks `/themes` (preview-only page).

### 🟡 4.4 — OG image per page — verify all have distinct OG images
**Found:** 24 distinct OG images in `/public/og/` (og-home, og-about, og-blog-X, og-services-X). Good.
**But:** `/themes` page should NOT have a unique OG (it's preview-only). Verify.

### 🟡 4.5 — Keywords meta present but possibly thin
**Found:** `keywords: "dentista Asunción,dental Paraguay,English dentist Paraguay,second opinion dental,dental implants Paraguay,odontóloga bilingüe Asunción"`
**Fix:** Verify each keyword actually has a corresponding landing page. "dental implants Paraguay" — does the site have an implants landing page? If not, drop or build.

---

## 5. Performance (5 issues)

### 🟡 5.1 — Hero image preload chain
**Found:** `<link rel="preload" as="image" imageSrcSet="..." imageSizes="...">` for `dra-gp-portrait-v2.svg`
**Problem:** SVG doesn't need srcset — that's for raster. Fix the preload.

### 🟡 5.2 — Multiple preloaded fonts (3 fonts at once)
**Found:** `dm_serif_display`, `inter`, `caveat` preloaded.
**Problem:** 3 fonts × multiple weights is ~150-200KB of font data. If Caveat is only used on one section, lazy-load it.
**Fix:** Audit Caveat usage. If only in 1-2 places, move to dynamic import.

### 🟡 5.3 — Service Worker (`sw.js`) caching behavior
**Found:** `public/sw.js` exists.
**Fix:** Verify cache strategy doesn't break deploys (old SW serving stale HTML).

### 🟡 5.4 — ServiceDetail.tsx is 18.9KB
**Found:** Largest component file.
**Fix:** Profile — is it doing too much? Could split into ServiceHero, ServiceBody, ServiceFaq, ServicePricing.

### 🟢 5.5 — Lazy-load Blog posts
**Found:** 3 blog posts declared.
**Fix:** Use Next.js dynamic imports for blog post body to avoid loading all 3 on index page.

---

## 6. Code health / maintainability (8 issues)

### 🟠 6.1 — Duplicate EN/ES page stubs (see #1.4)
**Fix:** Same as #1.4.

### 🟠 6.2 — Three FAQ JSON files (see #1.6)
**Fix:** Same as #1.6.

### 🟠 6.3 — `lib/content.ts` and `lib/brand.ts` and `lib/seo.ts` likely have overlapping responsibilities
**Fix:** Audit responsibilities. Should be:
- `lib/content.ts` — load + cache + i18n-substitute content
- `lib/brand.ts` — business name, contact, social
- `lib/seo.ts` — generate metadata, JSON-LD

### 🟡 6.4 — `components/README.md` (4.6KB) exists but may be stale
**Fix:** Update or remove.

### 🟡 6.5 — actions.ts + newsletter-action.ts — server actions split
**Fix:** Consolidate or document the split.

### 🟡 6.6 — Public assets: 24 OG images, 3 hero images, 5 service images
**Fix:** Audit which are actually used. PNG→WebP conversion if not done (per `placeholder-content-and-visual-polish` reference).

### 🟡 6.7 — `audio/README.md` — empty audio dir?
**Fix:** Either add real audio assets (Luana's "I listen" voice?) or remove.

### 🟢 6.8 — `manifest.json` PWA config
**Fix:** Verify it's complete (icons, theme color, name match site.json).

---

## 7. Brand consistency / Luana's eye (10 issues)

### 🟠 7.1 — Gold used on functional UI (Luana Rule 1) — verify & remove
**Found in HTML:**
- `<a class="text-gold-soft">` — text on dark band (acceptable, light on dark = high contrast)
- `<div class="bg-gold">` containing `<svg class="text-accent">` icon — accent icon on gold bg (acceptable, accent readable on gold)
- `<svg class="fill-gold text-gold">` for stars — symbol icons, semantically gold (acceptable)
**Verdict:** All current uses pass Rule 1 if interpreted as "decorative gold on dark / symbol-gold". But Luana might disagree. Need her confirmation.

### 🟠 7.2 — `text-gold-soft` on text-over-light-bg pattern — search for violations
**Action:** grep `text-gold ` in all `.tsx` files. Should NOT appear on body text.

### 🟠 7.3 — Both EN and ES /pricing pages exist (pricing.js = 5.9KB, precios.json = 5.5KB)
**Note:** Both EN `pricing.json` and ES `precios.json` exist (good — same size, parallel content). But the page stub `/es/precios/page.tsx` (481 bytes) is a stub. Fix #1.4 fixes this.

### 🟡 7.4 — Hero `BilingualBand` placement above H1
**Found:** Bilingual band shows "Care in English and Spanish · Asunción, Paraguay" before the main H1.
**Verdict:** Works as a "we speak your language" signal. Keep but verify not visually competing with H1.

### 🟡 7.5 — `aa-controls-item` ("I listen / You control the pace / If you need to stop, we stop") pills
**Found:** Above H1 in hero.
**Verdict:** Excellent for anxious-patient persona. Keep but verify font sizing and pill padding on mobile.

### 🟡 7.6 — `VoiceDoctor` section: video or text?
**Found:** `components/sections/VoiceDoctor.tsx` (not yet read).
**Fix:** Verify it's a voice memo / audio clip, not just text styled as "voice". Per Luana's anti-anxiety brand.

### 🟡 7.7 — `AnxietyPersonas` section
**Found:** `components/sections/AnxietyPersonas.tsx`.
**Fix:** Verify the 3 personas are actually distinct + relatable, not generic.

### 🟡 7.8 — `SedationSection` and its relationship to anxiety
**Found:** `components/sections/SedationSection.tsx` (referenced in content/es/sedation-section.json).
**Fix:** Verify cross-linking between Anxiety → Sedation → FAQ.

### 🟡 7.9 — `Reasons` and `WhyDifferent` sections — overlap?
**Found:** Both exist.
**Fix:** Verify they don't duplicate content. If overlapping, merge.

### 🟢 7.10 — `Stats` section content
**Found:** `content/en/stats.json` (801 bytes).
**Fix:** Verify stats are TRUE numbers, not aspirational.

---

## 8. Process / ops (4 issues)

### 🟠 8.1 — Pre-commit hook not enforcing visual changes
**Found:** Hook installed at `/root/paragu-ai-platform/.git/hooks/pre-commit` (installed today). But base-url is hardcoded to `ometzdental.com/en` — won't help Gaby's other apps.
**Fix:** Either per-app base-url config or accept that the hook only checks ometzdental.com.

### 🟡 8.2 — `deploy.sh` exists but should be versioned with the app
**Fix:** Verify it's in the app dir, not repo root.

### 🟡 8.3 — No clear "what changed" log between deploys
**Fix:** Per `multi-client-billing-timesheet` workflow, all visual changes should land in `docs/trabajos/<date>_<designer>_<scope>.md`. Today we have only `2026-07-04_luana-paleta-second-opinion.md`. Need a similar log for the upcoming beautification pass.

### 🟢 8.4 — Cron job `weekly-design-audit` registered (today) — verify it actually runs

---

# 📋 Master TODO (Luana-loop ready)

This is the work order for the next beautification pass. Each item is **autonomously completable** by AI agents with the right skills loaded. Items marked `[Luana]` need her final visual judgment.

## Phase 1 — Critical (must fix before next deploy)
- [ ] **1.1** [AI] Fix JSON-LD `aggregateRating` — remove fabricated 4.9/20 rating
- [ ] **1.2** [AI] Fix JSON-LD `telephone: "+595****6759"` — use real number or remove field
- [ ] **1.4** [AI] Convert 16 duplicate stub pages to i18n routes (delete `/es/<es-slug>` stubs, route via Next.js i18n)
- [ ] **1.5** [AI] Verify "WhatsApp goes live" copy is current or remove
- [ ] **4.1** [AI] Fix canonical URL — point to `ometzdental.com` not `dragabriela.paragu-ai.com`
- [ ] **3.4** [AI] Verify `.tone-ocean-1` classes apply on live (run silent-noop-trap diagnostic)
- [ ] **3.2** [AI] Verify ThemeSwitcher doesn't overlap MobileStickyCta — measure on viewport 375x812

## Phase 2 — High (within 1 week)
- [ ] **1.3** [AI] Replace 5 placeholder copy instances with real address + RUC
- [ ] **1.6** [AI] Document which of `faqs.json`/`home-faq.json`/`ld-faq.json` is for what
- [ ] **1.7** [AI] Verify blog 3 posts render on `/blog` page
- [ ] **2.1** [Luana] Verify gold-on-soft uses are all OK (Rule 1)
- [ ] **2.3** [AI] Fix `aria-roledescription="carousel"` on Hero (implement keyboard nav OR remove)
- [ ] **2.4** [AI] Add `prefers-reduced-motion` overrides to all `animate-*` classes
- [ ] **3.1** [AI] Reconcile `content/tokens.json` with `globals.css` (delete orphan or regenerate from handoff)
- [ ] **3.3** [AI] Verify all `animate-*` keyframes exist in globals.css (silent-noop sweep)
- [ ] **5.1** [AI] Fix Hero image preload — remove srcset from SVG
- [ ] **6.1** [AI] Same as 1.4
- [ ] **8.1** [AI] Make pre-commit base-url per-app

## Phase 3 — Medium (next 2 weeks, polish pass)
- [ ] **1.8** [Luana] Confirm star icons in `fill-gold text-gold` are intentional
- [ ] **2.2** [AI] Test skip-to-content visibility (focused vs always-hidden)
- [ ] **2.5** [AI] Audit CookieConsent keyboard accessibility
- [ ] **2.6** [AI] Verify language switcher in mobile drawer
- [ ] **3.5** [AI] Check ThemeSwitcher vs CookieConsent z-index stack
- [ ] **3.6** [AI] Hero portrait mobile — show or hide?
- [ ] **3.7** [AI] Mobile drawer includes language switcher?
- [ ] **3.8** [AI] Footer hierarchy review (brand → sections → contact → legal → social)
- [ ] **3.9** [AI] BackToTop scroll threshold + accessible label
- [ ] **3.10** [AI] ScrollReveal respects reduced-motion, no CLS
- [ ] **3.11** [AI] Blob has `aria-hidden="true"`
- [ ] **4.2** [AI] Regenerate sitemap after stub-page cleanup
- [ ] **4.3** [AI] Audit robots.txt
- [ ] **4.4** [AI] `/themes` should NOT have unique OG image
- [ ] **4.5** [AI] Verify keywords have matching landing pages
- [ ] **5.2** [AI] Caveat font lazy-load (only used in 1-2 places?)
- [ ] **5.3** [AI] SW.js cache strategy doesn't break deploys
- [ ] **5.4** [AI] Split ServiceDetail.tsx (18.9KB → 4 components)
- [ ] **5.5** [AI] Dynamic import blog post bodies
- [ ] **6.2** [AI] Same as 1.6
- [ ] **6.3** [AI] Audit content.ts/brand.ts/seo.ts responsibilities
- [ ] **6.4** [AI] components/README.md update or remove
- [ ] **6.5** [AI] actions.ts vs newsletter-action.ts consolidation
- [ ] **6.6** [AI] PNG→WebP conversion for unused PNG assets
- [ ] **7.2** [AI] grep `text-gold ` across .tsx — should be 0 on body text
- [ ] **7.4** [Luana] BilingualBand vs H1 visual weight — verify hierarchy
- [ ] **7.5** [Luana] aa-controls pills — verify on mobile
- [ ] **7.6** [AI] VoiceDoctor is actual voice/audio or just styled text?
- [ ] **7.7** [Luana] AnxietyPersonas — 3 personas feel distinct?
- [ ] **7.8** [AI] Anxiety→Sedation→FAQ cross-link verification
- [ ] **7.9** [AI] Reasons vs WhyDifferent overlap check
- [ ] **7.10** [AI] Stats section — verify all numbers are true

## Phase 4 — Low / ongoing
- [ ] **8.2** [AI] deploy.sh location verification
- [ ] **8.3** [AI] Create `docs/trabajos/2026-07-06_<designer>_beautification-pass.md` when starting
- [ ] **8.4** [AI] Verify weekly-design-audit cron actually runs

## Phase 5 — Luana visual validation (final pass, after AI fixes ship)
- [ ] [Luana] Look at live site — anything missing?
- [ ] [Luana] Confirm gold-on-functional is gone
- [ ] [Luana] Approve the new JSON-LD / canonical URL changes (trust + SEO)
- [ ] [Luana] Sign off — no more additional work

---

# 🤖 Autonomous execution plan

For each `[AI]` item, the work pattern is:

1. **Read the file** (or `git log` for history)
2. **Compute the change** (using `designer_handoff_validate.py`, `wcag-audit-automation`, `tailwind-v4-silent-noop-trap`, etc.)
3. **Edit the file** with patch
4. **Verify locally** (build, lint, screenshot)
5. **Update handoff.json + DESIGN.md** if design tokens changed
6. **Log in `docs/trabajos/<date>_beautification-pass.md`** what was changed
7. **Commit** (pre-commit hook validates)
8. **Deploy + verify live** (with cache purge)

For each `[Luana]` item:
1. **Stage the change** (or describe the proposal)
2. **Take a screenshot** of live site at current state
3. **Send to Luana** with the proposal + before/after
4. **Wait for confirmation**
5. **Implement**

## Skills to load per task
| Task pattern | Primary skill | Secondary |
|---|---|---|
| Fix WCAG ratio | `wcag-contrast-quick-check` | `wcag-audit-automation` |
| Fix palette | `luana-design-rules` | `designer-handoff` |
| Fix Stub pages | `bilingual-seo-helper-pattern` (if exists) | `lang-driven-i18n-content-contract` |
| Fix animations | `tailwind-v4-silent-noop-trap` | `tailwind-v4-theme-system` |
| Fix SEO | `seo-client-rankings` | `seo-super-agent` |
| Validate JSON-LD | (manual) | Google Search Console validator |
| Component split | `client-component-abstraction` | `refactoring-ui` |

## Verification gates before declaring done

For every Phase 1 + Phase 2 fix:
```bash
# 1. Validator passes
python3 ~/.hermes/skills/design/scripts/designer_handoff_validate.py \
  /root/paragu-ai-platform/apps/dra-gabriela/designer-handoff.json

# 2. Live WCAG audit clean
python3 ~/.hermes/skills/web-development/wcag-audit-automation/scripts/wcag_audit.py \
  https://ometzdental.com/en

# 3. Build succeeds
cd /root/paragu-ai-platform/apps/dra-gabriela
timeout 240 npx next build 2>&1 | grep -E "Compiled|error|Error"

# 4. Visual check (manual or via Playwright if installed)
# 5. Cache purge + verify
```

## What "done" looks like

When Luana's next visual pass is **just confirmation**, not new work:
- All Phase 1 + Phase 2 items marked ✅
- Validator: 0 errors
- Live WCAG: 0 FAILs
- Build: clean
- JSON-LD: verified in Google Rich Results Test
- Canonical URL: pointing to ometzdental.com
- Stub pages: converted to i18n
- Tokens: in sync
- Blog: 3 posts live
- Footer: hierarchy verified
- Animations: respect reduced-motion
- Stats: all true numbers
- Placeholder copy: all resolved

Then: ping Luana. "Site is ready for visual sign-off. No new work expected. If you find anything, it's truly edge-case."

---

**Generated:** 2026-07-06 by Erebus (design-bot profile)
**Source data:** 16 content JSON files, 22 components, 36 page files, live HTML, JSON-LD, designer-handoff.json, git log
**Not analyzed:** screenshot diff, Playwright DOM, real device rendering (out of scope without Playwright)