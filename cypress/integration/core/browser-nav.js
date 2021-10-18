describe('Full test of browser forward/back features', () => {
    it('Checks back', () => {
        cy.visit('/demo')
        cy.get('a').contains('about choices').click()
        cy.get('a').contains('ripe banana')
        cy.get('a').contains('bulbous orange').click()
        cy.go('back')
        cy.get('a').contains('bulbous orange')
        // Now make a different choice
        cy.get('a').contains('ripe banana').click()
    })
})
