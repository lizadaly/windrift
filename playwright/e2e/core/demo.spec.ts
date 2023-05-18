import { expect, test } from '@playwright/test'

test.setTimeout(90000)

test.describe('Full test of the built-in stories', () => {
    test('Runs through the manual application', async ({ page }) => {
        // Initial page
        await page.goto('/manual')
        await expect(page.getByText('Introduction')).toBeVisible({ timeout: 10000 })
        await page.getByRole('link').filter({ hasText: 'Start learning' }).click()
        await page.getByRole('link').filter({ hasText: 'about choices' }).click()

        // Ensure no new sections are unspooled yet
        await expect(page.getByRole('link').filter({ hasText: 'fine choices' })).not.toBeVisible()

        // Select choices
        await page.getByRole('link').filter({ hasText: 'ripe banana' }).click()
        await page.getByRole('link').filter({ hasText: 'fine choices' }).click()
        await page.getByRole('link').filter({ hasText: 'orange kale' }).click()

        await page.getByRole('link').filter({ hasText: 'cheesecake' }).click()
        await expect(
            page.getByRole('complementary').filter({ hasText: 'too many delicious things' })
        ).toBeVisible()

        await page.getByRole('link').filter({ hasText: 'marmot' }).click()
        await expect(page.getByRole('link').filter({ hasText: 'marmot' })).not.toBeVisible()

        await page.getByRole('link').filter({ hasText: 'elm' }).click()
        await expect(page.getByText('elm (selected)')).toBeVisible()
        await expect(page.getByRole('link').filter({ hasText: 'Puce' })).toBeVisible()

        // useInventory
        await page.getByRole('link').filter({ hasText: 'displaying inventory' }).click()
        await expect(page.getByText('// ripe banana')).toBeVisible()
        await expect(page.getByText('// banana')).toBeVisible()
        await expect(page.getByText('// ripe', { exact: true })).toBeVisible()

        // Response maps
        await expect(page.getByText('You picked a nice banana')).toBeVisible()
        await expect(
            page.getByRole('complementary').filter({ hasText: 'This also matches banana' })
        ).toBeVisible()
        await expect(page.getByText('here: magenta')).toBeVisible()

        // Response none
        await expect(
            page.getByRole('complementary').filter({ hasText: 'This Choice tag was never defined' })
        ).toBeVisible()

        // When component
        await expect(
            page
                .getByRole('complementary')
                .filter({ hasText: 'You selected either a fruit or a tree' })
        ).toBeVisible()

        // Set/unset values
        await expect(page.getByText('Current value: undefined')).toBeVisible()
        await page
            .getByRole('button')
            .filter({ hasText: 'Set the value', hasNotText: 'Unset' })
            .click()
        await expect(page.getByText('Current value: pumpkin patch')).toBeVisible()
        await page.getByRole('button').filter({ hasText: 'Unset the value' }).click()
        await expect(page.getByText('Current value: undefined')).toBeVisible()
        await page.getByRole('link').filter({ hasText: 'navigation...' }).click()

        // navigation
        await page.getByRole('link').filter({ hasText: 'Click me' }).click()
        await page.getByRole('link').filter({ hasText: 'no-op' }).click()
        await expect(page.getByRole('complementary').filter({ hasText: 'Clicked!' })).toBeVisible()
        await page.getByRole('link').filter({ hasText: 'Click for more' }).click()
        await page.getByRole('link').filter({ hasText: 'example story' }).click()

        // Sample (ascent)
        await page.getByRole('link').filter({ hasText: 'Begin the sample story' }).click()
        await page.getByRole('link').filter({ hasText: 'your best friend' }).click()
        await expect(page.getByText('Your companion will be your best friend.')).toBeVisible()
        await page.getByRole('link').filter({ hasText: 'Start your ascent' }).click()
        await expect(page.getByRole('img')).toBeVisible()
        await expect(page.getByRole('link').filter({ hasText: 'climbs up' })).not.toBeVisible()
        await expect(page.getByText('climbs up')).toBeVisible()
        await expect(page.getByText('found 1 out of 4')).not.toBeVisible()
        await page.getByRole('link').filter({ hasText: 'rock wall' }).click()
        await page.getByRole('link').filter({ hasText: 'chipmunk' }).click()
        await expect(page.getByText('found 1 out of 4')).toBeVisible()
        await page.getByRole('link').filter({ hasText: 'climbs up' }).click()

        // Sample (summit)
        await expect(page.getByText('found 1 out of 4')).toBeVisible()
        await expect(page.getByRole('img')).toBeVisible()
        await page.getByRole('link').filter({ hasText: 'boulder' }).click()
        await page.getByRole('link').filter({ hasText: 'snake' }).click()
        await expect(page.getByText('found 2 out of 4')).toBeVisible()
        await expect(page.getByText('time to meet up with your best friend')).not.toBeVisible()

        await page.getByRole('link').filter({ hasText: 'bird' }).click()
        await expect(page.getByText('found 3 out of 4')).toBeVisible()
        await expect(page.getByText('time to meet up with your best friend')).toBeVisible()
        await page.getByRole('link').filter({ hasText: 'continues north' }).click()

        // Sample (descent)
        await expect(page.getByRole('img')).toBeVisible()
        await page.getByRole('link').filter({ hasText: 'Return to the manual' }).click()
        await page.getByRole('link').filter({ hasText: 'continue with the next section' }).click()
        // Images
        await expect(page.locator('img[src="../stories/manual/images/example1.jpg"]')).toBeVisible()
        await expect(
            page.locator('button[data-tag="image-once"][data-option="skyscrapers"]')
        ).toBeVisible()
        await expect(
            page.locator('button[data-tag="image-once"][data-option="camera"]')
        ).toBeVisible()
        await expect(page.getByText("You haven't made a choice yet")).toBeVisible()
        await page.locator('button[data-tag="image"][data-option="camera"]').click()
        await expect(page.getByText("You haven't make a choice yet")).not.toBeVisible()
        await expect(page.getByText('You chose camera')).toBeVisible()
        await expect(page.getByText("You haven't made a final choice yet")).toBeVisible()
        await page.locator('button[data-tag="image-once"][data-option="skyscrapers"]').click()
        await expect(page.getByText('You chose skyscrapers')).toBeVisible()
        await expect(
            page.locator('button[data-tag="image-once"].windrift--image-choice-chooseable-true')
        ).not.toBeVisible()
        await page.getByRole('link').filter({ hasText: 'Explore how to' }).click()

        await expect(page.getByText('Layout, styling, and animation')).toBeVisible()

        // Browser testing
        await page.getByRole('link').filter({ hasText: 'browser testing' }).click()
        await expect(page.getByText('Testing')).toBeVisible()
        await page.getByRole('link').filter({ hasText: 'How to deploy' }).click()

        // Deploying
        await expect(page.getByText('Deploying your story')).toBeVisible()
        await page.getByRole('link').filter({ hasText: 'How to write in Markdown' }).click()

        // Markdown
        await page.getByRole('link').filter({ hasText: 'ripe banana' }).click()
        await expect(page.getByText('You picked ripe banana')).toBeVisible()

        // Next steps
        await page.locator('a[data-option="Next steps and further resources"]').click()
        await expect(
            page.getByRole('heading').filter({ hasText: 'Next steps and further resources' })
        ).toBeVisible()
    })
})
