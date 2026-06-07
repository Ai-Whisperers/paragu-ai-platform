# Oz Montanía — Sitio Web Oficial

Artist website for **Oz Montanía** (Oscar Montanía Villar), Paraguayan visual artist, muralist and illustrator.

**Live:** https://ozmontania.paragu-ai.com  
**Repo:** https://github.com/Ai-Whisperers/ozmontania-website

## Stack

- Next.js 16 + Tailwind v4
- Node 20-alpine (Docker multi-stage)
- Leaflet.js (mural map)
- WhatsApp commerce integration
- Docker Swarm + Traefik + Let's Encrypt

## Pages

| Route | Content |
|-------|---------|
| `/` | Hero + stats + featured works |
| `/obra` | Gallery with category filters (Murales/Ilustraciones/Lienzos/Comercial) |
| `/obra/[slug]` | Individual work detail |
| `/murales` | Interactive Leaflet map with pins |
| `/biografia` | Timeline (1985→present) + influences + philosophy |
| `/prensa` | Press coverage (8 articles) |
| `/tienda` | Prints + merch, WhatsApp-first checkout |
| `/blog` | Blog posts (making-of, travel, history) |
| `/contacto` | Booking form + WhatsApp direct |

## Content

Bilingual (es/en). All text in `content/es.json` and `content/en.json`.

## Known Issues (V1)

- No real images yet — all placeholders
- No CI/CD pipeline
- No favicon / OG / PWA
- No per-page SEO metadata
- No sitemap / JSON-LD
- WhatsApp number is placeholder
- Estudio 8 and Japan/Cuba projects not yet added

## Related

- **Estudio 8** — Oz's design and mural studio (founded 2020)
- **Powerline Shop** — First graffiti supply store in Paraguay
