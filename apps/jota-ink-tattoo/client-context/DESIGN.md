---
version: alpha
name: Jota Ink Tattoo
description: Auto-generated DESIGN.md for jota-ink-tattoo. Refine colors, typography, components sections as design matures.
colors:
  accent: "#C9A96E"
  primary-foreground: "#000000"
  fg-muted: "#1A1A2E"
  secondary-foreground: "#E8DCC8"
  accent-foreground: "#000000"
  bg: "#0A0A0A"
  surface: "#111111"
  surface-light: "#1A1A1A"
  fg: "#E8DCC8"
  muted-foreground: "#888888"
  border: "#222222"
  card: "#111111"
  card-foreground: "#E8DCC8"
  ring: "#C9A96E"
  input: "#222222"
  destructive: "#EF4444"
  destructive-foreground: "#FFFFFF"
  success: "#10B981"
  warning: "#F59E0B"
  ink-dark: "#000000"
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

`jota-ink-tattoo` — auto-generated design spec from `apps/jota-ink-tattoo/globals.css`.

**Live URL:** 
**Designer:** Luana López
**Generated:** 2026-07-06

## Colors

Palette extracted from globals.css. Total roles: **20**.

Verified WCAG ratios (from designer-handoff.json):
- ✅ **AAA** 14.62:1 — `fg` (#E8DCC8) on `bg` (#0A0A0A) — body text
- ✅ **AAA** 13.94:1 — `fg` (#E8DCC8) on `surface` (#111111) — body on white card
- ❌ **FAIL** 1.11:1 — `fg-muted` (#1A1A2E) on `surface` (#111111) — secondary text on white
- ✅ **AAA** 8.85:1 — `accent` (#C9A96E) on `bg` (#0A0A0A) — link text

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
