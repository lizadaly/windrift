describe('Check the main index page', () => {
    it('There should be an active default index page that lists the installed stories', () => {
        cy.visit('/')
        cy.get("a:contains('manual')").click()
    })
})
