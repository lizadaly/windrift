/**
 * Main container for multiplayer events. Sets up context.
 *
 */

import * as React from 'react'
import { Player } from '@prisma/client'

import Ready from 'core/multiplayer/components/ready'

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
