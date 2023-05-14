import { test } from '@playwright/test'

test.describe('Check the main index page', () => {
    test('There should be an active default index page that lists the installed stories', async ({
        page
    }) => {
        await page.goto('/')
        cy.get("a:contains('stone-harbor-pt')").click()
    })
})
