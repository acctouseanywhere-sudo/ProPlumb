import { test, expect } from '@playwright/test'

test.describe('ProPlumb Smoke Tests', () => {
  test('page loads without console errors', async ({ page }) => {
    const errors = []
    page.on('pageerror', (err) => errors.push(err.message))
    await page.goto('/')
    await expect(page).toHaveTitle(/ProPlumb/)
    expect(errors).toEqual([])
  })

  test('all navbar links scroll to correct sections', async ({ page }) => {
    await page.goto('/')
    const links = [
      { label: 'Services', id: 'services' },
      { label: 'Why Us', id: 'why-us' },
      { label: 'Process', id: 'process' },
      { label: 'Contact', id: 'contact' },
    ]
    for (const { label, id } of links) {
      await page.getByRole('link', { name: label }).first().click()
      await expect(page.locator(`#${id}`)).toBeVisible()
    }
  })

  test('contact form renders all required fields', async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await expect(page.locator('#field-name')).toBeVisible()
    await expect(page.locator('#field-email')).toBeVisible()
    await expect(page.locator('#field-phone')).toBeVisible()
    await expect(page.locator('#field-zip-code')).toBeVisible()
    await expect(page.locator('#field-message')).toBeVisible()
  })

  test('contact form shows validation error on empty submit', async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: 'Send Message' }).click()
    await expect(page.locator('#field-name')).toHaveAttribute('required', '')
  })

  test('mobile menu opens and closes correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const menuBtn = page.getByRole('button', { name: 'Open menu' })
    await menuBtn.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toHaveClass(/opacity-100/)
    const closeBtn = page.getByRole('button', { name: 'Close menu' })
    await closeBtn.click()
    await expect(dialog).toHaveClass(/opacity-0/)
  })
})
