describe('Full test of the built-in stories', () => {
    it('Runs through the demo application', () => {
        // Initial page
        cy.visit('/demo')
        cy.get('a').contains('about choices').click()

        // Select choices
        cy.get('a').contains('ripe banana').click()
        cy.get('a').contains('fine choices').click()
        cy.get('a').contains('orange kale').click()

        cy.get('a').contains('cheesecake').click()
        cy.contains('too many delicious things')
        cy.get('a').contains('the leftovers').click()
        cy.get('a').contains('cheese cart').click()
        cy.contains('enough food for a week')

        cy.get('a').contains('marmot').click()
        cy.get('a').contains('marmot').should('not.exist')

        cy.get('a').contains('elm').click()
        cy.contains('elm (selected)')
        cy.get('a').contains('Puce')

        // Cycling links
        cy.get('a').contains('Three').click()
        cy.get('a').contains('Two').click()
        cy.contains('One...')

        // useInventory
        cy.get('a').contains('displaying inventory').click()
        cy.contains('// ripe banana')
        cy.contains('// banana')
        cy.contains('// ripe ')

        // Response maps
        cy.contains('You picked a nice banana')
        cy.contains('This also matches banana')
        cy.contains('here: magenta')

        // When component
        cy.contains('You selected either a fruit or a tree')

        // Set/unset values
        cy.contains('Current value: null')
        cy.get('button').contains('Set the value').click()
        cy.contains('Current value: pumpkin patch')
        cy.get('button').contains('Unset the value').click()
        cy.contains('Current value: null')
        cy.get('a').contains('navigation...').click()

        // navigation
        cy.get('a').contains('Click me').click()
        cy.get('a').contains('no-op').click()
        cy.contains('Clicked!')
        cy.get('a').contains('Click for more').click()
    })
})
