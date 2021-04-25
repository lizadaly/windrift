import { RootState } from 'core/reducers'
import { useSelector } from 'react-redux'
import { usePresenceChannel } from '@harelpls/use-pusher'

import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
import Board from '../components/board'

export const Page: PageType = () => {
    const { currentPlayer, instanceId } = useSelector((state: RootState) => state.multiplayer)
    const { players } = useSelector((state: RootState) => state.config)

    const { members } = usePresenceChannel(instanceId)
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

                {Object.entries(members).length < 2 && (
                    <p>
                        Both players need to be online to continue the game. Click the &quot;Share
                        story code&quot; button at the top to put the story code in your clipboard,
                        then send that to a friend.
                    </p>
                )}
                {Object.entries(members).length === 2 && (
                    <Board
                        char={currentPlayer.replace('player ', '')}
                        myTurn={nextPlayer === currentPlayer}
                    />
                )}
            </Section>
        </Chapter>
    )
}
