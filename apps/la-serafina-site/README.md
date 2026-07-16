# La Serafina — Demo Site

Sitio institucional bilingüe (ES + guaraní parcial) de **La Serafina**, espacio cultural feminista y sede operativa de **AIREANA — Grupo por los derechos de las lesbianas** (Asunción, Paraguay).

> **Estado:** Demo portfolio construido sobre `paragu-ai-platform`. No afiliado oficialmente con AIREANA — usado para portfolio interno de Ai-Whisperers.

## Stack

- **Next.js 16** (App Router)
- **React 19** server components por defecto
- **TypeScript** estricto
- **Tailwind v4** con design tokens en `content/es.json`
- **Standalone output** para Docker

## Local dev

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

## Build

```bash
NODE_ENV=production npx next build
docker buildx build -f Dockerfile.standalone -t la-serafina-site:latest --load .
```

## Estructura

```
app/
├── layout.tsx              # Root layout (fonts, JSON-LD, Header, Footer)
├── page.tsx                # / (home ES)
├── HomeClient.tsx          # Home body (secciones: hero, misión, programas, visita, historia, CTA)
├── gn/page.tsx             # /gn (splash bilingüe)
├── espacio/page.tsx        # /espacio — venue, alquiler
├── ro-hendu/page.tsx       # /ro-hendu — línea de apoyo
├── historia/page.tsx       # /historia — timeline 1959–2026
├── apoyar/page.tsx         # /apoyar — donaciones, alianzas, transparencia
├── privacidad/page.tsx     # /privacidad
├── sitemap.ts              # /sitemap.xml
├── robots.ts               # /robots.txt
├── opengraph-image.tsx     # Dinámico
├── icon.tsx + icon.svg     # Favicon
└── manifest.ts             # PWA manifest

components/
├── Header.tsx              # Client (usePathname) — nav desktop + LangSwitcher
├── MobileMenu.tsx          # Client — hamburger sheet
├── Footer.tsx              # Institucional (4 columnas)
├── LangSwitcher.tsx        # ES/GN toggle
└── WhatsAppFloat.tsx       # Floating WhatsApp

content/
├── es.json                 # Idioma principal (canonical) — TODO el contenido
└── gn.json                 # Partial guaraní (hero, navegación)

lib/
└── content.ts              # getContent(locale) — multi-locale wrapper
```

## Contenido

Todo el contenido editable está en `content/es.json` bajo estas claves:

| Clave | Uso |
|-------|-----|
| `siteName`, `brandLine`, `tagline` | Branding |
| `site.seo.*` | Meta description, keywords |
| `theme.*` | Design tokens (CSS variables) |
| `navigation[]` | Items del header |
| `home.*` | Secciones de la home |
| `espacio.*` | Página /espacio |
| `ro-hendu.*` | Página /ro-hendu |
| `historia.*` | Página /historia |
| `apoyar.*` | Página /apoyar |
| `footer.*` | Footer institucional |

## Editar contenido

1. Abrí `content/es.json`
2. Buscá la clave (ej. `home.mission.title`)
3. Modificá
4. Rebuild

## Sources / OPSEC

Datos basados en research en [`Ai-Whisperers/la-serafina-context`](https://github.com/Ai-Whisperers/la-serafina-context) (75 docs, 387 URLs verificadas).

- Handles sociales reales del footer de `aireana.org.py` (ver `social-media-real-handles.md`)
- Festival LesBiGayTrans: **21 ediciones (2005-2025)**, 700+ películas, 24K+ asistentes
- Programa radial "Aireana en Radio Viva 90.1" jueves 20:00-22:30
- Premio Francés 2011: 15.000 €, François Fillon, París

**Disclaimer:** Este sitio es un demo de portfolio. No afiliado oficialmente con AIREANA. Toda la información es pública.

## Auditoría

- `audits/LA-SERAFINA-SITE-AUDIT-2026-07-12.md` — auditoría técnica completa
- Lighthouse: pendiente medir

## Donde conseguir ayuda

- Ivan · Founder, Ai-Whisperers
- Kiki · Sales & Marketing
- Erebus · AI workforce lead (asistente)