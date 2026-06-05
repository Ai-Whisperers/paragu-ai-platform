import { test } from "@playwright/test"
import { AuthPages } from "./pages/auth-pages"
import { setClientSessionCookie } from "./helpers/auth"

test.describe("Client Portal (Mi Cuenta)", () => {
  test("shows login prompt when not authenticated", async ({ page }) => {
    const ap = new AuthPages(page)
    await ap.gotoClientPortal()
    await ap.assertLoginPromptVisible()
  })

  test("renders content when authenticated in Spanish", async ({ page }) => {
    await setClientSessionCookie(page, "es")
    const ap = new AuthPages(page)
    await ap.gotoClientPortal("es")
    await ap.assertPortalContentVisible()
  })

  test("renders content when authenticated in English", async ({ page }) => {
    await setClientSessionCookie(page, "en")
    const ap = new AuthPages(page)
    await ap.gotoClientPortal("en")
    await ap.assertPortalContentVisible()
  })
})
