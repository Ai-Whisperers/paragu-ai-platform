import { Page } from "@playwright/test"

export async function mockApiResponse(page: Page, url: string, data: unknown, status = 200) {
  await page.route(url, async (route) => {
    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(data),
    })
  })
}

export async function mockApiError(page: Page, url: string, status = 500, errorMsg = "Error") {
  await page.route(url, async (route) => {
    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify({ error: errorMsg }),
    })
  })
}
