import { expect, test } from '@playwright/test'

test.describe('Full test of the built-in stories', () => {
    test('Runs through the manual application', async ({ page }) => {
        // Initial page
        await page.goto('/manual')
        await expect(page.getByText('Introduction')).toBeVisible()
        cy.get("a:contains('Start learning')").click()
        cy.get("a:contains('about choices')").click()

        // Ensure no new sections are unspooled yet
        await expect(page.getByRole('link').filter({ hasText: 'fine choices' })).not.toBeVisible()

        // Select choices
        cy.get('a:contains("ripe banana")').click()
        cy.get('a:contains("fine choices")').click()
        cy.get('a:contains("orange kale")').click()

        cy.get('a:contains("cheesecake")').click()
        cy.contains('too many delicious things')

        cy.get('a:contains("marmot")').click()
        await expect(page.getByRole('link').filter({ hasText: 'marmot' })).not.toBeVisible()

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

        // Response none
        await expect(
            page.getByRole('complementary').filter({ hasText: 'This Choice tag was never defined' })
        ).toBeVisible()

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
        await expect(page.getByText('Clicked!')).toBeVisible()
        cy.get('a:contains("Click for more")').click()
        cy.get('a:contains("example story")').click()

        // Sample (ascent)
        cy.get('a:contains("sample story")').click()
        cy.get('a:contains("your best friend")').click()
        cy.contains('Your companion will be your best friend.')
        cy.get('a:contains("Start your ascent")').click()
        cy.get('img').should('be.visible')
        await expect(page.getByRole('link').filter({ hasText: 'climbs up' })).not.toBeVisible()
        await expect(page.getByText('climbs up')).toBeVisible()
        cy.contains('found 1 out of 4').should('not.exist')
        cy.get('a:contains("rock wall")').click()
        cy.get('a:contains("chipmunk")').click()
        await expect(page.getByText('found 1 out of 4')).toBeVisible()
        cy.get('a:contains("climbs up")').click()

        // Sample (summit)
        await expect(page.getByText('found 1 out of 4')).toBeVisible()
        cy.get('img').should('be.visible')
        cy.get('a:contains("boulder")').click()
        cy.get('a:contains("snake")').click()
        await expect(page.getByText('found 2 out of 4')).toBeVisible()
        cy.contains('time to meet up with your best friend').should('not.exist')

        cy.get('a:contains("bird")').click()
        await expect(page.getByText('found 3 out of 4')).toBeVisible()
        await expect(page.getByText('time to meet up with your best friend')).toBeVisible()
        cy.get('a:contains("continues north")').click()

        // Sample (descent)
        cy.get('img').should('be.visible')
        cy.get('a:contains("Return to the manual")').click()
        cy.get('a:contains("continue with the next section")').click()
        // Images
        cy.get('img[src="../stories/manual/images/example1.jpg"]').should('be.visible')
        cy.get('img[src="../stories/manual/images/skyscrapers.jpg"]').should('be.visible')
        cy.get('img[src="../stories/manual/images/camera.jpg"]').should('be.visible')
        await expect(page.getByText("You haven't made a choice yet")).toBeVisible()
        cy.get('button[data-tag="image"][data-option="camera"]').click()
        cy.contains("You haven't made a choice yet").should('not.exist')
        await expect(page.getByText('You chose camera')).toBeVisible()
        await expect(page.getByText("You haven't made a final choice yet")).toBeVisible()
        cy.get('button[data-tag="image-once"][data-option="skyscrapers"]').click()
        await expect(page.getByText('You chose skyscrapers')).toBeVisible()
        cy.get('button[data-tag="image-once"].windrift--image-choice-chooseable-true').should(
            'not.exist'
        )
        cy.get('a:contains("Explore how to")').click()

        await expect(page.getByText('Layout, styling, and animation')).toBeVisible()

        // Browser testing
        cy.get('a:contains("browser testing")').click()
        await expect(page.getByText('Testing')).toBeVisible()
        cy.get('a:contains("How to deploy")').click()

        // Deploying
        await expect(page.getByText('Deploying your story')).toBeVisible()
        cy.get('a:contains("How to write in Markdown")').click()

        // Markdown
        cy.get('a:contains("ripe banana")').click()
        cy.contains('You picked ripe banana')

        // Next steps
        cy.get('a[data-option="Next steps and further resources"]').click()
        await expect(page.getByText('Next steps')).toBeVisible()
    })
})
