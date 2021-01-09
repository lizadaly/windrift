describe('Basic demo test', () => {
    it('Loads the demo page', () => {
      cy.visit('/demo')
      cy.contains('banana').click()
      cy.contains('elm').click()
      cy.contains('a nice banana')
    })
  })