#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="golden-visa-advisory:prod-$VERSION-$DATE"
LATEST="golden-visa-advisory:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build \
  -t "$TAG" -t "$LATEST" .

echo "--- deploy: golden-visa-advisory_web (rolling update)"
docker service update --image "$TAG" golden-visa-advisory_web

echo "--- done: $TAG"
