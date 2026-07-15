---
version: alpha
name: Superspuma
description: Auto-generated DESIGN.md for superspuma. Refine colors, typography, components sections as design matures.
colors:
  accent: "#1A1A2E"
  fg-muted: "#16213E"
  bg: "#FFFFFF"
  fg: "#1A1A2E"
  surface: "#F8F9FA"
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

`superspuma` — auto-generated design spec from `apps/superspuma/globals.css`.

**Live URL:** 
**Designer:** Luana López
**Generated:** 2026-07-06

## Colors

Palette extracted from globals.css. Total roles: **5**.

Verified WCAG ratios (from designer-handoff.json):
- ✅ **AAA** 17.06:1 — `fg` (#1A1A2E) on `bg` (#FFFFFF) — body text
- ✅ **AAA** 16.18:1 — `fg` (#1A1A2E) on `surface` (#F8F9FA) — body on white card
- ✅ **AAA** 15.08:1 — `fg-muted` (#16213E) on `surface` (#F8F9FA) — secondary text on white
- ✅ **AAA** 17.06:1 — `accent` (#1A1A2E) on `bg` (#FFFFFF) — link text

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
