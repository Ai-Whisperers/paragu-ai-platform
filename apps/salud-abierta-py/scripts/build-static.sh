#!/bin/bash
# Build for static export (GitHub Pages fallback).
# Temporarily moves src/app/api out of the way, then restores it.
set -e

cd "$(dirname "$0")/.."

API_DIR="src/app/api"
API_BACKUP=".api-backup-temp"

if [ -d "$API_DIR" ] && [ ! -d "$API_BACKUP" ]; then
    mv "$API_DIR" "$API_BACKUP"
    RESTORED=0
else
    RESTORED=1
fi

# Also remove API routes from any other location if present
trap 'if [ "$RESTORED" = "0" ] && [ -d "$API_BACKUP" ]; then mv "$API_BACKUP" "$API_DIR"; fi' EXIT

echo "→ Building static export..."
NEXT_BUILD_TARGET=export ./node_modules/.bin/next build 2>&1 | tail -8

echo "→ Generating assets..."
python3 scripts/generate-assets.py
python3 scripts/generate-sitemap.py

echo "→ Restoring API routes..."
if [ "$RESTORED" = "0" ] && [ -d "$API_BACKUP" ]; then
    mv "$API_BACKUP" "$API_DIR"
fi
trap - EXIT
echo "✓ Static build complete"
