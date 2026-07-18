FROM node:20-slim AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10 --activate
# Build inside the monorepo workspace so pnpm can resolve @ai-whisperers/* link refs.
WORKDIR /workspace
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml* .npmrc* tsconfig.base.json* ./
COPY packages/ packages/
COPY apps/dra-gabriela/ apps/dra-gabriela/
RUN cd apps/dra-gabriela && pnpm install --no-frozen-lockfile --filter dra-gabriela...

FROM node:20-slim AS builder
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@10 --activate
COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/apps/dra-gabriela/node_modules ./apps/dra-gabriela/node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN cd apps/dra-gabriela && pnpm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
# Next.js standalone output preserves relative symlinks within .next/standalone/.
# Keep the whole tree intact under /app/standalone/ and run server.js from
# /app/standalone/apps/dra-gabriela/ where the relative node_modules/ link resolves.
COPY --from=builder /workspace/apps/dra-gabriela/.next/standalone/ /app/standalone/
COPY --from=builder /workspace/apps/dra-gabriela/.next/static /app/standalone/apps/dra-gabriela/.next/static
COPY --from=builder /workspace/apps/dra-gabriela/public /app/standalone/apps/dra-gabriela/public
RUN addgroup --system --gid 1001 nodejs 2>/dev/null || true && \
    adduser --system --uid 1001 --ingroup nodejs nextjs 2>/dev/null || true && \
    chown -R nextjs:nodejs /app
USER nextjs
EXPOSE 3000
WORKDIR /app/standalone/apps/dra-gabriela
CMD ["node", "server.js"]


