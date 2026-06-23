#!/usr/bin/env bash
# ── Nexa Paraguay — production health check ──
# Verifies that the site is up, key pages return 200, the Supabase project
# is reachable, the Docker Swarm service is healthy, and critical assets
# are served. Logs to /tmp/nexa-health-alerts.log; optionally alerts via
# Slack and email.
#
# Run from cron:
#   */15 * * * * /root/paragu-ai-platform/apps/nexa-paraguay/scripts/health-check.sh
#
# Required env (set in cron or /root/.hermes/nexa-health.env):
#   NEXT_PUBLIC_SUPABASE_URL
#   SUPABASE_SERVICE_ROLE_KEY
#   VPS_IP        (default: 72.61.44.159)
# Optional:
#   SLACK_WEBHOOK
#   ALERT_EMAIL
#
# Exit codes:
#   0  — all checks passed
#   1  — at least one check failed (alerts written)

set -euo pipefail

# Allow env file
ENV_FILE="${NEXA_HEALTH_ENV:-/root/.hermes/nexa-health.env}"
if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

SITE="${SITE:-https://nexa.paragu-ai.com}"
APEX_SITE="${APEX_SITE:-https://nexaparaguay.com}"
SB_URL="${NEXT_PUBLIC_SUPABASE_URL:-}"
SB_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"
VPS_IP="${VPS_IP:-72.61.44.159}"
SLACK_WEBHOOK="${SLACK_WEBHOOK:-}"
ALERT_EMAIL="${ALERT_EMAIL:-}"

LOG_PREFIX="[nexa-health]"
ALERT_FILE="/tmp/nexa-health-alerts.log"
LOG_FILE="/tmp/nexa-health.log"
OK=true

log()  {
  local msg
  msg="$LOG_PREFIX $(date '+%Y-%m-%d %H:%M:%S') $1"
  echo "$msg" | tee -a "$LOG_FILE"
}
alert() {
  local msg="$1"
  log "ERROR: $msg" >&2
  echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) ERROR: $msg" >> "$ALERT_FILE"
  OK=false
}

# Reset alerts file for this run
: > "$ALERT_FILE"

# ── 1. Apex site HTTP ────────────────────────────────────
log "Checking apex site ($APEX_SITE)..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$APEX_SITE" 2>/dev/null || echo "000")
if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
  log "Apex HTTP OK ($HTTP_STATUS)"
else
  alert "Apex HTTP failed: $APEX_SITE status=$HTTP_STATUS"
fi

# ── 2. Paragu-ai short alias ─────────────────────────────
log "Checking short alias ($SITE)..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$SITE" 2>/dev/null || echo "000")
if [ "$HTTP_STATUS" = "200" ]; then
  log "Alias HTTP OK ($HTTP_STATUS)"
else
  alert "Alias HTTP failed: $SITE status=$HTTP_STATUS"
fi

# ── 3. Key pages (en + es + nl + de) ────────────────────
PAGES=(
  "/en" "/en/about" "/en/services" "/en/faq" "/en/blog" "/en/contact"
  "/es" "/es/servicios" "/es/contacto" "/es/blog" "/es/preguntas-frecuentes"
  "/nl" "/de"
  "/sitemap.xml" "/robots.txt" "/api/health"
)
for path in "${PAGES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "${APEX_SITE}${path}" 2>/dev/null || echo "000")
  if [ "$STATUS" != "200" ] && [ "$STATUS" != "301" ] && [ "$STATUS" != "302" ] && [ "$STATUS" != "304" ]; then
    alert "Page ${path} returned $STATUS"
  fi
done
log "Page checks complete"

# ── 4. Swarm service health (only when docker is local) ──
if command -v docker >/dev/null 2>&1; then
  if docker service ls --format '{{.Name}}' 2>/dev/null | grep -q '^nexa-paraguay_web$'; then
    log "Checking Swarm service nexa-paraguay_web..."
    REPLICAS=$(docker service ls --format '{{.Replicas}}' --filter name=nexa-paraguay_web 2>/dev/null | head -1 || echo "0/0")
    log "Swarm replicas: $REPLICAS"
    if [[ "$REPLICAS" == 0/* ]]; then
      alert "Swarm service nexa-paraguay_web has 0 replicas running"
    fi
  else
    log "Swarm service check skipped (service not on this host)"
  fi
else
  log "Swarm service check skipped (no docker CLI on this host)"
fi

# ── 5. Supabase connectivity ─────────────────────────────
if [ -n "$SB_URL" ] && [ -n "$SB_KEY" ]; then
  log "Checking Supabase..."
  SB_RES=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "apikey: $SB_KEY" \
    -H "Authorization: Bearer ***" \
    --max-time 10 \
    "${SB_URL}/rest/v1/?limit=1" 2>/dev/null || echo "000")
  if [ "$SB_RES" = "200" ]; then
    log "Supabase OK"
  else
    alert "Supabase returned $SB_RES"
  fi
else
  log "Supabase check skipped (no env)"
fi

# ── 6. Critical static assets ────────────────────────────
CRITICAL_IMAGES=(
  "/images/brand/favicon.webp"
  "/images/brand/logo.svg"
  "/favicon.ico"
)
for img in "${CRITICAL_IMAGES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 8 "${APEX_SITE}${img}" 2>/dev/null || echo "000")
  if [ "$STATUS" != "200" ] && [ "$STATUS" != "304" ]; then
    alert "Asset ${img} returned $STATUS"
  fi
done
log "Asset checks complete"

# ── 7. Health endpoint ───────────────────────────────────
HEALTH_BODY=$(curl -s --max-time 8 "${APEX_SITE}/api/health" 2>/dev/null || echo "")
if ! echo "$HEALTH_BODY" | grep -q '"status":"ok"'; then
  alert "Health endpoint did not return ok: ${HEALTH_BODY:0:200}"
fi

# ── Summary ──────────────────────────────────────────────
if $OK; then
  log "Health check PASSED — all systems nominal"
  : > "$ALERT_FILE"
  exit 0
fi

log "Health check FAILED — alerts written to $ALERT_FILE"

# Slack notification
if [ -n "$SLACK_WEBHOOK" ]; then
  ALERTS=$(tail -c 3500 "$ALERT_FILE")
  PAYLOAD=$(printf '{"text": "🚨 *Nexa Paraguay Health Alert*\n%s\n```%s```"}' "$(date -u)" "$ALERTS")
  curl -s -X POST "$SLACK_WEBHOOK" \
    -H 'Content-Type: application/json' \
    -d "$PAYLOAD" > /dev/null 2>&1 || true
fi

# Email notification
if [ -n "$ALERT_EMAIL" ] && command -v mail >/dev/null 2>&1; then
  ALERTS=$(cat "$ALERT_FILE")
  echo -e "Nexa Paraguay health alert at $(date)\n\n$ALERTS" | \
    mail -s "🚨 Nexa Paraguay health check failed" "$ALERT_EMAIL" 2>/dev/null || true
fi

exit 1
