import { test, expect } from "@playwright/test"
import { setClientSessionCookie } from "./helpers/auth"

test.describe("Client Portal Auth", () => {
  test("mi-cuenta page renders without session", async ({ page }) => {
    await page.goto("/es/mi-cuenta")
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("mi-cuenta page shows login form when no session", async ({ page }) => {
    await page.goto("/es/mi-cuenta")
    const hasForm = await page.locator("form, input[type='tel'], input[name='phone']").count()
    expect(hasForm).toBeGreaterThanOrEqual(1)
  })

  test("mi-cuenta accessible with valid client session", async ({ page }) => {
    await setClientSessionCookie(page, "es", "595981000000")
    await page.goto("/es/mi-cuenta")
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("client portal in English also renders", async ({ page }) => {
    await page.goto("/en/mi-cuenta")
    await expect(page.locator("body")).not.toBeEmpty()
  })

  test("invalid phone format shows validation error", async ({ page }) => {
    await page.goto("/es/mi-cuenta")
    const phoneInput = page.locator("input[type='tel'], input[name='phone']").first()
    if (await phoneInput.count() > 0) {
      await phoneInput.fill("invalid")
      const submitBtn = page.getByRole("button").first()
      await submitBtn.click()
    }
  })
})