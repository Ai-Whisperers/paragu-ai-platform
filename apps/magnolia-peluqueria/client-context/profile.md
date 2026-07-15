# Client Profile: magnolia-peluqueria

**Slug:** `magnolia-peluqueria`
**App directory:** `apps/magnolia-peluqueria`
**Live URL:** 
**Designer:** Luana López
**Generated:** 2026-07-06

## Quick facts

- **Source of truth:** `globals.css` in the app directory (Tailwind v4 `@theme` block + `:root` legacy)
- **Designer-handoff:** `./designer-handoff.json` (auto-generated, review before commit)
- **Design tokens:** `./DESIGN.md` (Google DESIGN.md spec format)
- **Work log:** `./work-log/` (one file per session, like `docs/trabajos/<date>_<designer>_<scope>.md`)

## Palette at a glance (14 tokens)

- `accent` = `#0D2137`
- `primary-light` = `#1A3A5C`
- `fg-muted` = `#2ECC71`
- `secondary-dark` = `#27AE60`
- `bg` = `#F8F9FA`
- `surface` = `#FFFFFF`
- `surface-muted` = `#F1F3F5`
- `fg` = `#2D2D2D`
- `foreground-light` = `#6B6B6B`
- `foreground-muted` = `#9CA3AF`
- `border` = `#E5E7EB`
- `success` = `#4A7C59`
- ... + 2 more (see globals.css)

## Themes

Single palette (no theme system).

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
