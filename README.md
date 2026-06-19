# paragu-ai-platform

Single Next.js monorepo for all Ai-Whisperers client sites + shared packages.

## Top-level layout
```
apps/<client>/             -> client website source (one per site)
packages/@ai-whisperers/*  -> shared packages (sections, SEO, checkout, auth, ...)
content/shared/*.json      -> shared content assets across sites
db/migrations/*.sql        -> central schema migrations
docs/*                     -> architecture, branch protection, migration notes
scripts/*                  -> shared deploy/build helpers
```

> **Package source of truth:** the `packages/@ai-whisperers/*` workspace here is a
> **stale local fork** (versions typically 1-2 majors behind). The canonical source is
> **[`Ai-Whisperers/base`](https://github.com/Ai-Whisperers/base)** — when bumping,
> pull from there, not from a published npm version. Long-term plan: delete the local
> forks and have all apps consume `@ai-whisperers/*` from GitHub Packages directly.

## Current client apps

| App | Live domain |
|-----|-------------|
| apps/3md-website | 3mind.paragu-ai.com |
| apps/bichos-gym | bichos-gym.paragu-ai.com |
| apps/bufete-mendez | bufete-mendez.paragu-ai.com |
| apps/builder | generated client output (paragu-ai-builder) |
| apps/camilo-acosta | camilo-acosta.paragu-ai.com |
| apps/de-abasto-a-casa | de-abasto-a-casa.paragu-ai.com |
| apps/dra-gabriela | dragabriela.paragu-ai.com (dra-gabriela.com.py pending DNS) — content source: [`Ai-Whisperers/dentist`](https://github.com/Ai-Whisperers/dentist) |
| apps/escribania-paraguay | escribania-paraguay.paragu-ai.com |
| apps/estudio-medieval | estudio-medieval.paragu-ai.com |
| apps/fun4me | fun4me.paragu-ai.com |
| apps/fun4me-store | fun4me-store.paragu-ai.com |
| apps/golden-visa-advisory | goldenvisa.paragu-ai.com |
| apps/granja-cabral | cabral.paragu-ai.com |
| apps/jota-ink-tattoo | jota-ink-tattoo.paragu-ai.com |
| apps/luis-de-leon-concept | luis-de-leon-concept.paragu-ai.com |
| apps/magnolia-peluqueria | magnolia-peluqueria.paragu-ai.com |
| apps/mantraspa | mantra-spa.paragu-ai.com |
| apps/meal-prep | meal-prep.paragu-ai.com |
| apps/nde-barba | nde-barba.paragu-ai.com |
| apps/ozmontania-website | ozmontania.paragu-ai.com |
| apps/pitchy-website | pitchy-blindex.paragu-ai.com |
| apps/portas-barber | portas-barber.paragu-ai.com |
| apps/reina-de-copas | reina-de-copas.paragu-ai.com |
| apps/shine-nails | shine-nails.paragu-ai.com |
| apps/trentina-cerveza | trentina-cerveza.paragu-ai.com |
| apps/trentina-site | trentina-site.paragu-ai.com |
| apps/tsuki-restaurante | tsuki-restaurante.paragu-ai.com |
| apps/villamayor-asociados | villamayor.paragu-ai.com |
| apps/xxgym | xxgym.paragu-ai.com |

## Build and run

```bash
pnpm install
pnpm dev
```

> **Note:** `nexa.paragu-ai.com` is served from the standalone
> [`Ai-Whisperers/nexa-paraguay`](https://github.com/Ai-Whisperers/nexa-paraguay)
> repo (not from `apps/`). It was removed from this monorepo on 2026-06-15.

## Deployments

- One central GitHub Actions workflow at `.github/workflows/central.yml`
- Apps are detected by path filter (`apps/<client>/**`) and run lint/typecheck when changed
- Routing target: Docker Swarm services `<app>_web` on the VPS
- Builder flow: `paragu-ai-builder` emits sites into `apps/`; deploy script at `scripts/deploy-existing-build.sh`

## Content patterns

- Static JSON: `apps/<client>/content/es.json`
- Shared content: `content/shared/*.json`
- Database backends are client-specific; shared migrations live under `db/migrations/`

## Ownership

- Monorepo owner: Ai-Whisperers engineering
- Client content ownership: per-client contact in each folder’s metadata
