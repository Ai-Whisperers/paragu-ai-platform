import { test } from "@playwright/test"
import { SuccessPages } from "./pages/success-pages"

test.describe("Success Pages", () => {
  test("booking success renders with query params", async ({ page }) => {
    const sp = new SuccessPages(page)
    await sp.gotoBookingSuccess("es", {
      name: "Test User",
      service: "Corte",
      date: "2026-06-01",
    })
    await sp.assertBodyNonEmpty()
  })

  test("booking success renders with minimal params", async ({ page }) => {
    const sp = new SuccessPages(page)
    await sp.gotoBookingSuccess("es")
    await sp.assertBodyNonEmpty()
  })

  test("booking success renders in English", async ({ page }) => {
    const sp = new SuccessPages(page)
    await sp.gotoBookingSuccess("en", { name: "Test", service: "Cut" })
    await sp.assertBodyNonEmpty()
  })

  test("gift card success renders with session_id", async ({ page }) => {
    const sp = new SuccessPages(page)
    await sp.gotoGiftCardSuccess("es", "cs_test_123456")
    await sp.assertBodyNonEmpty()
  })

  test("gift card success renders without session_id", async ({ page }) => {
    const sp = new SuccessPages(page)
    await sp.gotoGiftCardSuccess("es", "")
    await sp.assertBodyNonEmpty()
  })

  test("gift card success renders in English", async ({ page }) => {
    const sp = new SuccessPages(page)
    await sp.gotoGiftCardSuccess("en", "cs_test_english")
    await sp.assertBodyNonEmpty()
  })
})
