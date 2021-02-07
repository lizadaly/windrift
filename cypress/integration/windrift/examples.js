describe('Full test of the built-in stories', () => {
    it('Runs through the demo application', () => {
        cy.visit('/demo')
        cy.contains('banana').click()
        cy.contains('elm').click()
        cy.contains('a nice banana')
        cy.contains('also matches banana')

        cy.contains('Next').click()
        cy.contains('Next section').click()
        cy.contains('no-op').click()
        cy.contains('Clicked!')
        cy.contains('Click for more').click()
        cy.contains('chapter 1').click()
        cy.contains('You came here via')
        cy.contains('Go to chapter 4').click()
    })
    it('Loads the tic-tac-toe splash screen', () => {
        cy.visit('/tic-tac-toe')
        cy.contains('Start a new game')
    })
})
