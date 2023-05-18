import { expect, test } from '@playwright/test'

test.describe('Full test of browser forward/back features', () => {
    test('Checks back', async ({ page }) => {
        await page.goto('/manual')
        await page.getByRole('link').filter({ hasText: 'Start learning' }).click()
        await page.getByRole('link').filter({ hasText: 'about choices' }).click()
        await expect(page.getByRole('link').filter({ hasText: 'ripe banana' })).toBeVisible()
        await page.getByRole('link').filter({ hasText: 'bulbous orange' }).click()
        await page.goBack()
        await expect(page.getByRole('link').filter({ hasText: 'bulbous orange' })).toBeVisible()
        // Now make a different choice
        await page.getByRole('link').filter({ hasText: 'ripe banana' }).click()
    })
})
