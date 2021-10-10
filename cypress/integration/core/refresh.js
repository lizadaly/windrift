describe('Full test of refresh/rehydration features', () => {
    it('Checks refresh', () => {
        cy.visit('/demo')
        cy.get('a').contains('ripe banana')
        cy.get('a').contains('bulbous orange').click()
        cy.reload()
        cy.get('a').contains('ripe banana').should('not.exist')
        cy.get('a').contains('elm').click()
        cy.contains('elm (selected)')
        cy.reload()
        cy.contains('elm (selected)')
    })
})
