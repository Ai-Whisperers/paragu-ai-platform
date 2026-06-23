# ── Nexa Paraguay — full build (CI / dev) ──
# This Dockerfile does the full build (deps → build → runtime) and is
# useful for CI and for one-shot `docker build .` workflows.
# For production Swarm deploys, prefer Dockerfile.standalone which is
# ~10x smaller and faster because the build is done on the host with
# `npm run build` and the image only carries the standalone runtime.
#
# Build (from monorepo root):
#   docker build -f apps/nexa-paraguay/Dockerfile -t nexa-paraguay:dev ./apps/nexa-paraguay
#
# Note: this Dockerfile uses the @ai-whisperers/* packages from GitHub
# Packages (npm.pkg.github.com). Build with the secret:
#   docker build --secret id=NODE_AUTH_TOKEN,src=<file> \
#     -f apps/nexa-paraguay/Dockerfile -t nexa-paraguay:dev ./apps/nexa-paraguay

# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Lockfile + manifest
COPY package.json package-lock.json* ./

# Local @ai-whisperers/* tgz packages (file:-referenced in package.json:
# @ai-whisperers/i18n and @ai-whisperers/sections)
COPY .packages ./.packages
COPY scripts/copy-ai-packages.cjs ./scripts/copy-ai-packages.cjs

# Install with auth token from secret (for the @ai-whisperers/* packages
# hosted at npm.pkg.github.com). Local tgz packages are extracted directly
# from .packages by npm because they're file:-referenced in package.json.
RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    set -eu; \
    npm config set @ai-whisperers:registry=https://npm.pkg.github.com; \
    TOK=""; \
    if [ -f /run/secrets/NODE_AUTH_TOKEN ]; then TOK="$(cat /run/secrets/NODE_AUTH_TOKEN)"; fi; \
    if [ -n "$TOK" ]; then npm config set //npm.pkg.github.com/:_authToken "$TOK"; fi; \
    npm install --legacy-peer-deps; \
    npm config delete //npm.pkg.github.com/:_authToken 2>/dev/null || true; \
    node scripts/copy-ai-packages.cjs

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .packages ./.packages
RUN node scripts/copy-ai-packages.cjs || true
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /app/.leads /app/data/submissions && \
    chown -R nextjs:nodejs /app/.leads /app/data/submissions

USER nextjs
EXPOSE 3000

# Standalone bundle
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Static + content (only the image subdirs the app actually loads:
# blog, brand, flags, hero — see public/_archive-images/README.md)
COPY --from=builder --chown=nextjs:nodejs /app/public/images/blog   /app/public/images/blog
COPY --from=builder --chown=nextjs:nodejs /app/public/images/brand  /app/public/images/brand
COPY --from=builder --chown=nextjs:nodejs /app/public/images/flags  /app/public/images/flags
COPY --from=builder --chown=nextjs:nodejs /app/public/images/hero   /app/public/images/hero
COPY --from=builder --chown=nextjs:nodejs /app/public/images/og-default.svg /app/public/images/og-default.svg
COPY --from=builder --chown=nextjs:nodejs /app/public/favicon.ico  /app/public/favicon.ico
COPY --from=builder --chown=nextjs:nodejs /app/public/favicon.svg  /app/public/favicon.svg
COPY --from=builder --chown=nextjs:nodejs /app/public/icon-192.png /app/public/icon-192.png
COPY --from=builder --chown=nextjs:nodejs /app/public/icon-512.png /app/public/icon-512.png
COPY --from=builder --chown=nextjs:nodejs /app/public/robots.txt   /app/public/robots.txt
COPY --from=builder --chown=nextjs:nodejs /app/public/schema       /app/public/schema
COPY --from=builder --chown=nextjs:nodejs /app/public/testimonios  /app/public/testimonios
COPY --from=builder --chown=nextjs:nodejs /app/public/assets       /app/public/assets
COPY --from=builder --chown=nextjs:nodejs /app/content     /app/content
COPY --from=builder --chown=nextjs:nodejs /app/nexa-pages  /app/nexa-pages

# Site config
COPY --from=builder --chown=nextjs:nodejs /app/site.json   ./site.json
COPY --from=builder --chown=nextjs:nodejs /app/images.json ./images.json
COPY --from=builder --chown=nextjs:nodejs /app/tokens.json ./tokens.json

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "server.js"]
