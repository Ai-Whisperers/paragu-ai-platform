#!/bin/bash
# Backup automation for site-template
# Usage: ./scripts/backup.sh
# Environment variables:
#   BACKUP_DIR        — backup destination (default: /tmp/backups)
#   SUPABASE_DB_URL  — Postgres connection string for pg_dump
#   B2_ACCOUNT_ID    — Backblaze B2 account ID
#   B2_APP_KEY       — Backblaze B2 application key
#   B2_BUCKET        — B2 bucket name
#   RSYNC_DEST       — rsync destination (user@host:/path)
#   BACKUP_RETENTION_DAYS — days to keep local backups (default: 7)
#   GPG_KEY          — GPG key ID for encryption (optional)

set -euo pipefail

LOG() { echo "[$(date +%Y-%m-%dT%H:%M:%S%z)] $*" | tee -a "$LOG_FILE" >&2; }
WARN() { echo "[$(date +%Y-%m-%dT%H:%M:%S%z)] WARN: $*" | tee -a "$LOG_FILE" >&2; }
ERROR() { echo "[$(date +%Y-%m-%dT%H:%M:%S%z)] ERROR: $*" | tee -a "$LOG_FILE" >&2; exit 2; }

BACKUP_DIR="${BACKUP_DIR:-/tmp/backups}"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"
LOG_FILE="${BACKUP_DIR}/backup.log"
DATE=$(date +%Y%m%d-%H%M%S)
TIMESTAMP=$(date -Iseconds)
CONTENT_BACKUP="${BACKUP_DIR}/content-${DATE}.tar.gz"
DB_BACKUP="${BACKUP_DIR}/database-${DATE}.sql.gz"

mkdir -p "$BACKUP_DIR"

# Content JSON backup
LOG "Starting backup run — content archive"
if tar -czf "$CONTENT_BACKUP" -C /home/ai-whisperers/site-template content/ 2>/dev/null; then
  LOG "Content backed up: ${CONTENT_BACKUP} ($(du -h "$CONTENT_BACKUP" | cut -f1))"
else
  WARN "Content backup failed — continuing"
fi

# Environment file backup (encrypted if GPG_KEY set)
ENV_SRC="/home/ai-whisperers/site-template/.env"
ENV_BACKUP="${BACKUP_DIR}/env-${DATE}.bak"
if [[ -f "$ENV_SRC" ]]; then
  if [[ -n "${GPG_KEY:-}" ]]; then
    gpg --encrypt --recipient "$GPG_KEY" -o "${ENV_BACKUP}.gpg" "$ENV_SRC" 2>/dev/null && LOG "Env backed up (encrypted): ${ENV_BACKUP}.gpg" || WARN "GPG encryption failed"
  else
    cp "$ENV_SRC" "$ENV_BACKUP" && LOG "Env backed up (unencrypted): ${ENV_BACKUP}"
  fi
else
  WARN ".env not found at ${ENV_SRC} — skipping"
fi

# Database backup
if [[ -n "${SUPABASE_DB_URL:-}" ]]; then
  LOG "Starting DB backup via pg_dump"
  if command -v pg_dump >/dev/null 2>&1; then
    if PGPASSWORD="${SUPABASE_DB_URL##*@}" pg_dump -h "${SUPABASE_DB_URL%%@*}" -U "${SUPABASE_DB_URL%%:*}" -d postgres 2>/dev/null | gzip -c > "$DB_BACKUP"; then
      LOG "DB backed up: ${DB_BACKUP} ($(du -h "$DB_BACKUP" | cut -f1))"
    else
      WARN "pg_dump failed — continuing"
    fi
  else
    WARN "pg_dump not installed — skipping DB backup"
  fi
fi

# Upload to Backblaze B2
if [[ -n "${B2_ACCOUNT_ID:-}" && -n "${B2_APP_KEY:-}" && -n "${B2_BUCKET:-}" ]]; then
  LOG "Uploading to Backblaze B2 bucket: ${B2_BUCKET}"
  if command -v b2 >/dev/null 2>&1; then
    B2_AUTH=$(curl -s -u "${B2_ACCOUNT_ID}:${B2_APP_KEY}" https://api.backblazeb2.com/b2api/v2/b2_authorize_account)
    API_URL=$(echo "$B2_AUTH" | python3 -c "import sys,json; print(json.load(sys.stdin)['apiUrl'])" 2>/dev/null || echo "")
    AUTH_TOKEN=$(echo "$B2_AUTH" | python3 -c "import sys,json; print(json.load(sys.stdin)['authorizationToken'])" 2>/dev/null || echo "")
    if [[ -n "$API_URL" && -n "$AUTH_TOKEN" ]]; then
      for f in "$CONTENT_BACKUP" "$DB_BACKUP" "$ENV_BACKUP"*; do
        [[ -f "$f" ]] || continue
        FILE_NAME="site-template/$(basename "$f")"
        UPLOAD_URL=$(curl -s -H "Authorization: ${AUTH_TOKEN}" "${API_URL}/b2api/v2/b2_get_upload_url?bucketId=${B2_BUCKET}" | python3 -c "import sys,json; print(json.load(sys.stdin)['uploadUrl'])" 2>/dev/null || echo "")
        if [[ -n "$UPLOAD_URL" ]]; then
          SHA1=$(openssl sha1 -hmac "placeholder" "$f" 2>/dev/null | cut -d' ' -f2 || echo "0000000000000000000000000000000000000000")
          curl -s -X POST -H "Authorization: ${AUTH_TOKEN}" -H "Content-Type: text/plain" -H "X-Bz-File-Name: ${FILE_NAME}" -H "X-Bz-Info-Author: site-template-backup" --data-binary "@${f}" "${UPLOAD_URL}" >/dev/null 2>&1 && LOG "Uploaded to B2: ${FILE_NAME}" || WARN "B2 upload failed: ${FILE_NAME}"
        fi
      done
    fi
  else
    WARN "b2 CLI not installed — skipping B2 upload"
  fi
fi

# Upload via rsync
if [[ -n "${RSYNC_DEST:-}" ]]; then
  LOG "Rsyncing to ${RSYNC_DEST}"
  RSYNC_PASSWORD="${RSYNC_PASSWORD:-}" command -v rsync >/dev/null 2>&1 && \
    rsync -av --password-file=<(echo "$RSYNC_PASSWORD") "$BACKUP_DIR/"/*.gz "$RSYNC_DEST/" 2>/dev/null && LOG "Rsync complete" || WARN "rsync failed"
fi

# Cleanup old backups
LOG "Cleaning up backups older than ${RETENTION_DAYS} days"
find "$BACKUP_DIR" -name "content-*.tar.gz" -mtime "+${RETENTION_DAYS}" -delete 2>/dev/null || true
find "$BACKUP_DIR" -name "database-*.sql.gz" -mtime "+${RETENTION_DAYS}" -delete 2>/dev/null || true
find "$BACKUP_DIR" -name "env-*.bak*" -mtime "+${RETENTION_DAYS}" -delete 2>/dev/null || true

BACKUP_COUNT=$(find "$BACKUP_DIR" \( -name "content-*.tar.gz" -o -name "database-*.sql.gz" -o -name "env-*.bak*" \) -mtime "-${RETENTION_DAYS}" 2>/dev/null | wc -l)
LOG "Backup run complete. ${BACKUP_COUNT} backup files retained in ${BACKUP_DIR}"

exit 0