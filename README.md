# paragu-ai-platform

Production monorepo for all Ai-Whisperers client sites.

## Structure

- `apps/` — one folder per client site
- `packages/site-template/` — shared Next.js base
- `packages/engine/` — data layer, CMS, overrides

## Rules

- `main` is production. Branch protection ON.
- Dev work happens in `*-dev` forks.
- PR review required before merge.
