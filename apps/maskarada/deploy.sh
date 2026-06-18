#!/usr/bin/env bash
# Maskarada monorepo deploy.
# Builds from /root/paragu-ai-platform/apps/maskarada/.next (already built) using
# Dockerfile.standalone (which knows the apps/maskarada/server.js path).
set -euo pipefail
APP_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$APP_DIR/../.." && pwd)"

if [ ! -d "$APP_DIR/.next/standalone" ]; then
  echo "ERROR: $APP_DIR/.next/standalone not found — run 'pnpm run build' first"
  exit 1
fi

VERSION=$(git -C "$REPO_ROOT" rev-parse --short HEAD 2>/dev/null || echo "local")
DATE=$(date +%Y%m%d-%H%M)
TAG="maskarada:prod-${VERSION}-${DATE}"
LATEST="maskarada:prod"

echo "--- Building $TAG (from $APP_DIR, using Dockerfile.standalone) ---"
docker build -f "$APP_DIR/Dockerfile.standalone" \
  -t "$TAG" -t "$LATEST" \
  "$APP_DIR"

echo "--- Deploying maskarada_web (rolling update) ---"
if docker service ls --format '{{.Name}}' | grep -q '^maskarada_web$'; then
  docker service update --image "$TAG" maskarada_web
else
  echo "Service maskarada_web not found in Swarm — skipping"
fi

echo "--- Cleaning up old maskarada:prod-* images (keep last 3) ---"
docker images maskarada --format '{{.Tag}} {{.ID}}' | \
  grep '^prod-' | sort -r | tail -n +4 | awk '{print $2}' | \
  xargs -r docker rmi -f 2>/dev/null || true

echo "--- done: $TAG ---"
