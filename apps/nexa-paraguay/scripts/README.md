# scripts/

Production + dev scripts for the Nexa Paraguay app.

## Live

| File | Purpose | Used by |
|---|---|---|
| `health-check.sh` | Production health check (HTTP, pages, Supabase, Swarm, assets, /api/health) — alerts via Slack + email on failure | Cron (`*/15 * * * *`) |
| `copy-ai-packages.cjs` | After `npm install`, copies `.tgz`-linked `@ai-whisperers/*` packages into `node_modules` (workaround for npm symlink quirks) | `package.json` `prebuild` + `postinstall`; `Dockerfile` |
| `check-locale-parity.mjs` | 4-locale (es / en / nl / de) content parity gate. Exits non-zero on missing keys, empty values, or unfilled autofill placeholders. Same logic as `__tests__/locale-parity.test.ts`. | `pnpm i18n:check`, `pretest`, `prebuild`, pre-commit hook |
| `fill-locales.mjs` | Auto-seeds missing keys in non-ES locales with `[ES→XX] <source text>` placeholders. The parity gate flags any placeholders that remain, so the team has a live todo list. Dry-run by default; pass `--write` to apply. | `pnpm i18n:fill` / `pnpm i18n:fill:dry` |
| `lib/locale-parity.mjs` | Shared parity-check core (loaded by the test, the CLI, and the fill script). Single source of truth so the test and CLI can never disagree. | (internal) |

## Locale parity gate

The site ships content in four languages: **es, en, nl, de**. Drift between
them — a hero CTA added in Spanish but never translated, a string silently
emptied to fall through to the next locale, a section renamed in one file
and not the others — has been the single biggest source of post-deploy UI
bugs. This gate makes that drift unmergeable.

### How it works

1. **Walk** every leaf-string key path in each of `content/{es,en,nl,de}.json`
   (array items indexed as `[0]`, `[1]`, …).
2. **Union** all four sets into one superset of keys.
3. **Fail** if any key is missing or empty in any locale.
4. **Fail** if any non-ES locale contains a `[ES→XX]` placeholder written by
   the autofill (translators leave these behind as their working list).

### When it runs

| Trigger | Command |
|---|---|
| Every `pnpm test` | via `pretest` hook |
| Every `pnpm build` | via `prebuild` hook |
| CI (central.yml) | `pnpm --filter nexa-paraguay run i18n:check` (added in app scripts) |
| Pre-commit (optional) | `.githooks/pre-commit` — only fires when `content/*.json` is staged |

To enable the pre-commit hook in your local clone:

```bash
git config core.hooksPath .githooks
```

To bypass the hook for one commit (rebase, cherry-pick, emergency hotfix):

```bash
git commit --no-verify
```

### Recovering from a failed check

If the gate fails on existing content, the fastest path back to green is:

```bash
cd apps/nexa-paraguay
pnpm i18n:fill            # seeds missing keys with [ES→XX] placeholders
                          # then open the JSONs and translate them, removing
                          # the [ES→XX] prefix as you go
```

The autofill is **deliberately noisy** — the `[ES→XX]` prefix is greppable
and shows up in every future parity report until you translate. The site
stays up, but the gate stays red until the work is done.

## Archived

The `scripts/_archive/` directory holds one-off generators, migrations, and
dead-code scripts from the 2024–2026 build-out. **Do not use them in
production.** They are kept for archaeology and in case anyone needs to
re-trace a content / data migration.

If you need to run a one-off task (add blog posts, regenerate keys, fill
locale gaps, etc.), write a fresh script in this folder and add it to the
table above.

## Adding a new script

1. Put the file at `scripts/<purpose>.{sh,py,js,cjs,mjs}`.
2. Make it executable: `chmod +x scripts/<purpose>.sh`.
3. Add a header comment block at the top:

   ```bash
   #!/usr/bin/env bash
   # ── Nexa Paraguay — <one-line purpose> ──
   # <longer description>
   # Usage: <commands>
   # Cron: <optional, e.g. "0 6 * * * /path/to/script">
   set -euo pipefail
   ```

4. Update the table above.
5. Open a PR.
