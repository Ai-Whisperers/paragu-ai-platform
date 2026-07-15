# Client Profile: jota-ink-tattoo

**Slug:** `jota-ink-tattoo`
**App directory:** `apps/jota-ink-tattoo`
**Live URL:** 
**Designer:** Luana López
**Generated:** 2026-07-06

## Quick facts

- **Source of truth:** `globals.css` in the app directory (Tailwind v4 `@theme` block + `:root` legacy)
- **Designer-handoff:** `./designer-handoff.json` (auto-generated, review before commit)
- **Design tokens:** `./DESIGN.md` (Google DESIGN.md spec format)
- **Work log:** `./work-log/` (one file per session, like `docs/trabajos/<date>_<designer>_<scope>.md`)

## Palette at a glance (20 tokens)

- `accent` = `#C9A96E`
- `primary-foreground` = `#000000`
- `fg-muted` = `#1A1A2E`
- `secondary-foreground` = `#E8DCC8`
- `accent-foreground` = `#000000`
- `bg` = `#0A0A0A`
- `surface` = `#111111`
- `surface-light` = `#1A1A1A`
- `fg` = `#E8DCC8`
- `muted-foreground` = `#888888`
- `border` = `#222222`
- `card` = `#111111`
- ... + 8 more (see globals.css)

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
