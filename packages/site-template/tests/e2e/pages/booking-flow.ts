import { BasePage } from "./base"

export class BookingFlow extends BasePage {
  async gotoForm(): Promise<void> {
    await this.goto("/es/booking")
  }

  async fillAndSubmit(data: {
    clientName?: string
    phone?: string
    service?: string
    preferredDate?: string
    notes?: string
  }): Promise<void> {
    await this.gotoForm()
    const nameInput = this.page.locator('input[name="client_name"], input[placeholder*="nombre"]').first()
    if (await nameInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await nameInput.fill(data.clientName ?? "Cliente Test")
    }
    const phoneInput = this.page.locator('input[name="phone"], input[type="tel"]').first()
    if (await phoneInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await phoneInput.fill(data.phone ?? "595981000000")
    }
    const serviceInput = this.page.locator('input[name="service"], select[name="service"]').first()
    if (await serviceInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await serviceInput.fill(data.service ?? "Asesoría")
    }
    await this.clickButton(/Enviar|Reservar|Book|Submit/)
  }
}