import { test } from '@playwright/test'

test.describe('Check the main index page', () => {
    test('There should be an active default index page that lists the installed stories', () => {
        cy.visit('/')
        cy.get("a:contains('stone-harbor-pt')").click()
    })
})
