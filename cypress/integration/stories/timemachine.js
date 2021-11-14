describe('Full test of the Time Machine story', () => {
    it('Checks that the story works', () => {
        cy.visit('/playground')
        cy.get('a:contains("been...")').click()
        cy.get('a:contains("enticing")').click()
        cy.get('a:contains("time machine’s lever")').click()
        cy.get('a:contains("worn lever")').click()
        cy.get('a:contains("gaping open")').click()
        cy.contains('You clamber').should('exist')
    })
})
