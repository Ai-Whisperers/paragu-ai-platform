import { test, expect } from "@playwright/test"
import { PublicPages } from "./pages/public-pages"

test.describe("Public Pages Spanish", () => {
  test("home page loads in Spanish", async ({ page }) => {
    const pages = new PublicPages(page, "es")
    await pages.gotoHome()
    await pages.assertBodyNonEmpty()
    await pages.assertPageHasTitle()
  })

  test("contact page renders", async ({ page }) => {
    const pages = new PublicPages(page, "es")
    await pages.gotoContact()
    await pages.assertBodyNonEmpty()
  })

  test("nosotros page renders", async ({ page }) => {
    const pages = new PublicPages(page, "es")
    await pages.gotoNosotros()
    await pages.assertBodyNonEmpty()
  })

  test("ofertas page renders", async ({ page }) => {
    const pages = new PublicPages(page, "es")
    await pages.gotoOfertas()
    await pages.assertBodyNonEmpty()
  })

  test("faq page renders", async ({ page }) => {
    const pages = new PublicPages(page, "es")
    await pages.gotoFAQ()
    await pages.assertBodyNonEmpty()
  })

  test("servicios page renders", async ({ page }) => {
    const pages = new PublicPages(page, "es")
    await pages.gotoServicios()
    await pages.assertBodyNonEmpty()
  })

  test("tarjetas-de-regalo page renders", async ({ page }) => {
    const pages = new PublicPages(page, "es")
    await pages.gotoTarjetasDeRegalo()
    await pages.assertBodyNonEmpty()
  })

  test("blog page renders", async ({ page }) => {
    const pages = new PublicPages(page, "es")
    await pages.gotoBlog()
    await pages.assertBodyNonEmpty()
  })

  test("404 page renders correctly", async ({ page }) => {
    await page.goto("/es/this-page-does-not-exist-12345")
    await expect(page.locator("body")).not.toBeEmpty()
  })
})

test.describe("Public Pages English", () => {
  test("home page loads in English", async ({ page }) => {
    const pages = new PublicPages(page, "en")
    await pages.gotoHome()
    await pages.assertBodyNonEmpty()
  })
})

test.describe("Gift Card Flow", () => {
  test("gift card claim page renders without token", async ({ page }) => {
    await page.goto("/c/invalid-token")
    await expect(page.locator("body")).not.toBeEmpty()
  })
})