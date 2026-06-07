#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="bichos-gym:prod-$VERSION-$DATE"
LATEST="bichos-gym:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build \
  -t "$TAG" -t "$LATEST" .

echo "--- deploy: bichos-gym_web (rolling update)"
docker service update --image "$TAG" bichos-gym_web

echo "--- done: $TAG"
