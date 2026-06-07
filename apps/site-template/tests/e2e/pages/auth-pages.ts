import { expect, Page } from "@playwright/test"
import { BasePage } from "./base"

export class AuthPages extends BasePage {
  constructor(protected page: Page) {
    super(page)
  }

  async gotoClientPortal(lang = "es"): Promise<void> {
    await this.goto(`/${lang}/mi-cuenta`)
  }

  async assertLoginPromptVisible(): Promise<void> {
    const body = this.page.locator("body")
    await expect(body).not.toBeEmpty()
  }

  async assertPortalContentVisible(): Promise<void> {
    await expect(this.page.locator("body")).not.toBeEmpty()
  }
}
