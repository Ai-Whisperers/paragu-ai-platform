FROM node:20-slim AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10 --activate
WORKDIR /workspace
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml* .npmrc* tsconfig.base.json* ./
COPY packages/ packages/
COPY apps/clau-bellino/ apps/clau-bellino/
RUN cd apps/clau-bellino && pnpm install --no-frozen-lockfile --filter clau-bellino...

FROM node:20-slim AS builder
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@10 --activate
COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/apps/clau-bellino/node_modules ./apps/clau-bellino/node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN cd apps/clau-bellino && pnpm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
COPY --from=builder /workspace/apps/clau-bellino/.next/standalone/ /app/standalone/
COPY --from=builder /workspace/apps/clau-bellino/.next/static /app/standalone/apps/clau-bellino/.next/static
COPY --from=builder /workspace/apps/clau-bellino/public /app/standalone/apps/clau-bellino/public
RUN addgroup --system --gid 1001 nodejs 2>/dev/null || true && \
    adduser --system --uid 1001 --ingroup nodejs nextjs 2>/dev/null || true && \
    chown -R nextjs:nodejs /app
USER nextjs
EXPOSE 3000
WORKDIR /app/standalone/apps/clau-bellino
CMD ["node", "server.js"]
