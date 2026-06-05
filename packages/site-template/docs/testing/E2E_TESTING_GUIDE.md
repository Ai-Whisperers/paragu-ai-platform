# E2E Test Execution Guide

**Generated:** 2026-06-01
**For:** `tests/e2e/` Playwright suite
**Status:** Suite written but **NEVER EXECUTED**

---

## Prerequisites

### 1. Start Dev Server

```bash
# Terminal 1: Start dev server
npm run dev

# Wait for server to be ready (check output shows "Ready")
# Server will be at http://localhost:3000
```

### 2. Install Playwright Browsers (first time only)

```bash
npx playwright install chromium
```

### 3. Run the Suite

```bash
# Full suite, headless (default)
npx playwright test

# With UI (recommended for first run — see what's happening)
npx playwright test --ui

# Specific file
npx playwright test tests/e2e/admin.spec.ts

# Specific spec
npx playwright test --grep "admin login"

# With HTML report
npx playwright test --reporter=html
# View: npx playwright show-report
```

---

## Expected Failures (Baseline)

When run against the current environment (no Stripe, no Twilio, JSON fallback), these tests will **fail**. This is expected. The suite documents the gap between "app renders" and "real integrations work."

### Auth Failures
| Test | Reason | Fix |
|------|--------|-----|
| Admin OTP send | Twilio not configured | Mock `POST /api/auth/admin/send-otp` |
| Admin OTP verify | Backend returns error without Twilio | Mock OTP service |

### Payment Failures
| Test | Reason | Fix |
|------|--------|-----|
| Gift card checkout | Stripe returns `stripe_not_configured` | Mock Stripe checkout |
| Gift card success page | Payment can't be verified | Mock `/api/stripe/verify` |

### Data Failures
| Test | Reason | Fix |
|------|--------|-----|
| Admin booking list | Admin auth blocks access | Inject `admin_session` cookie |
| Admin gift card create | Admin auth blocks access | Inject `admin_session` cookie |

---

## How to Add Mocks for E2E

### Option 1: Using `mock-api.ts` helper

```typescript
import { test, expect } from "@playwright/test"
import { mockApiResponse, mockApiError } from "./helpers/mock-api"

test("gift card purchase flow with mocked Stripe", async ({ page }) => {
  // Mock Stripe checkout to return a fake success URL
  await mockApiResponse(page, "/api/stripe/checkout", {
    url: "https://checkout.stripe.com/pay/test_session_123"
  })

  // Navigate to gift card purchase
  await page.goto("/es/tarjetas-de-regalo/comprar")

  // Select tier and fill form...
  await page.click("[data-testid='tier-plata']")
  await page.fill("input[name='recipientEmail']", "test@example.com")

  // Click pay — should redirect to mocked Stripe
  await page.click("[data-testid='pay-button']")
  await expect(page).toHaveURL(/checkout\.stripe\.com/)
})
```

### Option 2: Using `auth.ts` cookie injection

```typescript
import { test, expect } from "@playwright/test"
import { setAdminSessionCookie } from "./helpers/auth"

test("admin gift cards page with auth", async ({ page }) => {
  // Inject admin session cookie
  await setAdminSessionCookie(page, "595981000000")

  // Navigate to admin gift cards
  await page.goto("/admin/gift-cards")

  // Should see the gift cards list (not login page)
  await expect(page).toHaveURL(/\/admin\/gift-cards/)
  await expect(page.locator("table")).toBeVisible()
})
```

---

## Page Object Quick Reference

### PublicPages — Spanish (default)
```typescript
import { PublicPages } from "./pages/public-pages"

const pages = new PublicPages(page, "es") // or "en"
await pages.gotoHome()
await pages.gotoContact()
await pages.gotoNosotros()
await pages.gotoOfertas()
await pages.gotoFAQ()
await pages.gotoServicios()
await pages.gotoTarjetasDeRegalo()
await pages.gotoBlog()
await pages.fillBookingForm({ clientName: "...", phone: "...", service: "..." })
await pages.fillContactForm({ name: "...", email: "...", message: "..." })
```

### AdminPages
```typescript
import { AdminPages } from "./pages/admin-pages"

const pages = new AdminPages(page)
await pages.gotoLogin()
await pages.gotoDashboard()
await pages.gotoBookings()
await pages.gotoGiftCards()
await pages.gotoContent()
await pages.gotoPromotions()
await pages.assertLoginPageVisible()
await pages.assertPhoneInputVisible()
await pages.fillLoginForm("595981000000")
```

### InteractivePages
```typescript
import { InteractivePages } from "./pages/interactive-pages"

const ip = new InteractivePages(page)
await ip.gotoBooking()
await ip.gotoContact()
await ip.gotoGiftCardPurchase()
await ip.gotoAdminLogin()
await ip.clickPay()
```

### BookingFlow
```typescript
import { BookingFlow } from "./pages/booking-flow"

const flow = new BookingFlow(page)
await flow.gotoBookingPage()
await flow.fillStep1({ name: "...", phone: "...", service: "..." })
await flow.fillStep2({ date: "2026-06-15", time: "10:00" })
await flow.clickNext()
await flow.clickSubmit()
await flow.assertConfirmationVisible()
```

### GiftCardFlow
```typescript
import { GiftCardFlow } from "./pages/gift-card-flow"

const flow = new GiftCardFlow(page)
await flow.gotoPurchasePage()
await flow.selectTier("Plata")
await flow.fillRecipient({ name: "...", email: "...", phone: "..." })
await flow.clickPay()
await flow.assertStripeRedirect()
```

---

## Writing New E2E Tests

### Pattern 1: Page Smoke Test
```typescript
import { test, expect } from "@playwright/test"
import { PublicPages } from "./pages/public-pages"

test("page name renders without error", async ({ page }) => {
  const pages = new PublicPages(page, "es")
  await pages.gotoPageRoute()
  await pages.assertBodyNonEmpty()
})
```

### Pattern 2: Form Submission
```typescript
test("form submits successfully", async ({ page }) => {
  await page.goto("/es/contacto")

  // Fill form using labels
  await page.getByLabel(/Nombre/i).fill("Test User")
  await page.getByLabel(/Email/i).fill("test@example.com")
  await page.getByLabel(/Mensaje/i).fill("Test message")

  // Submit
  await page.getByRole("button", { name: /Enviar/i }).click()

  // Assert success
  await expect(page.locator(".success-message, [data-testid='success']")).toBeVisible()
})
```

### Pattern 3: Auth-Protected Page
```typescript
import { setAdminSessionCookie } from "./helpers/auth"

test("admin page accessible with session", async ({ page }) => {
  await setAdminSessionCookie(page, "595981000000")
  await page.goto("/admin/gift-cards")
  await expect(page.locator("h1")).toContainText("Tarjetas")
})
```

### Pattern 4: Error Handling
```typescript
import { mockApiError } from "./helpers/mock-api"

test("shows error when API fails", async ({ page }) => {
  await mockApiError(page, "/api/booking", 500, "Server error")

  await page.goto("/es/reserva")
  await page.getByRole("button", { name: /Reservar/i }).click()

  await expect(page.locator("text=Error")).toBeVisible()
})
```

---

## CI Integration

```yaml
# .github/workflows/e2e.yml
name: E2E Tests

on:
  push:
    branches: [main]
  pull_request:

jobs:
  e2e:
    timeout-minutes: 30
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Start server
        run: npm run dev &
        env:
          NODE_ENV: test
        wait-on: url: http://localhost:3000
        timeout: 60000

      - name: Run E2E tests
        run: npx playwright test --reporter=html

      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Debugging E2E Failures

### Run single test with browser visible
```bash
npx playwright test tests/e2e/admin.spec.ts --headed
```

### Pause test at failure point
```bash
npx playwright test --debug
```

### Check console errors
```typescript
test("no console errors on page load", async ({ page }) => {
  const errors: string[] = []
  page.on("console", msg => {
    if (msg.type() === "error") errors.push(msg.text())
  })
  await page.goto("/es/")
  expect(errors).toHaveLength(0)
})
```

### Trace test execution
```bash
npx playwright test --trace on-first-retry
# View traces: npx playwright show-trace
```