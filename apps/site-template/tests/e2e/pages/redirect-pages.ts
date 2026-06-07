import { expect } from "@playwright/test"
import { BasePage } from "./base"

export class RedirectPages extends BasePage {
  async assertRedirectedTo(expectedPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expectedPath.replace("/", "\\/")))
  }
}
