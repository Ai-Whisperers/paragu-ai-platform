# Oz Montanía — AI Agent Guide

## Quick Links
- **Live:** https://ozmontania.paragu-ai.com
- **Repo:** github.com/Ai-Whisperers/ozmontania-website
- **Docker service:** ozmontania_web (2 replicas)
- **Traefik:** Host(`ozmontania.paragu-ai.com`)

## Pages (10)
Home, Biografía, Obra, Obra/[slug], Blog, Blog/[slug], Murales, Prensa, Tienda, Contacto

## Components
featured-works, footer, header, hero, whatsapp-float, animations/

## Content
Bilingual: content/es.json (20KB) + content/en.json (19KB)

## Build & Deploy
npm run build && docker build -t ozmontania:prod . && docker stack deploy -c docker-compose.yml ozmontania

## Critical Patterns
Bilingual (ES/EN). Image-heavy gallery. No e-commerce. WhatsApp commissions. Needs sitemap+robots.
