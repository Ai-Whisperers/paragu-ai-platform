#!/usr/bin/env bash
set -euo pipefail
APP_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="$(basename "$APP_DIR")"
cd "$APP_DIR"

if [ ! -d .next/standalone ]; then
  echo "ERROR: .next/standalone not found — run 'pnpm run build' first"
  exit 1
fi

VERSION=$(git rev-parse --short HEAD 2>/dev/null || echo "local")
DATE=$(date +%Y%m%d-%H%M)
TAG="${APP_NAME}:prod-${VERSION}-${DATE}"
LATEST="${APP_NAME}:prod"

echo "--- Packaging $APP_NAME (no rebuild) ---"
cat > /tmp/Dockerfile.packager <<EOF
FROM node:20-alpine-slim
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=0 /src/.next/standalone ./
COPY --from=0 /src/.next/static ./.next/static
COPY --from=0 /src/public ./public
COPY --from=0 /src/content ./content
EXPOSE 3000
CMD ["node", "server.js"]
EOF

docker build -f /tmp/Dockerfile.packager -t "$TAG" -t "$LATEST" \
  --build-arg APP_DIR="$APP_DIR" \
  --iidfile /tmp/$APP_NAME.imgid \
  "$APP_DIR"

echo "--- Deploying $APP_NAME ($TAG) ---"
SERVICE="${APP_NAME}_web"
if docker service ls --format '{{.Name}}' | grep -q "^${SERVICE}$"; then
  docker service update --image "$TAG" "$SERVICE"
else
  echo "Service $SERVICE not found in Swarm — skip deploy"
fi

echo "--- done: $TAG ---"
rm -f /tmp/Dockerfile.packager
