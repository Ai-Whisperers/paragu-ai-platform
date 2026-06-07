# Magnolia Peluquería — Technical Architecture

**Version:** 1.0 | Mayo 2026  
**Stack:** Next.js 16.2.4 · React 19 · TypeScript · Tailwind CSS v4

---

## 1. Project Structure

```
magnolia-peluqueria/
├── app/                          # Next.js App Router
│   ├── layout.tsx                 # Root layout (fonts, metadata, providers)
│   ├── page.tsx                   # Home
│   ├── globals.css                # Tailwind CSS v4 + custom properties
│   ├── servicios/page.tsx          # Services listing
│   ├── nosotros/page.tsx           # About us
│   ├── faq/page.tsx                # FAQ accordion
│   ├── contacto/page.tsx          # Contact form + info
│   ├── admin/
│   │   └── content/page.tsx       # CMS content editor (future)
│   ├── privacidad/page.tsx        # Privacy policy
│   ├── terminos/page.tsx          # Terms of service
│   └── api/                       # API routes (future)
│       └── contact/route.ts       # Contact form handler
├── components/                     # React components
│   ├── header.tsx                  # Sticky nav + mobile menu
│   ├── footer.tsx                  # Footer with links + info
│   ├── hero.tsx                   # Hero slideshow (CSS animation)
│   ├── services.tsx               # Services accordion
│   ├── gallery.tsx               # Photo gallery + lightbox
│   ├── testimonials.tsx          # Review carousel
│   ├── promotions.tsx            # Promo cards
│   ├── loyalty.tsx               # Loyalty program section
│   ├── gift-cards.tsx           # Gift card inquiry
│   ├── team-section.tsx         # Team profiles
│   ├── before-after.tsx         # Before/after slider
│   ├── why-us.tsx               # Trust indicators
│   ├── whatsapp-float.tsx       # Floating WhatsApp button
│   ├── instagram-feed.tsx      # Instagram link
│   ├── location.tsx            # Map embed
│   ├── cta-banner.tsx          # Call-to-action section
│   ├── animated-stats.tsx      # Counter animations
│   ├── scroll-reveal.tsx       # Intersection Observer reveal
│   └── CookieConsent.tsx       # GDPR consent
├── content/                      # JSON content (CMS layer)
│   ├── es.json                  # Spanish content
│   └── site.json                # Site config (contact info, hours, etc.)
├── lib/
│   ├── config.ts               # Single accessor — imports site.json
│   └── utils.ts                # Helpers (cn(), formatPrice(), etc.)
├── docs/                        # This documentation
│   ├── PROJECT.md              # Full project documentation
│   ├── ROADMAP.md              # Phased implementation plan
│   └── ARCHITECTURE.md         # This file
├── Dockerfile                   # Container image (standalone)
├── docker-compose.yml           # Swarm stack with Traefik labels
├── deploy.sh                    # Deploy script
├── next.config.ts              # Next.js config + security headers
└── package.json                # Dependencies

```

---

## 2. Tech Stack Details

### Core
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.2.4 |
| UI | React | 19.2.4 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| Icons | Lucide React | ^1.14.0 |
| Analytics | Vercel Analytics | ^1.5.0 |
| Speed | Vercel Speed Insights | ^1.2.0 |
| Database | Supabase | ^2.39.0 (client only) |
| Deployment | Docker Swarm | Traefik reverse proxy |

### Deployment Architecture
```
Browser → Cloudflare CDN → Traefik (VPS 72.61.44.159) → Magnolia Container (port 3000)
                                                              ↓
                                                    Next.js (standalone)
                                                    - Static pages (SSG)
                                                    - API routes (future)
                                                    - Supabase (client)
```

### Environment Variables Required
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...        # Server-only
CONTACT_EMAIL=info@magnolia-peluqueria.com
WHATSAPP_NUMBER=+595986106062
WHATSAPP_MESSAGE=Hola!%20Quiero%20reservar%20un%20turno
SITE_URL=https://magnolia-peluqueria.paragu-ai.com
```

---

## 3. Content System

### Current State
All content lives in `content/es.json` (Spanish) and `content/site.json` (config).
Components import from `lib/config.ts` which reads these files.

### Future: Supabase Content
Phase 1 migrates to Supabase for dynamic content:
- `services` table → services page + pricing
- `promotions` table → promo cards with expiry
- `gallery` table → photo management
- `testimonials` table → real reviews
- `team` table → team profiles
- `bookings` table → appointment requests

### Content Read Flow (Current)
```
content/es.json
  → lib/config.ts (imports + exports typed)
    → any component (imports from lib/config)
```

---

## 4. Page Architecture

| Route | Type | Description |
|-------|------|-------------|
| `/` | SSG | Home with hero, services, gallery, testimonials, CTA |
| `/servicios` | SSG | Full services listing with pricing |
| `/nosotros` | SSG | About Magnolia, team, why choose us |
| `/faq` | SSG | Accordion FAQ |
| `/contacto` | SSG | Contact form + location |
| `/privacidad` | SSG | Privacy policy |
| `/terminos` | SSG | Terms of service |
| `/admin/content` | SSR | CMS content editor (future) |
| `/booking` | SSR | Booking flow (Phase 1) |

### SEO Per Page
All pages have unique `<title>` and `<meta description>` via `generateMetadata()` in each `page.tsx`.

---

## 5. Key Components

### Hero Slideshow
- CSS-only animation (`keyframes` + `animation`)
- Auto-cycles slides every 5s
- 3 slides: services, ambiance, team
- Uses `content/es.json` hero array

### Services Accordion
- Grouped by category (Cortes, Coloración, Tratamientos)
- Client-side open/close state
- Links to `/servicios` anchor on service name

### Gallery + Lightbox
- 3-column CSS grid
- Tag filter buttons (Cortes, Color, Tratamientos, Ambiente)
- Click → full-screen lightbox overlay
- All Unsplash placeholders (need real photos)

### Testimonials Carousel
- Auto-rotates every 4s
- 4.5–5 star ratings (fake for now)
- Real names needed

### WhatsApp Float
- Fixed bottom-right
- `https://wa.me/595986106062?text=WHATSAPP_MESSAGE`
- Pre-fills message per page context

### Location
- Google Maps iframe embed
- Coordinates: -25.2794, -57.6350
- Fallback address text if iframe blocked

---

## 6. Supabase Integration (Phase 1+)

### Client-Side Usage (now)
```typescript
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### Server-Side Usage (future)
```typescript
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```
Service role key stays server-only. Never exposed to client.

### Future API Routes
All server-side operations go through `/app/api/` routes:
- `POST /api/bookings` — create booking
- `GET /api/bookings` — list bookings (admin only)
- `POST /api/contact` — contact form submission

---

## 7. Security

### Headers (next.config.ts)
- X-Frame-Options: DENY
- Content-Security-Policy: strict, no inline scripts from external domains
- Strict-Transport-Security: HSTS with preload
- Permissions-Policy: camera/microphone/geolocation off
- X-DNS-Prefetch-Control: on

### Supabase
- Row Level Security (RLS) on all tables
- Anon key = public read (no write)
- Service role = server-only writes
- No API keys in client-side code

### Form Security
- Server-side validation on all API routes
- Rate limiting (future: via Upstash Redis)
- CSRF protection via Next.js built-in

---

## 8. Performance

### Current Optimizations
- `output: "standalone"` — minimal Docker image
- `unoptimized: true` for images (external CDN serves them)
- Security headers cached at CDN level
- Font: Google Fonts via `next/font/google`

### Next Steps
- Core Web Vitals audit (Phase 3)
- Image optimization: proper `width`/`height` on all `<img>`
- Lazy load below-fold images
- Preconnect to Supabase + Google Fonts

---

## 9. Docker / Deployment

### Container
- `Dockerfile` builds standalone Next.js
- Exposes port 3000
- Traefik routes `magnolia-peluqueria.paragu-ai.com` → port 3000
- Let's Encrypt via Traefik

### Docker Compose (local dev)
```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_SUPABASE_URL: ${NEXT_PUBLIC_SUPABASE_URL}
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ${NEXT_PUBLIC_SUPABASE_ANON_KEY}
```

### Production (Swarm)
```bash
docker stack deploy -c docker-compose.yml magnolia
```

---

*Document owner: Erebus — Ai-Whisperers*
*Last updated: Mayo 2026*