import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/* Multiplayer config */
export interface Instance {
    instanceId: string
    playerName: string
    playerId: string
}

export interface InstancePayload {
    instance: Instance
}
export interface InstanceState {
    instance: Instance
}
const initialState: InstanceState = { instance: null }

export const instanceSlice = createSlice({
    name: 'multiplayer/instance',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<InstancePayload>) => {
            return action.payload
        }
    }
})
export const { init } = instanceSlice.actions

export default instanceSlice.reducer
