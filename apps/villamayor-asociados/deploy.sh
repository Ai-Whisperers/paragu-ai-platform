#!/bin/bash
set -e
echo "=== Building villamayor-asociados ==="
cd /tmp/villamayor-asociados
npm run build
docker build -t villamayor-asociados:prod .
echo "=== Deploying to Docker Swarm ==="
docker stack deploy -c docker-compose.yml villamayor-asociados --detach=false
echo "=== Done! ==="
echo "Add A record in Cloudflare: villamayor -> 72.61.44.159 (proxied)"
echo "Site will be at: https://villamayor.paragu-ai.com"
echo ""
echo "⚠️  Remove old A record: alejandro-villamayor -> 72.61.44.159"
