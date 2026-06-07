# Villamayor & Asociados — AI Agent Guide

## Quick Links
- **Live:** https://villamayor.paragu-ai.com
- **Repo:** github.com/Ai-Whisperers/villamayor-asociados
- **Docker service:** villamayor-asociados_web (2 replicas)
- **VPS:** 72.61.44.159
- **Traefik:** Host(`villamayor.paragu-ai.com`)

## Architecture
Cloudflare (DNS, SSL) → VPS → Traefik → villamayor-asociados_web:3000

## Pages
Home, Servicios (6 areas), Nosotros, Blog, Contacto

## Design System
Professional blue (#1B4D7A) + gold (#D4A843) on white. Fonts: Inter. Voice: formal, trustworthy, Spanish.

## Content
Content lives in `content/es.json` (and other locales when applicable).
All text, services, products, FAQ items are editable there.

## Build & Deploy
```bash
npm run build
docker build -t villamayor-asociados:prod .
docker stack deploy -c docker-compose.yml villamayor-asociados
```

## Critical Patterns
- Content in content/es.json
- No database — fully static
- WhatsApp consultation booking
- Professional/trust signaling focus

## Client Onboarding
See `docs/client-questionnaire.md` for the full onboarding questionnaire.
See `docs/brand-guide.md` for brand identity details.
