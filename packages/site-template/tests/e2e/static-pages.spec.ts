import { test } from "@playwright/test"
import { StaticPages } from "./pages/static-pages"

test.describe("Static / Info Pages", () => {
  test("warranty page renders", async ({ page }) => {
    const sp = new StaticPages(page)
    await sp.gotoWarranty()
    await sp.assertBodyNonEmpty()
  })

  test("guides page renders", async ({ page }) => {
    const sp = new StaticPages(page)
    await sp.gotoGuides()
    await sp.assertBodyNonEmpty()
  })

  test("products listing renders", async ({ page }) => {
    const sp = new StaticPages(page)
    await sp.gotoProducts()
    await sp.assertBodyNonEmpty()
  })

  test("product detail renders", async ({ page }) => {
    const sp = new StaticPages(page)
    await sp.gotoProductDetail("1")
    await sp.assertBodyNonEmpty()
  })

  test("spanish store renders", async ({ page }) => {
    const sp = new StaticPages(page)
    await sp.gotoSpanishStore()
    await sp.assertBodyNonEmpty()
  })

  test("spanish product detail renders", async ({ page }) => {
    const sp = new StaticPages(page)
    await sp.gotoSpanishProduct("producto-ejemplo")
    await sp.assertBodyNonEmpty()
  })

  test("stores locator renders", async ({ page }) => {
    const sp = new StaticPages(page)
    await sp.gotoStores()
    await sp.assertBodyNonEmpty()
  })

  test("promotions page renders", async ({ page }) => {
    const sp = new StaticPages(page)
    await sp.gotoPromotions()
    await sp.assertBodyNonEmpty()
  })

  test("privacy policy renders in Spanish", async ({ page }) => {
    const sp = new StaticPages(page)
    await sp.gotoLegal("es", "privacidad")
    await sp.assertBodyNonEmpty()
  })

  test("privacy policy renders in English", async ({ page }) => {
    const sp = new StaticPages(page)
    await sp.gotoLegal("en", "privacidad")
    await sp.assertBodyNonEmpty()
  })

  test("terms renders in Spanish", async ({ page }) => {
    const sp = new StaticPages(page)
    await sp.gotoLegal("es", "terminos")
    await sp.assertBodyNonEmpty()
  })

  test("terms renders in English", async ({ page }) => {
    const sp = new StaticPages(page)
    await sp.gotoLegal("en", "terminos")
    await sp.assertBodyNonEmpty()
  })
})
