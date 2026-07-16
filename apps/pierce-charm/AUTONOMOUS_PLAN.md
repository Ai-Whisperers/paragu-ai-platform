# Pierce-Charm Ultrawork Plan

Anchor: user requested "fixes de pierce charm / first section" and then "ultrawork". First-section
fixes shipped in prior commits. This plan covers the next autonomous pass — polish the rest of the
site so it reaches the same gothic-alt bar as the hero.

## Goal

Raise every page/section of pierce-charm to production quality: consistent gothic-alt aesthetic
(bats, ornaments, blood/wine palette, script accents), no placeholders, no dead content, mobile
responsive, keyboard-accessible, and free of console errors on the running dev server (:3011).

## Items

1. **Audit home sections 2–6** — story, features, process, catalog, final CTA. Fix visual
   inconsistencies (spacing, hairline dividers, ornament placement), and swap any lingering
   generic copy for gothic voice.
2. **Sub-route: /nosotros** — story page. Read + polish. Add gothic ornaments and animation on
   scroll. Ensure content-driven from `content/es.json`.
3. **Sub-route: /piercings** — full catalog page. Verify each piercing has name, price, healing
   time, jewelry material. Add filter chips (cartílago vs. lóbulo vs. facial) if missing.
4. **Sub-route: /faq** — FAQ page. Ensure accordion behavior, aria-expanded, keyboard nav.
5. **Sub-route: /contacto** — contact page. Verify WhatsApp CTA, address, hours, map or embed.
6. **Sub-route: /galeria** — gallery. Confirm images exist (or placeholders swapped for real
   dummy assets), lightbox works, alt text set.
7. **Layout/chrome** — Header, Footer, BottomNav, WhatsAppFloat. Check mobile tap targets ≥44px,
   safe-area insets, focus rings.
8. **Content pass** — grep for `TODO`, `PENDING`, `PENDIENTE`, `Lorem`, empty strings in
   `content/es.json`. Fill gaps with plausible Asunción-appropriate copy.
9. **SEO/metadata** — layout.tsx metadata block, OG tags, JSON-LD LocalBusiness with real
   address (or explicit `TODO` if genuinely unknown), robots.ts, sitemap.
10. **Accessibility sweep** — semantic landmarks (`<main>`, `<nav>`, `<header>`, `<footer>`),
    heading hierarchy, alt text, form labels, prefers-reduced-motion.
11. **Perf sanity** — images have width/height or `aspect-ratio`; no unbounded animations off
    screen; check for unused CSS.
12. **Final smoke** — `curl :3011/` and each route → HTTP 200, no unhandled 500s in dev log.

## Acceptance criteria

- Every route (`/`, `/nosotros`, `/piercings`, `/faq`, `/contacto`, `/galeria`) returns 200 on
  :3011 and renders without React/hydration errors.
- No `PENDING/PENDIENTE/TODO/Lorem` in shipped content (except explicit engineer TODOs behind
  `<!-- TODO(engineer): ... -->` markers).
- Gothic-alt aesthetic consistent: bats/skulls/moons/crosses used at least once per page section,
  wine/gold/plum palette, script accents on eyebrows and CTAs.
- Header + BottomNav focus/tap targets pass basic a11y (≥44px, visible focus ring).
- One git commit per section (conventional commit style, `feat(pierce-charm): ...`).

## Stop conditions

- All items complete → final report + stop.
- Would need to invent business facts the user must supply (real prices, WhatsApp number,
  Instagram handle, licensing docs) → mark with visible TODO, keep going, list in final report.
- Same error 3× despite fixes → document and skip to next unblocked item.
- Destructive/shared-state action needed (branch delete, force-push, credential change) → pause,
  surface to user.

## Working style

- Autonomous-worker subagent drives the loop.
- Checkpoint commits every ~5 tasks under the working branch (currently `main` — will branch
  off if the loop touches >10 files to keep review sane).
- Content-driven: prefer editing `content/es.json` + `content/tokens.json` over hard-coding.
