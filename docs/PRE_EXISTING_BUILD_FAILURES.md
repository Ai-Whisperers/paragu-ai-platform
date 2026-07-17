# Pre-existing build failures in paragu-ai-platform

**Date discovered:** 2026-06-15
**Method:** ran `pnpm --filter=<app> build` for 5 representative apps BEFORE the stale-package refresh.
**Result:** 4 of 5 build clean. 1 had a pre-existing failure unrelated to package versions.

## apps/golden-visa-advisory — RESOLVED (2026-07-17)

**Original error:**
```
./src/app/page.tsx:6:54
Type error: Cannot find module '@/components/truststrip' or its corresponding type declarations.
```

**Original root cause:** `src/app/page.tsx` imported `@/components/truststrip` but the file lived at `components/truststrip.tsx` (top-level, outside `@/` alias root of `src/`).

**Resolution:** `truststrip.tsx` now lives at `src/components/truststrip.tsx`. `node_modules/.bin/tsc --noEmit` exits 0 on the app.

**Note on top-level `components/`:** `apps/golden-visa-advisory/components/analytics.tsx` remains — it is imported by `src/app/layout.tsx` via relative path `../../components/analytics`, so no alias issue. Leave it in place.

## 4 apps that build clean (baseline)

- `bichos-gym` — Pages Router, builds clean
- `magnolia-peluqueria` — App Router, builds clean
- `fun4me` — App Router with [locale], builds clean
- `stroopwafel-huis` — App Router, builds clean
