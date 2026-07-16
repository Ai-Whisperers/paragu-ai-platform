# @ai-whisperers/dockerfiles

Canonical Dockerfile templates + codegen. Source of truth so the fleet's 45
apps stop drifting from each other.

## Templates

| Template | Source | Purpose |
|---|---|---|
| `Dockerfile.next-standalone` | `apps/dra-gabriela/Dockerfile` | 3-stage `node:20-slim` + `corepack pnpm@10`, non-root uid 1001. For Next.js apps using `output: "standalone"`. |
| `Dockerfile.static-nginx` | `apps/meal-prep/Dockerfile` | 6-line `nginx:1.27-alpine` for static-export apps (`next export`, Astro static, etc.). |
| `nginx.conf` | `apps/meal-prep/nginx.conf` | Static-nginx companion config (gzip + `_next` cache headers + SPA fallback). |

Placeholders: `{{APP_NAME}}`, `{{APP_PORT}}`.

## Usage

From the monorepo root:

```bash
pnpm --filter @ai-whisperers/dockerfiles generate -- \
  --app=pierce-charm --port=3011 --mode=next-standalone
```

Or directly via the bin:

```bash
node packages/@ai-whisperers/dockerfiles/bin/generate.mjs \
  --app=pierce-charm --port=3011 --mode=next-standalone
```

### Flags

- `--app=<name>` (required) — writes to `apps/<name>/…`
- `--port=<n>` (required) — fills `{{APP_PORT}}` in Dockerfile + nginx.conf
- `--mode=next-standalone|static-nginx` (default `next-standalone`)
- `--appsDir=<path>` — override the `apps/` directory (default: `<cwd>/apps`)
- `--force` — overwrite existing Dockerfile/nginx.conf (refuses without this)

## Migration path

The generator refuses to overwrite by default. For an app already on a stale
Dockerfile:

1. Diff the current Dockerfile vs the template output to check for app-specific
   customizations (custom entrypoints, extra COPY steps, etc.).
2. Run the generator with `--force`.
3. Re-add any custom lines.
4. `docker build` locally to smoke-test before deploying.

## Why static templates + a tiny mjs script

No TypeScript build step needed — `bin/generate.mjs` is plain ESM, `node`-only,
zero deps. The templates are meant to be human-readable and grep-able, not
rendered through a build. If the template evolves (e.g. new base image), update
the file directly and re-run codegen for the fleet.
