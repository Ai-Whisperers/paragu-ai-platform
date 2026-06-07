# Multi-location model extension

Single repo deploy pattern: subdomain or locale per location.

## Content extension
Add location blocks in `content/es/site.json` and `content/en/site.json`.

## Routes
- `/l/{slug}` for public locations
- `/l/{slug}/booking` for location booking

## Data
- Reuse `_shared/services.json`
- Add location-specific `hours`, `address`, `phone` per block

## Future state
Each location gets its own token set when scaling beyond 5.
