---
version: alpha
name: Dra Gabriela
description: Auto-generated DESIGN.md for dra-gabriela. Refine colors, typography, components sections as design matures.
colors:
  navy: "#03045E"
  navy-2: "#020340"
  accent: "#023E8A"
  accent-2: "#03045E"
  accent-light: "#ADE8F4"
  accent-soft: "#ADE8F4"
  yellow: "#FFEF00"
  yellow-2: "#E6D700"
  yellow-soft: "#FFFBCC"
  pink: "#FF69B4"
  pink-soft: "#FFD6EA"
  warmth-bg: "#CAF0F8"
  warmth-surface: "#FFFFFF"
  warmth-surface-muted: "#E4F6FB"
  bg: "#CAF0F8"
  surface: "#FFFFFF"
  surface-muted: "#E4F6FB"
  surface-alt: "#ADE8F4"
  fg: "#03045E"
  fg-muted: "#023E8A"
  fg-subtle: "#0353A4"
  border: "#8CCBDE"
  border-light: "#B3DFEB"
  success: "#2D7A5F"
  success-soft: "#E1F0EA"
  error: "#C0392B"
  error-soft: "#F5DEDB"
  warning: "#B57F18"
  warning-soft: "#F5ECCE"
  white: "#FFFFFF"
  black: "#000000"
  ocean-1: "#CAF0F8"
  ocean-2: "#ADE8F4"
  ocean-3: "#90E0EF"
  ocean-4: "#48CAE4"
  ocean-5: "#00B4D8"
  ocean-6: "#0077B6"
  ocean-7: "#023E8A"
  ocean-8: "#03045E"
typography:
  h1:
    fontFamily: Inter
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
  h2:
    fontFamily: Inter
    fontSize: "clamp(2rem, 3.5vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.2
  body-md:
    fontFamily: Inter
    fontSize: "1rem"
    lineHeight: 1.65
rounded:
  sm: "0.375rem"
  md: "0.625rem"
  lg: "1rem"
  xl: "1.5rem"
spacing:
  section: "5rem"
  container: "80rem"
components:
  button-primary:
    backgroundColor: "{{colors.accent}}"
    textColor: "#ffffff"
    rounded: "{{rounded.md}}"
    padding: "0.75rem 1.75rem"
---

## Overview

`dra-gabriela` — auto-generated design spec from `apps/dra-gabriela/globals.css`.

**Live URL:** https://ometzdental.com
**Designer:** Luana López
**Generated:** 2026-07-06

## Colors

Palette extracted from globals.css. Total roles: **39**.

Verified WCAG ratios (from designer-handoff.json):
- ✅ **AAA** 14.65:1 — `fg` (#03045E) on `bg` (#CAF0F8) — body text
- ✅ **AAA** 17.75:1 — `fg` (#03045E) on `surface` (#FFFFFF) — body on white card
- ✅ **AAA** 10.20:1 — `fg-muted` (#023E8A) on `surface` (#FFFFFF) — secondary text on white
- ✅ **AAA** 8.42:1 — `accent` (#023E8A) on `bg` (#CAF0F8) — link text
- ✅ **AAA** 7.59:1 — `accent` (#023E8A) on `accent-soft` (#ADE8F4) — icon in soft circle

## Themes

Single palette (no themes.css detected).

## Do's and Don'ts

### Do
- ✅ Use the design system tokens defined in globals.css
- ✅ Run `designer_handoff_validate.py` before committing palette changes
- ✅ Run `wcag_audit.py` after deploy, before saying "done"

### Don't
- ❌ Add inline hex codes in JSX (`style={{color: '#XXXXXX'}}`)
- ❌ Modify the palette without updating designer-handoff.json
- ❌ Bypass the visual pre-commit gate without documented reason
