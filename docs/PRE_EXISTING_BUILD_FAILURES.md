# Pre-existing build failures in paragu-ai-platform

**Date discovered:** 2026-06-15
**Method:** ran `pnpm --filter=<app> build` for 5 representative apps BEFORE the stale-package refresh.
**Result:** 4 of 5 build clean. 1 has a pre-existing failure unrelated to package versions.

## apps/golden-visa-advisory

**Error:**
```
./src/app/page.tsx:6:54
Type error: Cannot find module '@/components/truststrip' or its corresponding type declarations.

  4 | import { InvestorLanding } from '@/components/InvestorLanding'
  5 | import { BusinessLanding } from '@/components/BusinessLanding'
> 6 | import { TrustStrip, TRUST_ITEMS_PROFESSIONAL } from "@/components/truststrip"
```

**Root cause:** `src/app/page.tsx` imports from `@/components/truststrip` (singular, no extension), but the actual file is at `apps/golden-visa-advisory/components/truststrip.tsx` (not under `src/components/`). The `@/` alias likely resolves to `src/`, so the import misses.

**Fix (mechanical):** Either move `components/truststrip.tsx` → `src/components/truststrip.tsx`, or fix the import path to `../components/truststrip` (relative). Recommend the latter (smaller diff).

**Status:** Not deployed to production per the platform README's app table (golden-visa may already be live at `goldenvisa.paragu-ai.com` — needs separate check).

## 4 apps that build clean (baseline)

- `bichos-gym` — Pages Router, builds clean
- `magnolia-peluqueria` — App Router, builds clean
- `fun4me` — App Router with [locale], builds clean
- `stroopwafel-huis` — App Router, builds clean
