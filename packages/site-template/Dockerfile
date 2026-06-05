# Pre-built standalone image
# Run `pnpm build` locally first — file: deps to @ai-whisperers packages
# are resolved during local build, not inside Docker.
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DATA_DIR=/app/data

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Create data directory for file-based data store (writable by nextjs user)
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000

# Copy the pre-built standalone output (includes everything)
COPY --chown=nextjs:nodejs .next/standalone ./
# Copy static assets separately (standalone expects them at this path)
COPY --chown=nextjs:nodejs .next/static ./.next/static
# Copy public assets and content
COPY --chown=nextjs:nodejs public ./public
COPY --chown=nextjs:nodejs content ./content

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
