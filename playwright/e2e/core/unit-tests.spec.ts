import { test } from '@playwright/test'

test.describe('Unit test individual features', () => {
    test('Chapters should render content before or after sections', () => {
        cy.visit('/unit-tests')
        cy.get('#leading-content').should('exist')
        cy.get('#trailing-content').should('exist')

        cy.get("a:contains('alt-wrapper-tag')").click()
        cy.get('#alt-wrapper-tag-example').should('exist')
        cy.get('#alt-wrapper-tag-example').contains('this should be wrapped').should('exist')

        cy.get("a:contains('no-wrapper-tag')").click()
        cy.get('section').contains('this should be rendered').should('exist')

        cy.get("a:contains('mdx-support.mdx')").click()
        cy.get("a:contains('ripe banana')").click()
        cy.contains('You picked ripe banana')
    })
})
