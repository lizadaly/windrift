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
import { emitPresence, getStoryInstance } from '../api-client'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import { useRouter } from 'next/router'

export interface Multiplayer {
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
    const [multiplayer, setMultiplayer] = React.useState<Multiplayer>({
        storyUrl: null,
        instanceId: null,
        currentPlayer: null,
        otherPlayer: null,
        ready: false
    })
    const { instance } = useSelector((state: RootState) => state.instance)
    const { identifier } = React.useContext(StoryContext).config
    const router = useRouter()

    const hydrate = async (instanceId: string, playerId: string) => {
        setMultiplayer(await getStoryInstance(identifier, instanceId, playerId))
        emitPresence(identifier, instanceId, playerId)
    }

    /** Rehydrate the game from the local store */
    React.useEffect(() => {
        if (instance && !multiplayer.ready) {
            hydrate(instance.instanceId, instance.playerId)
        }
    }, [instance])

    /** Instantiate the game from an inbound link from the other player */
    React.useEffect(() => {
        const { instance, playerId } = router.query
        if (instance && playerId) {
            hydrate(instance as string, playerId as string)
        }
    }, [router.query])

    return (
        <MultiplayerContext.Provider
            value={{
                multiplayer,
                setMultiplayer
            }}>
            <Ready>{children}</Ready>
        </MultiplayerContext.Provider>
    )
}

export default Multiplayer
