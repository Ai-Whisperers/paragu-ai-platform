#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="dayah-litworks:prod-$VERSION-$DATE"
LATEST="dayah-litworks:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build \
  -t "$TAG" -t "$LATEST" .

echo "--- deploy: dayah-litworks_web (rolling update)"
docker service update --image "$TAG" dayah-litworks_web

echo "--- done: $TAG"
