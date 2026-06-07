import { BasePage } from "./base"

export class GiftCardFlow extends BasePage {
  async gotoBuy(): Promise<void> {
    await this.goto("/es/tarjetas-de-regalo")
  }

  async buyGiftCard(amount = 50000, recipientName = "Test User", recipientEmail = "test@test.com"): Promise<void> {
    await this.gotoBuy()
    const amountInput = this.page.locator('input[name="amount"], input[type="number"]').first()
    if (await amountInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await amountInput.fill(String(amount))
    }
    const nameInput = this.page.locator('input[name="recipientName"], input[placeholder*="nombre"]').first()
    if (await nameInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await nameInput.fill(recipientName)
    }
    const emailInput = this.page.locator('input[name="recipientEmail"], input[placeholder*="email"]').first()
    if (await emailInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await emailInput.fill(recipientEmail)
    }
    await this.clickButton(/Comprar|Buy|Pagar/)
  }

  async claimWithToken(token: string): Promise<void> {
    await this.goto(`/c/${token}`)
  }
}