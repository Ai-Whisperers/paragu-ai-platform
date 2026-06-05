/* eslint-disable react-hooks/rules-of-hooks */
import { test as base, Page, expect } from "@playwright/test"

export class PublicPages {
  constructor(
    private page: Page,
    private lang: "es" | "en" = "es"
  ) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(`/${this.lang}${path}`)
    await this.page.waitForLoadState("domcontentloaded")
  }

  async gotoHome(): Promise<void> {
    await this.goto("/")
  }

  async gotoContact(): Promise<void> {
    await this.goto("/contacto")
  }

  async gotoNosotros(): Promise<void> {
    await this.goto("/nosotros")
  }

  async gotoOfertas(): Promise<void> {
    await this.goto("/ofertas")
  }

  async gotoFAQ(): Promise<void> {
    await this.goto("/faq")
  }

  async gotoServicios(): Promise<void> {
    await this.goto("/servicios")
  }

  async gotoBlog(): Promise<void> {
    await this.goto("/blog")
  }

  async gotoReserva(): Promise<void> {
    await this.goto("/reserva")
  }

  async gotoTarjetasDeRegalo(): Promise<void> {
    await this.goto("/tarjetas-de-regalo")
  }

  async gotoGiftCardClaim(token: string): Promise<void> {
    await this.page.goto(`/c/${token}`)
    await this.page.waitForLoadState("domcontentloaded")
  }

  async assertBodyNonEmpty(): Promise<void> {
    await expect(this.page.locator("body")).not.toBeEmpty()
  }

  async assertPageHasTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(/./)
  }

  async fillBookingForm(data: {
    clientName: string
    phone: string
    service: string
    preferredDate?: string
    notes?: string
  }): Promise<void> {
    const nameInput = this.page.getByLabel(/Nombre/i).or(this.page.locator('input[name="client_name"]'))
    const phoneInput = this.page.getByLabel(/WhatsApp|Teléfono|Phone/i).or(this.page.locator('input[name="phone"]'))
    const serviceInput = this.page.getByLabel(/Servicio|Service/i).or(this.page.locator('select[name="service"], input[name="service"]'))
    const dateInput = this.page.locator('input[name="preferred_date"]')
    const notesInput = this.page.locator('textarea[name="notes"], input[name="notes"]')
    const submitBtn = this.page.getByRole("button", { name: /Reservar|Enviar|Submit/i })

    await nameInput.fill(data.clientName)
    await phoneInput.fill(data.phone)
    await serviceInput.fill(data.service)
    if (data.preferredDate) await dateInput.fill(data.preferredDate)
    if (data.notes) await notesInput.fill(data.notes)
    await submitBtn.click()
  }

  async fillContactForm(data: { name: string; email: string; message: string }): Promise<void> {
    const nameInput = this.page.getByLabel(/Nombre/i).or(this.page.locator('input[name="name"]'))
    const emailInput = this.page.getByLabel(/Email/i).or(this.page.locator('input[name="email"]'))
    const messageInput = this.page.getByLabel(/Mensaje|Message/i).or(this.page.locator('textarea[name="message"]'))
    const submitBtn = this.page.getByRole("button", { name: /Enviar|Submit/i })

    await nameInput.fill(data.name)
    await emailInput.fill(data.email)
    await messageInput.fill(data.message)
    await submitBtn.click()
  }
}

export function createPublicPages(page: Page, lang: "es" | "en" = "es"): PublicPages {
  return new PublicPages(page, lang)
}

export const publicPageTest = base.extend<{ publicPagesFixture: PublicPages }>({
  publicPagesFixture: async ({ page }, useCb) => {  
    await useCb(createPublicPages(page))
  },
})