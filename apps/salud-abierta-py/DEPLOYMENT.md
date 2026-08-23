# DEPLOYMENT.md — SaludAbierta PY (paragu-ai-platform)

**Sitio live:** https://salud-abierta.paragu-ai.com (after deploy)
**Stack:** Next.js 16 standalone → Docker Swarm → Traefik → VPS Hostinger
**Última actualización:** 23 de agosto de 2026

---

## 🚀 Deploy (10 minutos)

### Pre-requisitos
- VPS Hostinger (72.61.44.159) con Docker Swarm + Traefik configurados
- DNS wildcard `*.paragu-ai.com` apuntando a VPS (ya configurado)
- Acceso SSH al VPS
- pnpm 9+ instalado localmente

### Pasos

```bash
# 1. Clonar el monorepo (si no está)
git clone https://github.com/Ai-Whisperers/paragu-ai-platform.git
cd paragu-ai-platform

# 2. Build local
cd apps/salud-abierta-py
pnpm install --frozen-lockfile
pnpm build
# (auto-generates sitemap.xml, robots.txt, favicon.svg, og-default.svg)

# 3. SSH al VPS
ssh root@72.61.44.159

# 4. Una vez en el VPS, primer deploy (crea el servicio Swarm)
cd /root/paragu-ai-platform/apps/salud-abierta-py
./deploy.sh
docker stack deploy -c docker-compose.yml salud-abierta --with-registry-auth

# 5. Verificar
docker service ls | grep salud
curl -sS https://salud-abierta.paragu-ai.com/api/health/ | jq

# 6. SSL automático (Let's Encrypt via Traefik)
# Se genera automáticamente al primer request HTTPS
curl -sS -o /dev/null -w "%{http_code}\n" https://salud-abierta.paragu-ai.com/es/
```

### Deploy subsiguiente (rolling update)

```bash
cd apps/salud-abierta-py
git pull
pnpm build
./deploy.sh   # build + docker build + service update automático
```

---

## 🏗️ Arquitectura

```
Internet
  ↓
Cloudflare DNS (paragu-ai.com wildcard)
  ↓
VPS Hostinger (72.61.44.159)
  ↓
Traefik (reverse proxy + Let's Encrypt)
  ↓
Docker Swarm service "salud-abierta_web"
  ↓
2 replicas del contenedor Node.js
  ↓
Next.js 16 (standalone) en puerto 3000
```

### Por qué Docker Swarm (no Vercel, no GitHub Pages)
- Vercel: cuenta suspendida (403)
- GitHub Pages: funciona pero no es un sitio "real" de la plataforma
- Docker Swarm: consistencia con otros 20+ sitios AIW Paraguay
- Traefik: SSL automático, compresión, security headers
- Cost: VPS compartido = ~$0 marginal para un sitio más

---

## 📂 Estructura del proyecto

```
apps/salud-abierta-py/
├── CLAUDE.md              # Override del cliente (canonical facts)
├── DEPLOYMENT.md          # ← Este archivo
├── README.md              # Para GitHub repo
├── package.json           # Scripts: prebuild, build, deploy
├── tsconfig.json
├── next.config.mjs        # output: 'standalone' + trailingSlash
├── postcss.config.mjs
├── Dockerfile.standalone  # ← Docker build (production)
├── docker-compose.yml     # ← Swarm stack definition
├── deploy.sh              # ← Deploy script (idempotent)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx       # Redirect / → /es/
│   │   ├── globals.css    # Tokens Paraguay
│   │   ├── api/health/route.ts  # Health check endpoint
│   │   └── [locale]/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── casos/
│   │       ├── casos/[slug]/
│   │       ├── hospitales/
│   │       ├── reportar/
│   │       ├── nosotros/
│   │       ├── metodologia/
│   │       └── privacidad/
│   ├── components/
│   ├── lib/
│   └── data/
│       ├── casos.ts (25 casos)
│       ├── hospitales.ts (15 hospitales)
│       └── stats.ts (9 stats)
├── scripts/
│   ├── generate-assets.py  # favicon + OG image
│   └── generate-sitemap.py # sitemap.xml + robots.txt
└── public/
    ├── favicon.svg
    └── images/og-default.svg
```

---

## 🔧 Configuración técnica

### Standalone build output
```
.next/standalone/
├── apps/salud-abierta-py/
│   ├── server.js
│   └── package.json
├── node_modules/  (deps prod-only)
```

### Environment variables (production)
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://salud-abierta.paragu-ai.com
NEXT_PUBLIC_SITE_URL=https://salud-abierta.paragu-ai.com
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

### Health check endpoint
- `GET /api/health/` (con trailing slash)
- Returns JSON: status, service, version, timestamp, locales, feature counts
- Used by: Docker HEALTHCHECK + Traefik loadbalancer

### Traefik routing
- **Canonical:** `Host(salud-abierta.paragu-ai.com)` → service salud-abierta
- **Preview:** `Host(salud-abierta-preview.paragu-ai.com)` → mismo service
- **TLS:** Let's Encrypt (certresolver=letsencryptresolver)
- **Middlewares:** compress + security-headers

---

## 🌐 DNS configuration

Ya configurado en Cloudflare:

| Subdomain | Type | Value |
|---|---|---|
| `salud-abierta.paragu-ai.com` | A | 72.61.44.159 |
| `salud-abierta-preview.paragu-ai.com` | A | 72.61.44.159 |

(No wildcard — solo los subdominios específicos que usamos)

---

## 📝 Workflow de cambios

```bash
# 1. Editar
$EDITOR apps/salud-abierta-py/src/data/casos.ts

# 2. Build + test local
pnpm build
# Si tenés Docker: docker build -f Dockerfile.standalone -t salud-abierta-py:test .
docker run --rm -p 3000:3000 salud-abierta-py:test

# 3. Commit
git add . && git commit -m "feat: add caso X"

# 4. Push al monorepo
git push origin main

# 5. Deploy al VPS (manual o vía central.yml workflow)
ssh root@72.61.44.159
cd /root/paragu-ai-platform
git pull
cd apps/salud-abierta-py
./deploy.sh
```

---

## 🆘 Troubleshooting

### Site no carga
```bash
# En el VPS
docker service ls | grep salud
docker service logs salud-abierta_web --tail 50
```

### Build falla
```bash
cd apps/salud-abierta-py
rm -rf .next node_modules
pnpm install --frozen-lockfile
pnpm build
```

### SSL no se genera
```bash
# En el VPS, verificar Traefik
docker service logs traefik_traefik --tail 20
curl -v https://salud-abierta.paragu-ai.com/ 2>&1 | grep -i certificate
```

### DNS no resuelve
```bash
dig salud-abierta.paragu-ai.com
# Debe apuntar a 72.61.44.159
```

---

## 📞 Contacto técnico

- **Repositorio monorepo:** https://github.com/Ai-Whisperers/paragu-ai-platform
- **GitHub Pages fallback:** https://github.com/IvanWeissVanDerPol/salud-abierta-py
- **Brief técnico AIW:** https://github.com/Ai-Whisperers/agents-v2/issues/1
- **Gist investigación:** https://gist.github.com/IvanWeissVanDerPol/174e660734db01a1a3ac427ec02b1ef8

---

**Última actualización:** 23-ago-2026
**Versión del deploy:** v0.1.0 (production-ready)
