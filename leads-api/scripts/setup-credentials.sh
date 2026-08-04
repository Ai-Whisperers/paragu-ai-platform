#!/usr/bin/env bash
# ============================================================
# scripts/setup-credentials.sh — Apply env vars to all 19 sites
# ============================================================
# Usage:
#   1. Fill in /root/paragu-ai-platform/leads-api/.env
#   2. Run this script
#   3. It will copy NEXT_PUBLIC_* vars to all 19 sites
#   4. Rebuild + redeploy the sites
# ============================================================

set -e

MONOREPO="$(cd "$(dirname "$0")/../.." && pwd)"
SITES_DIR="$MONOREPO/apps"
ENV_FILE="$MONOREPO/leads-api/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ $ENV_FILE not found. Create it from .env.example first."
  exit 1
fi

# Load vars
source "$ENV_FILE"

# Check which NEXT_PUBLIC vars are set
echo "📋 NEXT_PUBLIC vars found:"
NEXT_PUBLIC_VARS=()
for k in $(grep -oE '^NEXT_PUBLIC_[A-Z_]+' "$ENV_FILE" || true); do
  if [ -n "${!k}" ]; then
    echo "  ✓ $k"
    NEXT_PUBLIC_VARS+=("$k")
  fi
done

if [ ${#NEXT_PUBLIC_VARS[@]} -eq 0 ]; then
  echo "❌ No NEXT_PUBLIC_* vars set in .env. Add GA4, GSC, etc."
  exit 1
fi

# List of 19 sites
SITES="
hidrobaby-spa
xxgym
nde-barba
portas-barber
scott-tatuajes
shine-nails
arnos-barber-shop
cronos-academy
estudio-medieval
avanibelleza
barbershop-peluqueria
barbye-nails
clau-bellino
lele-ferreira
leticia-carballo
nutrifit-spa
peluqueria-barbershop
viviesteticpy
woman-cosmeticos
"

# Write .env.local to each site
echo ""
echo "✍️  Writing .env.local to all 19 sites..."
for slug in $SITES; do
  ENV_LOCAL="$SITES_DIR/$slug/.env.local"
  > "$ENV_LOCAL"
  for k in "${NEXT_PUBLIC_VARS[@]}"; do
    echo "$k=${!k}" >> "$ENV_LOCAL"
  done
  echo "  ✓ $slug"
done

# Update leads-api env vars (those set in compose)
echo ""
echo "🚀 Updating leads-api env vars..."
ENV_VARS_TO_UPDATE=()
for k in KIKI_API_KEY CALLMEBOT_APIKEY STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET \
         STRIPE_PRICE_LITE STRIPE_PRICE_PRO STRIPE_PRICE_EMPRESA \
         WABA_PHONE_NUMBER_ID WABA_ACCESS_TOKEN WABA_VERIFY_TOKEN \
         KIKI_WHATSAPP PUBLIC_URL; do
  if [ -n "${!k}" ]; then
    ENV_VARS_TO_UPDATE+=("$k=${!k}")
  fi
done

# Update via docker service update
SERVICE="paragu-ai-leads-api_web"
UPDATES=()
for entry in "${ENV_VARS_TO_UPDATE[@]}"; do
  UPDATES+=("--env-add" "$entry")
done

if [ ${#UPDATES[@]} -gt 0 ]; then
  docker service update "${UPDATES[@]}" "$SERVICE"
  echo "  ✓ leads-api env updated with ${#ENV_VARS_TO_UPDATE[@]} vars"
fi

# Trigger rebuild of the 19 sites (background, can take 15-20 min)
echo ""
echo "🔨 Rebuilding all 19 sites (this takes 15-20 min)..."
for slug in $SITES; do
  (
    cd "$MONOREPO"
    docker build -t "${slug}:prod" -f "apps/${slug}/Dockerfile" . > /tmp/build-${slug}.log 2>&1
    if [ $? -eq 0 ]; then
      docker service update --force --image "${slug}:prod" "${slug}_web" >> /tmp/build-${slug}.log 2>&1
      echo "  ✓ $slug"
    else
      echo "  ✗ $slug (see /tmp/build-${slug}.log)"
    fi
  ) &
done
wait

echo ""
echo "✅ Done! Verify with:"
echo "  curl https://xxgym.paragu-ai.com | grep 'G-XXXXXXXXXX'"
echo "  curl https://leads.paragu-ai.com/api/plans"
