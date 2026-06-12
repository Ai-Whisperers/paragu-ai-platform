#!/bin/bash
# bufete-mendez deploy — Next.js standalone (uses local .next/standalone if fresh)
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

DATE=$(date +%Y%m%d-%H%M)
TAG="bufete-mendez:prod-${DATE}"
LATEST="bufete-mendez:prod"

# Check if .next/standalone is fresh (built in last 24h)
if [ ! -d .next/standalone ] || [ -n "$(find .next/standalone -newer package.json -print -quit 2>/dev/null | head -1)" ]; then
    echo "--- next build (local)"
    npm run build
else
    # Check standalone mtime
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

echo "--- deploy: bufete-mendez_web (rolling update)"
docker service update --image "$TAG" bufete-mendez_web

echo "--- done: $TAG"
