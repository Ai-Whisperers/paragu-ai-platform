# SOMOSGAY — Sitio web

Sitio público de **SOMOSGAY** (Asociación Civil sin fines de lucro) y **Clínica Kunu'u** — la
primera clínica comunitaria dedicada a la salud LGTBI+ en Paraguay.

Live: **https://somosgay.paragu-ai.com**

## Stack

- **Next.js 16.2** (App Router) + React 19
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **TypeScript**
- Fonts via `next/font/google`: **Playfair Display** (display), **Inter** (body)
- Sin backend. Sin cookies de terceros. Sin analytics invasivo.

## Paleta

Rainbow + warm neutrals — enfoque afirmativo sin caer en rainbow-washing.

| Token | HEX | Uso |
|-------|-----|-----|
| `--color-primary` | `#7B2CBF` | Purple — CTAs principales |
| `--color-secondary` | `#0F4C5C` | Teal — secciones sobrias |
| `--color-accent` | `#E63946` | Red — urgencia / memorial |
| `--color-background` | `#FFFCF7` | Off-white warm |
| `--color-surface` | `#FFFFFF` | Tarjetas |
| `--color-warm` | `#FFF1E6` | Fondos alternos |

## Estructura

```
app/
  layout.tsx              — root layout, fonts, metadata, JSON-LD (NGO + MedicalClinic)
  page.tsx + HomeClient.tsx
  clinica-kunuu/page.tsx  — flagship clinic + 8 services + schedule + booking
  programas/page.tsx      — index de 5 programas
  programas/[slug]/page.tsx — 4 sub-programas (tekohara, nande-rekora, karu-pora, programa-kunuu)
  memoria-108/page.tsx    — caso Bernardo Aranda + Carta de un Amoral
  donar/page.tsx          — 3 opciones + impact breakdown + transparencia
  nosotros/page.tsx       — historia + liderazgo + auditoría
  noticias/page.tsx       — placeholder (news system pendiente)
  contacto/page.tsx       — WA + email + horarios + redes
  privacidad/page.tsx     — política completa
  sitemap.ts + robots.ts
  not-found.tsx
  globals.css

components/
  Header.tsx              — sticky nav con rainbow strip top
  Footer.tsx              — 4 columnas en purple deep
  WhatsAppFloat.tsx       — botón WA siempre visible
  BottomNav.tsx           — nav inferior mobile
  CookieBanner.tsx        — banner localStorage, sin tracking

content/
  es.json                 — TODO el contenido (ES)
  tokens.json             — paleta + fonts
```

## Decisiones de diseño OPSEC-conscious

- **Sin analytics**: ningún Google Analytics, Meta Pixel, Plausible, etc. Log de servidor mínimo (7 días).
- **CSP estricta**: `frame-ancestors 'none'`, sin third-party scripts.
- **HSTS preload**: cabeceras HSTS configuradas.
- **Sin formulario backend**: contacto via WhatsApp deep-link + mailto. Cero almacenamiento en US infra.
- **Política de privacidad clara**: explica qué NO hacemos (no rastreamos, no vendemos datos).
- **JSON-LD dual**: NGO + MedicalClinic schema.org para SEO + descubribilidad.

## Comandos

```bash
# Desde la raíz del monorepo
pnpm install
pnpm --filter somosgay-site dev      # http://localhost:3000
pnpm --filter somosgay-site build    # NODE_ENV=production npx next build
pnpm --filter somosgay-site start
```

## Repos relacionados

- **Sitio web (este):** `paragu-ai-platform/apps/somosgay-site`
- **Repo de contexto del cliente:** [`Ai-Whisperers/somosgay-context`](https://github.com/Ai-Whisperers/somosgay-context)
- **Sitio original (referencia, parcialmente caído):** https://www.somosgay.org/

## Fuentes de contenido

Todo el contenido en `es.json` está basado en investigación pública documentada en el repo
de contexto (`somosgay-context`). Cada dato tiene fuente URL. Datos sensibles (memoria-108)
requieren revisión humana antes de uso impreso.

## Status

- **Site:** ✅ Funciona
- **Live domain:** somosgay.paragu-ai.com (DNS + Traefik routing pendiente)
- **Multi-idioma:** Pendiente (ES-only al lanzamiento; EN según respuesta de Paloma Vera)
- **Backend:** No requerido para Phase 1 (zero-data-touching, per risk assessment)