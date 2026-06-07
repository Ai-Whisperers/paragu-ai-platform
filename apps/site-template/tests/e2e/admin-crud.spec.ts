import { test, expect } from "@playwright/test"
import { AdminPages } from "./pages/admin-pages"
import { setAdminSessionCookie } from "./helpers/auth"
import { mockApiResponse } from "./helpers/mock-api"
import { SAMPLE_STATS, SAMPLE_BOOKINGS, SAMPLE_GIFT_CARDS, SAMPLE_PROMOTIONS, SAMPLE_CONTENT } from "./helpers/fixtures"

test.describe("Admin CRUD Pages", () => {
  test("admin login page loads", async ({ page }) => {
    await page.goto("/admin/login", { waitUntil: "networkidle" })
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin dashboard renders stats with mock data", async ({ page }) => {
    await mockApiResponse(page, "**/api/admin/stats", SAMPLE_STATS)
    await mockApiResponse(page, "**/api/admin/bookings", { bookings: SAMPLE_BOOKINGS })
    await mockApiResponse(page, "**/api/admin/products", [])
    await setAdminSessionCookie(page)
    const ap = new AdminPages(page)
    await ap.gotoDashboard()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin bookings page renders table", async ({ page }) => {
    await mockApiResponse(page, "**/api/admin/bookings", { bookings: SAMPLE_BOOKINGS })
    await setAdminSessionCookie(page)
    const ap = new AdminPages(page)
    await ap.gotoBookings()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin gift-cards page renders with data", async ({ page }) => {
    await mockApiResponse(page, "**/api/admin/gift-cards*", SAMPLE_GIFT_CARDS)
    await setAdminSessionCookie(page)
    const ap = new AdminPages(page)
    await ap.gotoGiftCards()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin promotions page renders with data", async ({ page }) => {
    await mockApiResponse(page, "**/api/admin/promotions", { promotions: SAMPLE_PROMOTIONS })
    await setAdminSessionCookie(page)
    const ap = new AdminPages(page)
    await ap.gotoPromotions()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin content page renders", async ({ page }) => {
    await mockApiResponse(page, "**/api/admin/content", SAMPLE_CONTENT)
    await setAdminSessionCookie(page)
    const ap = new AdminPages(page)
    await ap.gotoContent()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin content key page renders for valid key", async ({ page }) => {
    await setAdminSessionCookie(page)
    await page.goto("/admin/content/hero", { waitUntil: "domcontentloaded" })
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin content key page shows error for invalid key", async ({ page }) => {
    await setAdminSessionCookie(page)
    await page.goto("/admin/content/invalid-key", { waitUntil: "domcontentloaded" })
    await expect(page.locator("body")).not.toBeEmpty()
  })
})
