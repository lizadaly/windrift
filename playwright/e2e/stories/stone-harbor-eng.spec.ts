/* eslint-disable cypress/no-async-tests */
import { test } from '@playwright/test'

test.describe('Full test of the English Stone Harbor demo', () => {
    test('Checks that Stone Harbor English works', async ({ page }) => {
        await page.goto('/stone-harbor')
        await page.getByRole('link').filter({ hasText: 'clothes' }).click()
        await page.getByRole('link').filter({ hasText: 'ring' }).click()
        await page.getByRole('link').filter({ hasText: 'Nancy?' }).click()
        await page.getByRole('link').filter({ hasText: 'Nadine?' }).click()
        await page.getByRole('link').filter({ hasText: 'appearance' }).click()
        await page.getByRole('link').filter({ hasText: 'sunburn' }).click()
        cy.contains('pick up some cues')
        cy.contains('time outdoors')
        cy.contains('His ring also')
        await page.getByRole('link').filter({ hasText: 'card' }).click()
        cy.contains('which you flip over')
        await page.getByRole('link').filter({ hasText: 'glove' }).click()
        await page.getByRole('link').filter({ hasText: 'glove' }).click()
        cy.contains('and everything changes')
        cy.get('img').should('have.attr', 'alt').and('contains', 'small, cluttered')
        await page.getByRole('link').filter({ hasText: 'knickknacks' }).click()
        await page.getByRole('link').filter({ hasText: 'photograph' }).click()
        cy.contains('personal effects')
        cy.contains('You examine the picture')
        await page.getByRole('link').filter({ hasText: 'angry glove' }).click()
        cy.contains('Healey was murdered')
    })
})
