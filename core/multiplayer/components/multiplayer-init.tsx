// Initialize the current player and other player, and set up the
// event listeners to update the current player's state based on
// changes received from the other player.
//
// This should be called inside of a PusherContext.

// Make the current and other player available as context.

import * as React from 'react'
import { RootState } from 'core/reducers'
import { useSelector } from 'react-redux'
import useChoiceListener from '../hooks/use-choice-listener'

export interface Players {
    currentPlayer: number
    otherPlayer: number
}
export const PlayerContext: React.Context<Players> = React.createContext({
    currentPlayer: null,
    otherPlayer: null
})

const MultiplayerInit: React.FC = ({ children }) => {
    const { currentPlayer, channelName } = useSelector((state: RootState) => state.multiplayer)
    const otherPlayer = currentPlayer === 1 ? 2 : 1
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
