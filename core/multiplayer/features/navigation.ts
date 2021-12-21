/** Handle navigation events from either player */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/** Similar interface to a LogEntry but nav-only */
export interface NavEntry {
    id: string
    timestamp: string
    playerName: string
    from?: string
    to: string
}
export type NavEntryState = NavEntry[]

export interface NavEntryPayload {
    entry: NavEntry
}
const initialState: NavEntryState = []

export const navEntrySlice = createSlice({
    name: 'multiplayer/navigation',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<NavEntryPayload>) => {
            state.push(action.payload.entry)
        }
    }
})
export const { add } = navEntrySlice.actions

export default navEntrySlice.reducer
