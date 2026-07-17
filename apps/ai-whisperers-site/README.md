# AI Whisperers — Company Site

> The canonical AI Whisperers company website. Next.js 15, content-driven JSON, 4-locale (en/es/nl/pt).

**Live at:** https://www.ai-whisperers.org (apex redirects to www)

## Stack

- **Next.js 15** (App Router, standalone build)
- **React 19**
- **Tailwind CSS 4** (via `@tailwindcss/postcss`)
- **TypeScript 5.7**
- **Content:** `content/{en,es,nl,pt}/site.json` (currently en + es, nl/pt fall back)
- **Icons:** lucide-react
- **Deployment:** Docker Swarm + Traefik on `agent-net` (VPS `72.61.44.159`)

## Local dev

```bash
pnpm install
pnpm --filter ai-whisperers-site dev
# → http://localhost:3000
```

## Build & deploy

```bash
./deploy.sh
# → Docker image → Docker Swarm service ai-whisperers-site_web
```

## Architecture

```
app/
├── layout.tsx                    # Root layout (fonts, metadata, viewport)
├── page.tsx                      # Root → redirects to /en
├── globals.css                   # Tailwind 4 + design tokens
└── [lang]/
    ├── layout.tsx                # Per-locale layout (Navbar + Footer)
    ├── page.tsx                  # Home
    ├── services/                 # Pricing/services
    ├── portfolio/                # 5 flagship case studies
    ├── open-source/              # 8 OSS projects
    ├── about/                    # Team + story
    ├── contact/                  # Form + channels
    ├── pricing/                  # Transparent rates
    └── sales-sheet/              # 28-capability sales sheet info

components/
├── Navbar.tsx
├── Footer.tsx
└── ContactForm.tsx

content/
├── en/site.json                  # 13 KB — canonical English content
├── es/site.json                  # 15 KB — full Spanish translation
├── nl/site.json                  # (falls back to EN)
└── pt/site.json                  # (falls back to EN)

lib/
└── utils.ts                     # cn() helper for classnames

public/                           # Static assets (favicon, OG images)
```

## Content source of truth

All content is sourced from:
- **`Ai-Whisperers/company/Company/services/README.md`** (28 services)
- **`Ai-Whisperers/company/docs/company-narrative.md`** (the pitch)
- **`Ai-Whisperers/company/docs/portfolio-narrative.md`** (website copy)
- **`Ai-Whisperers/company/docs/case-studies/`** (case studies)
- **`Ai-Whisperers/company/Company/sales/capabilities-sheet.csv`** (sales sheet)

When the company repo updates, regenerate `content/{en,es}/site.json` from the source.

## Docker labels (Traefik)

Per `docker-compose.yml`:
- `Host(`ai-whisperers.org`)` → main route, letsencrypt TLS
- `Host(`www.ai-whisperers.org`)` → redirect to apex (regex)

## Domains

| Domain | Behavior |
|---|---|
| `ai-whisperers.org` | Apex, primary |
| `www.ai-whisperers.org` | Redirects to apex (no `www.`) |
| `/en` `/es` `/nl` `/pt` | Locale variants |

## Maintenance

- **Content updates:** Edit `content/{en,es}/site.json`, then `git push` + `./deploy.sh`
- **Style changes:** Edit `app/globals.css` or `tailwind.config` (if added)
- **New pages:** Add under `app/[lang]/<page>/page.tsx`, link from `Navbar` + `Footer`
- **New locales:** Add to `LOCALES` array in `app/[lang]/layout.tsx` + create `content/<locale>/site.json`
