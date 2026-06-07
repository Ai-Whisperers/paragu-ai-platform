#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="de-abasto-a-casa:prod-$VERSION-$DATE"
LATEST="de-abasto-a-casa:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build \
  -t "$TAG" -t "$LATEST" .

echo "--- deploy: de-abasto-a-casa_web (rolling update)"
docker service update --image "$TAG" de-abasto-a-casa_web

echo "--- done: $TAG"
