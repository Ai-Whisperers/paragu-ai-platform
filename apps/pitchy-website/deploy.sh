#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="pitchy-website:prod-$VERSION-$DATE"
LATEST="pitchy-website:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build \
  -t "$TAG" -t "$LATEST" .

echo "--- deploy: pitchy-website_web (rolling update)"
docker service update --image "$TAG" pitchy-website_web

echo "--- done: $TAG"
