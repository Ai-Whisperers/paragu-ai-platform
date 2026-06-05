import { test, expect } from "@playwright/test"

test.describe("Redirect Pages", () => {
  test("root / redirects to /es/", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" })
    expect(page.url()).toMatch(/\/es(\/|$)/)
  })

  test("/blog redirects to /es/blog", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" })
    expect(page.url()).toMatch(/\/es\/blog/)
  })

  test("/blog/123 redirects to /es/blog/123", async ({ page }) => {
    await page.goto("/blog/123", { waitUntil: "domcontentloaded" })
    expect(page.url()).toMatch(/\/es\/blog\//)
  })

  test("/privacidad redirects to /es/privacidad", async ({ page }) => {
    await page.goto("/privacidad", { waitUntil: "domcontentloaded" })
    expect(page.url()).toMatch(/\/es\/privacidad/)
  })

  test("/terminos redirects to /es/terminos", async ({ page }) => {
    await page.goto("/terminos", { waitUntil: "domcontentloaded" })
    expect(page.url()).toMatch(/\/es\/terminos/)
  })

  test("/portal redirects to /es/", async ({ page }) => {
    await page.goto("/portal", { waitUntil: "domcontentloaded" })
    expect(page.url()).toMatch(/\/es(\/|$)/)
  })

  test("/es/reserva redirects to /es/booking", async ({ page }) => {
    await page.goto("/es/reserva", { waitUntil: "domcontentloaded" })
    expect(page.url()).toMatch(/\/es\/booking/)
  })
})
