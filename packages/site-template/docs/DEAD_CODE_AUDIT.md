# Dead Code & Orphan Audit

**Project:** site-template
**Date:** 2026-06-02
**Auditor:** Agent Sisyphus

---

## Orphan Directories

### app/producto/

| Attribute | Value |
|-----------|-------|
| **Status** | ORPHAN |
| **Files** | `[slug]/page.tsx` |
| **Purpose** | Spanish-language individual product detail pages (e-commerce) |
| **Referenced from** | NONE — no grep match for `/producto` in any source, config, or navigation |
| **Evidence** | `grep -r "/producto"` returns 0 matches in source code |
| **Recommendation** | **DELETE** — No navigation links to this route. The `generateStaticParams()` returns empty array. Placeholder only. If e-commerce is needed, it should live under `app/[lang]/tienda/[slug]/` with proper i18n routing. |

### app/blog/ (root level)

| Attribute | Value |
|-----------|-------|
| **Status** | ACTIVE (legacy redirect) |
| **Files** | `page.tsx` |
| **Purpose** | Redirects `/blog` → `/es/blog` for backward compatibility |
| **Referenced from** | None (external links from old bookmarks) |
| **Evidence** | `app/blog/page.tsx` contains `redirect('/es/blog')` |
| **Recommendation** | **KEEP** — Intentional backward-compat redirect for old links. Low maintenance. |

### app/tienda/

| Attribute | Value |
|-----------|-------|
| **Status** | ACTIVE (placeholder) |
| **Files** | `page.tsx` |
| **Purpose** | Hardcoded Spanish e-commerce store listing page |
| **Used by** | `app/producto/[slug]/page.tsx` (link back from product detail) |
| **Evidence** | Link: `href="/tienda"` in producto placeholder |
| **Recommendation** | **KEEP** — Part of the site template. If not needed, disable via `features.ecommerce: false` in site.json |

### app/tiendas/

| Attribute | Value |
|-----------|-------|
| **Status** | ACTIVE (placeholder) |
| **Files** | `page.tsx` |
| **Purpose** | Store locator / branch listing page |
| **Referenced from** | None in source code |
| **Evidence** | Standalone page, no links found from navigation |
| **Recommendation** | **KEEP** — Part of the site template. Rename to `app/[lang]/sucursales/` for i18n consistency if used. |

### app/promociones/

| Attribute | Value |
|-----------|-------|
| **Status** | ACTIVE (placeholder) |
| **Files** | `page.tsx` |
| **Purpose** | Spanish promotions page (hardcoded es) |
| **Referenced from** | None in source code |
| **Evidence** | Standalone page, no links found |
| **Note** | `app/[lang]/ofertas/` exists as the i18n equivalent — potential duplicate |
| **Recommendation** | **MERGE OR DELETE** — Duplicates `app/[lang]/ofertas/`. The root-level hardcoded `es` version should either be removed (preferring the i18n version) or removed if unused. |

---

## Unused Routes

### app/api/admin/products/route.ts

| Attribute | Value |
|-----------|-------|
| **Status** | ORPHAN |
| **Files** | `route.ts` (11 lines) |
| **Purpose** | Admin product management |
| **Used by** | NONE in source code |
| **Evidence** | `grep -r "api/admin/products"` returns no matches outside this file |
| **Actual content** | Placeholder — `GET` returns "not implemented", no other handlers |
| **Note** | `app/api/products/route.ts` has the actual implementation |
| **Recommendation** | **DELETE** — Empty placeholder. If admin product management is needed, implement properly or extend `app/api/products/route.ts` with admin auth. |

### app/api/products/route.ts

| Attribute | Value |
|-----------|-------|
| **Status** | ACTIVE |
| **Purpose** | Public product listing API |
| **Used by** | `app/api/admin/products/route.ts` (placeholder stub), potential frontend use |
| **Recommendation** | **KEEP** — Has actual implementation |

---

## lib/client-kit Analysis

**Important finding:** The `lib/client-kit/` directory is a shared library module that is **NOT imported by any source code** in this repository. It appears in `package.json` (as a dependency reference), `package-lock.json`, and test/documentation files, but no `.ts`/`.tsx` source files actually import from it.

### lib/client-kit/analytics/

| Attribute | Value |
|-----------|-------|
| **Purpose** | Google Analytics 4 integration (GA4 script injection + `trackEvent`) |
| **Exports** | `Analytics()` component, `trackEvent()` function |
| **Used by** | **NONE** in source code |
| **Note** | `"use client"` directive present. Global `window.gtag` type augmentation |
| **Recommendation** | **KEEP** — This is a shared library module (published as `@ai-whisperers/client-kit`). The site uses `components/analytics.tsx` instead (local implementation). Either use this module or remove it from the monorepo. |

### lib/client-kit/db/

| Attribute | Value |
|-----------|-------|
| **Purpose** | Generic fetch-based CRUD operations for client API routes |
| **Exports** | `crud` object (list/get/create/update/remove), `createCrudRoutes()` function |
| **Used by** | **NONE** in source code |
| **Note** | References `/api/db/` endpoint which does not exist |
| **Recommendation** | **KEEP AS ISOLATED LIBRARY** — This is a reusable CRUD abstraction. If not used, it can stay as a library module. The `/api/db/` endpoint it expects would need to be implemented. |

### lib/client-kit/payment/

| Attribute | Value |
|-----------|-------|
| **Purpose** | Payment gateway adapter registry |
| **Exports** | `PaymentRequest`, `GatewayResult`, `GatewayAdapter` interfaces; `registerGateway()`, `getGateway()`, `getRegisteredGateways()` |
| **Used by** | **NONE** in source code |
| **Recommendation** | **KEEP AS ISOLATED LIBRARY** — Gateway registry pattern. No runtime cost if not instantiated. |

### lib/client-kit/seo/

| Attribute | Value |
|-----------|-------|
| **Purpose** | JSON-LD schema generators for structured data |
| **Exports** | `JsonLd`, `storeSchema`, `faqSchema`, `articleSchema`, `breadcrumbSchema`, `productSchema` |
| **Used by** | **NONE** in source code (only `tests/unit/client-kit-seo.test.ts`) |
| **Evidence** | `grep -r "client-kit/seo\|from.*client-kit.*seo"` returns nothing in source |
| **Recommendation** | **AUDIT** — Either wire this into the SEO components (`app/[lang]/*/page.tsx` files) or remove to prevent bitrot. |

### lib/client-kit/storage/keys.ts

| Attribute | Value |
|-----------|-------|
| **Purpose** | Single source of truth for localStorage and cookie key names |
| **Exports** | `STORAGE_KEYS`, `COOKIE_KEYS` constants |
| **Used by** | **NONE** in source code |
| **Recommendation** | **AUDIT** — Verify if localStorage/cookie keys are hardcoded elsewhere instead of using this module. If so, migrate or remove this file. |

### lib/client-kit/types/

| Attribute | Value |
|-----------|-------|
| **Purpose** | Shared TypeScript interfaces |
| **Exports** | `CartItem`, `SiteContent` |
| **Used by** | **NONE** in source code |
| **Recommendation** | **AUDIT** — Check if these types duplicate types defined elsewhere in the codebase. |

### lib/client-kit/ui/

| Attribute | Value |
|-----------|-------|
| **Purpose** | Shared UI components |
| **Files** | `error-boundary.tsx`, `loading-bar.tsx`, `skeleton.tsx`, `whatsapp-float.tsx` |
| **Exports** | `ErrorBoundary`, `LoadingBar`, `Skeleton`, `ProductCardSkeleton`, `WhatsAppFloat` |
| **Used by** | **NONE** in source code — site uses `components/` equivalents instead |
| **Note** | `components/whatsapp-float.tsx` exists and is used; this module has a duplicate |
| **Recommendation** | **AUDIT** — Deconflict with `components/` equivalents. Remove duplicates or migrate usage to client-kit. |

---

## Inconsistencies Found

### 1. Duplicate Gift Card Redeem Routes

| Route | Purpose | Auth |
|-------|---------|------|
| `app/api/gift-card/redeem/route.ts` | Public redemption (by code) | None |
| `app/api/admin/gift-cards/[id]/redeem/route.ts` | Admin redemption (by ID) | `requireAdminAuth` |

**Issue:** Two different redemption mechanisms using different field names (`balance_gs` vs `balance`, different DB column names). These may have drifted from each other.

**Recommendation:** These serve different purposes (public vs admin) so both are valid. Ensure they stay in sync functionally. The admin version uses a cleaner schema (`balance` vs `balance_gs`).

---

### 2. Mixed Language Route Naming

| Route | Language |
|-------|----------|
| `app/[lang]/booking/` | English |
| `app/[lang]/reserva/` | Spanish (redirects to booking) |
| `app/[lang]/ofertas/` | Spanish |
| `app/promociones/` | Spanish (root-level, hardcoded es) |
| `app/[lang]/nosotros/` | Spanish |
| `app/[lang]/servicios/` | Spanish |
| `app/[lang]/tarjetas-de-regalo/` | Spanish |

**Issue:** Inconsistent language convention. `[lang]/booking` is English when it should be `reserva` for a Spanish-first template. The redirect from `reserva` → `booking` adds unnecessary latency.

**Recommendation:** Standardize on Spanish for all user-facing routes (`reserva` not `booking`). Remove the `booking` directory and make `reserva` the canonical route.

---

### 3. E-commerce Routes Scattered Across Multiple Locations

| Route | Purpose |
|-------|---------|
| `app/tienda/` | Product listing (root-level, hardcoded es) |
| `app/tiendas/` | Store locator |
| `app/producto/[slug]/` | Product detail (ORPHAN — no links) |
| `app/[lang]/ofertas/` | Promotions |
| `app/promociones/` | Promotions (duplicate of ofertas) |

**Issue:** E-commerce routes are split between root-level hardcoded pages and i18n routes, with orphaned `producto/` directory and duplicate `promociones/`/`ofertas/`.

**Recommendation:** Consolidate under `app/[lang]/tienda/` (listing), `app/[lang]/tienda/[slug]/` (detail), `app/[lang]/ofertas/` (promotions only). Delete root-level duplicates and `app/producto/`.

---

### 4. Root-Level Hardcoded Spanish Pages

| Route | i18n Equivalent | Status |
|-------|------------------|--------|
| `app/tienda/page.tsx` | `app/[lang]/tienda/` (doesn't exist) | Orphaned, no i18n version |
| `app/tiendas/page.tsx` | `app/[lang]/sucursales/` (doesn't exist) | Orphaned, no i18n version |
| `app/promociones/page.tsx` | `app/[lang]/ofertas/` | Duplicate |
| `app/blog/page.tsx` | `app/[lang]/blog/` | Redirect only |

**Issue:** Root-level pages hardcoded to Spanish (`lang="es"`) bypass the i18n system. These cannot be translated.

**Recommendation:** Migrate these to `app/[lang]/` routes or remove if not needed. The template should not have hardcoded Spanish root pages for internationalizable content.

---

### 5. API Route Auth Inconsistency

| Route | Auth |
|-------|------|
| `app/api/auth/login/route.ts` | None |
| `app/api/auth/logout/route.ts` | None |
| `app/api/auth/me/route.ts` | None |
| `app/api/auth/check/route.ts` | None |
| `app/api/auth/otp/*` | None |
| `app/api/auth/admin/*` | `requireAdminAuth` |
| `app/api/admin/*` | `requireAdminAuth` |
| `app/api/stripe/*` | None (webhook uses signature verification) |
| `app/api/gift-card/webhook/route.ts` | Stripe signature only |

**Issue:** Client auth routes (`/api/auth/login`, `/api/auth/me`, etc.) have no authentication — they ARE the authentication mechanism. This is expected but worth documenting. The `check` route at `app/api/auth/check/route.ts` appears unused.

**Recommendation:** Verify `/api/auth/check` is actually used. If not, it's dead code.

---

## Symlinks

**Result:** No symlinks found in the repository.

---

## Deletion Candidates

Files/directories safe to delete (in order of confidence):

1. **`app/producto/`** — ORPHAN, no references, empty `generateStaticParams()`
2. **`app/api/admin/products/route.ts`** — Empty placeholder, actual impl in `app/api/products/route.ts`
3. **`app/promociones/`** — Duplicate of `app/[lang]/ofertas/`, hardcoded es bypasses i18n
4. **`lib/client-kit/`** (entire directory) — Not imported by any source file. If this is a published package (`@ai-whisperers/client-kit`), it belongs in a separate repo, not in this site's `lib/`

### Conditional Deletions (verify first)

- **`app/tienda/`** — Safe to delete if `features.ecommerce: false`
- **`app/tiendas/`** — Safe to delete if single-location business
- **`app/api/auth/check/route.ts`** — Verify it's not called by any client code

---

## Summary

| Category | Count |
|----------|-------|
| Orphan directories | 1 (`app/producto/`) |
| Active legacy redirects | 2 (`app/blog/`, `app/[lang]/reserva/`) |
| Duplicate/misplaced routes | 3 (`app/promociones/`, root-level Spanish pages) |
| lib/client-kit files unused in source | 9 files across 6 subdirectories |
| API orphan routes | 1 (`app/api/admin/products/route.ts`) |
| Inconsistencies identified | 5 |

**Priority Actions:**
1. Delete `app/producto/` — it's completely orphaned
2. Delete `app/api/admin/products/route.ts` — empty placeholder
3. Decide on `app/promociones/` vs `app/[lang]/ofertas/` — remove one
4. Audit `lib/client-kit/` — either wire it up or remove it
5. Standardize route naming (Spanish-first)
