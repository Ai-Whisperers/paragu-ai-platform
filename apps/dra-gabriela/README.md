# Dra. Gabriella — Site

> Ometz Dental — Dra. Gabriella González Pane dental practice site. Conservative, planning-first dentistry in Asunción, Paraguay. "Te escucho."

**Live at:** https://ometzdental.com (and https://ometzdental.com as legacy/redirect)

## Stack

- **Next.js 16** (App Router, standalone)
- **React 19** + **TypeScript 5.7**
- **Tailwind CSS 4**
- **Content:** `content/{en,es}/` JSON (site.json + section JSONs)
- **Deploy:** Docker Swarm + Traefik on `agent-net`

## Domain

- **Primary:** `ometzdental.com` (registered 28 jun 2026 via Hostinger)
- **Legacy:** `ometzdental.com` (kept for redirects)

## Content source

This site consumes the content package authored in the standalone [`Ai-Whisperers/dentist`](https://github.com/Ai-Whisperers/dentist) repo. **The dentist repo is the source of truth for everything non-runtime:**

| What | Where (in dentist repo) | This app's mirror |
|---|---|---|
| Canonical pricing (~30 procedures in Gs) | `00_STRATEGIC/financial-pricing/canonical-pricing-reference-v2.md` | `content/{en,es}/pricing.json` |
| Strategy, 3 options, financial model | `00_STRATEGIC/` | (consumed via pricing + hero copy) |
| Market research, battle cards | `01_RESEARCH/` | (background context for copy) |
| Operations, clinical routines, SLA | `05_OPERATIONS/` | (informs `clinic.json`, `process.json`) |
| All website copy (markdown source) | `07_DESIGN/website/core-pages/`, `service-pages/`, `transactional-pages/` | Compiled into `content/{en,es}/*.json` |
| Client validation form (Kiki → Dra. GP) | `07_DESIGN/website/validacion-cliente-dra-gp.md` | Drives `site.json` → `business.*` (WA, phone, address, RUC, MSPBS, email) |
| Kiki meeting notes, Roque decision | `02_MEETINGS/` | (operational context) |
| **Gaby's bio in her own words** | `03_LAUNCH/website-content/propuesta-bio-corta-gaby.md` | `content/{en,es}/about.json` → "Quién es" / "Who she is" |

**Sync workflow** (when content changes in dentist repo):

```bash
# 1. Edit markdown in dentist repo
# 2. Port the corresponding JSON to this app
cp /root/dentist/content/{en,es}/*.json /root/paragu-ai-platform/apps/dra-gabriela/content/{en,es}/
# 3. Rebuild + redeploy
cd /root/paragu-ai-platform/apps/dra-gabriela && ./deploy.sh
```

## Local dev

```bash
npm install --legacy-peer-deps
npm run dev
# → http://localhost:3000
```

## Build & deploy

```bash
./deploy.sh
# → Docker image → Swarm service dra-gabriela_web
```

## Traefik routing

- `Host(`ometzdental.com`)` → primary
- `Host(`www.ometzdental.com`)` → primary (www redirect handled at DNS level)
- `Host(`ometzdental.com`)` → paragu-ai.com subdomain (legacy, redirect to ometzdental.com)
- `Host(`ometzdental.com.py`)` → legacy, redirect (kept for historical reasons)

## 🚦 Status & open gates

| Status | Item | Where |
|---|---|---|
| ✅ | P0–P5 strategic + content work | `dentist` repo TODO |
| ✅ | Site live with full content, 22 pages × 2 locales | this app |
| ✅ | Ometz Dental branding (אומץ = "coraje") | repo + content |
| ✅ | "Te escucho." as core phrase | repo + content |
| ✅ | Featured service: rehabilitación oral | `app/[locale]/page.tsx` |
| ✅ | Gaby's own bio in her words | `content/{es,en}/about.json` |
| ✅ | 3 specialties: rehabilitación oral, estética, operatoria | `content/{es,en}/about.json` |
| ✅ | RUC 1375421-1, Reg. MSPBS 3618 | `content/{es,en}/site.json` |
| ✅ | Hours: Mon-Fri 2:30pm-7:00pm | `content/{es,en}/hero.json` |
| ✅ | ometzdental.com domain registered | Hostinger (28 jun 2026) |
| 🟡 | **WhatsApp Business phone number** (chip to be purchased) | `site.json` → `business.whatsapp` |
| 🟡 | **Exact street address in Mburucuyá** | `site.json` → `business.address` |
| ⏸ | Photos (clinic + Dra. GP portrait) | pending Gaby |
| ⏸ | 3 real testimonials | pending |
| ⏸ | ometzdental.com DNS cutover to production | pending |

**Without the WhatsApp number and exact street, every contact CTA on the live site falls back to email** (ContactButton chain: WhatsApp → phone → email → contact page). Once Gaby confirms the data, we update `content/{en,es}/site.json` → `business.*` and redeploy — no code change needed.

## Infra (this site)

| Layer | Detail |
|---|---|
| Swarm service | `dra-gabriela_web` (1/1) |
| Live image | `dra-gabriela:prod-013ea3b-20260618-1326` (will be updated on next deploy) |
| Traefik rule | (will be updated to add `Host(\`ometzdental.com\`)`) |
| TLS | `letsencryptresolver` (Let's Encrypt) |
| Middleware | `security-headers@file` |
| Network | `agent-net` |
| Deploy script | `./deploy.sh` in this folder |
