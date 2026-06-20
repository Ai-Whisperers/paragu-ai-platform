#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD 2>/dev/null || echo "local")
DATE=$(date +%Y%m%d-%H%M)
TAG="rockabar:prod-$VERSION-$DATE"
LATEST="rockabar:prod"

echo "--- build: $TAG"
npm install --include=dev --legacy-peer-deps
npm run build

echo "--- docker: $TAG"
docker build \
  -f Dockerfile.standalone \
  -t "$TAG" -t "$LATEST" \
  .

echo "--- deploy: rockabar_web (rolling update)"
docker service update --image "$TAG" rockabar_web

echo "--- done: $TAG"
