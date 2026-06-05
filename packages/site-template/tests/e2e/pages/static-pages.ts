import { expect, Page } from "@playwright/test"
import { BasePage } from "./base"

export class StaticPages extends BasePage {
  constructor(protected page: Page) {
    super(page)
  }

  async gotoWarranty(): Promise<void> {
    await this.goto("/garantia")
  }

  async gotoGuides(): Promise<void> {
    await this.goto("/guias")
  }

  async gotoProducts(): Promise<void> {
    await this.goto("/products")
  }

  async gotoProductDetail(id = "1"): Promise<void> {
    await this.goto(`/products/${id}`)
  }

  async gotoSpanishStore(): Promise<void> {
    await this.goto("/tienda")
  }

  async gotoSpanishProduct(slug = "producto-ejemplo"): Promise<void> {
    await this.goto(`/producto/${slug}`)
  }

  async gotoStores(): Promise<void> {
    await this.goto("/tiendas")
  }

  async gotoPromotions(): Promise<void> {
    await this.goto("/promociones")
  }

  async gotoLegal(lang = "es", pageType: "privacidad" | "terminos"): Promise<void> {
    await this.goto(`/${lang}/${pageType}`)
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
}
