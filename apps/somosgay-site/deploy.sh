#!/usr/bin/env bash
# ── SOMOSGAY site — Swarm deploy ──
# Builds from apps/somosgay-site/.next/standalone (already produced by
# `pnpm build` on the host) using Dockerfile.standalone, tags the image
# with the git short SHA + timestamp, and rolls the somosgay-site_web
# service forward. Cleans up old image tags.
#
# Usage:
#   ./deploy.sh                  # build + rolling update
#   ./deploy.sh --no-build       # only re-tag + update (for rollbacks)
#   SERVICE=somosgay-site_web ./deploy.sh   # update a different service
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$APP_DIR/../.." && pwd)"

SERVICE="${SERVICE:-somosgay-site_web}"
APP_NAME="somosgay-site"
DO_BUILD=1

for arg in "$@"; do
  case "$arg" in
    --no-build) DO_BUILD=0 ;;
    -h|--help)
      sed -n '2,12p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown arg: $arg" >&2
      exit 2
      ;;
  esac
done

if [ "$DO_BUILD" = "1" ]; then
  if [ ! -d "$APP_DIR/.next/standalone" ]; then
    echo "ERROR: $APP_DIR/.next/standalone not found — run 'pnpm build' first" >&2
    exit 1
  fi

  VERSION=$(git -C "$REPO_ROOT" rev-parse --short HEAD 2>/dev/null || echo "local")
  DATE=$(date +%Y%m%d-%H%M)
  TAG="${APP_NAME}:prod-${VERSION}-${DATE}"
  LATEST="${APP_NAME}:prod"

  echo "--- Building $TAG (from $APP_DIR, using Dockerfile.standalone) ---"
  docker build \
    -f "$APP_DIR/Dockerfile.standalone" \
    -t "$TAG" -t "$LATEST" \
    "$APP_DIR"

  IMAGE="$TAG"
else
  echo "--- --no-build: using existing ${APP_NAME}:prod image ---"
  IMAGE="${APP_NAME}:prod"
fi

if ! docker service ls --format '{{.Name}}' | grep -q "^${SERVICE}$"; then
  echo "Service $SERVICE not found in Swarm — skipping update" >&2
  exit 0
fi

echo "--- Deploying $SERVICE (rolling update) ---"
docker service update --image "$IMAGE" "$SERVICE"

echo "--- Cleaning up old ${APP_NAME}:prod-* images (keep last 3) ---"
docker images "$APP_NAME" --format '{{.Tag}} {{.ID}}' | \
  grep '^prod-' | sort -r | tail -n +4 | awk '{print $2}' | \
  xargs -r docker rmi -f 2>/dev/null || true

echo "--- done: $IMAGE on $SERVICE ---"