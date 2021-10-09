import undoable from 'redux-undo'
import { Tag } from 'core/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
