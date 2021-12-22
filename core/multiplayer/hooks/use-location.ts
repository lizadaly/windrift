import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'core/types'
import { PlayerContext } from '../components/multiplayer-init'
import { NavEntry } from '../features/navigation'

/**
 * Get the current NavEntry for each player
 *
 */

export interface Locations {
    current: NavEntry
    other: NavEntry
}

const useLocation = (): Locations => {
    const { otherPlayer, currentPlayer } = React.useContext(PlayerContext)
    const navEntries = [...useSelector((state: RootState) => state.multiplayerNav)].reverse()
    const otherEntries = navEntries.filter((n) => n.playerName === otherPlayer.name)
    const currentEntries = navEntries.filter((n) => n.playerName === currentPlayer.name)

    const otherPlayerLocation = otherEntries.length > 0 ? otherEntries[0] : null
    const currentLocation = currentEntries.length > 0 ? currentEntries[0] : null
    return {
        current: currentLocation,
        other: otherPlayerLocation
    }
}
export default useLocation
