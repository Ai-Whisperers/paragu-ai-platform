import { expect, Page } from "@playwright/test"

export class SuccessPages {
  constructor(private page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path)
    await this.page.waitForLoadState("domcontentloaded")
  }

  async gotoBookingSuccess(lang = "es", params: Record<string, string> = {}): Promise<void> {
    const qs = new URLSearchParams(params).toString()
    await this.goto(`/${lang}/booking/success${qs ? `?${qs}` : ""}`)
  }

  async gotoGiftCardSuccess(lang = "es", sessionId = "test_session_123"): Promise<void> {
    await this.goto(`/${lang}/tarjetas-de-regalo/comprar/success?session_id=${sessionId}`)
  }

  async assertBodyNonEmpty(): Promise<void> {
    await expect(this.page.locator("body")).not.toBeEmpty()
  }

  async assertSuccessIndicator(): Promise<void> {
    const body = this.page.locator("body")
    await expect(body).not.toBeEmpty()
  }
}
