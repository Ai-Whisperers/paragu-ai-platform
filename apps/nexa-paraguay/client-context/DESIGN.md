---
version: alpha
name: Nexa Paraguay
description: Auto-generated DESIGN.md for nexa-paraguay. Refine colors, typography, components sections as design matures.
colors:
  accent: "#1B2A4A"
  fg-muted: "#C9A96E"
  bg: "#FFFFFF"
  surface: "#FFFFFF"
  surface-alt: "#F5F5F0"
  fg: "#1B2A4A"
  border: "#E0E0E0"
  success: "#10B981"
  warning: "#F59E0B"
  error: "#EF4444"
  info: "#3B82F6"
  whatsapp: "#25D366"
  cream-bg: "#F5F5F0"
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

`nexa-paraguay` — auto-generated design spec from `apps/nexa-paraguay/globals.css`.

**Live URL:** 
**Designer:** Luana López
**Generated:** 2026-07-06

## Colors

Palette extracted from globals.css. Total roles: **13**.

Verified WCAG ratios (from designer-handoff.json):
- ✅ **AAA** 14.22:1 — `fg` (#1B2A4A) on `bg` (#FFFFFF) — body text
- ✅ **AAA** 14.22:1 — `fg` (#1B2A4A) on `surface` (#FFFFFF) — body on white card
- ❌ **FAIL** 2.24:1 — `fg-muted` (#C9A96E) on `surface` (#FFFFFF) — secondary text on white
- ✅ **AAA** 14.22:1 — `accent` (#1B2A4A) on `bg` (#FFFFFF) — link text

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
