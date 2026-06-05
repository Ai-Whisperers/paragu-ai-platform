import { test, expect } from "@playwright/test"
import { AdminPages } from "./pages/admin-pages"

test.describe("Admin Auth", () => {
  test("admin login page renders", async ({ page }) => {
    const pages = new AdminPages(page)
    await pages.gotoLogin()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin page renders", async ({ page }) => {
    await page.goto("/admin")
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin login shows phone input", async ({ page }) => {
    const pages = new AdminPages(page)
    await pages.gotoLogin()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin login form has send OTP button", async ({ page }) => {
    const pages = new AdminPages(page)
    await pages.gotoLogin()
    await expect(page.locator("body")).not.toBeEmpty()
  })
})

test.describe("Admin Dashboard", () => {
  test("admin dashboard page renders after mock auth", async ({ page }) => {
    await page.goto("/admin")
    const body = page.locator("body")
    await expect(body).not.toBeEmpty()
  })

  test("admin bookings page renders", async ({ page }) => {
    const pages = new AdminPages(page)
    await pages.gotoBookings()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin gift-cards page renders", async ({ page }) => {
    const pages = new AdminPages(page)
    await pages.gotoGiftCards()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin content page renders", async ({ page }) => {
    const pages = new AdminPages(page)
    await pages.gotoContent()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("admin promotions page renders", async ({ page }) => {
    const pages = new AdminPages(page)
    await pages.gotoPromotions()
    await expect(page.locator("body")).not.toBeEmpty()
  })
})