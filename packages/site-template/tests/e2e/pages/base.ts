import { Page, Locator } from "@playwright/test"

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path)
    await this.page.waitForLoadState("networkidle")
  }

  async waitForSelector(selector: string): Promise<Locator> {
    return this.page.locator(selector).first()
  }

  async clickButton(textOrRole: string | RegExp): Promise<void> {
    if (typeof textOrRole === "string") {
      await this.page.getByRole("button", { name: new RegExp(textOrRole, "i") }).first().click()
    } else {
      await this.page.getByRole("button", { name: textOrRole }).first().click()
    }
  }

  async fillInput(placeholder: string, value: string): Promise<void> {
    await this.page.locator(`input[placeholder*="${placeholder}"]`).first().fill(value)
  }

  async getByLabel(label: string): Promise<Locator> {
    return this.page.getByLabel(label)
  }
}