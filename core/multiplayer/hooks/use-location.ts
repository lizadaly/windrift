import React from 'react'

import { MultiplayerContext } from '../components/multiplayer'
import { useNavPoll } from '../api-client'
import { Nav } from '@prisma/client'

/**
 * Get the current NavEntry for each player
 *
 */

export interface Locations {
    current: Nav
    other: Nav
}

const useLocation = (): Locations => {
    const { otherPlayer, currentPlayer, identifier, instanceId } =
        React.useContext(MultiplayerContext).multiplayer

    let currentLocation: Nav, otherPlayerLocation: Nav

    const { navEntries } = useNavPoll(identifier, instanceId)
    if (navEntries) {
        const otherEntries = navEntries.filter((n) => n.playerId === otherPlayer.id)
        const currentEntries = navEntries.filter((n) => n.playerId === currentPlayer.id)
        otherPlayerLocation = otherEntries.length > 0 ? otherEntries[0] : undefined
        currentLocation = currentEntries.length > 0 ? currentEntries[0] : undefined
    }
    return {
        current: currentLocation,
        other: otherPlayerLocation
    }
}
export default useLocation
