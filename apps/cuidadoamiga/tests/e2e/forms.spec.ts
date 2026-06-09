import { test, expect } from '@playwright/test'

test.describe('Case submission form', () => {
  test('rejects submission without required fields', async ({ page }) => {
    await page.goto('/es/reportar')
    // Try to submit empty form
    const submitBtn = page.getByRole('button', { name: /enviar caso/i })
    await submitBtn.click()
    // Browser native validation should block
    // At least one field should have :invalid
    const invalid = await page.locator(':invalid').count()
    expect(invalid).toBeGreaterThan(0)
  })
})

test.describe('Admin route protection', () => {
  test('redirects unauthenticated users to login', async ({ page }) => {
    await page.goto('/es/admin')
    await expect(page).toHaveURL(/\/es\/admin\/login/)
  })
})
