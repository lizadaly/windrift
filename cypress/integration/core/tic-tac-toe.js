describe.skip('Plays a two-player game', () => {
    const api = '/api/core/story/tic-tac-toe'
    let instanceId, player1Id, player2Id

    // Ensure these values match story.yaml exactly
    it('Creates the tic-tac-toe demo game through the API', () => {
        cy.request('POST', '/api/core/story/create/', {
            id: 'tic-tac-toe',
            title: 'Tic Tac Toe',
            player1Name: 'player X',
            player2Name: 'player O'
        })
    })
    it('Creates the tic-tac-toe chapters through the API', () => {
        cy.request('POST', '/api/core/story/chapters/', {
            id: 'tic-tac-toe',
            chapters: [
                {
                    title: 'Tic-Tac-Toe',
                    filename: 'game'
                }
            ]
        })
    })

    it('Starts the tic-tac-toe demo game through the API', () => {
        cy.request('POST', `${api}/init/`).then((resp) => {
            expect(resp.status).to.eq(201)
            expect(resp.body).to.have.property('story')
            expect(resp.body.instance).to.have.property('id')
            instanceId = resp.body.instance.id
            player1Id = resp.body.player1.id
            player2Id = resp.body.player2.id
        })
    })

    it('Starts the same game as player 2', () => {
        cy.visit(`/tic-tac-toe/?instance=${instanceId}&playerId=${player2Id}`)
        cy.get('body').first().focus()

        cy.contains("It is the other player's turn")
        cy.contains('There are 9 moves left.')
    })
    it('Submits an API move for player 1', () => {
        cy.request({
            url: `${api}/${instanceId}/choose/`,
            body: {
                id: undefined,
                option: 'X',
                playerId: player1Id,
                tag: '1x1',
                chapterName: 'game',
                synced: true,
                next: 'NONE'
            },
            method: 'POST'
        }).then((resp) => {
            expect(resp.status).to.eq(201)
        })
    })
    it('Registers the move as player 2', () => {
        cy.contains('It is your turn', { timeout: 20000 })
        cy.contains('There are 8 moves left.')
    })
    it('Makes a move as player 2', () => {
        cy.get('[data-tag="2x1"]').first().click()
        cy.contains("It is the other player's turn")
        cy.contains('There are 7 moves left.')
    })
    it('Submits an API move for player 1', () => {
        cy.request({
            url: `${api}/${instanceId}/choose/`,
            body: {
                id: undefined,
                option: 'X',
                playerId: player1Id,
                tag: '1x2',
                chapterName: 'game',
                synced: true,
                next: 'NONE'
            },
            method: 'POST'
        }).then((resp) => {
            expect(resp.status).to.eq(201)
        })
    })
    it('Makes a move as player 2', () => {
        cy.contains('It is your turn', { timeout: 20000 })
        cy.get('[data-tag="2x2"]').first().click()
        cy.contains("It is the other player's turn")
        cy.contains('There are 5 moves left.')
    })
    it('Submits an API move for player 1', () => {
        cy.request({
            url: `${api}/${instanceId}/choose/`,
            body: {
                id: undefined,
                option: 'X',
                playerId: player1Id,
                tag: '3x2',
                chapterName: 'game',
                synced: true,
                next: 'NONE'
            },
            method: 'POST'
        }).then((resp) => {
            expect(resp.status).to.eq(201)
        })
    })
    it('Makes a move as player 2', () => {
        cy.contains('It is your turn', { timeout: 20000 })
        cy.get('[data-tag="2x3"]').first().click()
        cy.contains('Game over')
        cy.contains('Player O wins.')
    })
})
