// Initialize the current player and other player, and set up the
// event listeners to update the current player's state based on
// changes received from the other player.
//
// This should be called inside of a PusherContext.

// Make the current and other player available as context.

import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'core/reducers'
import { gotoChapter } from 'core/actions/navigation'
import { Player } from 'core/types'
import useNavEmitter from 'core/multiplayer/hooks/use-nav-emitter'
import useChoiceListener from 'core/multiplayer/hooks/use-choice-listener'
import { STATUS_CODES } from 'http'

export interface Players {
    currentPlayer: Player
    otherPlayer: Player
}
export const PlayerContext: React.Context<Players> = React.createContext({
    currentPlayer: null,
    otherPlayer: null
})

const MultiplayerInit: React.FC = ({ children }) => {
    const { currentPlayer } = useSelector((state: RootState) => state.multiplayer)
    const toc = useSelector((state: RootState) => state.toc.present)
    const { players } = useSelector((state: RootState) => state.config)
    const dispatch = useDispatch()

    // Display our start chapter on first render only
    React.useEffect(() => {
        const visible = toc ? Object.values(toc).filter((c) => c.visible).length > 0 : false
        // if there are no visible chapters, use the player default
        if (!visible) {
            const start = players.filter((p) => p.name === currentPlayer)[0].start
            dispatch(gotoChapter(start))
        }
    }, [currentPlayer, toc])

    const otherPlayer = currentPlayer === players[0].name ? players[1].name : players[0].name
    const PlayersContext: Players = {
        currentPlayer,
        otherPlayer
    }

    // Listen for events from the other player
    useChoiceListener()

    // Emit any chapter switches to the API
    useNavEmitter()

    return (
        <>
            <PlayerContext.Provider value={PlayersContext}>{children}</PlayerContext.Provider>
        </>
    )
}
export default MultiplayerInit
