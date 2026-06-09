FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --chown=nextjs:nodejs .next/standalone/ ./
COPY --chown=nextjs:nodejs .next/static ./apps/trentina-site/.next/static
COPY --chown=nextjs:nodejs public ./apps/trentina-site/public
COPY --chown=nextjs:nodejs content ./apps/trentina-site/content
USER nextjs
EXPOSE 3000
WORKDIR /app/apps/trentina-site
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1
CMD ["node", "server.js"]
