import { expect, test } from '@playwright/test'

test.describe('Unit test individual features', () => {
    test('Chapters should render content before or after sections', async ({ page }) => {
        await page.goto('/unit-tests')
        await expect(page.locator('#leading-content')).toBeVisible()
        await expect(page.locator('#trailing-content')).toBeAttached()

        await page.getByRole('link').filter({ hasText: 'alt-wrapper-tag' }).click()
        await expect(page.locator('#alt-wrapper-tag-example')).toBeVisible()
        await expect(
            page.locator('#alt-wrapper-tag-example').filter({ hasText: 'this should be wrapped' })
        ).toBeVisible()

        await page.getByRole('link').filter({ hasText: 'no-wrapper-tag' }).click()
        await expect(page.getByText('this should be rendered')).toBeVisible()

        await page.getByRole('link').filter({ hasText: 'mdx-support.mdx' }).click()
        await page.getByRole('link').filter({ hasText: 'ripe banana' }).click()
        await expect(page.getByText('You picked ripe banana')).toBeVisible()
    })
})
