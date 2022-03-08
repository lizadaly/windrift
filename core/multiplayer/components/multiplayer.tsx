/**
 * Main container for multiplayer events. Sets up context and rehydrates the
 * instance if available in the Redux store.
 *
 */

import * as React from 'react'
import { Player } from '@prisma/client'

import Ready from 'core/multiplayer/components/ready'

import { emitPresence, useMultiplayer } from '../api-client'
import { StoryContext } from 'core/containers/store-container'
import { useRouter } from 'next/router'

export const PUSHER_ENABLED = !!process.env.NEXT_PUBLIC_PUSHER_KEY
export const P2P_ENABLED = PUSHER_ENABLED // TODO define more P2P handlers here
export const POLL_FREQUENCY = P2P_ENABLED ? 100000 : 10000

export interface Multiplayer {
    identifier: string
    storyUrl: string
    instanceId: string
    ready: boolean // True when all the params have been initialized
    currentPlayer: Player
    otherPlayer: Player
}

type MultiplayerSetter = React.Context<{
    multiplayer: Multiplayer
    setMultiplayer: (multiplayer: Multiplayer) => void
}>

export const MultiplayerContext: MultiplayerSetter = React.createContext({
    multiplayer: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setMultiplayer: (_: Multiplayer) => {}
})

const Multiplayer: React.FC = ({ children }) => {
    const { identifier } = React.useContext(StoryContext).config
    const [multiplayer, setMultiplayer] = React.useState<Multiplayer>({
        identifier,
        storyUrl: null,
        instanceId: null,
        currentPlayer: null,
        otherPlayer: null,
        ready: false
    })

    const router = useRouter()

    return (
        <MultiplayerContext.Provider
            value={{
                multiplayer,
                setMultiplayer
            }}>
            {!multiplayer.ready && router.query.instance && router.query.playerId && (
                <FromRouter
                    instanceId={router.query.instance as string}
                    playerId={router.query.playerId as string}
                />
            )}

            <Ready>{children}</Ready>
        </MultiplayerContext.Provider>
    )
}

interface FromRouterProps {
    instanceId: string
    playerId: string
}
const FromRouter = ({ instanceId, playerId }: FromRouterProps) => {
    const { setMultiplayer } = React.useContext(MultiplayerContext)
    const { config } = React.useContext(StoryContext)
    const { identifier } = config
    const { multiplayer } = useMultiplayer(identifier, instanceId, playerId)

    React.useEffect(() => {
        if (multiplayer) {
            setMultiplayer(multiplayer)
            emitPresence(identifier, instanceId, playerId)
        }
    }, [multiplayer])

    return null
}
export default Multiplayer
