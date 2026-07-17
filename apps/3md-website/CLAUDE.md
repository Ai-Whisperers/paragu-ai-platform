# 3 MIND Creative Agency — AI Agent Guide

## Quick Links
- **Live:** https://3mind.paragu-ai.com
- **Repo:** github.com/Ai-Whisperers/paragu-ai-platform/tree/main/apps/3md-website
- **Docker service:** 30vcs_web (2 replicas)
- **Traefik:** Host(`3mind.paragu-ai.com`)

## Pages (13)
Home, Servicios, Portfolio, Portfolio/[slug], Blog, Blog/[slug], Blog/categoria, Nosotros, Contacto, FAQ, Privacidad, Términos, Sitemap

## Components
cta-banner, footer, header, hero, whatsapp-float, animations/

## Content
content/es.json (19KB) + site.json + tokens.json + portfolio/

## Build & Deploy
pnpm build && docker build -t 3md-website:prod . && docker stack deploy -c docker-compose.yml 30vcs

## Critical Patterns
Portfolio-driven creative agency. Video showreel. Dark/light hybrid. WhatsApp contact. Sitemap + robots for SEO.
