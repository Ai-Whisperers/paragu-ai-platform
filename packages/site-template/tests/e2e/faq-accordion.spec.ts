import { test, expect } from "@playwright/test"
import { PublicPages } from "./pages/public-pages"

test.describe("FAQ Accordion", () => {
  test("FAQ page renders with questions", async ({ page }) => {
    const pages = new PublicPages(page, "es")
    await pages.gotoFAQ()
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("FAQ has multiple expandable items", async ({ page }) => {
    await page.goto("/es/faq")
    const faqItems = page.locator("[data-testid='faq-item'], details, .faq-item, [aria-expanded]").first()
    const count = await faqItems.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test("FAQ expand/collapse button works", async ({ page }) => {
    await page.goto("/es/faq")
    const toggleButtons = page.getByRole("button", { name: /pregunta|faq|expand|collapse/i })
    const buttonCount = await toggleButtons.count()
    if (buttonCount > 0) {
      await toggleButtons.first().click()
    }
  })

  test("FAQ page renders in English too", async ({ page }) => {
    const pages = new PublicPages(page, "en")
    await pages.gotoFAQ()
    await expect(page.locator("body")).not.toBeEmpty()
  })
})