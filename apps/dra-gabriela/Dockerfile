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
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs
EXPOSE 3000
# Next.js standalone output bundles apps/<name>/ into its own subfolder.
# Use a layout that puts server.js + content/ at /app/ (matching what node server.js expects).
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/dra-gabriela/.next/standalone/apps/dra-gabriela/ ./
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/dra-gabriela/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/dra-gabriela/public ./public
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/dra-gabriela/content ./content
CMD ["node", "server.js"]

