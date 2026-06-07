# lib/client-kit Documentation

## Overview
Internal/shared utilities for client site template. Provides analytics, payment gateway registry, SEO helpers, UI components, and type definitions used across all client sites.

## Sub-modules

### analytics/
**File:** `analytics/index.ts`
**Exports:** `Analytics` component, `trackEvent` function
**Purpose:**
- `Analytics()` - Client component that loads Google Analytics GA4 script dynamically. Reads `NEXT_PUBLIC_GA_ID` env var. Uses `useEffect` to inject gtag.js script on mount. Returns null (renderless).
- `trackEvent(action, params?)` - Wrapper around `window.gtag('event', ...)` for tracking custom events. Silent fail if gtag unavailable.

**Usage:**
```tsx
import { Analytics, trackEvent } from "@/lib/client-kit"

// In layout or page component
<Analytics />

// Track custom event
trackEvent("purchase", { currency: "PYG", value: 50000 })
```

### db/
**File:** `db/index.ts`
**Exports:** `crud` object, `createCrudRoutes` function
**Purpose:** Generic fetch-based CRUD operations against `/api/db/<table>` endpoints.
- `crud.list<T>(table, search?)` - GET list with optional search
- `crud.get<T>(table, id)` - GET single record
- `crud.create<T>(table, data)` - POST new record
- `crud.update<T>(table, id, data)` - PUT update record
- `crud.remove(table, id)` - DELETE record
- `createCrudRoutes(table, searchFields?)` - Factory for Next.js API route handlers (GET/POST/PUT/DELETE)

**Usage:**
```typescript
import { crud } from "@/lib/client-kit"

const { data: bookings } = await crud.list<Booking>("bookings", "Juan")
const booking = await crud.get<Booking>("bookings", "123")
```

### payment/
**File:** `payment/index.ts`
**Exports:** `PaymentRequest`, `GatewayResult`, `GatewayAdapter` interfaces; `registerGateway`, `getGateway`, `getRegisteredGateways` functions
**Purpose:** Pluggable payment gateway registry. Adapters (Stripe, MercadoPago, etc.) register themselves; the site uses `getGateway(name)` to process payments.
- `GatewayAdapter` - Interface with `name` and `processPayment(req: PaymentRequest): Promise<GatewayResult>`
- `registerGateway(adapter)` - Register a payment adapter
- `getGateway(name)` - Retrieve registered adapter
- `getRegisteredGateways()` - List all registered gateway names

**Usage:**
```typescript
import { registerGateway, getGateway } from "@/lib/client-kit"

registerGateway({ name: "stripe", processPayment: async (req) => { ... } })
const gateway = getGateway("stripe")
```

### seo/
**File:** `seo/index.ts`
**Exports:** `JsonLd` component, `storeSchema`, `faqSchema`, `articleSchema`, `breadcrumbSchema`, `productSchema`
**Purpose:** SEO helpers for JSON-LD structured data (Google rich results).
- `JsonLd({ data })` - Renders `<script type="application/ld+json">` with given data
- `storeSchema(name, desc, url, phone)` - Store schema.org JSON-LD
- `faqSchema([{question, answer}])` - FAQPage schema.org JSON-LD
- `articleSchema(title, desc, date, author)` - Article schema.org JSON-LD
- `breadcrumbSchema([{name, url}])` - BreadcrumbList schema.org JSON-LD
- `productSchema(name, desc, price, currency, url, image?)` - Product schema.org JSON-LD

**Usage:**
```tsx
import { JsonLd, faqSchema } from "@/lib/client-kit"

const faq = faqSchema([{ question: "Hours?", answer: "9-5" }])
<JsonLd data={faq} />
```

### storage/
**File:** `storage/keys.ts`
**Exports:** `STORAGE_KEYS`, `COOKIE_KEYS` constants
**Purpose:** Single source of truth for localStorage and cookie key names to avoid typos/inconsistencies.

**STORAGE_KEYS:**
- `CURRENCY`, `LANG`, `FAVORITES`, `FAVORITES_USER(userId)`, `CART`, `CART_SAVED`, `CART_ACTIVITY`, `CART_REMINDER`, `PROMOS`, `DARK_MODE`

**COOKIE_KEYS:**
- `CURRENCY`, `LANG`

**Usage:**
```typescript
import { STORAGE_KEYS, COOKIE_KEYS } from "@/lib/client-kit"

localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart))
```

### types/
**File:** `types/index.ts`
**Exports:** `CartItem`, `SiteContent` interfaces
**Purpose:** Shared types for all client sites.
- `CartItem` - `{ name, price, priceGs, quantity, imageUrl?, category?, priceBefore? }`
- `SiteContent` - `{ siteName, navigation, home, faq?, whatsapp?, analytics?, [key: string]: any }`

### ui/
**Files:** `skeleton.tsx`, `whatsapp-float.tsx`, `error-boundary.tsx`, `loading-bar.tsx`

**Skeleton exports:**
- `Skeleton({ className? })` - Pulse-animated gray div for loading placeholders
- `ProductCardSkeleton()` - Pre-styled skeleton for product cards (image + 2 text lines)

**WhatsAppFloat exports:**
- `WhatsAppFloat({ number, message? })` - Fixed-position floating WhatsApp button linking to `wa.me/number?text=message`. Strips non-numeric chars from number. Green circle with WhatsApp SVG icon.

**ErrorBoundary exports:**
- `ErrorBoundary` class component - React error boundary with optional fallback. Default fallback shows "Algo salió mal" message with Recargar button that reloads page. State: `{ hasError, error }`.

**LoadingBar exports:**
- `LoadingBar()` - Client component showing top-fixed 1px blue pulse bar on `beforeunload` (after 300ms delay) until `load` event. Hidden by default (only shows during navigation).

## Usage

```typescript
// Full barrel import
import {
  STORAGE_KEYS, COOKIE_KEYS,
  Analytics, trackEvent,
  JsonLd, storeSchema, faqSchema, articleSchema, breadcrumbSchema, productSchema,
  ErrorBoundary,
  WhatsAppFloat,
  Skeleton, ProductCardSkeleton,
  LoadingBar,
  registerGateway, getGateway, getRegisteredGateways,
  PaymentRequest, GatewayResult, GatewayAdapter,
  crud, createCrudRoutes,
  CartItem, SiteContent,
} from "@/lib/client-kit"
```

## Environment Variables

| Variable | Used By | Purpose |
|----------|---------|--------|
| `NEXT_PUBLIC_GA_ID` | analytics | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_API_URL` | db | Base URL for CRUD API calls |
| `NEXT_PUBLIC_BASE_URL` | seo | Base URL for absolute URL generation in schemas |
