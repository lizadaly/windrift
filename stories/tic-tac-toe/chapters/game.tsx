import { RootState } from 'core/types'
import { useSelector } from 'react-redux'

import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
import Board from '../components/board'
import { MultiplayerContext } from 'core/multiplayer/components/multiplayer'
import React from 'react'

const playerWins = (arr: string[], player: string) => arr.every((val) => val === player)

export const Page: PageType = () => {
    const { currentPlayer, otherPlayer } = React.useContext(MultiplayerContext).multiplayer

    const inventory = useSelector((state: RootState) => state.inventory.present)

    const { log } = useSelector((state: RootState) => state.log)

    let nextPlayer = currentPlayer.name === 'player X' ? currentPlayer : otherPlayer

    if (log.length > 0) {
        const last = log[log.length - 1]
        nextPlayer = [currentPlayer, otherPlayer].filter((p) => p.name !== last.playerName)[0]
    }
    // is the game complete?
    let movesLeft = 9 - Object.values(inventory).filter((v) => v != null).length

    // Check for a winner
    let xWinner = false
    let oWinner = false
    let winner = null

    const rows = [1, 2, 3]
    const cols = [1, 2, 3]

    for (const row of rows) {
        const rowItems: string[] = []
        const colItems: string[] = []
        for (const col of cols) {
            rowItems.push(inventory[`${row}x${col}`])
            colItems.push(inventory[`${col}x${row}`])
        }
        xWinner = xWinner || playerWins(rowItems, 'X') || playerWins(colItems, 'X')
        oWinner = oWinner || playerWins(rowItems, 'O') || playerWins(colItems, 'O')
    }
    // diags
    xWinner = xWinner || playerWins([inventory[`1x1`], inventory[`2x2`], inventory[`3x3`]], 'X')
    xWinner = xWinner || playerWins([inventory[`3x1`], inventory[`2x2`], inventory[`1x3`]], 'X')
    oWinner = oWinner || playerWins([inventory[`1x1`], inventory[`2x2`], inventory[`3x3`]], 'O')
    oWinner = oWinner || playerWins([inventory[`3x1`], inventory[`2x2`], inventory[`1x3`]], 'O')

    if (xWinner) {
        winner = 'Player X wins.'
        movesLeft = 0
        nextPlayer = null
    } else if (oWinner) {
        winner = 'Player O wins.'
        movesLeft = 0
        nextPlayer = null
    } else if (movesLeft === 0) {
        winner = 'It was a tie.'
        nextPlayer = null
    }
    const completionMessage = `There ${movesLeft === 1 ? 'is' : 'are'} ${movesLeft} move${
        movesLeft === 1 ? '' : 's'
    }  left.`

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

                <p>
                    {nextMessage}
                    {completionMessage}
                </p>
                <Board
                    char={currentPlayer.name.replace('player ', '')}
                    myTurn={nextPlayer === currentPlayer}
                />
            </Section>
        </Chapter>
    )
}
