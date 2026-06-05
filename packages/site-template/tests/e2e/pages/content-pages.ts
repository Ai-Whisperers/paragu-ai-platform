import { expect, Page } from "@playwright/test"

export class ContentPages {
  constructor(private page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path)
    await this.page.waitForLoadState("domcontentloaded")
  }

  async gotoBlogListing(lang = "es"): Promise<void> {
    await this.goto(`/${lang}/blog`)
  }

  async gotoBlogPost(lang = "es", slug: string): Promise<void> {
    await this.goto(`/${lang}/blog/${slug}`)
  }

  async gotoServiceDetail(lang = "es", slug: string): Promise<void> {
    await this.goto(`/${lang}/servicios/${slug}`)
  }

  async gotoGiftCardListing(lang = "es"): Promise<void> {
    await this.goto(`/${lang}/tarjetas-de-regalo`)
  }

  async assertBodyNonEmpty(): Promise<void> {
    await expect(this.page.locator("body")).not.toBeEmpty()
  }

  async assertHeading(text?: string): Promise<void> {
    const heading = this.page.getByRole("heading").first()
    await expect(heading).toBeVisible()
    if (text) {
      await expect(heading).toContainText(text, { ignoreCase: true })
    }
  }

  async assertElementVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector).first()).toBeVisible()
  }
}
