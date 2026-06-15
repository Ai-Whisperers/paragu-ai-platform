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

This site consumes the content package authored in the standalone `Ai-Whisperers/dentist` repo. The dentist repo is the **single source of truth** for:
- `00_STRATEGIC/financial-pricing/canonical-pricing-reference-v2.md` (canonical pricing)
- `05_OPERATIONS/` (operations)
- `01_RESEARCH/` (research)
- `07_DESIGN/website/` (website content)
- `02_MEETINGS/` (client meeting notes)

When content updates, copy `dentist/content/{en,es}/*.json` → `apps/dra-gabriela/content/{en,es}/*.json` and redeploy.

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

## What's still pending (per dentist repo TODO)

The dentist repo `TODO.md` tracks strategic + operational readiness:
- ✅ P0–P5: strategy, content, pricing, corporate sales, tools/CI, delivery artifacts
- ❓ Blockers: Roque Option A result, legal database use, non-compete review, premium-patient count, 3 Luque real-estate quotes, 6+ months runway

These block **public deployment** of the production site. Until resolved, the site is in **preview mode** with the placeholder phone/email/address (see `content/en/site.json` → `business`).

## Open issues to fix before final launch

Per `dentist` repo docs/REPO-WORK-PLAN.md and the client profile:
- Business address, phone, WhatsApp, RUC, MSPBS (currently PENDING | TBD)
- Premium-patient eligible count (need data extraction from Odontología 3)
- 3 real-estate quotes for Luque location
- Legal review of database usage and non-compete clause
