import { expect, test } from '@playwright/test'

test.setTimeout(60000)

test.describe('Full test of refresh/rehydration features', () => {
    test('Checks refresh', async ({ page }) => {
        await page.goto('/manual')
        await page.getByRole('link').filter({ hasText: 'Start learning' }).click()
        await page.getByRole('link').filter({ hasText: 'about choices' }).click()
        await expect(page.getByRole('link').filter({ hasText: 'ripe banana' })).toBeVisible()
        await page.getByRole('link').filter({ hasText: 'bulbous orange' }).click()
        await page.reload()
        await expect(page.getByRole('link').filter({ hasText: 'ripe banana' })).not.toBeVisible()
        await page.getByRole('link').filter({ hasText: 'fine choices' }).click()
        await page.getByRole('link').filter({ hasText: 'orange kale' }).click()
        await page.getByRole('link').filter({ hasText: 'cheesecake' }).click()

        await page.getByRole('link').filter({ hasText: 'marmot' }).click()

        await page.getByRole('link').filter({ hasText: 'elm' }).click()
        await expect(page.getByText('elm (selected)')).toBeVisible()
        await page.reload()
        await expect(page.getByText('elm (selected)')).toBeVisible({ timeout: 10000 })
    })
})
