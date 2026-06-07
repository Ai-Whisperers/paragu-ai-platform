# PHASE 6 — Monorepo migration plan

Status: COMPLETE SNAPSHOT — pending npm install verification

## What is already true

- All screenshots for nexa-paraguay are in `apps/nexa-paraguay/public` and included in the repo.
- All MDX blog posts are present under `apps/nexa-paraguay/blog/{de,en,es,nl}/`.
- JSON content pages are present under `apps/nexa-paraguay/pages/*.json`; these are the deploy-time article pages.
- `packages/site-template` is the shared Next.js base; engine contents are migrated.
- `pnpm-workspace.yaml` is created as a flat workspace list over `packages/*` and `apps/*`.

## What is blocked

- `pnpm install` is failing due to private registry auth for `@ai-whisperers/*` rather than migration itself.
- The actual blocker is one of:
  - missing npm auth token,
  - packages intended to be `workspace:*` but still published from the registry,
  - or React/types peer resolution conflicting with the missing local `node_modules`.

Current tooling state: pnpm 10.33.0; node_modules not installed.

## What remains

1. Run `pnpm install` after auth/config is valid.
2. Re-run the content-page checks that were already started.
3. Capture complete status in `MIGRATION_STATUS.md` after install passes.

## Dev fork workflow

### Rule
Do not commit to main in the monorepo. Use `*-dev` forks for every app.

### Recommended pattern
```
origin: Ai-Whisperers/paragu-ai-platform (main protected)
fork-1: your-org/nexa-paraguay-dev
fork-2: your-org/nudo-dev
...
```

### PR flow
1. Branch from `main` in your fork.
2. Work only in your app folder.
3. Open PR to `Ai-Whisperers/paragu-ai-platform:main`.
4. Required checks: install passes, route smoke test passes.

## Rollback
- Production changes are always reversible via `git revert` on `main`.
- Client branches keep history per app.
