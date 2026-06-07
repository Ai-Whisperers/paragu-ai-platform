import { test, expect } from "@playwright/test"

test.describe("WhatsApp Float Button", () => {
  test("WhatsApp button exists on home page", async ({ page }) => {
    await page.goto("/es/")
    await expect(page.locator("body")).not.toBeEmpty()
    const whatsappLink = page.locator("a[href*='wa.me'], a[href*='whatsapp']").first()
    const count = await whatsappLink.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test("WhatsApp button exists on contact page", async ({ page }) => {
    await page.goto("/es/contacto")
    await expect(page.locator("body")).not.toBeEmpty()
    const whatsappLink = page.locator("a[href*='wa.me'], a[href*='whatsapp']").first()
    const count = await whatsappLink.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test("WhatsApp button exists on booking page", async ({ page }) => {
    await page.goto("/es/reserva")
    await expect(page.locator("body")).not.toBeEmpty()
    const whatsappLink = page.locator("a[href*='wa.me'], a[href*='whatsapp']").first()
    const count = await whatsappLink.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test("WhatsApp button has valid href format", async ({ page }) => {
    await page.goto("/es/")
    const whatsappLink = page.locator("a[href*='wa.me'], a[href*='whatsapp']").first()
    if (await whatsappLink.count() > 0) {
      const href = await whatsappLink.getAttribute("href")
      expect(href).toBeTruthy()
      expect(href).toMatch(/wa\.me|whatsapp/)
    }
  })

  test("WhatsApp button is visible (not hidden by CSS)", async ({ page }) => {
    await page.goto("/es/")
    const whatsappLink = page.locator("a[href*='wa.me'], a[href*='whatsapp']").first()
    if (await whatsappLink.count() > 0) {
      await expect(whatsappLink).toBeVisible()
    }
  })
})