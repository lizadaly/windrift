describe('Exercises the API endpoints', () => {
    const api = '/api/core/story/tic-tac-toe'
    let instanceId, player1Id, player2Id

    it('Starts the tic-tac-toe demo game through the API', () => {
        cy.request('POST', `${api}/init`).then((resp) => {
            expect(resp.status).to.eq(201)
            expect(resp.body).to.have.property('story')
            expect(resp.body.instance).to.have.property('id')
            instanceId = resp.body.instance.id
            player1Id = resp.body.player1.id
            player2Id = resp.body.player2.id
        })
    })
    it('Returns 404 when no presence is available for another player', () => {
        cy.request({
            url: `${api}/${instanceId}/presence?playerId=${player1Id}`,
            failOnStatusCode: false
        }).then((resp) => {
            expect(resp.status).to.eq(404)
        })
    })
    it('Creates a presence entry for a player', () => {
        cy.request({
            url: `${api}/${instanceId}/presence`,
            body: {
                playerId: player2Id
            },
            method: 'POST'
        }).then((resp) => {
            expect(resp.status).to.eq(201)
        })
    })
    it('Returns presence info for another player', () => {
        cy.request({
            url: `${api}/${instanceId}/presence?playerId=${player1Id}`
        }).then((resp) => {
            expect(resp.status).to.eq(200)
            expect(resp.body.player.id).to.equal(player2Id)
        })
    })
    it('Makes a choice for a player', () => {
        cy.request({
            url: `${api}/${instanceId}/choose`,
            body: {
                id: undefined,
                option: 'X',
                playerId: player1Id,
                tag: '1x1'
            },
            method: 'POST'
        }).then((resp) => {
            expect(resp.status).to.eq(201)
        })
    })
    it("Retrieves another player's choices", () => {
        cy.request({
            url: `${api}/${instanceId}/listen?playerId=${player2Id}`
        }).then((resp) => {
            expect(resp.status).to.eq(200)
            expect(resp.body.length).to.equal(1) // This returns an array
            expect(resp.body[0].playerId).to.equal(player1Id)
            expect(resp.body[0].tag).to.equal('1x1')
            expect(resp.body[0].option).to.equal('X')
        })
    })
})
