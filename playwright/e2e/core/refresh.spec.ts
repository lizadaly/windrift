/* eslint-disable cypress/no-async-tests */
import { test } from '@playwright/test'

test.describe('Full test of refresh/rehydration features', () => {
    test('Checks refresh', async ({ page }) => {
        await page.goto('/manual')
        await page.getByRole('link').filter({ hasText: 'Start learning' }).click()
        await page.getByRole('link').filter({ hasText: 'about choices' }).click()
        cy.get('a:contains("ripe banana")')
        await page.getByRole('link').filter({ hasText: 'bulbous orange' }).click()
        cy.reload()
        cy.get('a:contains("ripe banana")').should('not.exist')
        await page.getByRole('link').filter({ hasText: 'fine choices' }).click()
        await page.getByRole('link').filter({ hasText: 'orange kale' }).click()
        await page.getByRole('link').filter({ hasText: 'cheesecake' }).click()

        await page.getByRole('link').filter({ hasText: 'marmot' }).click()

        await page.getByRole('link').filter({ hasText: 'elm' }).click()
        cy.contains('elm (selected)')
        cy.reload()
        cy.contains('elm (selected)')
    })
})
