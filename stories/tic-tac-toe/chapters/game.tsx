import { RootState } from 'core/reducers'
import { useSelector } from 'react-redux'

import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
import Board from '../components/board'

export const Page: PageType = () => {
    const { currentPlayer, otherPlayer } = useSelector((state: RootState) => state.multiplayer)

    const log = useSelector((state: RootState) => state.log)
    console.log(currentPlayer.name)
    let nextPlayer = currentPlayer.name === 'player X' ? currentPlayer : otherPlayer

    if (log.length > 0) {
        const last = log[log.length - 1]
        nextPlayer = [currentPlayer, otherPlayer].filter((p) => p.name !== last.playerName)[0]
    }
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

                <p>It is {currentPlayer === nextPlayer ? 'your' : "the other player's"} turn.</p>

                <Board
                    char={currentPlayer.name.replace('player ', '')}
                    myTurn={nextPlayer === currentPlayer}
                />
            </Section>
        </Chapter>
    )
}
