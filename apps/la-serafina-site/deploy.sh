#!/usr/bin/env bash
set -euo pipefail
APP_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$APP_DIR/../.." && pwd)"
APP_NAME="la-serafina-site"

[ -d "$APP_DIR/.next/standalone" ] || { echo "ERROR: .next/standalone missing — run pnpm build first"; exit 1; }

VERSION=$(git -C "$REPO_ROOT" rev-parse --short HEAD 2>/dev/null || echo "local")
DATE=$(date +%Y%m%d-%H%M)
TAG="${APP_NAME}:prod-${VERSION}-${DATE}"

echo "Building $TAG ..."
docker build -f "$APP_DIR/Dockerfile.standalone" -t "$TAG" -t "${APP_NAME}:prod" "$APP_DIR"
echo "Done: $TAG"
echo "To deploy: docker service update --image ${APP_NAME}:prod ${APP_NAME}_web"
