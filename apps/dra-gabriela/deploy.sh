#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

# Ensure monorepo-level files are available for Docker build context
[ -f pnpm-lock.yaml ] || cp ../../pnpm-lock.yaml ./pnpm-lock.yaml
[ -f .npmrc ] || cp ../../.npmrc ./.npmrc

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="dra-gabriela:prod-$VERSION-$DATE"
LATEST="dra-gabriela:prod"

echo "--- build: $TAG"
# Next 16 + Turbopack + output: standalone has a known race: parallel
# build workers sometimes write build-manifest before pages-manifest,
# causing the next start (or the standalone server) to ENOENT on first
# request. Forcing a single-worker build is the documented workaround.
NEXT_BUILD_WORKERS=1 pnpm run build 2>/dev/null || NEXT_BUILD_WORKERS=1 npm run build

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

# Clean up monorepo-level files copied for Docker build
rm -f ./pnpm-lock.yaml ./.npmrc
