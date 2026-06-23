# scripts/

Production + dev scripts for the Nexa Paraguay app.

## Live

| File | Purpose | Used by |
|---|---|---|
| `health-check.sh` | Production health check (HTTP, pages, Supabase, Swarm, assets, /api/health) — alerts via Slack + email on failure | Cron (`*/15 * * * *`) |
| `copy-ai-packages.cjs` | After `npm install`, copies `.tgz`-linked `@ai-whisperers/*` packages into `node_modules` (workaround for npm symlink quirks) | `package.json` `prebuild` + `postinstall`; `Dockerfile` |

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
