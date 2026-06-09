FROM nginx:1.27-alpine
COPY --chown=nginx:nginx out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/ || exit 1
