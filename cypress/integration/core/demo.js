describe('Full test of the built-in stories', () => {
    it('Runs through the manual application', () => {
        // Initial page
        cy.visit('/manual')
        cy.contains('Introduction').should('exist')
        cy.get("a:contains('Start learning')").click()
        cy.get("a:contains('about choices')").click()

        // Ensure no new sections are unspooled yet
        cy.get('a:contains("fine choices")').should('not.exist')

        // Select choices
        cy.get('a:contains("ripe banana")').click()
        cy.get('a:contains("fine choices")').click()
        cy.get('a:contains("orange kale")').click()

        cy.get('a:contains("cheesecake")').click()
        cy.contains('too many delicious things')

        cy.get('a:contains("marmot")').click()
        cy.get('a:contains("marmot")').should('not.exist')

        cy.get('a:contains("elm")').click()
        cy.contains('elm (selected)')
        cy.get('a:contains("Puce")')

        // useInventory
        cy.get('a:contains("displaying inventory")').click()
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
        cy.contains('Current value: undefined')
        cy.get('button:contains("Set the value")').click()
        cy.contains('Current value: pumpkin patch')
        cy.get('button:contains("Unset the value")').click()
        cy.contains('Current value: undefined')
        cy.get('a:contains("navigation...")').click()

        // navigation
        cy.get('a:contains("Click me")').click()
        cy.get('a:contains("no-op")').click()
        cy.contains('Clicked!').should('exist')
        cy.get('a:contains("Click for more")').click()
        cy.get('a:contains("example story")').click()

        // Sample (ascent)
        cy.get('a:contains("your best friend")').click()
        cy.contains('Your companion will be your best friend.')
        cy.get('a:contains("Start your ascent")').click()
        cy.get('img').should('be.visible')
        cy.get('a:contains("climbs up")').should('not.exist')
        cy.contains('climbs up').should('exist')
        cy.contains('found 1 out of 4').should('not.exist')
        cy.get('a:contains("rock wall")').click()
        cy.get('a:contains("chipmunk")').click()
        cy.contains('found 1 out of 4').should('exist')
        cy.get('a:contains("climbs up")').click()

        // Sample (summit)
        cy.contains('found 1 out of 4').should('exist')
        cy.get('img').should('be.visible')
        cy.get('a:contains("boulder")').click()
        cy.get('a:contains("snake")').click()
        cy.contains('found 2 out of 4').should('exist')
        cy.contains('time to meet up with your best friend').should('not.exist')

        cy.get('a:contains("bird")').click()
        cy.contains('found 3 out of 4').should('exist')
        cy.contains('time to meet up with your best friend').should('exist')
        cy.get('a:contains("continues north")').click()

        // Sample (descent)
        cy.get('img').should('be.visible')
        cy.get('a:contains("set out to meet them")').click()

        // Images
        cy.get('img[src="../stories/manual/images/example1.jpg"]').should('be.visible')
        cy.get('img[src="../stories/manual/images/skyscrapers.jpg"]').should('be.visible')
        cy.get('img[src="../stories/manual/images/camera.jpg"]').should('be.visible')
        cy.contains("You haven't made a choice yet").should('exist')
        cy.get('button[data-tag="image"][data-option="camera"]').click()
        cy.contains("You haven't made a choice yet").should('not.exist')
        cy.contains('You chose camera').should('exist')
        cy.contains("You haven't made a final choice yet").should('exist')
        cy.get('button[data-tag="image-once"][data-option="skyscrapers"]').click()
        cy.contains('You chose skyscrapers').should('exist')
        cy.get('button[data-tag="image-once"].windrift--image-choice-chooseable-true').should(
            'not.exist'
        )
        cy.get('a:contains("Explore how to")').click()

        cy.contains('Layout and styling').should('exist')

        // Browser testing
        cy.get('a:contains("browser testing")').click()
        cy.contains('Testing').should('exist')
        cy.get('a:contains("How to deploy")').click()
        cy.contains('Deploying your story').should('exist')

        cy.get('a:contains("Next steps")').click()
        cy.contains('Next steps').should('exist')
    })
})
