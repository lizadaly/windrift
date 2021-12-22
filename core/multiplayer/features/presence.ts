/** Handle navigation events from either player */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PresenceState {
    id: string
    timestamp: string
    playerName: string
}

export interface PresencePayload {
    presence: PresenceState
}
const initialState: PresenceState = null

export const presenceSlice = createSlice({
    name: 'multiplayer/presence',
    initialState,
    reducers: {
        set: (_, action: PayloadAction<PresencePayload>) => {
            const { id, timestamp, playerName } = action.payload.presence
            return {
                id,
                timestamp,
                playerName
            }
        }
    }
})
export const { set } = presenceSlice.actions

export default presenceSlice.reducer
