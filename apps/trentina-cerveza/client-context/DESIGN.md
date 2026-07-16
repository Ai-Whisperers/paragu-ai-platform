---
version: alpha
name: Trentina Cerveza
description: Auto-generated DESIGN.md for trentina-cerveza. Refine colors, typography, components sections as design matures.
colors:
  accent: "#1A0F00"
  primary-light: "#3D2B1F"
  primary-dark: "#0A0600"
  accent-light: "#E8C06A"
  accent-dark: "#B8862E"
  bg: "#0D0D0D"
  surface: "#1A1A1A"
  surface-alt: "#222222"
  surface-light: "#2A2A2A"
  fg: "#F5F0E8"
  text-light: "#D0C8B8"
  fg-muted: "#888080"
  border: "#333333"
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

`trentina-cerveza` — auto-generated design spec from `apps/trentina-cerveza/globals.css`.

**Live URL:** 
**Designer:** Luana López
**Generated:** 2026-07-06

## Colors

Palette extracted from globals.css. Total roles: **13**.

Verified WCAG ratios (from designer-handoff.json):
- ✅ **AAA** 17.13:1 — `fg` (#F5F0E8) on `bg` (#0D0D0D) — body text
- ✅ **AAA** 15.34:1 — `fg` (#F5F0E8) on `surface` (#1A1A1A) — body on white card
- ✅ **AA** 4.51:1 — `fg-muted` (#888080) on `surface` (#1A1A1A) — secondary text on white
- ❌ **FAIL** 1.03:1 — `accent` (#1A0F00) on `bg` (#0D0D0D) — link text

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
