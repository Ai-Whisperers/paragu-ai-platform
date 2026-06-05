# VISUAL LAYOUT GUIDE
## How Sections Should Flow and What Each Should Look Like

**Purpose:** Guide for designers/developers on recommended visual layouts, section ordering, and design patterns for maximum conversion.

---

## HOMEPAGE LAYOUT FLOW

The homepage tells a story. Each section has a job:

```
┌─────────────────────────────────────────────────────┐
│  STICKY HEADER                                     │
│  Logo | Nav | CTA button | WhatsApp icon            │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  HERO SECTION (100vh)                               │
│  - Full-width background image/video                  │
│  - Headline (H1) — 5-7 words max                    │
│  - Subheadline — 1-2 lines                          │
│  - 2 CTA buttons (primary + secondary)              │
│  - Scroll indicator                                  │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  STATS BAR (optional, above fold)                   │
│  - 4 key numbers in a row                          │
│  - Animated counters                                │
│  - Subtle, not overwhelming                        │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  PAIN POINTS / REASONS SECTION                     │
│  - Section title + subtitle                         │
│  - 6 cards in 2x3 or 3x2 grid                      │
│  - Icon + title + short description                │
│  - Background: light gray or white                 │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  TRANSFORMATION / BEFORE-AFTER                      │
│  - Side by side comparison                          │
│  - Left: "Antes" (problem) — dark/drab             │
│  - Right: "Después" (solution) — bright/clean        │
│  - Each row: icon + text                          │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  FEATURES SHOWCASE                                  │
│  - Tabbed or carousel for categories               │
│  - Feature cards with icons                        │
│  - Benefits-focused, not feature-focused            │
│  - Background: brand primary color (light tint)     │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  HOW IT WORKS / PROCESS                            │
│  - 3 steps in horizontal flow                     │
│  - Numbered circles + title + description         │
│  - Arrow connectors between steps                 │
│  - Background: white                              │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  TESTIMONIALS CAROUSEL                             │
│  - Auto-rotating testimonial cards                 │
│  - Photo + name + business + quote                │
│  - Star rating                                   │
│  - Background: light brand accent                 │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  PRICING SECTION                                   │
│  - 3 pricing cards side by side                  │
│  - Middle card (Pro) slightly elevated/highlighted │
│  - CTA buttons on each card                      │
│  - Background: dark (navy) for contrast           │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  GALLERY / WORK SAMPLES                           │
│  - Masonry grid of images                        │
│  - Lightbox on click                             │
│  - Mix of business types if multi-industry        │
│  - Background: white                            │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  FAQ ACCORDION                                   │
│  - Expandable Q&A pairs                         │
│  - Schema.org markup for SEO                    │
│  - Background: light gray                      │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  FINAL CTA BANNER                                │
│  - Full-width, brand color                       │
│  - Strong headline                              │
│  - Single prominent CTA                         │
│  - Background: primary brand color              │
└─────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│  FOOTER                                          │
│  - Contact info                                 │
│  - Navigation links                             │
│  - Social icons                                │
│  - Trust badges                               │
│  - Copyright                                  │
└─────────────────────────────────────────────────────┘
```

---

## SECTION DESIGN SPECIFICATIONS

---

### 1. HERO SECTION

**Layout:** Full viewport height (100vh), full-bleed background

**Background options (in order of impact):**
1. Video background (autoplay, muted, looped) — highest engagement
2. High-quality static image with gradient overlay
3. Solid brand color with subtle pattern

**Typography:**
- H1: 3.5rem, weight 700, white on image
- Subtitle: 1.25rem, weight 400, white with 90% opacity

**CTA Buttons:**
- Primary: Solid brand secondary color (coral/red), white text
- Secondary: White outline, white text
- Button size: Large (padding 1rem 2rem)
- Border radius: 0.5rem

**Mobile:**
- Stack CTAs vertically
- Reduce H1 to 2.5rem
- Reduce subtitle to 1rem

---

### 2. STATS BAR

**Layout:** Horizontal strip, full-width

**Design:**
- Background: White with subtle shadow
- 4 stats in equal columns
- Number: 3rem, bold, brand primary
- Label: 0.875rem, text-muted

**Animation:**
- Count up from 0 when section enters viewport
- Duration: 2 seconds
- Easing: ease-out

**Mobile:**
- 2x2 grid instead of 4 columns
- Smaller numbers

---

### 3. PAIN POINTS / REASONS

**Layout:** Section title + 6 cards in responsive grid

**Section header:**
- Title: H2, centered, 2rem
- Subtitle: 1rem, text-muted, centered below title

**Card grid:**
- Desktop: 3 columns × 2 rows
- Tablet: 2 columns × 3 rows
- Mobile: 1 column (stacked)

**Card design:**
- Background: White
- Border: 1px solid border-color
- Border radius: 0.75rem
- Padding: 1.5rem
- Shadow: subtle (0 2px 4px rgba(0,0,0,0.05))

**Card content:**
- Icon: 2rem, brand secondary color, top-left
- Title: 1.125rem, bold, below icon
- Description: 0.875rem, text-muted, 2-3 lines max

**Hover state:**
- Lift effect: translateY(-4px)
- Shadow increase
- Icon scale: 1.1

---

### 4. BEFORE/AFTER

**Layout:** Two-column side-by-side comparison

**Left column ("Antes"):**
- Background: Dark gray (#374151)
- Text: White
- Icon: X or warning icon in red
- Style: Warning/problem feel

**Right column ("Después"):**
- Background: Brand primary (light tint)
- Text: Dark
- Icon: Check or success icon in green
- Style: Positive/solution feel

**Content per row:**
- Icon: 1.25rem
- Text: 1rem, bold title + small description
- 4-5 rows per column

**Mobile:**
- Stack vertically (Antes on top, Después below)
- Add visual arrow between them

---

### 5. FEATURES SHOWCASE

**Layout:** Category tabs + feature cards below

**Tab bar:**
- Horizontal scrollable on mobile
- Active tab: Underline + bold
- Inactive: Regular weight, muted color

**Feature cards (in tab):**
- 3 columns desktop
- Icon: 3rem, brand accent
- Title: 1.25rem, bold
- Description: 0.875rem
- Benefit list: Checkmarks with 2-3 bullet points

**Visual treatment:**
- Cards have slight background tint
- Icons have circular colored background
- Connect features to outcomes visually

---

### 6. PROCESS / HOW IT WORKS

**Layout:** 3 steps horizontal

**Step design:**
- Number: Large circle (4rem) with step number
- Circle border: 3px solid brand color
- Inside circle: Number (1, 2, 3)
- Title below: 1.125rem, bold
- Description: 0.875rem, muted

**Connector arrows:**
- Between circles
- Color: Brand secondary
- Style: Simple arrow or dashed line

**Mobile:**
- Stack vertically with connector arrows pointing down

---

### 7. TESTIMONIALS

**Layout:** Carousel/slider

**Card design:**
- Background: White
- Border radius: 1rem
- Padding: 2rem
- Shadow: Medium (0 4px 12px rgba(0,0,0,0.1))

**Card content:**
- Quote marks: Large, decorative, brand accent at 20% opacity
- Quote text: 1rem, italic
- Photo: 3rem circle, left-aligned
- Name: 0.875rem, bold
- Business: 0.75rem, muted
- Stars: 5 stars, gold/yellow

**Carousel controls:**
- Dots below (active = filled)
- Arrow buttons on sides (optional)
- Auto-rotate: 5 seconds
- Pause on hover

**Mobile:**
- Single card visible
- Swipe to navigate

---

### 8. PRICING

**Layout:** 3 cards in row, middle elevated

**Card design (Basic & Premium):**
- Background: White
- Border: 1px solid border
- Border radius: 1rem
- Width: 280px

**Card design (Pro/Most Popular):**
- Background: Brand primary (dark navy)
- Text: White
- Border: none
- Width: 320px (slightly wider)
- Scale: 1.05 (slightly bigger)
- Shadow: Larger (0 8px 24px rgba(0,0,0,0.15))
- Badge: "MÁS POPULAR" ribbon at top

**Card content:**
- Plan name: 1.25rem, bold
- Price: 3rem, bold, primary color
- Price period: 0.875rem, muted
- Description: 0.75rem, muted
- Feature list: Checkmarks (green) and X (red)
- CTA button: Full width at bottom

**Mobile:**
- Stack vertically
- Pro card first (most important)

---

### 9. FAQ

**Layout:** Accordion (expandable Q&A)

**Question button:**
- Full width
- Text: 1rem, bold, left-aligned
- Icon: Plus/Minus on right
- Padding: 1rem
- Border bottom: 1px

**Answer panel:**
- Hidden by default
- Expand animation: 300ms ease
- Padding: 1rem (when open)
- Text: 0.875rem, muted

**Visual treatment:**
- Background: White cards on gray background
- Schema.org FAQPage markup for SEO
- Questions sorted by likely importance

---

### 10. FINAL CTA

**Layout:** Full-width section, centered content

**Background:**
- Brand secondary color (coral) or gradient
- Strong contrast with white text

**Content:**
- Headline: H2, white, 2rem
- Subheadline: 1rem, white at 90%
- CTA button: White background, brand color text

**Mobile:**
- Single column
- Button full width

---

## COLOR APPLICATION BY SECTION

| Section | Background | Text | Accent |
|---------|------------|------|--------|
| Hero | Image/Video | White | CTA buttons |
| Stats | White | Dark | Numbers |
| Reasons | Light gray | Dark | Icons |
| Before/After | Split (dark/light) | White/Dark | Checkmarks/X |
| Features | Light brand tint | Dark | Icons |
| Process | White | Dark | Numbers |
| Testimonials | Light brand accent | Dark | Quote marks |
| Pricing | Dark navy | White | Card borders |
| FAQ | Light gray | Dark | Icons |
| Final CTA | Brand secondary | White | Button |
| Footer | Dark navy | White | Links |

---

## SPACING SYSTEM

### Section padding:

| Breakpoint | Section padding (Y) |
|------------|-------------------|
| Desktop | 5rem (80px) |
| Tablet | 3.5rem (56px) |
| Mobile | 2.5rem (40px) |

### Component spacing:

| Element | Spacing |
|---------|---------|
| Section title → subtitle | 0.75rem |
| Section → content | 3rem |
| Card grid gap | 1.5rem |
| Testimonial card gap | 1rem |
| FAQ item gap | 0 |

---

## MOBILE CONSIDERATIONS

### Layout shifts:

- Hero: Full viewport, stacked CTAs
- Stats: 2x2 grid
- Reasons: Single column
- Before/After: Stacked vertically
- Features: Single column with tabs as dropdown
- Process: Stacked vertically
- Testimonials: Single card, swipe
- Pricing: Stacked, Pro first
- FAQ: Full width accordion

### Touch targets:

- Minimum: 44px × 44px
- Buttons: 48px height minimum
- CTAs: Full width on mobile

---

## ANIMATION RECOMMENDATIONS

### Entrance animations:

| Element | Animation | Duration | Delay |
|---------|-----------|----------|-------|
| Hero text | Fade up | 600ms | 200ms stagger |
| Stats numbers | Count up | 2000ms | On scroll |
| Reason cards | Fade up staggered | 400ms | 100ms stagger |
| Process steps | Fade up | 400ms | 200ms stagger |
| Testimonials | Slide | 300ms | Auto |
| Pricing cards | Fade up | 400ms | On scroll |

### Interaction animations:

| Element | Animation | Duration |
|---------|-----------|----------|
| Button hover | Scale 1.02 + shadow | 200ms |
| Card hover | Lift (translateY -4px) | 200ms |
| Accordion expand | Height + opacity | 300ms |
| Image lightbox | Fade + scale | 200ms |

---

## CALL TO ACTION PLACEMENT

### Primary CTAs:

1. **Hero** — "Empezar Ahora" (primary action)
2. **After reasons** — "Ver cómo funciona" (secondary)
3. **After features** — "Probalo" (primary)
4. **Pricing section** — On each pricing card (primary on Pro)
5. **After testimonials** — "Tu turno" (primary)
6. **Footer** — "Hoy es el día" (primary)

### Secondary CTAs:

1. **Hero secondary** — "Ver Demo"
2. **After reasons** — "Ver más"
3. **After features** — "Contactar"

### Floating CTAs:

1. **WhatsApp button** — Bottom right, always visible
2. **Exit intent popup** — Special offer CTA
3. **Cookie consent** — Accept/Reject

---

## IMAGE SPECIFICATIONS

| Section | Image Type | Recommended Size | Style |
|---------|-----------|------------------|-------|
| Hero | Background | 1920×1080 min | Lifestyle, emotional |
| Stats | Icons | 48×48 | Simple, flat |
| Reasons | Icons | 64×64 | Line icons, brand color |
| Before/After | Illustrations or photos | 800×600 | Side-by-side comparison |
| Features | Icons + mockups | 128×128 icons | Clean, professional |
| Process | Icons | 80×80 | Numbered, clear |
| Testimonials | Avatar photos | 80×80 | Real, friendly |
| Gallery | Work samples | 800×800 | High quality, professional |
| Footer | Logos | 80×32 | Trust badges |

---

## TYPOGRAPHRY STANDARDS

### Heading hierarchy:

| Element | Size | Weight | Line height |
|---------|------|--------|-------------|
| H1 | 3.5rem | 700 | 1.2 |
| H2 | 2rem | 700 | 1.25 |
| H3 | 1.5rem | 600 | 1.3 |
| H4 | 1.125rem | 600 | 1.4 |
| Body | 1rem | 400 | 1.6 |
| Small | 0.875rem | 400 | 1.5 |
| Caption | 0.75rem | 400 | 1.4 |

### Font stack:
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Text colors:

| Usage | Color |
|-------|-------|
| Primary text | #1a1a1a |
| Secondary text | #6b7280 |
| Muted text | #9ca3af |
| White (on dark) | #ffffff |
| Brand primary | #1a1a2e |
| Brand secondary | #e94560 |
| Success | #10b981 |
| Error | #ef4444 |

---

*Document version: 1.0*
*Use: Design implementation, conversion optimization*
*Last updated: June 2, 2026*