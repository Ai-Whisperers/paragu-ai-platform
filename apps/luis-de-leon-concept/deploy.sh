#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="luis-de-leon-concept:prod-$VERSION-$DATE"
LATEST="luis-de-leon-concept:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build \
  -t "$TAG" -t "$LATEST" .

echo "--- deploy: luis-de-leon-concept_web (rolling update)"
docker service update --image "$TAG" luis-de-leon-concept_web

echo "--- done: $TAG"
