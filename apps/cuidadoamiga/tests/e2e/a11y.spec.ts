import { test, expect } from '@playwright/test'

test.describe('Accessibility (a11y) smoke test', () => {
  test('home has a single h1 and proper landmarks', async ({ page }) => {
    await page.goto('/es')
    const h1Count = await page.getByRole('heading', { level: 1 }).count()
    expect(h1Count).toBeGreaterThanOrEqual(1)
    // Skip-to-content link present
    const skip = page.getByRole('link', { name: /saltar al contenido/i })
    await expect(skip).toBeAttached()
    // Main landmark
    await expect(page.getByRole('main')).toBeVisible()
    // Banner (header) + contentinfo (footer)
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('all images have alt text', async ({ page }) => {
    await page.goto('/es')
    const images = await page.locator('img').all()
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt, `img missing alt: ${await img.getAttribute('src')}`).not.toBeNull()
    }
  })

  test('recursos page has accessible list structure', async ({ page }) => {
    await page.goto('/es/recursos')
    // At least one list with proper ul > li structure
    const listItems = await page.locator('ul li').count()
    expect(listItems).toBeGreaterThan(0)
  })
})
