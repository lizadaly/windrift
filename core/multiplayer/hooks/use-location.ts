import React from 'react'

import { MultiplayerContext } from '../components/multiplayer'
import { useNavPoll } from '../api-client'
import { Nav } from '@prisma/client'
import { ChapterContext } from 'core/components/chapter'

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

    const { filename } = React.useContext(ChapterContext)

    const { navEntries } = useNavPoll(identifier, instanceId)

    // Before the API roundtrip has occurred, ensure we have local data for location checks like <Only>
    let currentLocation: Nav = {
        playerId: currentPlayer.id,
        id: 'init',
        createdAt: new Date(),
        chapterName: filename,
        from: undefined,
        instanceId
    }
    let otherPlayerLocation = undefined

    if (navEntries) {
        const otherEntries = navEntries.filter((n) => n.playerId === otherPlayer.id)
        const currentEntries = navEntries.filter((n) => n.playerId === currentPlayer.id)
        otherPlayerLocation = otherEntries.length > 0 ? otherEntries[0] : otherPlayerLocation
        currentLocation = currentEntries.length > 0 ? currentEntries[0] : currentLocation
    }
    return {
        current: currentLocation,
        other: otherPlayerLocation
    }
}
export default useLocation
