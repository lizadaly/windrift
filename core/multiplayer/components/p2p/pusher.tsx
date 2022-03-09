/** Implement Pusher auth/channel subscription for P2P events. Safe to call even if
 * the Pusher channel is not enabled; it will just pass through.
 */

import * as React from 'react'
import debounce from 'lodash.debounce'

import {
    PusherProvider,
    useClientTrigger,
    useEvent,
    usePresenceChannel
} from '@harelpls/use-pusher'
import { MultiplayerContext, PUSHER_ENABLED } from '../multiplayer'
import { useSelector } from 'react-redux'
import { RootState } from 'core/types'
import { useSync } from 'core/multiplayer/api-client'

const Pusher: React.FC = ({ children }): JSX.Element => {
    const { otherPlayer } = React.useContext(MultiplayerContext).multiplayer

    // Short circuit if Pusher specifically is not enabled or if we haven't yet initialized
    if (!PUSHER_ENABLED || !otherPlayer) {
        return <>{children}</>
    }
    const config = {
        clientKey: process.env.NEXT_PUBLIC_PUSHER_KEY,
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        authEndpoint: '/api/core/auth/',
        auth: {
            params: { playerId: otherPlayer.id }
        }
    }
    return (
        <PusherProvider {...config}>
            <Listener>{children}</Listener>
        </PusherProvider>
    )
}

/** Subscribe to story channel */

const Listener: React.FC = ({ children }): JSX.Element => {
    const { instanceId, identifier } = React.useContext(MultiplayerContext).multiplayer
    const channelName = `presence-${instanceId}`
    const { channel } = usePresenceChannel(channelName)
    const trigger = useClientTrigger(channel)
    const doSync = useSync(identifier, instanceId)

    // On any choice made by this player only, indicate that they had a state change
    const triggerState = useSelector((state: RootState) => {
        return state.trigger
    })
    const triggerFunc = () => {
        console.log('Sending client choice trigger')
        trigger('client-moved', {})
        doSync(true)
    }
    const debouncedTrigger = React.useMemo(() => debounce(triggerFunc, 300), [triggerState])

    useEvent(channel, 'client-moved', () => {
        console.log('Received client choice trigger')
        doSync(true)
    })

    React.useEffect(() => {
        debouncedTrigger()
    }, [triggerState])

    return <>{children}</>
}
export default Pusher
