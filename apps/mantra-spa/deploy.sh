#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="mantra-spa:prod-$VERSION-$DATE"
LATEST="mantra-spa:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build \
  -t "$TAG" -t "$LATEST" .

echo "--- deploy: mantra-spa_web (rolling update)"
docker service update --image "$TAG" mantra-spa_web

echo "--- done: $TAG"
