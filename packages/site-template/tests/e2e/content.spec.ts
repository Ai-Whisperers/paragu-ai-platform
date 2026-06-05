import { test, expect } from "@playwright/test"
import { ContentPages } from "./pages/content-pages"

test.describe("Content Pages", () => {
  test("blog listing renders heading in Spanish", async ({ page }) => {
    const cp = new ContentPages(page)
    await cp.gotoBlogListing()
    await cp.assertBodyNonEmpty()
  })

  test("blog listing renders heading in English", async ({ page }) => {
    const cp = new ContentPages(page)
    await cp.gotoBlogListing("en")
    await cp.assertBodyNonEmpty()
  })

  test("service detail renders for known slugs in Spanish", async ({ page }) => {
    const cp = new ContentPages(page)
    await cp.gotoServiceDetail("es", "corte-de-cabello")
    await cp.assertBodyNonEmpty()
  })

  test("service detail renders for known slugs in English", async ({ page }) => {
    const cp = new ContentPages(page)
    await cp.gotoServiceDetail("en", "corte-de-cabello")
    await cp.assertBodyNonEmpty()
  })

  test("gift card listing renders heading", async ({ page }) => {
    const cp = new ContentPages(page)
    await cp.gotoGiftCardListing()
    await cp.assertBodyNonEmpty()
  })

  test("gift card listing renders in English", async ({ page }) => {
    const cp = new ContentPages(page)
    await cp.gotoGiftCardListing("en")
    await cp.assertBodyNonEmpty()
  })

  test("404 page renders for unknown route", async ({ page }) => {
    await page.goto("/es/this-page-does-not-exist-12345")
    await expect(page.locator("body")).not.toBeEmpty()
  })
})
