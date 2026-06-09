# Platform cleanup — execution summary (2026-06-08)

Phases 1–10 of the platform cleanup plan executed end-to-end.

## Commits made

1. `a6b76451` — wip: pre-cleanup snapshot of static-deploy fallback work
2. (no commit) — git remote remove builder
3. `f98586be` — fix(workspace): use workspace:* protocol for @ai-whisperers/client-kit
4. (Phase 3 docs commit, see log)
5. `15e187d6` — security+chore: consolidate GitHub Packages auth to root .npmrc
6. `0239e119` — chore(builder): remove redundant lockfiles, Cloudflare deploy, and stale changelog link
7. `4be77b7b` — chore(client-kit): bump to 0.2.0
8. `b2ea952a` — docs: record archived upstream repos folded into monorepo
9. `01b503f9` — docs: /opt/sites vs monorepo apps/ audit
10. `556b186a` — docs: add Phase 9 verification log

## Security findings (CRITICAL)

- **3 raw GitHub PATs** found in committed `.npmrc` files: camilo-acosta, fun4me, villamayor-asociados
  - Committed in `2e98694e` and `a6b76451`
  - **MUST be rotated at https://github.com/settings/tokens**
  - Files removed; root .npmrc now uses \${NODE_AUTH_TOKEN} env var only
- **1 Supabase keys leak** in `apps/fun4me/.env.bak`
  - **MUST rotate Supabase anon key**
  - File removed
- All 3 PATs plus the Supabase key are still in git history; recommend `git filter-repo` or BFG to scrub before any external fork

## Architectural changes

- Single root `.npmrc` replaces 11 per-app copies
- All `@ai-whisperers/*` packages use `workspace:*` protocol
- Removed `builder` git remote (content in `apps/builder/`)
- Removed redundant `apps/builder/` lockfiles (root `pnpm-lock.yaml` covers workspace)
- `client-kit` bumped 0.1.0 → 0.2.0 to match sibling packages
- `apps/builder` deploy-cloudflare.sh and Dockerfile.redirect deleted (Swarm-only)
- Stale `.bak` files deleted
- `apps/fun4me/pnpm-workspace.yaml` removed (conflicted with root)
- 9 docs files updated to point to monorepo paths

## Verified working

- `pnpm install` completes in 4.1s
- `apps/granja-cabral` builds with workspace:* deps resolving
- `client-kit` symlinks to local packages
- Smoke test: built `granja-cabral:cleanup-test` (241MB), rolled to Swarm, fixed stale Traefik route, `https://cabral.paragu-ai.com/` returns 200

## Follow-ups flagged

1. **Rotate 3 GitHub PATs** + Supabase key (security)
2. **Scrub git history** for the leaked secrets (use BFG or `git filter-repo`)
3. **Fix `packages/tsconfig.base.json`** — missing `--jsx` flag breaks `tsc` for @ai-whisperers/* packages (Phase 6 deferred)
4. **Manual /opt/sites retirement** — 9 directories are safe to retire per `docs/SITES_VS_MONOREPO_AUDIT.md`, but each needs Kiki/Ivan sign-off
5. **Arnos-Barber-Shop** in /opt/sites — needs review (recently modified, may be in flight)
