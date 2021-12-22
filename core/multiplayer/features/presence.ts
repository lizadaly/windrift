/** Handle navigation events from either player */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Presence {
    id: string
    createdAt: string
    playerName: string
}
export type PresenceState = Presence

export interface PresencePayload {
    presence: Presence
}
const initialState: PresenceState = null

export const presenceSlice = createSlice({
    name: 'multiplayer/presence',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<PresencePayload>) => {
            state = action.payload.presence
        }
    }
})
export const { set } = presenceSlice.actions

export default presenceSlice.reducer
