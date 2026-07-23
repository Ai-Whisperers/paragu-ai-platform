FROM node:20-slim AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10 --activate
WORKDIR /workspace
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml* .npmrc* tsconfig.base.json* ./
COPY packages/ packages/
COPY apps/fun4me/ apps/fun4me/
RUN cd apps/fun4me && pnpm install --no-frozen-lockfile --filter fun4me...

FROM node:20-slim AS builder
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@10 --activate
COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/apps/fun4me/node_modules ./apps/fun4me/node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL=https://fun4me.paragu-ai.com
ARG NEXT_PUBLIC_GA_ID
RUN cd apps/fun4me && pnpm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
COPY --from=builder /workspace/apps/fun4me/.next/standalone/ /app/standalone/
COPY --from=builder /workspace/apps/fun4me/.next/static /app/standalone/apps/fun4me/.next/static
COPY --from=builder /workspace/apps/fun4me/public /app/standalone/apps/fun4me/public
RUN addgroup --system --gid 1001 nodejs 2>/dev/null || true && \
    adduser --system --uid 1001 --ingroup nodejs nextjs 2>/dev/null || true && \
    chown -R nextjs:nodejs /app
USER nextjs
EXPOSE 3000
WORKDIR /app/standalone/apps/fun4me
CMD ["node", "server.js"]
