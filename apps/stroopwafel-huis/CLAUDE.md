# Stroopwafel Huis — AI Agent Guide

## Quick Links
- **Live:** https://stroopwafelhuis.paragu-ai.com
- **Repo:** github.com/Ai-Whisperers/stroopwafel-huis
- **Business plan repo:** github.com/Ai-Whisperers/stroopwafel-huis (same repo, business docs in root)

## Architecture
Cloudflare (DNS, SSL) → VPS → Traefik → stroopwafel-huis_web:3000

## Concept
First Dutch-themed specialty coffee shop in Paraguay. Fresh handmade stroopwafels + specialty coffee. Founders: Bram & Rach.

## Pages
11 pages: Home, Menu, Historia, Ubicación, Catering, FAQ, Contacto, Privacidad, Términos

## Design System
Warm Dutch theme. Primary: #FF6B00 (Dutch Orange). Secondary: #C8860A (Caramel). Accent: #003082 (Delft Blue). Background: #FFF5E6 (Warm Cream). Fonts: Playfair Display (headings), Inter (body). Voice: warm, Dutch-inspired, Spanish.

## Content
Content lives in `src/content/es.json`. All menu items, brand copy, FAQ, pages are editable there.

## Build & Deploy
```bash
cd /root/stroopwafel-huis
npm run build
docker build -t stroopwafel-huis:prod .
docker stack deploy -c docker-compose.yml stroopwafel-huis
```

## Critical Patterns
- All content driven from src/content/es.json — no database
- WhatsApp is the primary CTA
- Weekly flavor rotation (Crumbl model) is the killer feature
- Dutch orange + warm cream color palette throughout
- All SVG icons inline (lucide-react v1.14 dropped Instagram/Facebook)

## Business Docs (from original repo)
- `menu/menu-complete.md` — Full menu with prices
- `branding/brand-identity.md` — Brand identity, colors, logo
- `website/design/website-full-spec.md` — Full website specification
- `business-plan/business-plan.md` — Complete business plan
- `recipes/` — All recipes
- `operations/` — Daily operations guides
