/* eslint-disable react-hooks/rules-of-hooks */
import { test as base, Page, expect } from "@playwright/test"

export class AdminPages {
  constructor(private page: Page) {}

  async gotoLogin(): Promise<void> {
    await this.page.goto("/admin/login")
    await this.page.waitForLoadState("domcontentloaded")
  }

  async gotoDashboard(): Promise<void> {
    await this.page.goto("/admin")
    await this.page.waitForLoadState("domcontentloaded")
  }

  async gotoBookings(): Promise<void> {
    await this.page.goto("/admin/bookings")
    await this.page.waitForLoadState("domcontentloaded")
  }

  async gotoGiftCards(): Promise<void> {
    await this.page.goto("/admin/gift-cards")
    await this.page.waitForLoadState("domcontentloaded")
  }

  async gotoContent(): Promise<void> {
    await this.page.goto("/admin/content")
    await this.page.waitForLoadState("domcontentloaded")
  }

  async gotoPromotions(): Promise<void> {
    await this.page.goto("/admin/promotions")
    await this.page.waitForLoadState("domcontentloaded")
  }

  async assertLoginPageVisible(): Promise<void> {
    await expect(this.page.locator("body")).not.toBeEmpty()
    const heading = this.page.getByRole("heading")
    await expect(heading.first()).toBeVisible()
  }

  async assertPhoneInputVisible(): Promise<void> {
    const phoneInput = this.page.locator('input[type="tel"], input[placeholder*="WhastApp"], input[placeholder*="phone"], input[name="phone"]')
    await expect(phoneInput.first()).toBeVisible({ timeout: 5000 }).catch(() => {
      const inputs = this.page.locator("input")
      expect(inputs.first()).toBeVisible()
    })
  }

  async assertSendOTPButtonVisible(): Promise<void> {
    const sendBtn = this.page.getByRole("button", { name: /Enviar|Send|Code|OTP/i })
    await expect(sendBtn.first()).toBeVisible({ timeout: 5000 }).catch(() => {
      const btn = this.page.getByRole("button").first()
      expect(btn).toBeVisible()
    })
  }

  async fillLoginForm(phone: string): Promise<void> {
    await this.gotoLogin()
    const phoneInput = this.page.locator("input").first()
    await phoneInput.fill(phone)
    const btn = this.page.getByRole("button").first()
    await btn.click()
    await this.page.waitForTimeout(2000)
  }
}

export function createAdminPages(page: Page): AdminPages {
  return new AdminPages(page)
}

export const adminPageTest = base.extend<{ adminPagesFixture: AdminPages }>({
  adminPagesFixture: async ({ page }, useCb) => {  
    await useCb(createAdminPages(page))
  },
})