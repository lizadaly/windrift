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
        await expect(page.getByText('too many delicious things')).toBeVisible()

        cy.get('a:contains("marmot")').click()
        await expect(page.getByRole('link').filter({ hasText: 'marmot' })).not.toBeVisible()

        cy.get('a:contains("elm")').click()
        await expect(page.getByText('elm (selected)')).toBeVisible()
        await expect(page.getByRole('link').filter({ hasText: 'Puce' })).toBeVisible()

        // useInventory
        cy.get('a:contains("displaying inventory")').click()
        await expect(page.getByText('// ripe banana')).toBeVisible()
        await expect(page.getByText('// banana')).toBeVisible()
        await expect(page.getByText('// ripe')).toBeVisible()

        // Response maps
        await expect(page.getByText('You picked a nice banana')).toBeVisible()
        await expect(page.getByText('This also matches banana')).toBeVisible()
        await expect(page.getByText('here: magenta')).toBeVisible()

        // Response none
        await expect(
            page.getByRole('complementary').filter({ hasText: 'This Choice tag was never defined' })
        ).toBeVisible()

        // When component
        await expect(page.getByText('You selected either a fruit or a tree')).toBeVisible()

        // Set/unset values
        await expect(page.getByText('Current value: undefined')).toBeVisible()
        cy.get('button:contains("Set the value")').click()
        await expect(page.getByText('Current value: pumpkin patch')).toBeVisible()
        cy.get('button:contains("Unset the value")').click()
        await expect(page.getByText('Current value: undefined')).toBeVisible()
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
        await expect(page.getByText('Your companion will be your best friend.')).toBeVisible()
        cy.get('a:contains("Start your ascent")').click()
        await expect(page.getByRole('img')).toBeVisible()
        await expect(page.getByRole('link').filter({ hasText: 'climbs up' })).not.toBeVisible()
        await expect(page.getByText('climbs up')).toBeVisible()
        await expect(page.getByText('found 1 out of 4')).not.toBeVisible()
        cy.get('a:contains("rock wall")').click()
        cy.get('a:contains("chipmunk")').click()
        await expect(page.getByText('found 1 out of 4')).toBeVisible()
        cy.get('a:contains("climbs up")').click()

        // Sample (summit)
        await expect(page.getByText('found 1 out of 4')).toBeVisible()
        await expect(page.getByRole('img')).toBeVisible()
        cy.get('a:contains("boulder")').click()
        cy.get('a:contains("snake")').click()
        await expect(page.getByText('found 2 out of 4')).toBeVisible()
        await expect(page.getByText('time to meet up with your best friend')).not.toBeVisible()

        cy.get('a:contains("bird")').click()
        await expect(page.getByText('found 3 out of 4')).toBeVisible()
        await expect(page.getByText('time to meet up with your best friend')).toBeVisible()
        cy.get('a:contains("continues north")').click()

        // Sample (descent)
        await expect(page.getByRole('img')).toBeVisible()
        cy.get('a:contains("Return to the manual")').click()
        cy.get('a:contains("continue with the next section")').click()
        // Images
        cy.get('img[src="../stories/manual/images/example1.jpg"]').should('be.visible')
        cy.get('img[src="../stories/manual/images/skyscrapers.jpg"]').should('be.visible')
        cy.get('img[src="../stories/manual/images/camera.jpg"]').should('be.visible')
        await expect(page.getByText("You haven't made a choice yet")).toBeVisible()
        cy.get('button[data-tag="image"][data-option="camera"]').click()
        await expect(page.getByText("You haven't make a choice yet")).not.toBeVisible()
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
        await expect(page.getByText('You picked ripe banana')).toBeVisible()

        // Next steps
        cy.get('a[data-option="Next steps and further resources"]').click()
        await expect(page.getByText('Next steps')).toBeVisible()
    })
})
