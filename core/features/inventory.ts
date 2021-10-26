import undoable from 'redux-undo'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Tag, Option } from 'core/types'

export interface InventoryState {
    [tag: Tag]: Option
}
const initialState = {} as InventoryState

interface UpdateInventoryPayload {
    tag: Tag
    option: Option
}

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<UpdateInventoryPayload>) => {
            state[action.payload.tag] = action.payload.option
        }
    }
})
export const { update } = inventorySlice.actions
export default undoable(inventorySlice.reducer)
