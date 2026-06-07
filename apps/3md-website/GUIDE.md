# 3 MIND (3MD) — Complete Website Guide

## Agency Profile

### Business Identity

| Field | Value |
|-------|-------|
| Legal Name | 3 MIND |
| Brand | 3MD |
| Type | Creative Agency / Production House |
| Tagline | "Transformamos ideas en experiencias visuales impactantes" |
| Instagram | @somos3md (7,507 followers, 60 posts) |
| Facebook | 3 MIND (222 followers) |
| Phone | +595 991 691501 |
| Email | 3mindpy@gmail.com |
| Address | Fray Luis de Leon C/Venezuela, Asuncion, Paraguay |
| Languages | Spanish, English, Guarani |
| Hours | Siempre abierto (Always open) |

### Services (from Facebook)
- Marketing Digital
- Produccion de Cine / Video
- Fotografia
- Publicidad
- Branding & Estrategia Creativa
- Online booking / Reservations

---

## Brand Positioning

### Voice & Tone
- **Professional** but not corporate — creative agency energy
- **Bilingual** (Spanish primary, English available — rare in PY)
- **Confident** — they work with VW and Carmen Steffens
- **Visual-first** — everything should show, not tell
- **Young & modern** — 7.5k IG followers, event coverage

### Colors (Proposed)
- Primary: `#0F0F0F` (near-black — creative agency standard)
- Secondary: `#FF6B35` (energetic orange — for CTAs, accents)
- Accent: `#FFFFFF` (white text on dark)
- Surface: `#1A1A1A` (dark cards)
- Surface-light: `#2A2A2A` (hover states)
- Muted: `#9CA3AF` (secondary text)
- Background: `#0A0A0A` (page background)
- Success/CTA green: `#10B981`

### Typography
- **Heading:** Playfair Display (serif, elegant, elevated — for hero, section titles)
- **Body:** Inter (sans-serif, clean, modern — for text, descriptions)
- **Monospace:** JetBrains Mono (for stats/numbers)

---

## Target Audience

1. **Local businesses in Paraguay** needing video content (restaurants, fashion, events)
2. **International brands** entering Paraguay (need production/localization)
3. **Event organizers** needing coverage (SIT EVENTOS, Reciclarte type)
4. **Fashion/lifestyle brands** needing visual content (Carmen Steffens tier)
5. **Automotive dealerships** needing launch content (VW tier)

---

## Competitor Landscape in Paraguay

| Agency | Web | IG Followers | Notes |
|--------|-----|-------------|-------|
| **3 MIND** | **NO** | 7,507 | No website — huge gap |
| Chilli Agency | Yes | ~3k | Full digital agency |
| Wunder Agency | Yes | ~10k | Creative, strong brand |
| Maki Agency | Yes | ~8k | Video production focus |
| Umbral Studio | Yes | ~5k | Photography + video |
| Soy Visual | Yes | ~4k | Social media focus |

3 MIND's Instagram following (7.5k) is competitive, but EVERY competitor has a website. This is the #1 thing holding them back.

---

## Full Sitemap (15 Pages)

```
/
├── /                          Home (showreel hero + portfolio grid + clients)
├── /portfolio                 Portfolio grid (filterable by category)
│   ├── /portfolio/[slug]      Individual case study (x10 minimum)
│   ├── /portfolio/amarok-2025
│   ├── /portfolio/carmen-steffens
│   ├── /portfolio/lez-a-lez
│   ├── /portfolio/sit-eventos
│   ├── /portfolio/aurelia-brew-pub
│   ├── /portfolio/estacion-jardines
│   ├── /portfolio/reciclarte
│   └── /portfolio/nico-garcia
├── /servicios                 Services page
├── /nosotros                  About + Team
├── /clientes                  Client logo wall + testimonials
├── /blog                      Blog / Case studies
│   └── /blog/[slug]           Individual article
├── /contacto                  Contact form + map
├── /faq                       FAQ
├── /privacidad                Privacy policy
├── /terminos                  Terms of service
├── /404                       Custom not found
└── /api/subscribe             Newsletter endpoint
```

EN versions (via i18n):
```
/en/                          English home
/en/portfolio                  English portfolio
/en/contact                    English contact
...etc
```

---

## Content Strategy

### Home Page Copy (ES)
```
Hero:
"Transformamos ideas en experiencias visuales impactantes"
Sub: "Marketing digital, producción audiovisual y publicidad para marcas que quieren destacar"
CTA: "Ver nuestro trabajo" + "Contactanos"

Trust Bar (client logos):
Volkswagen | Carmen Steffens | SIT EVENTOS | Lez a Lez | Aurelia Brew Pub | Estacion Los Jardines

Featured Work (4 projects):
- Nueva Amarok 2025 (video automotriz)
- Carmen Steffens (moda/lujo)
- SIT EVENTOS (eventos/seguridad)
- Lez a Lez (moda sostenible)

Stats:
+50 proyectos realizados | +20 clientes satisfechos | 7+ anos de experiencia

Services Summary (3 cards):
Marketing Digital | Produccion Audiovisual | Fotografia y Publicidad
```

### Services Page
```
Marketing Digital:
- Estrategia de redes sociales
- Campanas pagas (Meta Ads, Google Ads)
- Content creation
- Community management
- Analytics y reporting

Produccion Audiovisual:
- Cine publicitario
- Videos corporativos
- Cobertura de eventos
- Post-produccion y edicion
- Animacion y motion graphics

Fotografia:
- Fotografia de productos
- Fotografia de eventos
- Fotografia corporativa
- Retratos y lifestyle
- Edicion profesional

Publicidad:
- Campanas 360
- Branding corporativo
- Diseno grafico
- Estrategia creativa
- Consultoria de marca
```

### Portfolio Item Template
```
Title: [Project Name]
Client: [Client Name]
Category: [Video / Photo / Marketing / Branding]
Year: [2024/2025]
Hero Image/Video: [Featured asset]

Overview:
[2-3 paragraph project description]

Approach:
[How we tackled the project]

Results:
[What was achieved — metrics if available]

Gallery:
[Grid of 3-8 images/videos]

CTA: "Trabajemos juntos" → /contacto
```

---

## Technical Architecture

### Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Fonts:** next/font (Playfair Display + Inter)
- **Icons:** lucide-react
- **Deployment:** Docker Swarm + Traefik
- **Hosting:** agentzero VPS (existing infra)
- **Domain:** 3md.paragu-ai.com (subdomain) → later 3mindpy.com

### Design System
```css
@theme {
  --color-primary: #0F0F0F;
  --color-secondary: #FF6B35;
  --color-accent: #FFFFFF;
  --color-surface: #1A1A1A;
  --color-surface-light: #2A2A2A;
  --color-muted: #9CA3AF;
  --color-background: #0A0A0A;
  --font-heading: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
}
```

### Key Components
```
Header — transparent on hero, sticky dark on scroll
Hero — full-screen with showreel video background, overlay, headline
PortfolioGrid — filterable masonry grid with hover overlay
PortfolioCard — image, category badge, title overlay
ProjectPage — hero image/video, content, gallery
ClientBar — horizontal scrolling logo track
StatsCounter — animated number counters
ServiceCard — icon + title + description + CTA
TeamSection — photo grid with bios
ContactForm — name, email, phone, service type, message
Footer — dark, 4 columns, social links, legal
CookieConsent — minimal banner
WhatsAppFloat — floating CTA button
BackToTop — button on scroll
```

### Pages Structure
```
app/
├── page.tsx (home)
├── layout.tsx (root layout)
├── globals.css (@theme config)
├── not-found.tsx
├── error.tsx
├── loading.tsx
├── robots.ts
├── sitemap.ts
├── portfolio/
│   ├── page.tsx (grid)
│   └── [slug]/
│       └── page.tsx (case study)
├── servicios/
│   └── page.tsx
├── nosotros/
│   └── page.tsx
├── clientes/
│   └── page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── contacto/
│   └── page.tsx
├── faq/
│   └── page.tsx
├── privacidad/
│   └── page.tsx
├── terminos/
│   └── page.tsx
└── api/
    └── subscribe/
        └── route.ts
```

### i18n Strategy
- Default: Spanish (`/`)
- English: `/en/` prefix
- Using next-intl or manual toggle with localStorage
- Content stored in `/content/es.json` and `/content/en.json`
- URL-based switching: `/en/portfolio`, `/en/contact`

---

## SEO Strategy

### Keywords (Spanish primary)
- "agencia creativa Paraguay"
- "produccion audiovisual Asuncion"
- "marketing digital Paraguay"
- "agencia de publicidad Asuncion"
- "video corporativo Paraguay"
- "fotografia de productos Asuncion"
- "agencia de marketing Paraguay"

### Structured Data
- Organization (CreativeAgency or Organization)
- BreadcrumbList on every page
- CreativeWork for portfolio items
- Review for testimonials
- FAQ for FAQ page
- Article for blog posts

---

## Deployment

### Docker
- Same stack as other client sites (Docker Swarm + Traefik)
- Port: dynamic (next available)
- Network: agent-net
- Replicas: 2
- Resource limits: 512M RAM / 0.5 CPU
- Healthcheck: wget --spider http://127.0.0.1:3000/
- Non-root user: nextjs

### Dockerfile
```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME="0.0.0.0"
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/content ./content
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1
CMD ["node", "server.js"]
```
