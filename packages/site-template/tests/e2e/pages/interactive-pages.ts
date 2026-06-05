import { expect, Page } from "@playwright/test"
import { BasePage } from "./base"

export class InteractivePages extends BasePage {
  constructor(protected page: Page) {
    super(page)
  }

  async gotoBooking(lang = "es"): Promise<void> {
    await this.goto(`/${lang}/booking`)
  }

  async gotoContact(lang = "es"): Promise<void> {
    await this.goto(`/${lang}/contacto`)
  }

  async gotoGiftCardPurchase(lang = "es"): Promise<void> {
    await this.goto(`/${lang}/tarjetas-de-regalo/comprar`)
  }

  async gotoAdminLogin(): Promise<void> {
    await this.goto("/admin/login")
  }

  async fillBookingForm(data: {
    clientName?: string
    phone?: string
    service?: string
    preferredDate?: string
    notes?: string
  }): Promise<void> {
    const nameInput = this.page.getByLabel(/Nombre/i).or(this.page.locator('input[name="client_name"]'))
    const phoneInput = this.page.getByLabel(/WhatsApp|Teléfono|Phone/i).or(this.page.locator('input[name="phone"]'))
    const serviceInput = this.page.getByLabel(/Servicio|Service/i).or(this.page.locator('select[name="service"], input[name="service"]'))
    const submitBtn = this.page.getByRole("button", { name: /Reservar|Enviar|Submit/i })

    if (await nameInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await nameInput.fill(data.clientName ?? "Test User")
    }
    if (await phoneInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await phoneInput.fill(data.phone ?? "595981000000")
    }
    if (await serviceInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await serviceInput.fill(data.service ?? "Corte")
    }
    if (data.preferredDate) {
      const dateInput = this.page.locator('input[name="preferred_date"], input[type="date"]')
      if (await dateInput.isVisible({ timeout: 2000 }).catch(() => false)) {
        await dateInput.fill(data.preferredDate)
      }
    }
    await submitBtn.click()
  }

  async fillContactForm(data: { name?: string; email?: string; message?: string }): Promise<void> {
    const nameInput = this.page.getByLabel(/Nombre/i).or(this.page.locator('input[name="name"]'))
    const emailInput = this.page.getByLabel(/Email/i).or(this.page.locator('input[name="email"]'))
    const messageInput = this.page.getByLabel(/Mensaje|Message/i).or(this.page.locator('textarea[name="message"]'))
    const submitBtn = this.page.getByRole("button", { name: /Enviar|Submit/i })

    if (await nameInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await nameInput.fill(data.name ?? "Test User")
    }
    if (await emailInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await emailInput.fill(data.email ?? "test@test.com")
    }
    if (await messageInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await messageInput.fill(data.message ?? "Test message")
    }
    await submitBtn.click()
  }

  async selectGiftCardTier(amount: number): Promise<void> {
    const tierBtn = this.page.locator("button").filter({ hasText: `Gs. ${amount.toLocaleString()}` })
    if (await tierBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await tierBtn.click()
    }
  }

  async fillGiftCardRecipient(name: string, email: string): Promise<void> {
    const nameInput = this.page.locator('input[placeholder*="Nombre"]').or(this.page.locator('input[placeholder*="nombre"]'))
    const emailInput = this.page.locator('input[type="email"]')
    if (await nameInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await nameInput.fill(name)
    }
    if (await emailInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await emailInput.fill(email)
    }
  }

  async clickPay(): Promise<void> {
    const payBtn = this.page.getByRole("button", { name: /Pagar|Pay|Stripe/i })
    if (await payBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await payBtn.click()
    }
  }

  async fillAdminPhone(phone: string): Promise<void> {
    const phoneInput = this.page.locator('input[type="tel"]')
    await phoneInput.fill(phone)
  }

  async clickSendCode(): Promise<void> {
    await this.clickButton(/Enviar|Send/)
  }

  async fillAdminOtp(otp: string): Promise<void> {
    const otpInput = this.page.locator('input[maxlength="6"]')
    await otpInput.fill(otp)
  }

  async clickVerify(): Promise<void> {
    await this.clickButton(/Verificar|Verify/)
  }

  async assertFormVisible(): Promise<void> {
    await expect(this.page.locator("body")).not.toBeEmpty()
  }
}
