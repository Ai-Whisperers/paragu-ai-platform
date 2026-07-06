# Dra. Gabriella — Design System & Component Architecture

## Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 (named tokens, no arbitrary values)
- **Typography**: Inter (body) + DM Serif Display (headings)
- **Icons**: lucide-react
- **Content**: JSON files in `content/{en,es}/` (statically imported)
- **Schemas**: Schema.org JSON-LD injected in `<head>`

## Color tokens (defined in `app/globals.css`)

| Token | Value | Usage |
|---|---|---|
| `bg-bg` | `#fbf9f6` | Page background (cream) |
| `bg-surface` | `#ffffff` | Cards, navbar, elevated surfaces |
| `bg-surface-muted` | `#f2efe9` | Alternate section backgrounds |
| `bg-accent` | `#0f4c4c` | Primary teal (CTA buttons, headings) |
| `bg-accent-2` | `#0a3a3a` | Gradient end (darker teal) |
| `bg-accent-soft` | `#e6efef` | Soft teal (icon backgrounds) |
| `bg-gold` | `#c9a84c` | Accent (decorative rings, badges) |
| `text-fg` | `#1c1c1c` | Body text |
| `text-fg-muted` | `#5c4f43` | Secondary text |
| `text-fg-subtle` | `#7a6f63` | Tertiary text (labels, captions) |
| `border-border` | `#e8e4dc` | Default borders |
| `border-border-light` | `#f0ede6` | Subtle dividers |

## Spacing scale
- `py-12 md:py-16` (sm) — compact sections
- `py-16 md:py-20` (md) — default sections
- `py-20 md:py-28` (lg) — spacious sections (used by PageSection default)

## Container widths
- `max-w-3xl` (narrow, ~768px) — single-column text
- `max-w-5xl` (medium, ~1024px) — 2-col grids
- `max-w-6xl` (wide, ~1152px) — hero, FAQ
- `max-w-[1600px]` (extra wide) — full-bleed sections (replaces 7xl)

## Type scale

| Use | Size (mobile → desktop) |
|---|---|
| Hero H1 | `text-3xl md:text-4xl lg:text-5xl xl:text-6xl` |
| Section H2 | `text-3xl md:text-4xl` |
| Card H3 | `text-lg md:text-xl` |
| Body L | `text-lg md:text-xl` (`.lead` class) |
| Body M | `text-base` (default) |
| Body S | `text-sm` |
| Caption | `text-xs` |

## Components

### Layout primitives
- **PageSection** — universal `<section>` with `layout: narrow|wide|split`, `bg: default|muted|accent|gradient`, `py: sm|md|lg`. Every inner page should use this.
- **PageHero** — top hero for inner pages. `variant: default|gradient|compact`, `align: center|left`.

### Section blocks (home page)
- **Hero** — full-viewport with image card, gradient text, stats.
- **MeetDoctor** — 2-col portrait + bio.
- **Reasons** — 6-card "Why us" grid.
- **FeaturedService** — 2-col image + bullets + dual CTA.
- **Services** — 5-tab service directory.
- **Process** — 4-step journey.
- **Testimonials** — 3-card testimonial grid.
- **HomeFaq** — accordion FAQ (6 categories, 30+ Q&As).
- **CtaBanner** — gradient conversion banner.

### Interactive
- **Navbar** — sticky bilingual nav with 7 routes + lang switcher + contact CTA + mobile drawer.
- **Footer** — 3-col footer with hours, services, social, cookie settings.
- **CookieConsent** — opt-in/out banner, dismissable, re-openable from footer.
- **MobileStickyCta** — bottom-anchored CTA on mobile.
- **BackToTop** — appears after 400px scroll.
- **ContactButton** — WhatsApp/phone/email CTA with fallback chain.
- **ContactForm** — server-action-backed form with zod validation.
- **ServiceFaq** — accordion for service detail pages.
- **SchemaOrg** — JSON-LD injection in `<head>`.
- **SkipToContent** — keyboard a11y link.

### Domain
- **ServiceDetail** — 5-block service page (hero, highlights, items, process, FAQs, CTA).
- **ContentPage** — generic content renderer for legacy pages.

## Accessibility patterns
- All images have `alt` (or `alt=""` for decorative)
- All interactive elements have `aria-label` when icon-only
- Nav uses `aria-label="Primary"`, breadcrumbs `aria-label="Breadcrumb"`, lang switcher `aria-label="Language switcher"`
- Nav links use `aria-current="page"` for active
- Mobile drawer uses `aria-expanded` and `aria-controls`
- FAQ uses native `<details>` (keyboard a11y built-in)
- Skip-to-content link is the first focusable element
- Tap targets: `min-h-[44px] min-w-[44px]` on mobile-only buttons
- `prefers-reduced-motion` is honored by all animations (via Tailwind v4 defaults)

## Performance budget
- LCP < 2.5s on 3G
- CLS < 0.1
- TBT < 200ms
- CSS bundle < 100KB
- Above-fold image preloaded with `priority`
- Below-fold images lazy by default

## SEO defaults
- All pages have `canonical` (EN slug)
- All pages have `hreflang: en|es|x-default`
- All pages have unique `og:image` (per-page from /og/ folder)
- Per-blog-post OG + meta description (in blog.json)
- Service pages have Service + BreadcrumbList schema
