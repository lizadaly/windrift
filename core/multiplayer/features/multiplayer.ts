/** TODO consider moving this to context because it almost never changes */

import { Player } from '@prisma/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/* Multiplayer config */
export interface Multiplayer {
    storyUrl: string
    instanceId: string
    ready: boolean // True when all the params have been initialized
    currentPlayer: Player
    otherPlayer: Player
}

export interface MultiplayerPayload {
    multiplayer: Multiplayer
}
export interface MultiplayerState {
    multiplayer: Multiplayer
}
const initialState: MultiplayerState = { multiplayer: null }

export const multiplayerSlice = createSlice({
    name: 'multiplayer',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<MultiplayerPayload>) => {
            return action.payload
        }
    }
})
export const { init } = multiplayerSlice.actions

export default multiplayerSlice.reducer
