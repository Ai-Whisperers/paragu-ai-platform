#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="ai-whisperers-site:prod-$VERSION-$DATE"
LATEST="ai-whisperers-site:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build -t "$TAG" -t "$LATEST" .

echo "--- deploy: ai-whisperers-site_web (rolling update)"
# Create the service if it doesn't exist
if ! docker service inspect ai-whisperers-site_web > /dev/null 2>&1; then
  echo "--- creating service for first time"
  docker stack deploy -c docker-compose.yml ai-whisperers-site
else
  docker service update --image "$TAG" ai-whisperers-site_web
fi

echo "--- done: $TAG"
