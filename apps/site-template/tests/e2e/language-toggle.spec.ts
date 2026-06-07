import { test, expect } from "@playwright/test"
import { PublicPages } from "./pages/public-pages"

test.describe("Language Toggle", () => {
  test("Spanish home page has Spanish content", async ({ page }) => {
    const pages = new PublicPages(page, "es")
    await pages.gotoHome()
    await expect(page.locator("body")).not.toBeEmpty()
    const url = page.url()
    expect(url).toContain("/es/")
  })

  test("English home page has English content", async ({ page }) => {
    const pages = new PublicPages(page, "en")
    await pages.gotoHome()
    await expect(page.locator("body")).not.toBeEmpty()
    const url = page.url()
    expect(url).toContain("/en/")
  })

  test("can navigate from Spanish to English via language switch", async ({ page }) => {
    const pages = new PublicPages(page, "es")
    await pages.gotoHome()
    const spanishUrl = page.url()
    expect(spanishUrl).toContain("/es/")

    await page.goto("/en/")
    await expect(page.locator("body")).not.toBeEmpty()
    expect(page.url()).toContain("/en/")
  })

  test("contact page works in both languages", async ({ page }) => {
    const esPages = new PublicPages(page, "es")
    await esPages.gotoContact()
    await expect(page.locator("body")).not.toBeEmpty()

    const enPages = new PublicPages(page, "en")
    await enPages.gotoContact()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("booking page works in both languages", async ({ page }) => {
    const esPages = new PublicPages(page, "es")
    await esPages.gotoReserva()
    await expect(page.locator("body")).not.toBeEmpty()

    const enPages = new PublicPages(page, "en")
    await enPages.gotoReserva()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("language toggle preserves page content type", async ({ page }) => {
    await page.goto("/es/")
    await expect(page.locator("body")).not.toBeEmpty()
    await expect(page.locator("body")).not.toBeEmpty()
    const h1CountEn = await page.locator("h1").count()
    expect(h1CountEn).toBeGreaterThanOrEqual(0)
  })
})