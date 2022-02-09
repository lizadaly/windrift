/** Implement Pusher auth/channel subscription for P2P events */

import * as React from 'react'
import debounce from 'lodash.debounce'

import {
    PusherProvider,
    useClientTrigger,
    useEvent,
    usePresenceChannel
} from '@harelpls/use-pusher'
import { MultiplayerContext } from '../multiplayer'
import { useSelector } from 'react-redux'
import { RootState } from 'core/types'
import { syncBuiltinESMExports } from 'module'
import { useSync } from 'core/multiplayer/api-client'

const Pusher: React.FC = ({ children }): JSX.Element => {
    const { otherPlayer } = React.useContext(MultiplayerContext).multiplayer

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
    const { instanceId, identifier, otherPlayer } = React.useContext(MultiplayerContext).multiplayer
    const channelName = `presence-${instanceId}`
    const { channel } = usePresenceChannel(channelName)
    const trigger = useClientTrigger(channel)
    const doSync = useSync(identifier, instanceId, otherPlayer)

    // On any choice made by this player, indicate that they had a state change
    // TODO this will also fire on propagated changes; do we care?
    const choice = useSelector((state: RootState) => {
        return state.choices.present
    })
    const triggerFunc = () => {
        console.log('Sending client-moved')
        trigger('client-moved', {})
    }
    const debouncedTrigger = React.useMemo(() => debounce(triggerFunc, 300), [choice])

    useEvent(channel, 'client-moved', ({ data }) => {
        console.log('Got client-moved event')
        doSync(true)
    })

    React.useEffect(() => {
        debouncedTrigger()
    }, [choice])

    return <>{children}</>
}
export default Pusher
