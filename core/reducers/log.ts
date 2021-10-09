import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Tag, TocItem } from 'core/types'
import { Selection } from 'core/reducers/inventory'

export enum ENTRY_TYPES {
    Choice = 'CHOICE',
    Nav = 'NAV'
}
export interface LogEntry {
    id: string
    timestamp: string
    entry: ENTRY_TYPES
    playerName?: string
    tag?: Tag
    selection?: Selection
    filename?: TocItem['filename']
}

export interface LogState {
    log: LogEntry[]
}
const initialState: LogState = { log: [] }

interface UpdateLogPayload {
    entry: LogEntry
}
export const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<UpdateLogPayload>) => {
            state.log.push(action.payload.entry)
        }
    }
})
export const { update } = logSlice.actions

export default logSlice.reducer
