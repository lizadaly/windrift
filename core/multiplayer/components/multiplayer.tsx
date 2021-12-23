/**
 * Main container for multiplayer events. Sets up context and rehydrates the
 * instance if available in the Redux store.
 *
 */

import * as React from 'react'
import { Player } from '@prisma/client'

import Ready from 'core/multiplayer/components/ready'
import { RootState } from 'core/types'
import { useSelector } from 'react-redux'
import { emitPresence, useMultiplayer } from '../api-client'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import { useRouter } from 'next/router'
import { Instance } from '../features/instance'

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
    const { instance } = useSelector((state: RootState) => state.instance)
    const router = useRouter()

    return (
        <MultiplayerContext.Provider
            value={{
                multiplayer,
                setMultiplayer
            }}>
            {!multiplayer.ready && instance && <Rehydrate instance={instance} />}
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

/** Try rehydrating from the Redux store if not initialized */
interface RehydrateProps {
    instance: Instance
}
const Rehydrate = ({ instance }: RehydrateProps) => {
    const { setMultiplayer } = React.useContext(MultiplayerContext)
    const { identifier } = React.useContext(StoryContext).config
    const { multiplayer } = useMultiplayer(identifier, instance.instanceId, instance.playerId)

    React.useEffect(() => {
        if (multiplayer) {
            console.log('Restarting story instance from Redux store')
            setMultiplayer(multiplayer)
            emitPresence(identifier, instance.instanceId, instance.playerId)
        }
    }, [multiplayer])
    return null
}

/** Try starting it from URL query parameters if we got a player id and instance id */
interface FromRouterProps {
    instanceId: string
    playerId: string
}
const FromRouter = ({ instanceId, playerId }: FromRouterProps) => {
    const { setMultiplayer } = React.useContext(MultiplayerContext)
    const { identifier } = React.useContext(StoryContext).config
    const { multiplayer } = useMultiplayer(identifier, instanceId, playerId)

    React.useEffect(() => {
        if (multiplayer) {
            console.log('Starting story instance from URL props')
            setMultiplayer(multiplayer)
            emitPresence(identifier, instanceId, playerId)
        }
    }, [multiplayer])

    return null
}
export default Multiplayer
