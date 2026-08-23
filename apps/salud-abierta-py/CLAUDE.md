# salud-abierta-py (SaludAbierta Paraguay) — client-scoped agent instructions

First client of the **Negligencia Médica Paraguay** domain. CivicTech + B2C víctimas platform.

## Canonical facts (do not re-derive, do not re-ask)

- **Project name:** SaludAbierta PY (Salud Abierta Paraguay)
- **Canonical domain:** `salud-abierta.paragu-ai.com` (DNS wildcard in Cloudflare)
- **Preview domain:** `salud-abierta-preview.paragu-ai.com`
- **Mission:** Primer actor de seguridad del paciente + derechos del paciente en Paraguay. Reportar, visualizar y presionar para cambiar el sistema.
- **Tagline ES:** "Tu voz cuenta. El sistema tiene que cambiar."
- **Tagline EN:** "Your voice matters. The system has to change."
- **Tagline GN:** "Nde ñe'ẽ oiko. Sistema tekotevëete oñemoambue."
- **Coalition partners:** Asociación Honor y Vida (50+ familias), Basta de Negligencia PY, Defensoría del Pueblo del Paraguay
- **Founder:** Ivan Weiss Van Der Pol (AIW Paraguay)

## Deploy target (CRITICAL)

- **Stack:** Next.js 16 standalone → Docker Swarm → Traefik → VPS Hostinger (72.61.44.159)
- **Repo path:** `apps/salud-abierta-py/` inside `paragu-ai-platform` monorepo
- **GitHub Pages fallback:** `https://ivanweissvanderpol.github.io/salud-abierta-py/` (works as long as no auth changes)

**NEVER** try to deploy to Vercel (account suspended).

**NEVER** delete the `Dockerfile.standalone`, `docker-compose.yml`, or `deploy.sh` files — they are the source of truth for the VPS deploy.

## Domain rules (mandatory)

- **Tono empático primero.** Víctimas en shock, con miedo, en duelo. **NUNCA** "médicos asesinos", "hospital criminal", discurso de odio.
- **Privacy-by-design.** Paraguay NO tiene ley de datos equivalente a GDPR. No cookies de terceros, no Meta Pixel, no Google Analytics.
- **Datos verificados únicamente.** Cada caso, cada número, cada cita tiene URL de fuente. Disclaimer explícito: "datos preliminares, no constituyen diagnóstico médico-legal".
- **Multiidioma nativo:** ES (default), Guaraní (Avañe'ẽ), EN (para inversores/medios internacionales). NO Portugués en MVP.
- **Trauma-informed UX.** Disclaimer al inicio del formulario. Botón "salir" siempre visible. Sin tracking. Sin popup agresivo.
- **Mobile-first 100%.** 80%+ de víctimas están en teléfono, llorando, en el pasillo de un hospital.

## Inherited from paragu-ai-platform/CLAUDE.md

- pnpm 10.28.2 (workspace), Next.js 16 App Router, Tailwind 4
- Self-host fonts `.woff2`, no `next/font` for retro faces
- **No gradients** (`bg-gradient-*`, `linear-gradient`, `radial-gradient`). Sólidos + borders.
- Deploy: Hostinger + Traefik (Vercel suspendido)
- pnpm workspaces, monorepo `paragu-ai-platform`

## MVP scope (do NOT expand without explicit approval)

Static-export-friendly + standalone-ready. Pages:

| Route | Content |
|-------|---------|
| `/` | Redirect to `/es/` |
| `/[es\|en\|guarani]/` | Home — hero + stats + recent cases |
| `/[es\|en\|guarani]/casos/` | Lista 25 casos con filtros (tipo/estado/gravedad) |
| `/[es\|en\|guarani]/casos/[slug]/` | Caso individual con timeline + fuentes |
| `/[es\|en\|guarani]/hospitales/` | Scorecard A-F de 15 hospitales |
| `/[es\|en\|guarani]/reportar/` | Formulario trauma-informed (cliente-side only) |
| `/[es\|en\|guarani]/nosotros/` | Sobre AIW + coalition partners |
| `/[es\|en\|guarani]/metodologia/` | Cómo se hizo el análisis + fuentes |
| `/[es\|en\|guarani]/privacidad/` | Disclaimer legal + privacy |
| `/api/health/` | Health check endpoint (JSON) |

## Hard NO list (forbidden in MVP)

- ❌ Vercel (suspended)
- ❌ Meta Pixel, Google Analytics, any third-party tracking
- ❌ Cookie consent banner (no cookies = no consent needed)
- ❌ "Asesino", "criminal", discurso de odio
- ❌ Acusaciones directas sin verificación
- ❌ Auth flows, login, signup (no backend)
- ❌ Database writes (form is client-side only)
- ❌ Payment processing
- ❌ Multipage forms (max 1 page, wizard de 4 steps)

## Trademark banlist (mechanical enforcement)

NEVER in code, content, or strings:
mensaje, wpp, facebook, meta, instagram, oculus, paypal, stripe, google, gmail, youtube, tiktok, twitter, x-com, discord, slack, microsoft, office365, apple, icloud, amazon, aws-, openai, chatgpt, anthropic, claude

Carve-outs: "messaging bridge", "linked device", OSS upstream names (Evolution API for legal purposes only).

## File map

```
apps/salud-abierta-py/
├── CLAUDE.md (this file)
├── DEPLOYMENT.md           # Deploy runbook (VPS + Swarm + Traefik)
├── README.md               # For GitHub Pages repo
├── package.json            # Scripts: prebuild, build, deploy
├── tsconfig.json
├── next.config.mjs         # output: 'standalone', trailingSlash: true
├── postcss.config.mjs
├── Dockerfile.standalone   # Docker image (production)
├── docker-compose.yml      # Swarm service definition + Traefik labels
├── deploy.sh               # Idempotent deploy script
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx        # /  →  /es/
│   │   ├── globals.css
│   │   ├── api/health/route.ts
│   │   └── [locale]/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── casos/{page.tsx,[slug]/page.tsx}
│   │       ├── hospitales/page.tsx
│   │       ├── reportar/page.tsx
│   │       ├── nosotros/page.tsx
│   │       ├── metodologia/page.tsx
│   │       └── privacidad/page.tsx
│   ├── components/
│   ├── lib/
│   └── data/
│       ├── casos.ts (25)
│       ├── hospitales.ts (15)
│       └── stats.ts (9)
├── scripts/
│   ├── generate-assets.py  # favicon + OG image
│   └── generate-sitemap.py # sitemap.xml + robots.txt
└── public/
    ├── favicon.svg
    └── images/og-default.svg
```

## Build & deploy

### Local build (Docker Swarm-compatible standalone)
```bash
pnpm install --frozen-lockfile
pnpm build
# → .next/standalone/apps/salud-abierta-py/server.js
```

### Deploy to VPS (one-time)
```bash
ssh root@72.61.44.159
cd /root/paragu-ai-platform
git pull
cd apps/salud-abierta-py
./deploy.sh
docker stack deploy -c docker-compose.yml salud-abierta --with-registry-auth
```

### Subsequent deploys (rolling update)
```bash
./deploy.sh  # build new image + service update automático
```

### Verify
```bash
curl -sS https://salud-abierta.paragu-ai.com/api/health/ | jq
```
