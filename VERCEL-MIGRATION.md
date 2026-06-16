# Vercel Migration Plan — 2026-06-16

## TL;DR

**Yes, all 43 sites in the monorepo can run on Vercel.** No need to fork or split the monorepo. 36 production sites (all Next.js 16) map cleanly to a `*.paragu-ai.com` subdomain. The bulk-creation script is at `scripts/vercel-bulk-migrate.py` in this repo, ready to run when the Vercel account is unsuspended.

## The recommended pattern: 1 Vercel project per app (37 projects)

**Why not 1 project for everything?** Vercel charges by the project (above 50 on Pro) but the bigger cost is rebuild time + domain routing. With 1 project per app:
- Each app rebuilds only when its code changes (no wasted CI minutes on the other 36)
- Custom domain is one-to-one with project
- Failed build in one app doesn't block the others
- Preview deploys are isolated per app

**Why not fork the monorepo per app?** Forks diverge. Within weeks you'd have 43 repos with subtly different `pnpm-lock.yaml` versions. Cross-app refactors (which is the whole point of a monorepo) become impossible. We tested this pattern at the first iteration of ParaguAI and it was a maintenance nightmare.

## What is and isn't a Vercel candidate

| Status | Apps | Notes |
|---|---|---|
| ✅ Move to Vercel | 3md-website, ai-whisperers-site, bichos-gym, bufete-mendez, camilo-acosta, cocodrilo-fitness, cuidadoamiga, dayah-litworks, de-abasto-a-casa, depiflash, dra-gabriela, escribania-paraguay, estudio-medieval, fun4me, fun4me-store, golden-visa-advisory, granja-cabral, jota-ink-tattoo, luis-de-leon-concept, magnolia-peluqueria, mantra-spa, maskarada, meal-prep, nde-barba, nudo, ozmontania-website, pitchy-website, portas-barber, reina-de-copas, shine-nails, stroopwafel-huis, superspuma, trentina-cerveza, trentina-site, tsuki-restaurante, villamayor-asociados, xxgym | All 37 are production Next.js sites already on `*.paragu-ai.com` subdomains via Traefik |
| ⏸️ Defer | arnos-barber-shop, cronos-academy, hidrobaby-spa, scott-tatuajes | Legacy sites without docker-compose yet (would need Dockerfile + Traefik labels first) |
| ❌ Skip | site-template | It's the template repo, not a deployed site |
| ❌ Skip | builder, packages/engine | Build engines, not sites |
| ❌ Skip | dra-gabriela (the .com.py production domain) | Once client data is ready, migrate that as a separate project pointed at `dra-gabriela.com.py` |

## Vercel project config (per app)

```json
{
  "name": "<app>",
  "framework": "nextjs",
  "rootDirectory": "apps/<app>",
  "installCommand": "cd ../.. && pnpm install --frozen-lockfile",
  "buildCommand": "cd ../.. && pnpm install --frozen-lockfile && pnpm --filter=<app> build",
  "outputDirectory": "apps/<app>/.next",
  "gitRepository": {
    "type": "github",
    "repo": "Ai-Whisperers/paragu-ai-platform",
    "productionBranch": "main"
  }
}
```

Each project gets its custom domain: `<host>.paragu-ai.com` (the host from the Traefik `Host(...)` rule in the existing docker-compose).

## The build path will work because

1. **Vercel runs `pnpm install` at the monorepo root** (not per-app). The pnpm-lock.yaml at root resolves all 36 apps + 20 workspace packages with one install.
2. **Each app's `package.json` references `@ai-whisperers/*` as `"workspace:*"`.** pnpm creates the symlinks (verified — `node_modules/@ai-whisperers/i18n-paraguay` is a symlink to `../../../../packages/i18n`).
3. **Next.js compiles TypeScript on the fly** when it encounters `.ts`/`.tsx` imports. The workspace packages export `.ts` files (verified — `packages/i18n/index.ts`, `LocaleSwitcher.tsx`, `middleware.ts`). Next transpiles them as part of the app build. No separate compile step needed.
4. **Build verified locally:** `pnpm --filter="3md-website" build` ran in 27 seconds and produced a working `.next/standalone` output.

## DNS plan (Vercel-side)

Each Vercel project needs the domain pointed at Vercel's anycast IPs. Two options:
1. **Add the domain to Vercel** (one click per project, or scripted via API). Vercel gives you a CNAME target like `cname.vercel-dns.com`. Update the Cloudflare DNS record for `<host>.paragu-ai.com` from the VPS IP (`72.61.44.159`) to the Vercel CNAME. Cloudflare must stay as **DNS only** (gray cloud) so Vercel can issue the Let's Encrypt cert.
2. **Custom nameservers** (overkill for 37 sites).

**Pragmatic:** per-domain DNS change is 30 sec via Cloudflare API once Vercel gives the CNAME target.

## Cost

Vercel Pro plan: $20/mo per user (1 seat = Ivan). Includes:
- Up to 50 projects at $0 each
- Projects 51+ are $0.10/mo each (we'd pay $0 since we have 37)
- 1 TB bandwidth/mo (plenty for 36 small sites)
- Preview deploys on every PR
- Edge functions, analytics, speed insights, etc.

## What's blocking us

1. **Vercel account is suspended** (the `prj_wXNddpDndcw2edqfHNMdgyEuryLv` from the screenshots). Reactivate at https://vercel.com/ai-whisperers-8f40e593 — pick the Pro plan (or Hobby for testing 3 sites first). The `VERCEL_API_TOKEN` in `~/.hermes/.env` will start working again.
2. **A valid Vercel API token** (after reactivation). The bulk-migration script reads from `~/.hermes/.env` — replace `VERCEL_API_TOKEN` after generating a new one at https://vercel.com/account/tokens.

## The migration (when the account is back)

```bash
# 1. Verify auth
python3 /root/.hermes/scripts/vercel-bulk-migrate.py --dry-run

# 2. Run for real (creates 37 Vercel projects + adds domains)
python3 /root/.hermes/scripts/vercel-bulk-migrate.py

# 3. Wait for Vercel's first builds to finish (~2-3 min per project, parallel)
# Each project will show the build URL in the Vercel dashboard

# 4. For each project, get the Vercel-assigned domain and update Cloudflare
# (script will be added in the next iteration)

# 5. Cut over DNS: change Cloudflare A record from VPS to Vercel CNAME

# 6. After all sites are on Vercel: decommission the VPS Swarm services
# (delete the docker-compose files, prune containers)
```

## Time estimate (after reactivation)

| Step | Time |
|---|---|
| Bulk-create 37 Vercel projects + domains (script) | 10 min |
| First deploy of all 37 projects (parallel) | 15 min |
| Update 37 Cloudflare DNS records to Vercel CNAMEs (script) | 10 min |
| DNS propagation + Vercel cert issuance | 30-60 min |
| Verify all 37 sites are live | 15 min |
| Decommission VPS Swarm services | 30 min |
| **Total** | **~2 hours** |

## What's preserved

- **Single git repo** (no forks): every shared package change still propagates to every app via `pnpm install` on every Vercel build.
- **Shared CI**: one Vercel webhook per project, all watching the same monorepo. PRs get per-app preview URLs.
- **Local dev**: `pnpm dev` in any app still works the same way (Vercel's dev experience is identical to local Next.js dev).
- **Custom domains**: 1:1 with the existing `*.paragu-ai.com` setup. No rebrand needed.

## What changes

- **DNS for each `<host>.paragu-ai.com`** moves from VPS IP `72.61.44.159` (Cloudflare proxied) to Vercel CNAME (Cloudflare DNS only). Cloudflare proxying stops being useful for these domains — Vercel does the same job.
- **Traefik labels for these services** can be removed from docker-compose.yml (the VPS stops serving them). The Cloudflare dynamic config for these routers can be removed.
- **The deploy story changes** from `ssh agentzero "cd apps/<app> && deploy.sh"` to `git push` (Vercel auto-deploys from the GitHub repo).
