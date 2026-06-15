# Maskarada — Monorepo Migration

**Migrated to paragu-ai-platform monorepo on 2026-06-15.**

This app is now built and deployed from `/root/paragu-ai-platform/apps/maskarada/`. The standalone SvelteKit repo at `/root/maskarada` is preserved as a historical reference and is no longer the source of truth.

## Live deployment

- **URL:** https://maskarada.paragu-ai.com
- **Stack:** Next.js 16.2 (App Router, standalone) + Tailwind v4 + Supabase
- **Docker stack:** `maskarada` Swarm service
- **Build:** `pnpm build` (from monorepo root) → `docker build -f apps/maskarada/Dockerfile.standalone -t maskarada:prod ./apps/maskarada` → `docker service update --force --image maskarada:prod maskarada_web`

## Supabase

Same project as the original standalone repo: `qyvokpribmbrosafntqa`. Schema unchanged (mk_tickets, mk_blocklist, mk_marketing_list, mk_site_config, mk_capacity). RLS policies preserved.

## Health

- `GET /api/health` → `{ "status": "ok", "service": "maskarada" }`
- Smoke test all 11+ paths after deploy
