# Client Profile: dra-gabriela

**Slug:** `dra-gabriela`
**App directory:** `apps/dra-gabriela`
**Live URL:** https://ometzdental.com
**Designer:** Luana López
**Generated:** 2026-07-06

## Quick facts

- **Source of truth:** `globals.css` in the app directory (Tailwind v4 `@theme` block + `:root` legacy)
- **Designer-handoff:** `./designer-handoff.json` (auto-generated, review before commit)
- **Design tokens:** `./DESIGN.md` (Google DESIGN.md spec format)
- **Work log:** `./work-log/` (one file per session, like `docs/trabajos/<date>_<designer>_<scope>.md`)

## Palette at a glance (39 tokens)

- `navy` = `#03045E`
- `navy-2` = `#020340`
- `accent` = `#023E8A`
- `accent-2` = `#03045E`
- `accent-light` = `#ADE8F4`
- `accent-soft` = `#ADE8F4`
- `yellow` = `#FFEF00`
- `yellow-2` = `#E6D700`
- `yellow-soft` = `#FFFBCC`
- `pink` = `#FF69B4`
- `pink-soft` = `#FFD6EA`
- `warmth-bg` = `#CAF0F8`
- ... + 27 more (see globals.css)

## Themes

Multi-palette system with **7 themes**: default, lilac, discreet, friend, pin, shades, random
All overrides MUST be wrapped in `@layer theme { }` to win the cascade.

## Before working on this site

1. Read `globals.css` to see the current `@theme` block
2. Read `designer-handoff.json` for the canonical palette + usage rules
3. Read `DESIGN.md` for the human-readable spec
4. Check `work-log/` for recent changes — what's been touched last?
5. Run `python3 ~/.hermes/skills/design/scripts/designer_handoff_validate.py designer-handoff.json`
6. After changes, run `wcag_audit.py` and verify live before declaring done

## Common gotchas for this client

- **Tailwind v4 silent no-op:** `tailwind-v4-silent-noop-trap` skill if utilities not generating
- **WCAG:** validate with `wcag-audit-automation` skill
- **Multi-palette cascade:** if `[data-theme]` switches don't apply, wrap in `@layer theme { }`

## Contact / escalation

- Designer: {designer} (visual critique comes post-deploy, plan for re-audit)
- Owner: Ivan Weiss (final approval on deploys)
