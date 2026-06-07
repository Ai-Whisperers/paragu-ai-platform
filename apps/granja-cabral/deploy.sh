#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="granja-cabral:prod-$VERSION-$DATE"
LATEST="granja-cabral:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build \
  -t "$TAG" -t "$LATEST" .

echo "--- deploy: granja-cabral_web (rolling update)"
docker service update --image "$TAG" granja-cabral_web

echo "--- done: $TAG"
