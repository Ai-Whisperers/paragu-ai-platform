#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="trentina-cerveza:prod-$VERSION-$DATE"
LATEST="trentina-cerveza:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build \
  -t "$TAG" -t "$LATEST" .

echo "--- deploy: trentina-cerveza_web (rolling update)"
docker service update --image "$TAG" trentina-cerveza_web

echo "--- done: $TAG"
