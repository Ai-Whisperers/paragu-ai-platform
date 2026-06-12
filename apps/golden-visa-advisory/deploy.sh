#!/bin/bash
# goldenvisa deploy — Next.js standalone (uses local .next/standalone if fresh)
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

DATE=$(date +%Y%m%d-%H%M)
TAG="golden-visa-advisory:prod-${DATE}"
LATEST="golden-visa-advisory:prod"

# Check if .next/standalone is fresh
if [ ! -d .next/standalone ]; then
    echo "--- next build (local) — no standalone"
    npm run build
else
    STANDALONE_AGE=$(( ($(date +%s) - $(stat -c %Y .next/standalone)) / 3600 ))
    if [ "$STANDALONE_AGE" -gt 24 ]; then
        echo "--- next build (local) — standalone is ${STANDALONE_AGE}h old"
        npm run build
    else
        echo "--- skipping build (.next/standalone is ${STANDALONE_AGE}h old, fresh)"
    fi
fi

echo "--- docker: $TAG"
docker build -f Dockerfile.standalone -t "$TAG" -t "$LATEST" .

echo "--- deploy: goldenvisa_web (rolling update)"
docker service update --image "$TAG" goldenvisa_web

echo "--- done: $TAG"
