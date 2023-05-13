describe('Full test of browser forward/back features', () => {
    it('Checks back', () => {
        cy.visit('/manual')
        cy.get("a:contains('Start learning')").click()
        cy.get('a:contains("about choices")').click()
        cy.get('a:contains("ripe banana")').should('exist')
        cy.get('a:contains("bulbous orange")').click()
        cy.go('back')
        cy.get('a:contains("bulbous orange")').should('exist')
        // Now make a different choice
        cy.get('a:contains("ripe banana")').click()
    })
})
