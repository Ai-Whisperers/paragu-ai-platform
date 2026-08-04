# Multi-stage build for the leads API
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src
COPY public ./public

ENV NODE_ENV=production
ENV PORT=3500
ENV DATA_DIR=/var/lib/paragu-ai-leads

# Data volume mount point
RUN mkdir -p /var/lib/paragu-ai-leads

EXPOSE 3500

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3500/health || exit 1

CMD ["node", "src/server.js"]