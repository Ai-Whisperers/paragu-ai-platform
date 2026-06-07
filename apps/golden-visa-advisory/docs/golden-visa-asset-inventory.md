# Golden Visa Advisory — Asset Inventory

**Date:** 2026-05-04
**Purpose:** Complete audit of all assets needed vs what exists, organized by type and source (client-provided vs generated).

---

## 1. VISUAL ASSETS

### 1.1 Logo & Identity

| Asset | Status | Source | Notes |
|-------|--------|--------|-------|
| Primary SVG logo | ❌ Missing | **Generate** | Gold shield + "PY" monogram + "GOLDEN VISA ADVISORY" small caps |
| Favicon (ico/svg/png) | ❌ Default Next.js | **Generate** | Use logo mark, 32x32 + 180x180 Apple touch |
| Open Graph image | ❌ Missing | **Generate** | 1200x630 px, gold/black with logo + tagline |
| Social preview (LinkedIn) | ❌ Missing | **Generate** | 1200x627 px — same as OG |
| PWA manifest icons | ❌ Missing | **Generate** | 192x192 + 512x512 |
| Brand guidelines doc | ❌ Missing | **Generate** | Colors, typography, logo usage, spacing |

### 1.2 Photography

| Asset | Status | Source | Notes |
|-------|--------|--------|-------|
| Team headshots (3+ people) | ❌ Missing | **Client** | Raúl Fretes, Legal Team (could be photo), Partners Network |
| Office / city photos | ❌ Missing | **Client / Stock** | Asunción skyline, office interior if exists |
| Client testimonial photos | ❌ Missing | **Client** | 3-5 with written consent for website use |
| Hero background image | ❌ Missing | **Generate/Stock** | Paraguay map abstract or Asunción at dusk |
| Partner office exteriors | ❌ Missing | **Client / Stock** | Law firm buildings, partner offices |
| Before/after (case studies) | ❌ Missing | **Client** | Investment project photos if applicable |

### 1.3 Illustrations & Graphics

| Asset | Status | Source | Notes |
|-------|--------|--------|-------|
| Hero illustration SVG | ❌ Missing | **Generate** | Paraguay map with golden investment nodes + country connections |
| Process flow diagram (5 steps) | ❌ Missing | **Generate** | Vertical timeline graphic |
| Chain of Trust flow chart | ❌ Missing | **Generate** | 5-node horizontal flow (Investor → Agent → Advisory → Lawyer → Developer) |
| Investment vehicle comparison graphic | ❌ Missing | **Generate** | Visual version of the comparison table |
| Country connection map | ❌ Missing | **Generate** | World map with highlights for target countries |
| Decorative pattern / texture | ❌ Missing | **Generate** | Subtle guarani-inspired or geometric pattern for backgrounds |
| Section divider graphics | ❌ Missing | **Generate** | Gold gradient diagonal transitions between sections |
| Stats icons (projects, capital, etc.) | ❌ Missing | **Generate** | 4 custom SVG icons for track record |
| Flag icons (7 languages) | ✅ Existing | Emoji | 🇬🇧🇪🇸🇧🇷🇫🇷🇮🇹🇩🇪🇳🇱 — emoji is fine, or upgrade to SVG |
| Social media profile images | ❌ Missing | **Generate** | Square profile pic using logo mark |

---

## 2. CONTENT ASSETS

### 2.1 Institutional Content (existing — needs expansion)

| Asset | Status | Languages | Notes |
|-------|--------|-----------|-------|
| Home page content | ✅ Partial | EN, ES | Missing FR, PT, IT, DE, NL |
| Entry modal (gate) | ✅ Full | EN, ES | Missing 5 languages |
| Investor landing | ✅ Full | EN, ES | Missing full translations |
| Business landing | ✅ Full | EN, ES | Missing full translations |
| FAQ | ✅ Full | EN, ES (partial) | ES FAQ incomplete (fewer items than EN) |
| Comparison table | ✅ Full | EN, ES | Missing 5 languages |
| Success story | ✅ Full | EN only | Missing all other languages |
| Process steps | ✅ Full | EN, ES | Missing 5 languages |
| Team descriptions | ✅ Full | EN, ES | Missing 5 languages |
| Track record stats | ✅ Full | EN, ES | Missing 5 languages |
| Testimonials | ✅ Partial | EN only | 2 testimonials — need more languages/translated |

### 2.2 Written Content Needed

| Asset | Status | Source | Notes |
|-------|--------|--------|-------|
| Blog posts (6-12) | ❌ Missing | **Generate** | Monthly topics: regulatory changes, case highlights, comparisons |
| Country-specific landing page content | ❌ Missing | **Generate** | Tailored pitches for Brazil, US, Europe, Middle East |
| Downloadable guide / whitepaper | ❌ Missing | **Generate** | "Complete Guide to Paraguayan Golden Visa" PDF |
| Email autoresponder sequences | ❌ Missing | **Generate** | 3-email sequence for new leads |
| Case study details (3-5) | ❌ Missing | **Client + Generate** | Real numbers: investment amounts, timelines, results |
| Regulatory explainer pages | ❌ Missing | **Generate** | SUACE, Investor Pass, Temporary Residency deep dives |
| FAQ translations | ❌ Missing | **Generate** | All FAQ items in all 7 languages |
| Eyebrow text translations | ❌ Missing | **Generate** | Hero subtitles, section headings for FR/IT/DE/NL |
| CTA button text translations | ❌ Missing | **Generate** | "Check Your Eligibility" in all 7 languages |
| Blog category pages | ❌ Missing | **Generate** | Categories: Legal Updates, Market Insights, Case Studies |
| SEO meta descriptions per page | ❌ Missing | **Generate** | Unique meta desc for each route |
| Privacy policy + T&C | ❌ Missing | **Generate** | Legal requirement for contact form |
| WhatsApp pre-fill message text | ❌ Missing | **Generate** | Multi-language template messages |

---

## 3. DESIGN ASSETS

### 3.1 Brand Identity

| Asset | Status | Source | Notes |
|-------|--------|--------|-------|
| Color palette (complete) | ✅ Partial | Existing + **Expand** | Gold + black is minimal. Add: Paraguay green #1B7A4A, warm off-white #F5F0E8, deep gold #7A6B3A |
| Heading font (serif) | ❌ Missing | **Select** | Playfair Display or Cormorant Garamond (Google Fonts, free) |
| Body font (Inter) | ✅ Existing | Already in use | Keep |
| Button styles | ✅ Existing | Working | btn-primary (gold), btn-outline |
| Card / panel styles | ✅ Existing | Working | glass-panel, hover states |
| Section background alternation | ✅ Existing | Working | gradient-bg alternating with plain |
| Typography scale / hierarchy | ❌ Missing | **Define** | h1-h6 sizes, body, small, caption, eyebrow |
| Spacing scale | ❌ Missing | **Define** | Section padding, card padding, gap sizes |
| Border radius scale | ❌ Missing | **Define** | sm (4px), md (8px), lg (12px), xl (16-24px) |
| Shadow system | ❌ Missing | **Define** | Card shadows, button shadows, dropdown shadows |
| Icon style guide | ❌ Missing | **Define** | Stroke width, size, color treatment |

### 3.2 UI Component Library

**Current state:** All components are custom inline — no design system, no shared component library. Each page duplicates nav, footer, hero sections, card layouts.

| Component | Status | Notes |
|-----------|--------|-------|
| Navbar (shared) | ❌ Duplicated | 2 copies (BusinessLanding + InvestorLanding) |
| Footer (shared) | ❌ Duplicated | 2 copies |
| Mobile menu (shared) | ❌ Duplicated | 2 copies |
| HeroSection (shared) | ❌ Duplicated | 2 copies with minor differences |
| CTA (shared) | ❌ Duplicated | 2 copies |
| TeamCard | ❌ Inline | Rendered inline in 2 places |
| ServiceCard | ❌ Inline | Rendered inline |
| StatCard | ❌ Inline | Rendered inline in 2 places |
| ProcessStep | ❌ Inline | Rendered inline |
| TestimonialCard | ❌ Inline | Rendered inline |
| Floating WhatsApp button | ❌ Missing | Not implemented |
| SectionWrapper | ❌ Missing | Consistent padding + background |
| GradientDivider | ❌ Missing | Visual separation between sections |
| Button (shared) | ❌ Missing | Currently raw `<a>` with btn-primary class |
| LanguageDropdown | ✅ Shared | Already a shared component ✓ |
| EntryModal | ✅ Good | Single component ✓ |
| ComparisonTable | ✅ Good | Single component ✓ |
| BusinessFAQ | ✅ Good | Single component, but FAQ content is duplicated ✓ |
| SuccessStory | ✅ Good | Single component ✓ |

---

## 4. TECHNICAL ASSETS

### 4.1 SEO & Metadata

| Asset | Status | Notes |
|-------|--------|-------|
| robots.txt | ❌ Missing | Allow all basic |
| sitemap.xml | ❌ Missing | Dynamic from Next.js |
| JSON-LD (Organization) | ❌ Missing | Company schema |
| JSON-LD (LocalBusiness) | ❌ Missing | Paraguay address |
| JSON-LD (FAQPage) | ❌ Missing | FAQ schema for rich results |
| JSON-LD (Product) | ❌ Missing | For each program (Temporary, SUACE, Investor Pass) |
| Meta descriptions | ❌ Missing | Per-path unique |
| OG tags per path | ❌ Missing | Different OG for investor vs business |
| Twitter card tags | ❌ Missing | Social previews |
| Canonical URLs | ❌ Missing | Prevent duplicate content |
| Hreflang tags | ❌ Missing | For 7 languages |

### 4.2 Performance & Monitoring

| Asset | Status | Notes |
|-------|--------|-------|
| Analytics (Plausible / GA4) | ❌ Missing | Zero tracking |
| Error tracking | ❌ Missing | Error boundaries capture nothing |
| Healthcheck endpoint | ✅ Existing | Docker healthcheck on /, but no explicit /api/health |
| Lighthouse audit baseline | ❌ Missing | Need to run and track |
| Bundle analysis | ❌ Missing | Check chunk sizes |

### 4.3 Conversion Infrastructure

| Asset | Status | Notes |
|-------|--------|-------|
| Contact form (email) | ❌ Missing | No form — only WhatsApp link |
| WhatsApp pre-filled message | ❌ Missing | Currently bare wa.me link |
| Eligibility quiz | ❌ Missing | 5-question interactive tool |
| Investment calculator | ❌ Missing | "What does $X buy in Paraguay?" |
| Lead capture (exit intent) | ❌ Missing | No email capture |
| Calendly / scheduling | ❌ Missing | No meeting booking |
| Lead tracking spreadsheet | ❌ Missing | No lead pipeline |

---

## 5. MARKETING & GROWTH ASSETS

| Asset | Status | Source | Notes |
|-------|--------|--------|-------|
| Google Business Profile | ❌ Missing | **Client** | Claim GBP for organic local search |
| LinkedIn company page | ❌ Missing | **Client** | Advisory firms live on LinkedIn |
| LinkedIn content calendar | ❌ Missing | **Generate** | Weekly posts: regulatory updates, case snippets |
| Facebook page | ❌ Missing | **Client** | For Brazilian audience |
| Instagram (if applicable) | ❌ Missing | **Client** | Visual case studies |
| Retargeting pixel (FB/LinkedIn) | ❌ Missing | **Client** | Ad accounts needed |
| Email template (lead response) | ❌ Missing | **Generate** | Post-contact auto-reply |
| Email template (follow-up) | ❌ Missing | **Generate** | 48h no-reply follow-up |
| Email template (newsletter) | ❌ Missing | **Generate** | Monthly digest |
| Blog image template | ❌ Missing | **Generate** | Canva-style branded blog cover images |
| Case study PDF template | ❌ Missing | **Generate** | Branded downloadable format |

---

## 6. TRANSLATION INVENTORY

Currently only EN (100%) and ES (~60%) are populated. 5 languages (PT, FR, IT, DE, NL) at 0%.

### Translation coverage per content field:

| Field | EN | ES | PT | FR | IT | DE | NL |
|-------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Site name | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Tagline | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Entry modal (gate) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Investor hero | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Investor team | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Investor track record | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Investor testimonials | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Investor process | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Comparison table | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Success story | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Investor CTA | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Business hero | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Business whatIsGV | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Business services | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Business chainOfTrust | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Business investorProfiles | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Business CTA | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| FAQ items (total: 10) | ✅ | 5/10 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Eyebrow text fragments | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 7. CLIENT DATA NEEDED (Blockers)

These items block progress and are in the client's hands:

### Must have (production blocker)
- Real WhatsApp number (placeholder: 595981000000)
- Team headshots (Raúl + team)
- Client testimonials with permission for website use
- Real investment case numbers (for track record)
- Partner logo files

### Nice to have (enhancement)
- Office / city photos
- LinkedIn profile URLs
- Google Business Profile claim status
- Target investment amounts for calculator
- Social media accounts
- Preferred contact hours/timezone
- Downloadable content (if they have existing guides)

---

## 8. GENERATION PLAN (What I Can Build)

Everything below can be produced without waiting on the client:

### SVG Graphics (10 assets)
1. Logo — gold shield + PY + "GOLDEN VISA ADVISORY"
2. Favicon — simplified logo mark
3. OG image — 1200x630 with logo + tagline + Paraguay map outline
4. Hero illustration — Paraguay map with golden nodes + connection lines
5. Process flow diagram — 5-step vertical timeline
6. Chain of Trust flow — 5-node horizontal flow chart
7. Country connection map — stylized world map
8. 4 stat icons — building, globe, people, clock
9. Decorative background pattern — geometric gold on dark
10. Floating WA button icon — WhatsApp + gold styling

### Technical (15+ items)
1. robots.txt + sitemap.xml
2. JSON-LD schemas (Organization, FAQPage, Product)
3. Meta descriptions + OG tags per path
4. Hreflang tags for 7 languages
5. Contact form server action (email)
6. WhatsApp pre-filled message links
7. Eligibility quiz (client-side JS)
8. Error boundaries (error.tsx, not-found.tsx, loading.tsx)
9. Healthcheck endpoint
10. Analytics integration (Plausible)
11. Shared component library (Navbar, Footer, HeroSection, Card, CTA)
12. Color palette expansion in globals.css
13. Typography system (Google Fonts import + font faces)
14. Scroll-reveal animation CSS
15. Floating WhatsApp button component

### Content (generate + client review)
1. Full 7-language translation pack (machine translate, human verify)
2. Blog infrastructure (layout, listing, categories)
3. Privacy policy + T&C
4. Email templates (3 sequences)
5. Case study template structure
6. Country-specific landing page content (PT-BR, EN-US, FR, ES)
