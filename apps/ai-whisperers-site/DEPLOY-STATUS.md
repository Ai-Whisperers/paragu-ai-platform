# AI Whisperers Site — Deploy Status & DNS Wiring

> **Status:** Site code is built, Docker image is on VPS, Swarm service is running, Traefik routes are configured. **What's missing: DNS pointing to the VPS.**

---

## ✅ What's already done (committed to `Ai-Whisperers/paragu-ai-platform`)

### Code (in `apps/ai-whisperers-site/`)
- Next.js 15 + React 19 + Tailwind 4.2 + TypeScript 5.7
- 4-locale routing: `/en` `/es` `/nl` `/pt`
- 8 pages: home, services, portfolio, open-source, about, contact, pricing, sales-sheet
- 32 routes prerendered (4 langs × 8 pages) as static HTML
- Dark theme, gradient text, responsive
- Spanish translation complete (15 KB content); NL/PT fall back to EN
- `npm run build` → ✓ Compiled successfully
- Docker image: `ai-whisperers-site:prod` (256 MB)

### Deploy (on VPS `agentzero` 72.61.44.159)
- Image built and tagged: `ai-whisperers-site:prod`
- Swarm service: `ai-whisperers-site_web` (1/1 replicas, running)
- Traefik routes configured:
  - `Host(`ai-whisperers.org`)` → main route
  - `Host(`www.ai-whisperers.org`)` → redirect to apex via regex middleware
  - TLS via letsencryptresolver
  - Network: `agent-net`
- Container listening on internal port 3000

---

## ⏳ What's left for Ivan (DNS + clean old site)

### 1. Update DNS for `ai-whisperers.org`

**Current state:**
- Apex `ai-whisperers.org` → Vercel (DNS: `216.150.1.1`, A record)
- `www.ai-whisperers.org` → Cloudflare (DNS: `104.21.56.190`, `172.67.155.205`) → GitHub Pages 404

**Goal:** both `ai-whisperers.org` and `www.ai-whisperers.org` → point to VPS `72.61.44.159`

**Option A: At Cloudflare (recommended for `www`)**

We have Cloudflare zone control for `paragu-ai.com` only. `ai-whisperers.org` zone is on a different Cloudflare account. Ask the domain owner (Ivan) to:

1. Log into the Cloudflare account that owns `ai-whisperers.org`
2. DNS → Records:
   - **Delete** the existing `www` A records (GitHub Pages IPs)
   - **Add** `www` A record: `72.61.44.159` (proxied **off** so Traefik can issue the cert)
   - **Add** apex A record: `72.61.44.159` (proxied **off**)
3. Or just use CNAME if apex is a CNAME-able zone

**Option B: At the registrar (Namecheap / Porkbun / etc.)**

If the registrar is faster:

1. Login to registrar for `ai-whisperers.org`
2. Nameservers → keep Cloudflare as authoritative (Cloudflare controls)
3. Then do Option A

**Option C: At Vercel (if the domain is on the Vercel project)**

1. Login to Vercel → project → Domains
2. **Remove** `ai-whisperers.org` and `www.ai-whisperers.org` from this Vercel project
3. Update DNS at Cloudflare to point to VPS

**Option D: Skip DNS for now and use a different live URL**

The new site is already deployed on VPS. To see it live without changing DNS:

```bash
# Tailscale
https://agentzero.ts.net/

# Or via Traefik dashboard
https://traefik.paragu-ai.com/dashboard/  # (needs auth)
```

### 2. Once DNS is pointed, verify

```bash
# Check DNS
dig +short ai-whisperers.org A
dig +short www.ai-whisperers.org A

# Check the live site
curl -I https://ai-whisperers.org/en
curl -I https://www.ai-whisperers.org/en

# Check www redirect
curl -I -L https://www.ai-whisperers.org/en
# Should 301 → https://ai-whisperers.org/en
```

### 3. Decommission the legacy Vercel site

The legacy site is at `ai-whisperers.org` via Vercel (Next.js 16 site-template). Once DNS points to VPS:

1. Vercel project → Settings → Domains → remove `ai-whisperers.org` and `www.ai-whisperers.org`
2. The Vercel project can be deleted or kept as a backup

### 4. (Optional) Move the legacy Vercel code into the monorepo

The legacy site is built on `Ai-Whisperers/site-template`. For archival:

```bash
cd /root/paragu-ai-platform
mkdir -p _archive/legacy-vercel-site-template
# Clone the public repo
git clone https://github.com/Ai-Whisperers/site-template.git _archive/legacy-vercel-site-template
```

This is non-urgent; only do it for historical record.

---

## 🛠️ How to deploy future changes

From the monorepo, on the VPS:

```bash
ssh root@72.61.44.159
cd /root/paragu-ai-platform/apps/ai-whisperers-site
git pull
npm install --legacy-peer-deps
npm run build
docker build -t ai-whisperers-site:prod -t ai-whisperers-site:prod-$(date +%Y%m%d-%H%M) .
docker service update --image ai-whisperers-site:prod ai-whisperers-site_web
```

Or use the deploy script:

```bash
ssh root@72.61.44.159
cd /root/paragu-ai-platform/apps/ai-whisperers-site
./deploy.sh
```

---

## 📊 What's running right now on the VPS

| Service | Image | State | Domain |
|---|---|---|---|
| **ai-whisperers-site_web** | ai-whisperers-site:prod | 1/1 Running | (awaits DNS) `ai-whisperers.org`, `www.ai-whisperers.org` |
| 42 client websites | various | Running | various `*.paragu-ai.com` |
| 7 infrastructure services | various | Running | monitor, evolution, loki, etc. |
| Traefik | traefik:v3.5.3 | Running | all ingress |

---

## 📁 Files in this app (31 total)

```
apps/ai-whisperers-site/
├── .dockerignore              # Docker build context excludes
├── .gitignore                 # git excludes
├── README.md                  # Stack + dev + build + deploy guide
├── Dockerfile                 # Multi-stage standalone build
├── docker-compose.yml         # Swarm service definition
├── deploy.sh                  # Build + tag + push
├── next.config.ts             # Standalone, CSP headers, redirects
├── next-env.d.ts              # Next.js types ref
├── package.json               # next 16.2.4, react 19, tailwind 4.2
├── package-lock.json          # reproducible builds
├── postcss.config.mjs         # Tailwind 4 postcss plugin
├── tsconfig.json              # TS 5.7 strict-false
├── app/
│   ├── layout.tsx             # Root: Inter + JetBrains Mono fonts
│   ├── page.tsx               # Root → /en redirect
│   ├── globals.css            # Design tokens, dark theme
│   └── [lang]/
│       ├── layout.tsx         # Per-locale Navbar + Footer
│       ├── page.tsx           # Home (hero + 6 caps + 8 whitespace + 4 cases + team)
│       ├── services/page.tsx
│       ├── portfolio/page.tsx
│       ├── open-source/page.tsx
│       ├── about/page.tsx
│       ├── contact/page.tsx
│       ├── pricing/page.tsx
│       └── sales-sheet/page.tsx
├── components/
│   ├── Navbar.tsx             # 4-locale nav, mobile menu
│   ├── Footer.tsx             # Multi-column footer
│   └── ContactForm.tsx        # WhatsApp-launching form
├── content/
│   ├── en/site.json            # 13 KB canonical English
│   ├── es/site.json            # 15 KB full Spanish translation
│   ├── nl/site.json            # (falls back to EN)
│   └── pt/site.json            # (falls back to EN)
├── lib/
│   └── utils.ts               # cn() helper
└── public/                    # Static assets
```

---

## 📞 Who to ask

For DNS changes: the **domain owner** (Ivan). DNS is not in scope for the agent.

For deploy help: Erebus (this session), or `git log --oneline` on the monorepo to see all the commits.
