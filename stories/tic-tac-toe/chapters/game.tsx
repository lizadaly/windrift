import { RootState } from 'core/reducers'
import { useSelector } from 'react-redux'

import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
import Board from '../components/board'

const playerWins = (arr: string[], player: string) => arr.every((val) => val === player)

export const Page: PageType = () => {
    const { currentPlayer, otherPlayer } = useSelector((state: RootState) => state.multiplayer)
    const inventory = useSelector((state: RootState) => state.inventory.present)

    const log = useSelector((state: RootState) => state.log)

    let nextPlayer = currentPlayer.name === 'player X' ? currentPlayer : otherPlayer

    if (log.length > 0) {
        const last = log[log.length - 1]
        nextPlayer = [currentPlayer, otherPlayer].filter((p) => p.name !== last.playerName)[0]
    }
    // is the game complete?
    const movesLeft = 9 - Object.keys(inventory).length
    const completitionMessage = `There ${movesLeft === 1 ? 'is' : 'are'} ${movesLeft} move${
        movesLeft === 1 ? '' : 's'
    }  left.`

    // Pick a winner
    let xWinner = false
    let oWinner = false
    let winner = null

    if (movesLeft === 0) {
        const rows = [1, 2, 3]
        const cols = [1, 2, 3]

        for (const row of rows) {
            const rowItems: string[] = []
            for (const col of cols) {
                rowItems.push(inventory[`${row}x${col}`])
            }
            xWinner = xWinner || playerWins(rowItems, 'X')
            oWinner = oWinner || playerWins(rowItems, 'O')
        }
        // diags
        xWinner = xWinner || playerWins([inventory[`1x1`], inventory[`2x2`], inventory[`3x3`]], 'X')
        xWinner = xWinner || playerWins([inventory[`3x1`], inventory[`2x2`], inventory[`1x3`]], 'X')
        oWinner = oWinner || playerWins([inventory[`1x1`], inventory[`2x2`], inventory[`3x3`]], 'O')
        oWinner = oWinner || playerWins([inventory[`3x1`], inventory[`2x2`], inventory[`1x3`]], 'O')

        if (xWinner) {
            winner = 'Player X wins.'
        } else if (oWinner) {
            winner = 'Player O wins.'
        } else {
            winner = 'It was a tie.'
        }
    }

    const nextMessage =
        movesLeft > 0 ? (
            <p>It is {currentPlayer === nextPlayer ? 'your' : "the other player's"} turn.</p>
        ) : (
            <p>Game over. {winner}</p>
        )

    return (
        <Chapter filename="game">
            <Section>
                <style global jsx>
                    {`
                        span.selected {
                            display: none !important;
                        }
                    `}
                </style>

                <h1>Tic-Tac-Toe</h1>

                {nextMessage}
                {completitionMessage}

                <Board
                    char={currentPlayer.name.replace('player ', '')}
                    myTurn={nextPlayer === currentPlayer}
                />
            </Section>
        </Chapter>
    )
}
