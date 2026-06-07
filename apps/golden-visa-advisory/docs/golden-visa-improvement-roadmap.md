# Golden Visa Advisory — Improvement Roadmap

**Status:** Live at goldenvisa.paragu-ai.com  
**Client:** Raúl Fretes (WA group 120363423668166869)  
**Audit Date:** 2026-05-04  
**Stack:** Next.js 16.2, React 19, Tailwind CSS 4, TypeScript, Docker Swarm

---

## Current Score: 5/10

The site is functional but feels like a generic SaaS landing page template. Missing: visual identity, emotional design, real photos, interactivity, and conversion infrastructure. It looks like a placeholder — not an authoritative advisory firm.

---

## TIER 0: CRITICAL BUGS & BLOCKERS (Do today)

| # | Issue | Evidence | Fix |
|---|-------|----------|-----|
| 0.1 | WhatsApp number is placeholder `595981000000` | Hardcoded in BusinessLanding.tsx:8 and InvestorLanding.tsx:9 — commented as "placeholder" | Get real number from Raúl |
| 0.2 | No error.tsx or not-found.tsx | Site has `_global-error` page built by Next.js but no custom 404 | Add `src/app/not-found.tsx` |
| 0.3 | No loading.tsx | No loading skeletons anywhere | Add `src/app/loading.tsx` |
| 0.4 | No sitemap.xml or robots.txt | SEO bots can't discover the site | Add `src/app/sitemap.ts` + `src/app/robots.ts` |
| 0.5 | No JSON-LD structured data | Google Knowledge Panel won't show for the firm | Add Organization + LocalBusiness schema in layout.tsx |
| 0.6 | Eyebrow text only in EN/ES (Investor Hero) | `locale === 'en' ? ... : ''` falls back to empty for 5 other languages | Add fallback or fill all translations |

---

## TIER 1: VISUAL IDENTITY & BRANDING (Medium effort, high impact)

The biggest problem is the site has zero visual identity. It's a dark/gold template with no brand personality.

| # | Change | Why | Effort |
|---|--------|-----|--------|
| 1.1 | Custom logo SVG (not text) | "Golden Visa Advisory" text is forgettable. A golden shield/keys/paraguay shape mark makes it recognizable. Replace the text with an SVG logo in the nav + footer. | 1h |
| 1.2 | Distinctive color palette beyond dark/gold | Current: just `#C8A951` gold on dark. Add: secondary accent (deep burgundy #7A1E2E or emerald #1B7A4A for Paraguay connection), light background variant for alternating sections | 30m |
| 1.3 | Custom hero illustration | Current: bare gradient. Add: abstract SVG illustration — map of Paraguay with investment markers, or a golden key visual, or a bridge connecting hemispheres. If no budget: decorative geometric patterns (guarani-inspired). | 2-3h |
| 1.4 | Typography refresh | Current: default Inter/system font. Add: heading font that feels premium (Playfair Display, Cormorant Garamond, or DM Serif Display) paired with a clean sans. | 30m |
| 1.5 | Team photos (not initials) | 3 team cards show initials "R" "L" "G" in gradient circles. Replace with real photos when available. Until then: subtle silhouette or icon is better than letters. | 30m + client |
| 1.6 | Favicon + PWA icons | Current: default Next.js favicon.ico. Generate golden-branded favicons. | 15m |
| 1.7 | Animations (scroll reveal) | Add subtle fade-up on scroll for cards/stats using IntersectionObserver (not framer-motion — CSS only). Gives a polished feel with near-zero bundle cost. | 1h |
| 1.8 | Gradient divider between sections | All sections blend into each other. Add thin gold gradient dividers or subtle diagonal transitions. | 15m |
| 1.9 | Floating WhatsApp button | Standard on all advisory sites. A fixed-position gold button with WA icon in bottom-right. Currently only linked in nav/CTA text. | 30m |
| 1.10 | Mouse-follow gold glow on hero | Subtle parallax gold orb following cursor on desktop hero. Creates premium feel. | 1h |

---

## TIER 2: CONTENT & CREDIBILITY (Low effort, high trust impact)

| # | Change | Why | Effort |
|---|--------|-----|--------|
| 2.1 | Fill missing translations for all 7 languages | Only EN/ES have content. 5 languages get empty eyebrow text, some nulls. | 3h |
| 2.2 | Real testimonials with photos | Current: 2 generic testimonials with flag emojis. Real client photos + full names (with permission) boost credibility 10x. | Client data |
| 2.3 | Case studies page | "Portuguese Success Story" section is good. Expand into a full case study with timeline, investment amount, timeline, and client outcome. | 2h |
| 2.4 | Stats with real sources | "50+ Projects", "$200M+" — add source or footnoted evidence. Without it they feel inflated. | 30m |
| 2.5 | Blog / Insights section | Investors research for months. Blog posts about Paraguayan economy, regulatory changes, FAQ answers build SEO + authority. | 4h |
| 2.6 | Downloadable resources | Whitepaper or "Guide to Paraguayan Golden Visa" PDF as lead magnet. | 2h + design |
| 2.7 | Partner logos | Display logos of partner law firms, immigration agents, wealth managers. Social proof. | 30m + client |
| 2.8 | Trust badges | "Member of X association", "Licensed by Y regulator", "BBB rating" if applicable. | 30m |
| 2.9 | Country-specific landing pages | `/pt-br` for Brazil (your biggest market), `/en-us`, `/fr`. Tailored content per nationality. | 4h |
| 2.10 | FAQ with schema markup | Current FAQ is plain HTML. Add FAQPage schema for rich search results. | 1h |

---

## TIER 3: CONVERSION & LEAD GENERATION (Medium effort, business impact)

| # | Change | Why | Effort |
|---|--------|-----|--------|
| 3.1 | Contact form (not just WhatsApp link) | Many leads prefer email form over WhatsApp. Add simple form → email notification. | 2h |
| 3.2 | Eligibility quiz | "Answer 5 questions → get your recommended path" interactive quiz. Massive conversion tool for Golden Visa sites globally. | 4h |
| 3.3 | Investment calculator | "Show me what $X buys in Paraguay" — simple calculator with real estate, securities, SUACE options. | 3h |
| 3.4 | Email capture popup (exit intent) | "Don't lose your path to Paraguayan residency" — collect email before they leave. | 1h |
| 3.5 | CTA button with tracking | All CTAs go to WhatsApp. Add utm_params or a lead-tracking link to know which page converted. | 1h |
| 3.6 | Abandoned lead recovery | If someone visits 3+ pages but doesn't contact, retarget via email (if capture form exists). | 3h |
| 3.7 | WhatsApp pre-filled message | Current link just opens WA. Pre-fill: "Hi, I'm interested in Paraguayan residency. I'm from [country] and my investment budget is $___." | 15m |
| 3.8 | Schedule a call (Calendly/when-i-work) | Meeting booking embedded in site. Currently just another WA link. | 30m |
| 3.9 | Case study → CTA flow | End each case study with a specific CTA matching that investor profile. | 1h |
| 3.10 | Brazil-dedicated desk page | "Brazil Desk" link in Success Story section should lead to a dedicated page with Portuguese content + Brazil-specific investment pathways. | 2h |

---

## TIER 4: TECHNICAL & UX (Developer effort, quality impact)

| # | Change | Why | Effort |
|---|--------|-----|--------|
| 4.1 | Extract shared constants into ONE file | WhatsApp URL duplicated in 2 components. Nav config duplicated in 2 components. 90% of `BusinessLanding.tsx` and `InvestorLanding.tsx` is identical code. | 2h |
| 4.2 | Consolidate duplicated landing components | Both landings have identical: nav, mobile menu, hero layout, CTA, footer. Extract into shared `SiteLayout`, `HeroSection`, `Navbar` components. | 3h |
| 4.3 | Add aria labels on all interactive elements | Nav, dropdown, mobile menu all lack aria-* attributes. Accessibility. | 1h |
| 4.4 | Focus trap on mobile menu | Tab key escapes menu. Trap focus + Escape key to close. | 30m |
| 4.5 | Body scroll lock when mobile menu open | Currently menu slides over scrollable content. | 15m |
| 4.6 | Keyboard navigation for language dropdown | Can't tab through languages. Add aria-expanded, aria-activedescendant, arrow key support. | 30m |
| 4.7 | Add meta description + OG tags per path | Currently all share default layout metadata. Different OG image for Business vs Investor. | 1h |
| 4.8 | Bundle analysis | No heavy deps (no framer-motion, no shadcn), but check Next.js 16 chunk splitting. | 1h |
| 4.9 | LinkedIn/Facebook/Instagram OG preview | Ensure link previews show proper image + description on social platforms. | 30m |
| 4.10 | TypeScript strictness audit | tsconfig has `strict: true` but check for `any` or implicit `any` across components. | 30m |
| 4.11 | Healthcheck endpoint | Docker has healthcheck on root `/`. Add explicit `/api/health` returning `{"status":"ok"}`. | 15m |
| 4.12 | Force rebuild in CI | Current deployment is manual `docker compose build`. Add GitHub Action for auto-deploy. | 2h |

---

## TIER 5: GROWTH & RETENTION (Business impact, revenue)

| # | Change | Why | Effort |
|---|--------|-----|--------|
| 5.1 | Google Analytics / Plausible | Zero analytics currently. Can't measure conversion. | 30m |
| 5.2 | Google Search Console setup | Without sitemap + GSC, Google discovery is slow. | 30m |
| 5.3 | Google Business Profile | Claim GBP for the firm (if physical address). Maps listing = trust. | Client action |
| 5.4 | LinkedIn company page + profile | Advisory firms live on LinkedIn. Auto-post blog content. | 1h + client |
| 5.5 | Microsoft Clarity (heatmaps) | See where users click, scroll, and abandon. Free. | 15m |
| 5.6 | A/B test hero CTA | Test "Check Your Eligibility" vs "Book a Consultation" vs "Calculate Your Investment". | 2h |
| 5.7 | Retargeting pixel | Facebook/LinkedIn pixel for retargeting visitors. | 30m |
| 5.8 | Lead tracking spreadsheet | Each contact form submission → Google Sheet row. | 1h |
| 5.9 | Post-contact follow-up automation | Auto-email 2 days after contact if no reply. | 2h |
| 5.10 | Multi-language blog | Blog posts auto-translated for each language. | configurable |

---

## QUICK WINS (Can implement right now, no client data needed)

These are ready to code today, independent of client input:

1. **Floating WhatsApp button** (`btn-primary` with fixed position)
2. **Custom logo SVG** (vector design)
3. **Gradient dividers** between sections
4. **Animations** (CSS scroll reveal)
5. **Error boundaries** (not-found.tsx, loading.tsx)
6. **SEO basics** (sitemap.ts, robots.ts, JSON-LD)
7. **WhatsApp pre-filled message** (encode message in wa.me link)
8. **Duplicate code consolidation** (extract shared layout)
9. **Accessibility** (aria labels, focus trap, body scroll lock)
10. **Analytics setup** (Plausible free tier or GA4)
11. **Contact form** (server action → email)
12. **Meta descriptions per path**
13. **Favicon + PWA icons**
14. **Healthcheck endpoint**
15. **Typography refresh** (Google Fonts)

---

## BLOCKED ON CLIENT

These items need Raúl to provide:

1. **Real WhatsApp number** (placeholder: 595981000000)
2. **Team photos** (Raúl himself, legal team, partners)
3. **Client testimonials** with permission photos
4. **Partner logo files** (law firms, agents)
5. **Trust badges / certifications**
6. **Case study details** (investment amounts, timelines)
7. **LinkedIn/social profile URLs**
8. **Google Business Profile verification**
9. **Downloadable content** (whitepaper PDF)
10. **Target investment amounts** for calculator

---

## RECOMMENDED IMPLEMENTATION ORDER

### Week 1: Fix the blandness (Tier 1)
- Custom logo + color palette + typography = instant differentiation
- Hero illustration + animations = premium feel
- Floating WA button + favicon = polished
- **Result: Site goes from 5/10 → 7/10 visually**

### Week 2: Fix the hollow shell (Tier 0 + Tier 4)
- Error boundaries, SEO, JSON-LD, sitemap
- Code consolidation, accessibility
- Healthcheck, analytics
- **Result: Site passes technical audit**

### Week 3: Content & conversion (Tier 2 + Tier 3)
- Contact form, eligibility quiz, WA pre-fill
- Case studies, blog infrastructure, partner logos
- Downloadable resources, trust badges
- **Result: Site starts generating leads**

### Week 4+: Growth (Tier 5)
- Analytics review, retargeting, A/B tests
- GBP, LinkedIn, heatmaps
- **Result: Measurable conversion optimization**

---

## DESIGN RECOMMENDATIONS (Visual overhaul)

### Color Palette
```
Current:    #C8A951 (gold) on #0a0a0a (near black)
Proposed:   #C8A951 (gold - keep as primary)
            #D4A843 (gold hover)
            #7A6B3A (gold dark / disabled)
            #1B7A4A (Paraguay green - secondary accent)
            #F5F0E8 (warm off-white for light sections)
```

### Typography
```
Headings:  Playfair Display or Cormorant Garamond (serif = premium)
Body:      Inter (keep for readability)
```

### Logo Concept
Golden shield outline with PY (Paraguay) inside, surrounded by small stars or keys. Text "GOLDEN VISA ADVISORY" in small caps underneath. Single SVG, fits in nav at ~32px height.

### Hero Illustration Idea
Abstract geometric map of Paraguay with golden nodes at Asunción/CDE, connected by curved lines to icons of key investor countries (USA, Brazil, Spain, Germany). All in gold line-art style matching the brand.

---

## WHAT TO IMPLEMENT FIRST

I propose starting with the **Tier 1: Visual Identity** improvements and **quick wins** — these will transform the site from "bland template" to "premium advisory brand" in 1-2 working sessions, requiring zero client input except the WhatsApp number.
