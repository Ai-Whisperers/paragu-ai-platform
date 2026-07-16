---
version: alpha
name: Ometz Dental
description: Calm, safe, human dentistry — Ocean blues with yellow CTA accent, multi-palette theme switcher (7 selectable themes), bilingual ES/EN.
colors:
  primary: "#03045e"
  secondary: "#023e8a"
  tertiary: "#FFEF00"
  neutral: "#caf0f8"
  surface: "#ffffff"
  fg: "#03045e"
  fg-muted: "#023e8a"
  fg-subtle: "#0353a4"
  border: "#8ccbde"
  border-light: "#b3dfeb"
  accent: "#023e8a"
  accent-2: "#03045e"
  accent-soft: "#ade8f4"
  success: "#2d7a5f"
  success-soft: "#e1f0ea"
  error: "#c0392b"
  error-soft: "#f5dedb"
  warning: "#b57f18"
  warning-soft: "#f5ecce"
  pink: "#FF69B4"
  pink-soft: "#FFD6EA"
typography:
  h1:
    fontFamily: "DM Serif Display"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "DM Serif Display"
    fontSize: "clamp(2rem, 3.5vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "DM Serif Display"
    fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.1
  body-md:
    fontFamily: "Inter"
    fontSize: "clamp(1rem, 1.1vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.7
  lead:
    fontFamily: "Inter"
    fontSize: "clamp(1.125rem, 1.4vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.65
  caption:
    fontFamily: "Inter"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
  eyebrow:
    fontFamily: "Inter"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.2em"
    textTransform: "uppercase"
  code:
    fontFamily: "JetBrains Mono"
    fontSize: "0.9375rem"
  decorative:
    fontFamily: "Caveat"
    fontSize: "1.25rem"
rounded:
  sm: "0.375rem"
  md: "0.625rem"
  lg: "1rem"
  xl: "1.5rem"
  2xl: "2rem"
  full: "9999px"
spacing:
  section: "5rem"
  section-md: "7rem"
  section-sm: "3rem"
  container: "84rem"
  container-padding: "1.5rem"
  container-padding-md: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.75rem"
    fontWeight: 600
    fontSize: "0.9375rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-2}"
    transform: "translateY(-1px)"
    boxShadow: "0 6px 20px rgba(2, 62, 138, 0.38)"
  button-gold:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.75rem"
    fontWeight: 600
    boxShadow: "0 2px 8px rgba(255, 239, 0, 0.32)"
  button-gold-hover:
    backgroundColor: "#E6D700"
    transform: "translateY(-1px)"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    borderColor: "{colors.border}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.fg-muted}"
  button-white:
    backgroundColor: "#ffffff"
    textColor: "{colors.primary}"
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
  card-hover:
    borderColor: "{colors.accent}"
    transform: "translateY(-2px)"
    boxShadow: "0 4px 14px rgba(3, 4, 94, 0.07)"
  card-flat:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
  card-accent:
    backgroundColor: "{colors.surface}"
    borderTop: "3px solid {colors.accent}"
  divider:
    width: "3rem"
    height: "3px"
    backgroundColor: "{colors.accent}"
    rounded: "2px"
  section-rule:
    width: "64px"
    height: "4px"
    backgroundColor: "linear-gradient(90deg, #FFEF00 0%, #E6D700 100%)"
    rounded: "9999px"
  eyebrow-pill:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.primary}"
    border: "1px solid {colors.accent}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.875rem"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.2em"
    textTransform: "uppercase"
  gold-glow-ring:
    boxShadow: "0 0 0 4px {colors.surface}, 0 0 0 6px {colors.tertiary}, 0 12px 40px rgba(255, 239, 0, 0.28)"
  accent-glow-ring:
    boxShadow: "0 0 0 4px {colors.surface}, 0 0 0 6px {colors.accent}, 0 12px 40px rgba(2, 62, 138, 0.30)"
---

## Overview

Ometz Dental — Dra. Gabriela González Pane's bilingual (ES/EN) dental practice website. Brand voice: **calm, safe, human dentistry**. The visual identity reinforces trust through cool ocean blues (navy → cyan ladder) with a single warm CTA color (yellow #FFEF00) for high-attention buttons and accents. Pink (#FF69B4) is decorative-only (corner ribbons, illustrations), never functional.

The site ships a **7-theme palette switcher** (`lib/themes.ts`): default Ocean, plus lilac, discreet, friend, pin, shades, and random shades. All themes override via `@layer theme { }` to win the cascade against `globals.css :root` defaults.

## Colors

The Ocean palette is a **9-step navy/cyan ladder** (`--ocean-1` through `--ocean-8`) plus yellow CTA and pink decor.

- **Navy `#03045e`** (`fg`, `primary`, `--ocean-8`) — Deepest tone. Used for body text, deepest accents, footer bg.
- **Accent `#023e8a`** (`--ocean-7`, `accent`) — Primary brand color. Used for buttons, links, headings on light bg, icon fills.
- **Accent-2 `#03045e`** (`--ocean-8`) — Hover state for primary buttons, darker heading variant.
- **Cyan `#caf0f8`** (`bg`, `--ocean-1`) — Page background. Pale, calming, never competes with content.
- **Cyan `#ade8f4`** (`accent-soft`, `--ocean-2`) — Soft surface for icon circles, callouts, hover bg.
- **Yellow `#FFEF00`** (`tertiary`, `yellow`) — **CTA-only**. High attention: primary CTA buttons (btn-gold), decorative dividers, corner ribbons.
- **Pink `#FF69B4`** — **Decorative-only**. Corner ribbons (`.corner-ribbon`), illustrations, never functional UI.
- **Legacy "gold" aliases** — `gold`/`gold-2`/`gold-soft` map to yellow tones. Kept for backward compat with older warm-classic theme; DO NOT introduce new gold-family usage.

**Verified WCAG ratios** (from `designer-handoff.dra-gabriela.json`):
- `fg on bg` = **14.65:1 AAA**
- `fg on surface` = **17.75:1 AAA**
- `fg-muted on surface` = **10.20:1 AAA**
- `accent on accent-soft` = **7.59:1 AAA** (icon-in-circle)
- `white on accent` = **10.20:1 AAA** (button text)
- `navy on yellow` = **14.88:1 AAA** (btn-gold text)

**Known WCAG issues to fix** (caught by `designer_handoff_validate.py`):
- `success on success-soft` = **4.40:1 FAIL** — raise success to `#1f5d44` or darken
- `error on error-soft` = **4.24:1 FAIL** — raise error to `#8b1a1a` or darken
- `gold-2 on gold-soft` = **1.41:1 FAIL** — gold alias is decorative only, never text-bearing

## Typography

Three families, one decorative:

- **DM Serif Display** — All headings (h1–h6). Tight line-height (1.1), letter-spacing -0.02em, normal weight (400). Display feel for trust + warmth.
- **Inter** — Body text, captions, eyebrows. Responsive clamp() sizes for fluid scaling.
- **JetBrains Mono** — Code blocks. Monospace.
- **Caveat** — Hand-written accent (`.font-caveat`, `.font-whimsical`). Used sparingly for warmth notes, never for functional text.

**Hierarchy sizes** (responsive clamp):
- h1: `clamp(2.5rem, 5vw, 4rem)`
- h2: `clamp(2rem, 3.5vw, 2.75rem)`
- h3: `clamp(1.4rem, 2.2vw, 1.75rem)`
- body: `clamp(1rem, 1.1vw, 1.125rem)`
- lead: `clamp(1.125rem, 1.4vw, 1.375rem)` (for hero subtext)

`text-wrap: balance` on all headings, `text-wrap: pretty` on body. Anti-FOUT.

## Layout & Spacing

- **Container width:** `84rem` (1344px) max. Generous for a content site.
- **Container padding:** `1.5rem` mobile, `2rem` desktop.
- **Section spacing:** `5rem` mobile, `7rem` desktop. `section-sm` = `3rem` mobile, `4rem` desktop.
- **Spacing scale:** 4px base, doubling (4/8/16/24/32/48/64/96). Use Tailwind utilities, not arbitrary px.

## Elevation & Depth

Navy-tinted shadows (because all shadows sit on pale-blue surfaces):
- **sm:** `0 1px 2px rgba(3,4,94,0.05), 0 1px 3px rgba(3,4,94,0.07)` — subtle raise
- **md:** `0 4px 14px rgba(3,4,94,0.07), 0 2px 4px rgba(3,4,94,0.05)` — card hover
- **lg:** `0 12px 40px rgba(3,4,94,0.10), 0 4px 8px rgba(3,4,94,0.06)` — floating elements
- **xl:** `0 24px 60px rgba(3,4,94,0.14)` — modals, hero CTAs
- **cta:** `0 8px 24px rgba(255,239,0,0.30)` — yellow CTA glow (warm contrast)

## Shapes

- **Radii:** `0.375rem` (sm) → `0.625rem` (md) → `1rem` (lg, default for cards) → `1.5rem` (xl) → `2rem` (2xl) → `9999px` (full/pills).
- **Cards:** `lg` radius (`1rem`). Pill buttons use `full`.
- **Corner ribbon:** 90x90 rotated 45deg, top-right of card. Yellow or accent variant.

## Components

### Buttons (5 variants)
- **`btn-primary`** — Filled accent bg, white text. For primary CTAs (Hero "Agendar cita").
- **`btn-gold`** — Filled yellow bg, navy text. **Only for highest-priority CTAs** (final conversion).
- **`btn-outline`** — Transparent bg, navy text, border. For secondary CTAs.
- **`btn-ghost`** — Transparent bg, fg-muted text. For tertiary/inline actions.
- **`btn-white`** — White bg, navy text. For use on dark/colored sections.

All buttons: `padding: 0.75rem 1.75rem`, `font-weight: 600`, `border-radius: 0.625rem`. Hover lifts `translateY(-1px)` + deeper shadow. Active `translateY(1px)`.

### Cards (3 variants)
- **`card`** — White bg, border-light border, lg radius. Hover lifts 2px + accent border + md shadow.
- **`card-hover-xl`** — Same but bigger hover lift (4px) + xl shadow.
- **`card-flat`** — No hover. For grid items where hover would be noise.
- **`card-accent`** — Adds 3px accent border on top (sticky-note feel).

### Dividers & Accents
- **`.divider`** — 3rem × 3px accent bar, centered, 1.5rem margin below. For section breaks.
- **`.section-rule`** — 64px × 4px yellow→yellow-2 gradient pill. For section header decoration.
- **`.eyebrow`** — Inline pill, accent-soft bg, accent border, uppercase 0.2em tracking. For category labels above section headings.

### Glow Rings
- **`.gold-glow-ring`** — Yellow ring around medallions/portraits. Decorative only.
- **`.accent-glow-ring`** — Accent ring. For "open now" / status indicators.

## Themes (Multi-Palette System)

The site ships 7 selectable themes via `lib/themes.ts`. All overrides MUST be wrapped in `@layer theme { }` to win the cascade against `globals.css :root` defaults.

| ID | Name (EN) | Name (ES) | Vibe |
|---|---|---|---|
| `default` | Ocean (Default) | Océano (Predeterminado) | Original navy + cyan + yellow |
| `lilac` | Lilac | Lila | Thistle → deep lilac purple scale |
| `discreet` | Discreet | Discreta | Soft rose-cream, low contrast |
| `friend` | Friend | Amiga | Purple + teal duotone |
| `pin` | Pin | Alfiler | Cream field, plum ink, teal accent |
| `shades` | Shades | Matices | Deep purple monochrome ladder |
| `random` | Random Shades | Matices Aleatorios | High-contrast neon violet mix |

Theme persists via `localStorage[dra-gabriela-theme]`. Switcher is a floating bottom-right button with a dropdown palette.

## Do's and Don'ts

### Do
- ✅ Use the design system tokens (`bg-accent`, `text-fg-muted`, `border-border-light`)
- ✅ Use legacy `:root` variables ONLY for inline `style={{ var(--x) }}` callsites
- ✅ Run `designer_handoff_validate.py` before committing palette changes
- ✅ Run `wcag_audit.py` after deploy, before saying "done"
- ✅ Test mobile (375x812 viewport) — desktop + mobile may use different text sizes
- ✅ Always wrap theme overrides in `@layer theme { ... }`
- ✅ Keep comments in `globals.css` explaining why hex values exist (`/* raised from #948779 for WCAG AA */`)

### Don't
- ❌ Add the designer's fix as an inline hex code in JSX (`style={{color: '#c9a84c'}}`)
- ❌ Use pink for functional UI (decorative-only)
- ❌ Use gold/gold-2/gold-soft for text or bg-with-text (decorative-only, aliases for yellow)
- ❌ Add a new theme without updating `lib/themes.ts` `THEMES` array
- ❌ Use `text-fg-muted` on `bg-surface-muted` without WCAG verification (often invisible)
- ❌ Hardcode navy hex when you can use `var(--ocean-N)` (breaks palette overrides)
- ❌ Trust `npm run build` success as "looks good" — always visual verify + WCAG audit

## Origin

DESIGN.md created 2026-07-06 from:
- `app/globals.css` source of truth
- `lib/themes.ts` theme definitions
- `designer-handoff.dra-gabriela.json` validated palette
- Production commit history (`2c6e6f3`, `63a734f`, `f8b5c0c`, `57a987f`, `2e5f955`)
- Luana López visual critiques (2026-07-04, 2026-07-05, 2026-07-06)

Maintained by: Erebus + Luana López. Update via `designer-handoff.json` + regenerate.