# Magnolia Peluquería — Project Documentation

**Version:** 2.0 | Mayo 2026  
**Live:** https://magnolia-peluqueria.paragu-ai.com  
**Client:** Magnolia Peluquería, Asunción, Paraguay  
**Stack:** Next.js 16.2.4 · React 19 · TypeScript · Tailwind CSS v4  
**Status:** Active · Under improvement

---

## 1. Executive Summary

Magnolia Peluquería es un salón de belleza profesional en Asunción. El sitio web actual es funcional y bien estructurado, pero opera como un MVP de 2023-2024 — correcto para listar servicios, insuficiente para convertir visitantes en clientas recurrentes.

**Score actual: 6.5/10** (funcional, limpio, sin revenue engine)

**Score objetivo: 9/10** (después de todas las fases)

---

## 2. Site Map

```
/ (Home)
/servicios
/nosotros
/faq
/contacto
/privacidad
/terminos
/admin (CMS — reservado para dueños)
```

---

## 3. Business Profile

| Campo | Valor |
|-------|-------|
| Nombre | Magnolia Peluquería |
| Tagline | Tu Mejor Look en Asunción |
| Teléfono | 0981 106 062 |
| WhatsApp | +595 986 106 062 |
| Horario | Martes–Sábado 9:00–19:00 |
| Ubicación | Zona céntrica, Asunción, Paraguay |
| Instagram | @magnolia_peluqueria |
| Email | info@magnolia-peluqueria.com |

---

## 4. Services Offered

### Cortes
| Servicio | Precio | Duración |
|----------|--------|----------|
| Corte Dama | Gs. 90.000 | 40 min |
| Corte Caballero | Gs. 60.000 | 30 min |
| Corte Infantil | Gs. 50.000 | 25 min |

### Coloración
| Servicio | Precio | Duración |
|----------|--------|----------|
| Coloración Completa | Gs. 250.000 | 90 min |
| Balayage | Gs. 400.000 | 2 horas |
| Mechas | Gs. 300.000 | 90 min |

### Tratamientos
| Servicio | Precio | Duración |
|----------|--------|----------|
| Keratina | Gs. 350.000 | 2 horas |
| Botox Capilar | Gs. 200.000 | 60 min |
| Nutrición Capilar | Gs. 120.000 | 40 min |

---

## 5. Architecture Overview

```
magnolia-peluqueria/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── servicios/           # Services page
│   ├── nosotros/            # About us
│   ├── faq/                 # FAQ
│   ├── contacto/            # Contact page
│   ├── privacidad/          # Privacy policy
│   ├── terminos/            # Terms
│   ├── admin/               # CMS (needs implementation)
│   └── api/                 # API routes (needs full implementation)
│       └── contact/route.ts # Contact form handler
├── components/             # React components (~2,067 LOC)
│   ├── hero.tsx             # Hero slideshow
│   ├── services.tsx         # Service accordion
│   ├── gallery.tsx          # Photo gallery + lightbox
│   ├── testimonials.tsx     # Review carousel
│   ├── promotions.tsx       # Promo cards
│   ├── loyalty.tsx          # Loyalty program
│   ├── gift-cards.tsx       # Gift card system
│   ├── team-section.tsx     # Team profiles
│   ├── before-after.tsx     # Before/After gallery
│   ├── why-us.tsx           # Trust indicators
│   ├── whatsapp-float.tsx   # Floating WhatsApp CTA
│   ├── instagram-feed.tsx   # Instagram link
│   ├── location.tsx         # Maps embed
│   ├── footer.tsx           # Footer
│   ├── header.tsx           # Navigation
│   ├── cta-banner.tsx       # CTA section
│   └── animated-stats.tsx   # Animated counters
├── content/                # JSON content (the CMS layer)
│   ├── es.json              # Spanish content
│   └── site.json            # Site configuration
├── lib/
│   ├── config.ts            # Central config accessor
│   └── utils.ts             # Helpers
├── docs/                   # This documentation
├── Dockerfile              # Container for VPS deployment
├── docker-compose.yml      # Stack config (Traefik labels)
└── deploy.sh               # Deploy script
```

---

## 6. Component Inventory

| Componente | LOC | Estado | Prioridad |
|------------|-----|--------|-----------|
| hero.tsx | 102 | ✅ Production | — |
| services.tsx | ~200 | ✅ Production | — |
| gallery.tsx | ~150 | ✅ Production | Media |
| testimonials.tsx | 212 | ⚠️ Needs real data | Alta |
| promotions.tsx | ~120 | ✅ Production | — |
| loyalty.tsx | ~100 | ⚠️ No tracking | Alta |
| gift-cards.tsx | ~80 | ✅ Concept | Media |
| team-section.tsx | ~80 | ⚠️ Placeholder | Alta |
| before-after.tsx | ~80 | ⚠️ Placeholder | Media |
| why-us.tsx | ~60 | ⚠️ Duplicate data | Baja |
| whatsapp-float.tsx | 15 | ✅ Production | — |
| instagram-feed.tsx | ~50 | ⚠️ Link only | Baja |
| location.tsx | ~50 | ✅ Production | — |
| footer.tsx | ~100 | ✅ Production | — |
| header.tsx | ~150 | ✅ Production | — |
| cta-banner.tsx | ~50 | ✅ Production | — |
| animated-stats.tsx | ~50 | ✅ Production | — |
| CookieConsent.tsx | ~80 | ✅ Production | — |
| scroll-reveal.tsx | ~20 | ✅ Production | — |

---

## 7. SEO Status

| Elemento | Estado |
|----------|--------|
| Meta title + description | ✅ Completo |
| Open Graph | ✅ Completo |
| Twitter Card | ✅ Completo |
| JSON-LD (HairSalon schema) | ✅ Completo |
| Canonical URLs | ✅ Completo |
| robots.txt | ✅ Completo |
| sitemap.xml | ✅ Completo |
| Custom 404/error pages | ✅ Completo |

**Pendiente:**
- Google Search Console verificación
- Core Web Vitals audit
- Schema.org `aggregateRating` con reseñas reales

---

## 8. Tech Dependencies

```json
{
  "dependencies": {
    "next": "16.2.4",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "lucide-react": "^1.14.0",
    "@vercel/analytics": "^1.5.0",
    "@vercel/speed-insights": "^1.2.0",
    "@supabase/supabase-js": "^2.39.0"
  }
}
```

---

## 9. Content System

All business content lives in `content/es.json`. The `lib/config.ts` file is the single accessor point — no hardcoded values in components.

Content sections:
- `hero` — slideshow slides (title, subtitle, image, badge)
- `stats` — numbers for the hero/stats bar
- `services` — categories with items, prices, duration
- `gallery` — photos with tags for filtering
- `testimonials` — reviews with rating, service, initials
- `promotions` — active offers with badges and expiry
- `team` — stylist profiles with specialties
- `faqs` — accordion Q&A pairs

---

## 10. Deployment

- **Target:** Docker Swarm on VPS 72.61.44.159 via Traefik
- **Domain:** magnolia-peluqueria.paragu-ai.com
- **Container:** Next.js static export + nginx for API proxy
- **SSL:** Traefik auto-Let's Encrypt
- **Health check:** HTTP on port 3000

See `deploy.sh` and `docker-compose.yml` for details.

---

## 11. Known Issues (as of May 2026)

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | Testimonials are placeholder (no real client names) | Alta | Pending |
| 2 | No real photos — all Unsplash placeholders | Alta | Pending photos from client |
| 3 | Team section placeholder | Alta | Pending |
| 4 | No online booking — WhatsApp only | Media | Phase 2 |
| 5 | Admin panel empty | Alta | Phase 3 |
| 6 | No i18n | Media | Phase 4 |
| 7 | No blog | Baja | Phase 4 |
| 8 | Promociones not connected to WhatsApp dynamic | Baja | Phase 4 |
| 9 | No analytics beyond Vercel | Baja | Phase 1 |

---

## 12. Existing Docs

- `AGENTS.md` — Dev agent rules (Next.js 16 breaking changes)
- `AUDIT-2026.md` — Full audit by component (Mayo 2026)
- `DEEP-AUDIT-2026.md` — World-class benchmarks + component deep-dive
- `IMPROVEMENT-PLAN.md` — Previous improvement plan (superseded by ROADMAP.md)
- `LEAD-AUDIT.md` — Lead quality audit (score 47/100)
- `IMAGE-GENERATION-MANIFEST.md` — AI image generation plan
- `README.md` — Next.js default readme (replace)
- `docs/whatsapp-ai-integration.md` — WhatsApp AI agent integration docs

---

*Last updated: Mayo 2026 — Erebus / Ai-Whisperers*