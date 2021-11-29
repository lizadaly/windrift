import { Player } from '@prisma/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/* Multiplayer config */
export class Multiplayer {
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
const initialState: MultiplayerState = { multiplayer: new Multiplayer() }

export const multiplayerSlice = createSlice({
    name: 'multiplayer',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<MultiplayerPayload>) => {
            state.multiplayer = { ...action.payload.multiplayer }
        }
    }
})
export const { init } = multiplayerSlice.actions

export default multiplayerSlice.reducer
