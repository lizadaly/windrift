describe('Unit test individual features', () => {
    it('Chapters should render content before or after sections', () => {
        cy.visit('/unit-tests')
        cy.get('#leading-content').should('exist')
        cy.get('#trailing-content').should('exist')
    }),
        it('It should be possible to call the render chapter function with an alternate wrapper component', () => {
            cy.visit('/unit-tests')
            cy.get("a:contains('alt-wrapper-tag')").click()
            cy.get('#alt-wrapper-tag-example').should('exist')
            cy.get('#alt-wrapper-tag-example').contains('this should be wrapped').should('exist')
        }),
        it('Chapters should render content with no wrapper', () => {
            cy.visit('/unit-tests')
            cy.get("a:contains('alt-wrapper-tag')").click()
            cy.get("a:contains('no-wrapper-tag')").click()
            cy.get('section').contains('this should be rendered').should('exist')
        })
})
