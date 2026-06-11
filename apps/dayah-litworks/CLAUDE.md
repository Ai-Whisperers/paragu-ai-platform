# Dayah LitWorks — AI Agent Guide

## Quick Links
- **Live:** https://dayah.paragu-ai.com
- **Repo:** github.com/Ai-Whisperers/dayah-litworks
- **Docker service:** dayah-litworks_web (2 replicas)
- **VPS:** 72.61.44.159
- **Traefik:** Host(`dayah.paragu-ai.com`)

## Architecture
Cloudflare (DNS, SSL) → VPS → Traefik → dayah-litworks_web:3000

## Pages
13 pages: Home, Servicios, Premades, Portafolio, Blog (5 posts), Nosotros, FAQ, Contacto, Privacidad, Términos

## Design System
Dark theme (navy/plum background, #0a0a14/var(--background)). Primary: #94abd6 (muted blue). Secondary: #d43d5e (rose). Fonts: Playfair Display (headings), Inter (body). Voice: warm, creative, Spanish.

## Content
Content lives in `content/es.json` (and other locales when applicable).
All text, services, products, FAQ items are editable there.

## Build & Deploy
```bash
npm run build
docker build -t dayah-litworks:prod .
docker stack deploy -c docker-compose.yml dayah-litworks
```

## Critical Patterns
- All content in content/es.json and content/en.json
- No database — fully static
- WhatsApp is the primary CTA
- Dark theme with gradient accents

## Client Onboarding
See `docs/client-questionnaire.md` for the full onboarding questionnaire.
See `docs/brand-guide.md` for brand identity details.
