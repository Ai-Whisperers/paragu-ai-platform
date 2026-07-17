# Nexa Paraguay — Website (platform app)

> **Repository role: deployable Next.js site.**
> The website code lives here, inside the Ai-Whisperers platform monorepo.
> Research, market intel, decisions, and meeting notes for the Nexa Paraguay
> engagement live in the **private client repo**:
> **[`Ai-Whisperers/nexa-paraguay`](https://github.com/Ai-Whisperers/nexa-paraguay)**.

[![Live](https://img.shields.io/badge/live-nexaparaguay.com-7b61ff)](https://nexaparaguay.com)
[![Stack](https://img.shields.io/badge/stack-Next.js_16-blue)]()
[![Locales](https://img.shields.io/badge/locales-es%20en%20nl%20de-green)]()
[![Maintainer](https://img.shields.io/badge/maintainer-Ai--Whisperers-7b61ff)]()

---

## Live deployment

- **Canonical URL:** https://nexaparaguay.com
- **Aliases:**
  - https://www.nexaparaguay.com (301 → apex)
  - https://nexa.paragu-ai.com
  - https://nexa-paraguay.paragu-ai.com
  - https://nexa-preview.paragu-ai.com
- **Stack:** Next.js 16.2 (App Router, standalone) + Tailwind v4 + Supabase + 4-locale i18n (es/en/nl/de)
- **Docker stack:** `nexa-paraguay` (2 replicas) + `nexa-preview`
- **Docker network:** `agent-net` (Traefik overlay)
- **VPS:** 72.61.44.159 (paragu-ai production)

## Tech stack

| | |
|---|---|
| Framework | Next.js 16.2 (App Router, `output: "standalone"`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Fonts | Inter (body) + Playfair Display (display) |
| Hosting | Docker Swarm (2 replicas, 0.5 CPU / 512M limit each) |
| TLS | Traefik + Let's Encrypt |
| Auth / DB / CMS | Supabase (project `qyvokpribmbrosafntqa`) |
| Analytics | Google Analytics 4 (`G-XE49GLEP34`) + Vercel Analytics |
| i18n | `@ai-whisperers/i18n` (local tgz) + `@ai-whisperers/sections`, `@ai-whisperers/ui`, `@ai-whisperers/theme`, `@ai-whisperers/seo`, `@ai-whisperers/whatsapp` |
| CI | `.github/workflows/central.yml` in the platform monorepo |

## Local development

```bash
# From the monorepo root (/root/paragu-ai-platform)
pnpm install                                                # workspace deps
cp apps/nexa-paraguay/.env.example apps/nexa-paraguay/.env.local
# fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
# SUPABASE_SERVICE_ROLE_KEY
node apps/nexa-paraguay/scripts/copy-ai-packages.cjs         # resolve .tgz
pnpm --filter nexa-paraguay dev                             # http://localhost:3001
```

## Build + deploy

### Build only (host-side, for `Dockerfile.standalone`)

```bash
cd /root/paragu-ai-platform
pnpm --filter nexa-paraguay build
# produces apps/nexa-paraguay/.next/standalone/ (entrypoint: apps/nexa-paraguay/server.js)
```

### Full deploy (CI path)

GitHub Actions does this automatically on push to `main` (see
`.github/workflows/central.yml` — the paths-filter watches
`apps/nexa-paraguay/**`):

1. **detect-apps** — `paths-filter` decides which apps changed.
2. **lint / typecheck / build** — `pnpm --filter ./apps/nexa-paraguay` (note: pnpm is used by the central CI even though the app itself uses npm).
3. **docker** — `docker build -f apps/nexa-paraguay/Dockerfile.standalone` and pushes to `ghcr.io/Ai-Whisperers/paragu-ai-platform/nexa-paraguay`.
4. **deploy** — SSHes to the VPS, pulls the new image, and `docker service update --image ghcr.io/.../nexa-paraguay:${{ github.sha }} nexa-paraguay_web`.

### Manual deploy (on the VPS)

```bash
# On the VPS (or via SSH from your workstation)
ssh root@72.61.44.159
cd /root/paragu-ai-platform
./apps/nexa-paraguay/deploy.sh
# or just the rolling update with an existing image:
SERVICE=nexa-paraguay_web ./apps/nexa-paraguay/deploy.sh --no-build
```

### One-off rollbacks

```bash
# Roll back to the previous deploy
ssh root@72.61.44.159 'docker service update --rollback nexa-paraguay_web'

# Or roll back to a specific image
ssh root@72.61.44.159 'docker service update \
  --image nexa-paraguay:prod-20260615-1107 \
  nexa-paraguay_web'
```

## Repository layout

```
apps/nexa-paraguay/
├── README.md                   ← this file
├── CHANGELOG.md                ← deployable-site changelog
├── CODEOWNERS                  ← auto-assigns reviewers
│
├── Dockerfile                  ← full build (CI, one-off `docker build`)
├── Dockerfile.standalone       ← Swarm path (consumes pre-built .next/standalone)
├── docker-compose.yml          ← Swarm stack: 2 replicas, 3 domains + preview
├── deploy.sh                   ← tag + build + rolling update
│
├── .dockerignore               ← slim build context
├── .env.example                ← all env vars (template only)
├── .gitignore
├── .prettierrc.json
├── eslint.config.mjs           ← flat config (Next 16)
├── vitest.config.ts            ← unit test runner
├── playwright.config.ts        ← e2e test runner
├── tsconfig.json
├── next.config.js              ← security headers + standalone output
├── postcss.config.mjs          ← Tailwind v4
├── package.json
│
├── public/                     ← static assets
│   ├── images/                 ← actively loaded (blog, brand, flags, hero)
│   │   ├── blog/  brand/  flags/  hero/  og-default.svg
│   ├── favicon.ico, favicon.svg, icon-192.png, icon-512.png
│   ├── robots.txt
│   ├── schema/                 ← structured data (faq.json, organization.json)
│   ├── testimonios/            ← client testimonial form
│   ├── assets/                 ← brand assets (logo, photography notes)
│   ├── _archive-images/        ← 139MB marketing library (NOT shipped)
│   ├── _archive-sites/         ← 5MB reference site copy (NOT shipped)
│   └── _dev-artifacts/         ← QR codes from dev (NOT shipped)
│
├── content/                    ← localized site content JSONs (es/en/nl/de)
│   ├── es.json, en.json, nl.json, de.json
│   ├── locale-key-comparison-report.txt
│   └── blog/                   ← blog posts (posts-es.json, etc.)
│
├── nexa-pages/                 ← page-data JSONs (per-page config)
│
├── supabase/
│   └── migrations/             ← site_content + nexa_blog_cms SQL
│
├── scripts/                    ← runtime + build scripts
│   ├── health-check.sh         ← production health check (cron)
│   ├── copy-ai-packages.cjs    ← resolves .tgz @ai-whisperers/* into node_modules
│   └── _archive/               ← 34 one-off / migration scripts
│
├── .packages/                  ← local @ai-whisperers/* tgz (file:-referenced)
│   ├── ai-whisperers-i18n-0.2.0.tgz
│   ├── ai-whisperers-sections-0.1.0.tgz
│   ├── _unused/                ← old tgz (no longer referenced)
│   └── README.md
│
├── src/                        ← Next.js source
│   ├── app/                    ← App Router pages, layouts, route handlers
│   │   ├── [locale]/           ← locale-prefixed routes (proxy.ts routes here)
│   │   ├── [locale]/[slug]/    ← dynamic pages
│   │   ├── [locale]/blog/
│   │   ├── [locale]/intake/
│   │   ├── admin/              ← protected admin area
│   │   ├── api/                ← contact, content, intake, subscribe, exit-popup, revalidate, delete-data
│   │   └── login/
│   ├── components/             ← React components
│   │   ├── seo/                ← JSON-LD, OG, sitemap helpers
│   │   └── ui/                 ← UI primitives (flip cards, accordions, etc.)
│   ├── lib/                    ← core libs (loader, locales, supabase, page-data, theme, schemas)
│   └── types/
│
├── __tests__/                  ← unit tests (Vitest + jsdom)
├── tests/                      ← e2e tests (Playwright)
├── docs/                       ← MIRROR of the private repo's research
│                                ← (see "Research mirror" below)
│
├── components/                 ← top-level React components shared across routes
│   ├── JsonLd.tsx
│   └── WhatsAppButton.tsx
│
└── site.json, tokens.json, images.json, email-nurture.json, upgrade-tracker.json
                                 ← site config + asset manifests
```

## Repository conventions

- **Code & content changes** → commit + push to `paragu-ai-platform` (this repo)
- **Research / decision changes** → commit + push to `nexa-paraguay` (private repo),
  then mirror the affected files into `apps/nexa-paraguay/docs/`
- **Decision/issue logs** (`NEXA_DECISIONS.md`, `NEXA_ISSUES.md`) → live in
  `nexa-paraguay/docs/` (private repo). Mirror only if a deploy engineer needs offline access.
- **No new file-linked tgz without updating `.packages/README.md`**
- **No new public asset that isn't referenced from `content/*.json` or
  `src/`** — put it in `public/_archive-images/` instead and add a
  decision-log entry explaining why.

## Research mirror

This app's `docs/` folder is a one-way mirror of
[`Ai-Whisperers/nexa-paraguay/docs/`](https://github.com/Ai-Whisperers/nexa-paraguay/tree/main/docs)
so deploy engineers have offline access to the same research without
needing the private repo's credentials.

**Sync script (run from the platform root after editing private-repo docs):**

```bash
rsync -av --delete \
  --exclude='.git' \
  /root/nexa-paraguay/docs/ /root/paragu-ai-platform/apps/nexa-paraguay/docs/
```

If you need a one-way sync in CI, see the (planned)
`scripts/sync-docs.sh` — for now do it manually after private-repo PRs land.

## Related repos

| Repo | What's in it | Visibility |
|---|---|---|
| **[`Ai-Whisperers/nexa-paraguay`](https://github.com/Ai-Whisperers/nexa-paraguay)** | Research, decisions, market intel, brand docs, meetings, sales collateral | **Private** |
| [`Ai-Whisperers/paragu-ai-platform`](https://github.com/Ai-Whisperers/paragu-ai-platform) | 41+ client sites + shared `@ai-whisperers/*` packages | Mixed (apps private, platform public) |
| [`Ai-Whisperers/base`](https://github.com/Ai-Whisperers/base) | Canonical source of `@ai-whisperers/*` npm packages | Private |

## Operational runbook

### Health check

```bash
# On the VPS
/root/paragu-ai-platform/apps/nexa-paraguay/scripts/health-check.sh
# exit 0 = all good, exit 1 = alert written to /tmp/nexa-health-alerts.log
```

Schedule: `*/15 * * * *` via cron. Alerts go to Slack (if `SLACK_WEBHOOK`
is set) and email (if `ALERT_EMAIL` is set).

### Service management

```bash
# Status
docker service ps nexa-paraguay_web

# Logs
docker service logs -f nexa-paraguay_web

# Scale
docker service scale nexa-paraguay_web=3

# Force update
docker service update --force nexa-paraguay_web

# Inspect a single task
docker inspect $(docker service ps nexa-paraguay_web -q | head -1)
```

### Form submissions + leads

Stored in two named Docker volumes on the VPS:

- `nexa-leads` → mounted at `/app/.leads` (lead-capture form output)
- `nexa-submissions` → mounted at `/app/data/submissions` (contact form output)

To back up:

```bash
ssh root@72.61.44.159 'docker run --rm -v nexa-leads:/data -v $(pwd):/backup alpine tar czf /backup/nexa-leads-$(date +%Y%m%d).tgz -C /data .'
```

## Security

- All HTTP responses include HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff,
  Referrer-Policy strict-origin-when-cross-origin, and a Content-Security-Policy
  that allows only the trusted origins (Supabase, GA4, GTM, Google Fonts).
  See `next.config.js` for the full list.
- Service runs as the `nextjs` non-root user (UID 1001) inside the container.
- Real secrets live in Docker Swarm secrets + GitHub Actions secrets. **Never
  commit them.** `.env.example` is a template only.
- Form submissions are sanitized server-side in `src/app/api/contact/` and
  `src/app/api/intake/`.

## License & confidentiality

This app's source code is owned by Ai-Whisperers. Client brand assets
("Nexa Paraguay", "Proyecto Zohar") and content under `content/` and
`marketing/` are the client's intellectual property. See
`Ai-Whisperers/nexa-paraguay/CHANGELOG.md` for the engagement-level IP
notes.