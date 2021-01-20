// Initialize the current player and other player, and set up the
// event listeners to update the current player's state based on
// changes received from the other player.
//
// This should be called inside of a PusherContext.

// Make the current and other player available as context.

import * as React from 'react'
import { RootState } from 'core/reducers'
import { useDispatch, useSelector } from 'react-redux'
import useChoiceListener from '../hooks/use-choice-listener'
import { gotoChapter } from 'core/actions/navigation'
import { Player } from 'core/types'

export interface Players {
    currentPlayer: Player
    otherPlayer: Player
}
export const PlayerContext: React.Context<Players> = React.createContext({
    currentPlayer: null,
    otherPlayer: null
})

const MultiplayerInit: React.FC = ({ children }) => {
    const { currentPlayer, channelName } = useSelector((state: RootState) => state.multiplayer)
    const { players } = useSelector((state: RootState) => state.config)

    const dispatch = useDispatch()

    // Display our start chapter on first render only
    React.useEffect(() => {
        const start = players.filter((p) => p.name === currentPlayer)[0].start
        dispatch(gotoChapter(start))
    }, [currentPlayer])

    const otherPlayer = currentPlayer === players[0].name ? players[1].name : players[0].name
    const PlayersContext: Players = {
        currentPlayer,
        otherPlayer
    }

    // Listen for events from the other player
    useChoiceListener(channelName, currentPlayer)

    return (
        <>
            <PlayerContext.Provider value={PlayersContext}>{children}</PlayerContext.Provider>
        </>
    )
}
export default MultiplayerInit
