import { test, expect } from '@playwright/test'

test.describe('Recursos (hotlines) page', () => {
  test('shows the LATAM hotline directory', async ({ page }) => {
    await page.goto('/es/recursos')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/denunciar/i)
    // At least one country should be visible
    await expect(page.getByText(/Argentina/).first()).toBeVisible()
    await expect(page.getByText(/Brasil/).first()).toBeVisible()
    // Emergency banner
    await expect(page.getByText(/peligro inmediato/i).first()).toBeVisible()
  })
})

test.describe('Como funciona', () => {
  test('explains the moderation process', async ({ page }) => {
    await page.goto('/es/como-funciona')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/funciona/i)
    await expect(page.getByText(/fuente pública/i).first()).toBeVisible()
  })
})

test.describe('Protocolo', () => {
  test('shows the moderation protocol', async ({ page }) => {
    await page.goto('/es/protocolo')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/protocolo/i)
  })
})

test.describe('Unirse (apply)', () => {
  test('shows the application form with consent', async ({ page }) => {
    await page.goto('/es/unirse')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/moderadora/i)
    // Two consent checkboxes
    const checkboxes = page.getByRole('checkbox')
    await expect(checkboxes).toHaveCount(2)
  })
})
