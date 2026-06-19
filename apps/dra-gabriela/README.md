# Dra. Gabriella — Site

> Dra. Gabriella González Pane dental practice site — conservative, planning-first dentistry in Asunción, Paraguay.

**Live at:** https://dragabriela.paragu-ai.com (and https://dra-gabriela.com.py once DNS is cut over)

## Stack

- **Next.js 16** (App Router, standalone)
- **React 19** + **TypeScript 5.7**
- **Tailwind CSS 4**
- **Content:** `content/{en,es}/` JSON (site.json + section JSONs)
- **Deploy:** Docker Swarm + Traefik on `agent-net`

## Content source

This site consumes the content package authored in the standalone [`Ai-Whisperers/dentist`](https://github.com/Ai-Whisperers/dentist) repo. **The dentist repo is the source of truth for everything non-runtime:**

| What | Where (in dentist repo) | This app's mirror |
|---|---|---|
| Canonical pricing (~30 procedures in Gs) | `00_STRATEGIC/financial-pricing/canonical-pricing-reference-v2.md` | `content/{en,es}/pricing.json` |
| Strategy, 3 options, financial model | `00_STRATEGIC/` | (consumed via pricing + hero copy) |
| Market research, battle cards | `01_RESEARCH/` | (background context for copy) |
| Operations, clinical routines, SLA | `05_OPERATIONS/` | (informs `clinic.json`, `process.json`) |
| All website copy (markdown source) | `07_DESIGN/website/core-pages/`, `service-pages/`, `transactional-pages/` | Compiled into `content/{en,es}/*.json` |
| Client validation form (Kiki → Dra. GP) | `07_DESIGN/website/validacion-cliente-dra-gp.md` | Drives `site.json` → `business.*` (WA, phone, address, RUC, MSPBS) |
| Kiki meeting notes, Roque decision | `02_MEETINGS/` | (operational context) |

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

- `Host(`dra-gabriela.com.py`)` → primary
- `Host(`www.dra-gabriela.com.py`)` → primary (www redirect handled at DNS level)
- `Host(`dragabriela.paragu-ai.com`)` → paragu-ai.com subdomain (currently in use)

## 🚦 Status & open gates

| Status | Item | Where |
|---|---|---|
| ✅ | P0–P5 strategic + content work | `dentist` repo TODO |
| ✅ | Site live with full content, 22 pages × 2 locales | this app |
| 🟡 | **Sección 1 client validation** (WA, phone, address, RUC, MSPBS, email) | `dentist/07_DESIGN/website/validacion-cliente-dra-gp.md` |
| 🟡 | Roque Option A/B decision (affects Luque vs Asunción address) | `dentist/02_MEETINGS/` |
| ⏸ | Photos (clinic + Dra. GP portrait) | pending Kiki |
| ⏸ | 3 real testimonials | pending Kiki |
| ⏸ | `dra-gabriela.com.py` DNS cutover | pending |

**Without Sección 1 answers, every contact CTA on the live site falls back to email** (ContactButton chain: WhatsApp → phone → email → contact page). Once Kiki confirms the data, we update `content/{en,es}/site.json` → `business.*` and redeploy — no code change needed.

## Infra (this site)

| Layer | Detail |
|---|---|
| Swarm service | `dra-gabriela_web` (1/1) |
| Live image | `dra-gabriela:prod-013ea3b-20260618-1326` |
| Traefik rule | `Host(\`dra-gabriela.com.py\`) \|\| Host(\`www.dra-gabriela.com.py\`) \|\| Host(\`dragabriela.paragu-ai.com\`)` |
| TLS | `letsencryptresolver` (Let's Encrypt) |
| Middleware | `security-headers@file` |
| Network | `agent-net` |
| Deploy script | `./deploy.sh` in this folder |
