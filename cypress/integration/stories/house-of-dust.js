describe('Full test of the Time Machine story', () => {
    it('Checks that the story works', () => {
        cy.visit('/playground')
        cy.get('a:contains("The House of Dust")').click()
        cy.contains('A house of').should('exist')
    })
})
