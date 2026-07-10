# SOMOSGAY site

Sitio institucional bilingüe (ES + guaraní parcial) de SOMOSGAY.
ONG LGBTQ+ en Paraguay.

## Stack

- **Next.js 16** (App Router)
- **React 19** server components por defecto
- **TypeScript** estricto
- **Tailwind v4** con design tokens en `content/tokens.json`
- **Standalone output** para Docker (no se usa `@vercel/nft`)

## Local dev

```bash
pnpm install  # o npm i / bun install
pnpm dev      # http://localhost:3000
```

## Build

```bash
NODE_ENV=production npx next build   # genera .next/standalone
docker buildx build -f Dockerfile.standalone -t somosgay-site:latest --load .
```

## Estructura

```
app/                       # Rutas (por dominio, no por locale)
├── page.tsx               # /
├── gn/                    # Splashes localizados (poco contenido por ahora)
├── clinica-kunuu/         # Página clínica
├── donar/                 # Donación (con DonationForm)
├── memoria-108/           # Evento anual
├── eventos-ics/route.ts   # iCal feed
├── search-index.json/     # JSON dump para SearchBar
└── ...

components/                # Reusables
├── Header.tsx             # Nav + LangSwitcher + QuickExit
├── Footer.tsx             # Legal + SearchBar + social
├── DonationForm.tsx       # 5 presets + monthly + tribute
├── PrEP ...
├── QuickExit.tsx          # Salir / Esc → google
├── FeedbackWidget.tsx     # Bottom-right bug/typo
├── Rsvp108.tsx            # Memoria 108 RSVP
└── SearchBar.tsx          # Footer search (cliente, no algolia)

content/
├── es.json                # Idioma principal (canonical)
├── gn.json                # Partial guaraní (hero, navigation, klinika)
├── tokens.json            # Design tokens
├── news.ts                # Articulos /noticias
├── equipo.ts              # Team members
├── hitos.ts               # Histórico (timeline)
├── testimonios.ts         # Voces comunidad
├── aliados-directorio.ts  # Directorio de aliados
└── search-index.ts        # Índice de búsqueda

lib/
└── content.ts             # getContent(locale) — wrapper multi-locale

cron jobs:
  2cc3681cec60  each 5min   probe-somosgay.sh → Telegram alert
  a770de1df44b  weekly     probe-somosgay-weekly.sh → 17 routes + JSON-LD

Tópicos delicados (open-core):
  + contraseña del banco está en `.env.example` (no `.env`).
  + datos del banco en vivo (en `transferencia/page.tsx`) están [Por confirmar].
  + WhatsApp number tunnable vía `NEXT_PUBLIC_WHATSAPP_NUMBER`.
```

## Editar contenido

### Traducir algo nuevo al guaraní

1. Buscar la clave en `content/es.json`.
2. Agregar la traducción en `content/gn.json` (mismo path).
3. Importar `getContent` en lugar de `content` en el componente que lo usa:

   ```ts
   import { getContent } from "@/lib/content";
   const c = getContent("es");   // o "gn"
   ```

4. Si la página no tiene variante `/gn/<slug>`, no hace falta todavía.
   El language switcher (/gn) ya muestra un splash que apunta al ES.

### Corregir un dato (ejemplo: dirección)

1. Abrir `content/es.json`.
2. Buscar `direccion` o `address`.
3. Modificar.
4. Rebuild.

## Auditoria automatica

```bash
./scripts/probe-somosgay.sh            # cada 5 min (cron)
/root/.hermes/scripts/probe-somosgay-weekly.sh   # cada 7 dias
```

Ambos revisan 17+ rutas y la presencia de JSON-LD en paginas clave.

## Manuales de estilo en otros documentos

- /Users/ivan/.claude/projects/.../skill.md → som_lgbtq_paraguay
- /Users/ivan/.claude/projects/.../client-intake-analysis.md

## Donde conseguir ayuda

- Ivan · Founder
- Gaby / Paloma · Coordinación clínica
- Equipo de comunicación de SOMOSGAY
