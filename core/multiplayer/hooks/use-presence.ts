/** Binary online/offline detection for the other player.
 *
 * Will use a WebSocket presence channel if available;
 * otherwise fall back to checking the polled status.
 *
 * @see Watch
 */

import * as React from 'react'
import { DateTime } from 'luxon'
import { usePresenceChannel } from '@harelpls/use-pusher'

import { usePresencePoll } from '../api-client'
import { MultiplayerContext, P2P_ENABLED } from '../components/multiplayer'

const RECENCY_WINDOW = DateTime.now().minus({ minutes: 10 })

export interface PresenceData {
    isActive: boolean
    lastSeen: DateTime
}

export const usePresence = (): PresenceData => {
    const { otherPlayer, instanceId, identifier } = React.useContext(MultiplayerContext).multiplayer
    const channelName = `presence-${instanceId}`

    const { presence, isLoading, isError } = usePresencePoll(identifier, instanceId, otherPlayer)
    const { members, myID } = usePresenceChannel(channelName)

    const response = {
        isActive: false,
        lastSeen: undefined
    }
    if (!otherPlayer) {
        return response
    }

    if (isLoading || isError) {
        return response
    }

    const lastSeen = DateTime.fromJSDate(presence.updatedAt)
    let isActive = false

    if (!P2P_ENABLED) {
        isActive = lastSeen >= RECENCY_WINDOW
    } else {
        isActive = Object.entries(members).filter(([id]) => id !== myID).length === 1
    }

    return {
        isActive,
        lastSeen
    }
}
