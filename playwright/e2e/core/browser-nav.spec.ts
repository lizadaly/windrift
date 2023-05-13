import { test } from '@playwright/test'

test.describe('Full test of browser forward/back features', () => {
    test('Checks back', async ({ page }) => {
        await page.goto('/manual')
        //cy.visit('/manual')
        await page.getByRole('link').filter({ hasText: 'Start learning' }).click()
        //cy.get("a:contains('Start learning')").click()
        await page.getByRole('link').filter({ hasText: 'about choices' }).click()
        //cy.get('a:contains("about choices")').click()
        cy.get('a:contains("ripe banana")').should('exist')
        await page.getByRole('link').filter({ hasText: 'bulbous orange' }).click()
        //cy.get('a:contains("bulbous orange")').click()
        cy.go('back')
        cy.get('a:contains("bulbous orange")').should('exist')
        // Now make a different choice
        await page.getByRole('link').filter({ hasText: 'ripe banana' }).click()
        //cy.get('a:contains("ripe banana")').click()
    })
})
