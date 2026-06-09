import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test('loads the home page in Spanish', async ({ page }) => {
    await page.goto('/es')
    await expect(page).toHaveTitle(/Cuidado Amiga/)
    // Hero H1
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/mapa/i)
    // CTA buttons
    await expect(page.getByRole('link', { name: /reportar un caso/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /cómo funciona/i }).first()).toBeVisible()
  })

  test('loads the home page in Portuguese', async ({ page }) => {
    await page.goto('/pt')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/mapa/i)
    await expect(page.getByRole('link', { name: /reportar um caso/i }).first()).toBeVisible()
  })

  test('loads the home page in English', async ({ page }) => {
    await page.goto('/en')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/map/i)
    await expect(page.getByRole('link', { name: /report a case/i }).first()).toBeVisible()
  })

  test('redirects / to a locale', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/(es|pt|en)/)
  })
})

test.describe('Language switcher', () => {
  test('switches between locales preserving path', async ({ page }) => {
    await page.goto('/es/recursos')
    await page.getByRole('group', { name: /idioma/i }).getByRole('button', { name: 'PT' }).click()
    await expect(page).toHaveURL(/\/pt\/recursos/)
    await page.getByRole('group', { name: /idioma/i }).getByRole('button', { name: 'EN' }).click()
    await expect(page).toHaveURL(/\/en\/recursos/)
  })
})
