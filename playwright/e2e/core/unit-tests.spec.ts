import { expect, test } from '@playwright/test'

test.describe('Unit test individual features', () => {
    test('Chapters should render content before or after sections', async ({ page }) => {
        await page.goto('/unit-tests')
        await expect(page.locator('#leading-content')).toBeVisible()
        await expect(page.locator('#trailing-content')).toBeVisible()

        cy.get("a:contains('alt-wrapper-tag')").click()
        await expect(page.locator('#alt-wrapper-tag-example')).toBeVisible()
        await expect(
            page.locator('#alt-wrapper-tag-example').filter({ hasText: 'this should be wrapped' })
        ).toBeVisible()

        cy.get("a:contains('no-wrapper-tag')").click()
        await expect(
            page.getByRole('region').filter({ hasText: 'this should be rendered' })
        ).toBeVisible()

        cy.get("a:contains('mdx-support.mdx')").click()
        cy.get("a:contains('ripe banana')").click()
        await expect(page.getByText('You picked ripe banana')).toBeVisible()
    })
})
