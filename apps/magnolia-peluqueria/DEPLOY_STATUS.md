# Magnolia Peluquería — Estado actual (post-deploy)

## Features

| Feature | Status | Producción |
|---------|--------|-----------|
| Booking + WhatsApp | ✅ Listo | ✅ |
| Blog (3 posts reales) | ✅ LIVE 2026-05-28 | ✅ |
| Gift cards (UI + API) | ⚠️ Stripe keys needed | ❌ |
| Instagram feed | ⚠️ Meta token needed | ❌ |
| Loyalty UI | ⚠️ Logic pending | ❌ |
| Sitemap (18 URLs) | ✅ LIVE | ✅ |
| i18n (es/en) | ✅ | ✅ |
| Security headers | ✅ CSP, HSTS, XFO | ✅ |

## Build issues fixed (5 blockers)

| # | Issue | Fix |
|---|-------|-----|
| 1 | Regex `/gs` flag → ES2018 required | Changed to `[\s\S]*?` with `/g` |
| 2 | Loyalty items type error | Added `as const` to tuple array |
| 3 | Missing `stripe` package | `npm install stripe` |
| 4 | Stripe API version too old | Updated `2024-04-10` → `2026-05-27.dahlia` |
| 5 | Missing `amountGs` field | Added numeric value to `es.json` |
| 6 | `Instagram` icon not in lucide 1.14 | Replaced with inline SVG |
| 7 | `onClick` in server component | Extracted `CopyLinkButton` client component |
| 8 | Sitemap used ESM `require()` | Rewrote with direct JSON imports |

## Next deployments

```bash
# Rebuild + force update:
cd /root/magnolia-peluqueria
docker build -t magnolia-peluqueria:prod .
docker service update --image magnolia-peluqueria:prod --force magnolia-peluqueria_web
```

## Client still needs to provide
1. Stripe keys (gift cards)
2. Meta token (Instagram feed)
3. More blog content (optional)
