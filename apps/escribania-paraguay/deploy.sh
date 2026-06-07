#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="escribania-paraguay:prod-$VERSION-$DATE"
LATEST="escribania-paraguay:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build \
  -t "$TAG" -t "$LATEST" .

echo "--- deploy: escribania-paraguay_web (rolling update)"
docker service update --image "$TAG" escribania-paraguay_web

echo "--- done: $TAG"
