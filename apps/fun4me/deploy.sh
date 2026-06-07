#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] && { set -a; source ./.env; set +a; }

VERSION=$(git rev-parse --short HEAD)
DATE=$(date +%Y%m%d-%H%M)
TAG="fun4me:prod-$VERSION-$DATE"
LATEST="fun4me:prod"

echo "--- build: $TAG"
npm run build

echo "--- docker: $TAG"
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  --build-arg NEXT_PUBLIC_SITE_URL=https://fun4me.paragu-ai.com="$NEXT_PUBLIC_SITE_URL=https://fun4me.paragu-ai.com" \
  --build-arg NEXT_PUBLIC_GA_ID="$NEXT_PUBLIC_GA_ID" \  -t "$TAG" -t "$LATEST" .

echo "--- deploy: fun4me_web (rolling update)"
docker service update --image "$TAG" fun4me_web

echo "--- done: $TAG"
