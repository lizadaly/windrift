import undoable from 'redux-undo'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Tag } from 'core/types'

export type Selection = string
export interface InventoryState {
    [tag: Tag]: Selection
}
const initialState = {} as InventoryState

interface UpdateInventoryPayload {
    tag: Tag
    selection: Selection
}

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<UpdateInventoryPayload>) => {
            state[action.payload.tag] = action.payload.selection
        }
    }
})
export const { update } = inventorySlice.actions
export default undoable(inventorySlice.reducer)
