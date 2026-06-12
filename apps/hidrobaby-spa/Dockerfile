FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY .next/standalone ./
COPY .next/static ./apps/hidrobaby-spa/.next/static
COPY public ./apps/hidrobaby-spa/public
EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "apps/hidrobaby-spa/server.js"]
