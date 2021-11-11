describe('Full test of refresh/rehydration features', () => {
    it('Checks refresh', () => {
        cy.visit('/manual')
        cy.get("a:contains('Start learning')").click()
        cy.get('a:contains("about choices")').click()
        cy.get('a:contains("ripe banana")')
        cy.get('a:contains("bulbous orange")').click()
        cy.reload()
        cy.get('a:contains("ripe banana")').should('not.exist')
        cy.get('a:contains("fine choices")').click()
        cy.get('a:contains("orange kale")').click()
        cy.get('a:contains("cheesecake")').click()

        cy.get('a:contains("marmot")').click()

        cy.get('a:contains("elm")').click()
        cy.contains('elm (selected)')
        cy.reload()
        cy.contains('elm (selected)')
    })
})
