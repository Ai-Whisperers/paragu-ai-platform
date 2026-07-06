# Pierce Charm — Estudio de piercings & joyería alternativa

Sitio web del estudio **Pierce Charm** en Asunción, Paraguay. Realiza piercings profesionales y vende joyería alternativa con estética política dark/gothic.

## Stack

- **Next.js 16.2** (App Router) + React 18/19
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **TypeScript** (strict off, monorepo convention)
- Fuentes: **Cinzel** (display), **Tangerine** (script), **Inter** (body) via `next/font/google`

## Paleta

| Token | HEX | Uso |
|-------|-----|-----|
| `--color-primary` | `#63081d` | Burgundy / sangre — CTAs y acentos |
| `--color-secondary` | `#211b54` | Indigo medianoche — fondos oscuros |
| `--color-accent` | `#520b4e` | Royal purple — bordes brillantes |
| `--color-gold` | `#b08838` | Dorado para ornamentos decorativos |

## Estructura

```
app/
  layout.tsx        — root layout, fonts, metadata, JSON-LD
  page.tsx          — home (hero + story + features + process + CTA)
  piercings/        — catálogo interactivo con ear SVG + hotspots
  galeria/          — joyería alternativa
  nosotros/         — sobre el estudio
  contacto/         — WhatsApp + horarios + qué traer
  faq/              — preguntas frecuentes (accordion)
  not-found.tsx     — 404 gothic

components/
  Header.tsx        — sticky nav con logo + reserv
  Footer.tsx        — footer 3 columnas con ornamento
  BottomNav.tsx     — nav inferior mobile
  WhatsAppFloat.tsx — WA float con glow animado
  EarAnatomy.tsx    — SVG oreja con hotspots
  ornaments.tsx     — svg primitives (bat, skull, cross, candle, spider, chain…)

content/
  tokens.json       — paleta y fuentes
  es.json           — TODO el contenido del sitio (sin literales hardcodeados)
```

## Comandos

```bash
# Desde la raíz del monorepo
pnpm install
pnpm --filter pierce-charm dev      # http://localhost:3000
pnpm --filter pierce-charm build    # ⚠ Next 16 prerender workaround aplicado (experimental.globalNotFound=false)
pnpm --filter pierce-charm start
```

## Repos relacionados

- **Sitio web (este repo):** `paragu-ai-platform/apps/pierce-charm`
- **Repo de contexto del cliente** (briefs, reuniones, ideas, decisiones): separado, linkeado desde aquí