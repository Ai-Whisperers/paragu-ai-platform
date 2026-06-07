FROM node:22-slim AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY node_modules ./node_modules

FROM node:22-slim AS build
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL=https://fun4me.paragu-ai.com
ARG NEXT_PUBLIC_GA_ID
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx next build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    apt-get update -qq && apt-get install -y -qq wget && \
    rm -rf /var/lib/apt/lists/*
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/content ./content
COPY --from=build --chown=nextjs:nodejs /app/lib ./lib
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=5 \
    CMD wget --no-verbose --tries=1 -O /dev/null http://127.0.0.1:3000/ || exit 1
CMD ["node", "server.js"]
