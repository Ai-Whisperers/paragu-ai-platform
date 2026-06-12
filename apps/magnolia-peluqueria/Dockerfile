FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY .next/standalone ./
COPY .next/static ./apps/magnolia-peluqueria/.next/static
COPY public ./apps/magnolia-peluqueria/public
EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "apps/magnolia-peluqueria/server.js"]
