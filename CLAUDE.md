# paragu-ai-platform — repo-scoped agent instructions

## Design tokens — ParaguAI Builder (canonical, do not re-ask)

Palette (wired in `apps/builder/app/globals.css` as CSS custom properties):

| Hex       | Token(s)                          | Role                                             |
|-----------|-----------------------------------|--------------------------------------------------|
| `#7834C0` | `--primary`, `--ring`             | FAQ headings, focus rings                        |
| `#AF7AC9` | `--brand`                         | Templates gallery grid                           |
| `#D2AE3F` | `--accent`, `--warning`           | Light buttons, warm accents                      |
| `#4C2C73` | `--deep`                          | Templates preview, "¿Tenés dudas?" CTA           |
| `#7D60A4` | `--bg`, `--background`            | **ALL** section backgrounds, PWA background_color|

Fonts (self-hosted `.woff2` under `apps/builder/public/fonts/`):
- Titles / active headings → **Press Start 2P** (pixel retro)
- Reserve / grid → **Bitcount Grid Double**

Hard rules:
- **No gradients** anywhere (`bg-gradient-*`, `linear-gradient`, `radial-gradient`). If depth is needed, adjacent palette shades on solids.
- ALL section backgrounds must be `#7D60A4`.
- Stained-glass water-droplet aesthetic: mirrored elements, light-reflection detail (ref: stainedglassforless.com medium-blue-transparent-243cc).
- Industry icons (in `apps/builder/public/icons/`): superspuma (indumentaria), mantraspa/flaticon 2438018 (spa), bichosgym (gym), depiflash/flaticon 3461652 (depilación), nexa/flaticon 5044794 (reubicación), mantraspa/flaticon 6449140 (belleza).
- Cyberwork decor SVGs: `apps/builder/public/decor/{cyber-panel,digital-transformation,pixel-glyph}.svg`.

Any new component in `apps/builder/*` uses tokens via CSS custom properties, not hex literals.

## Client apps under `apps/*` — override protocol

Each client can override the ParaguAI defaults by writing an `apps/<client>/CLAUDE.md`. If Ivan issues a "for client X use Y" directive, persist it to `apps/<client>/CLAUDE.md` in the same turn. Never keep client-specific tokens only in chat memory.

## Repo conventions

- **Package manager**: pnpm 10.28.2 (workspaces). Never mix in npm/yarn.
- **Framework**: Next.js 16 (App Router). Self-host fonts as `.woff2`, do not use `next/font` for the retro faces.
- **Bilingual client sites**: default `es` / `en`. See `docs/HREFLANG_MIGRATION.md` for the reference impl (`nexa-paraguay` = migrated reference). Single-locale exceptions: `pierce-charm` (es only).
- **Content**: locale JSON at `apps/<client>/content/{es,en}.json` when bilingual; inline strings tolerable only for prototypes.
- **Deploy target**: Hostinger VPS + Traefik. Vercel is not usable (account suspended). See [memory: project-standing-blockers].
- **Docker**: `Dockerfile.localpack.tmp` files are transient during local pack builds — leave them out of commits.

## Autonomy contract (Ivan-specific)

Ivan's global CLAUDE.md governs — do not ask him engineering-preference questions. Pick the ParaguAI defaults above unless the client has an explicit override file. Confirm ONLY for destructive/shared-state actions (branch delete, force push, credential rotation, external messages).

If a directive says "always X" or "the palette is Y" — persist it to the appropriate file in the same turn.

## Known standing blockers (route around, don't retry)

Full list in memory `project-standing-blockers`. Summary:
1. Vercel 403 (suspended) → deploy via Hostinger.
2. Secrets in git history → force-push requires per-run auth.
3. `stash@{0}` builder WIP conflicts with `9a4ed2cc` + `23669b46` → reconcile via cherry-pick, not `stash pop`.
4. Port `:3010` EADDRINUSE → `lsof -ti:3010 | xargs -r kill -9` before `pnpm dev`.
5. `.npmrc NODE_AUTH_TOKEN` interpolation warning → set env var or use workspace-local `.npmrc`.
