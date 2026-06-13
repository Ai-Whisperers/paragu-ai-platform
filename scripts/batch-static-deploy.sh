#!/usr/bin/env bash
set -euo pipefail
BASE=/root/paragu-ai-platform/apps

declare -A APPS=(
  ["3md-website"]="3md_web:3000"
  ["bichos-gym"]="bichos-gym_web:3000"
  ["escribania-paraguay"]="escribania-paraguay_web:3000"
  ["fun4me"]="fun4me_web:3000"
  ["jota-ink-tattoo"]="jota-ink_web:3000"
  ["luis-de-leon-concept"]="luisleon_web:3000"
  ["ozmontania-website"]="ozmontania-website_web:3000"
  ["pitchy-website"]="pitchy_web:3000"
  ["trentina-site"]="trentina-site_web:3000"
  ["tsuki-restaurante"]="tsuki-restaurante_web:3000"
  ["villamayor-asociados"]="villamayor-asociados_web:3000"
)

for app in "${!APPS[@]}"; do
  IFS=: read -r service port <<< "${APPS[$app]}"
  echo "=== $app -> $service :$port ==="
  APP="$BASE/$app"
  mkdir -p "$APP/dist/.next/static" "$APP/dist/public"
  [ -d "$APP/.next/static" ] && cp -r "$APP/.next/static/"* "$APP/dist/.next/static/" 2>/dev/null || true
  [ -d "$APP/public" ] && cp -r "$APP/public/"* "$APP/dist/public/" 2>/dev/null || true
  [ -d "$APP/app/public" ] && cp -r "$APP/app/public/"* "$APP/dist/public/" 2>/dev/null || true
  rm -f "$APP/Dockerfile.localpack.tmp" "$APP/Dockerfile.tmp" 2>/dev/null || true
  TAG="${app}:static-$(date +%Y%m%d-%H%M)"
  cat > "/tmp/Dockerfile-${app}-static" <<EOF
FROM nginx:alpine
RUN mkdir -p /etc/nginx/http.d
COPY dist/ /usr/share/nginx/html/
RUN rm -f /etc/nginx/conf.d/default.conf
RUN printf '%s\n' 'server { listen ${port}; server_name _; root /usr/share/nginx/html; index index.html; location / { try_files \$uri /index.html; } }' > /etc/nginx/conf.d/server.conf
EOF
  docker build -f "/tmp/Dockerfile-${app}-static" -t "$TAG" "$APP" >"/tmp/dockerbuild-${app}.log" 2>&1
  rm -rf "$APP/dist" "/tmp/Dockerfile-${app}-static"
  docker tag "$TAG" "${app}:prod"
  if docker service ls --format '{{.Name}}' | grep -q "^${service}$"; then
    docker service update --image "$TAG" "$service"
  else
    echo "Skip $app: $service not in Swarm"
  fi
  echo "done $app"
done

echo "=== services ==="
docker service ls --format '{{.Name}}\t{{.Image}}\t{{.Replicas}}'
