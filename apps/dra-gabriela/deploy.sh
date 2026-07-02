#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="dra-gabriela:prod-$VERSION-$DATE"
LATEST="dra-gabriela:prod"

echo "--- build: $TAG"
pnpm run build 2>/dev/null || npm run build

echo "--- docker: $TAG"
docker build -t "$TAG" -t "$LATEST" .

echo "--- deploy: dra-gabriela_web (rolling update)"
if ! docker service inspect dra-gabriela_web > /dev/null 2>&1; then
  echo "--- creating service for first time"
  docker stack deploy -c docker-compose.yml dra-gabriela
else
  docker service update --image "$TAG" dra-gabriela_web
fi

echo "--- done: $TAG"
