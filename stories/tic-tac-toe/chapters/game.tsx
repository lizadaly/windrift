import { RootState } from 'core/reducers'
import { useSelector } from 'react-redux'

import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
import Board from '../components/board'

export const Page: PageType = () => {
    const { currentPlayer, instanceId } = useSelector((state: RootState) => state.multiplayer)
    const { players } = useSelector((state: RootState) => state.config)

    const log = useSelector((state: RootState) => state.log)
    let nextPlayer = players[0].name
    if (log.length > 0) {
        const last = log[log.length - 1]
        nextPlayer = players.filter((p) => p.name !== last.player)[0].name
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
                    char={currentPlayer.replace('player ', '')}
                    myTurn={nextPlayer === currentPlayer}
                />
            </Section>
        </Chapter>
    )
}
