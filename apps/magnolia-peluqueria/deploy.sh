#!/bin/bash
set -e

echo "→ Installing deps..."
pnpm install --frozen-lockfile

echo "→ Building app (local — resolves @ai-whisperers file: deps)..."
pnpm build

echo "→ Building Docker image..."
docker build -t magnolia-peluqueria:prod .

echo "→ Deploying to Swarm..."
docker stack deploy -c docker-compose.yml magnolia

echo "✓ Done. Waiting for rollout..."
sleep 5
docker service ps magnolia_web --no-trunc | head -3
echo "→ Site: https://magnolia-peluqueria.paragu-ai.com"
