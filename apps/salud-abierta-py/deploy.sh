#!/usr/bin/env bash
# ── SaludAbierta PY — Swarm deploy ──
# Builds the Docker image from apps/salud-abierta-py/.next (produced by
# `pnpm build` on the host), transfers to Host A via SSH, and rolls the
# salud-abierta_web service forward.
#
# Usage:
#   ./deploy.sh                    # build + transfer + rolling update
#   ./deploy.sh --no-build         # only transfer existing image
#   SERVICE=salud-abierta_web ./deploy.sh   # update a different service
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$APP_DIR/../.." && pwd)"

# SSH to Host A
HOST_A_HOST="${HOST_A_HOST:-38.9.96.179}"
HOST_A_USER="${HOST_A_USER:-root}"
SSH_KEY="${SSH_KEY:-/opt/data/.ssh/id_ed25519}"
SSH_TARGET="${HOST_A_USER}@${HOST_A_HOST}"

SERVICE="${SERVICE:-salud-abierta_web}"
APP_NAME="salud-abierta-py"
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
  if [ ! -d "$APP_DIR/.next" ]; then
    echo "ERROR: $APP_DIR/.next not found — run 'pnpm build' first" >&2
    exit 1
  fi

  echo "→ Building Docker image..."
  cd "$REPO_ROOT"
  SHA="$(git rev-parse --short HEAD 2>/dev/null || echo "no-git")"
  TS="$(date +%Y%m%d-%H%M%S)"
  TAG="${APP_NAME}:prod-${SHA}-${TS}"

  docker build \
    -f "$APP_DIR/Dockerfile.standalone" \
    -t "$TAG" \
    -t "${APP_NAME}:prod" \
    . 2>&1 | tail -20

  echo "✓ Image built: $TAG"
  echo ""
fi

echo "→ Saving image + transferring to Host A..."
TAG="${TAG:-${APP_NAME}:prod}"
docker save "$TAG" | ssh -i "$SSH_KEY" "$SSH_TARGET" "docker load"

echo ""
echo "→ Triggering service update on Host A..."
ssh -i "$SSH_KEY" "$SSH_TARGET" "
  set -e
  cd /opt/stacks/salud-abierta-py
  docker service update --force --image '$TAG' $SERVICE
"

echo ""
echo "✓ Deployed."
echo ""
echo "Verify:"
echo "  curl -sS https://salud-abierta.paragu-ai.com/api/health/"
echo "  https://salud-abierta.paragu-ai.com/"
