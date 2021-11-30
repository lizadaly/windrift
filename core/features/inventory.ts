import undoable, { excludeAction } from 'redux-undo'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Tag, Option } from 'core/types'

export interface InventoryState {
    [tag: Tag]: Option
}
const initialState = {} as InventoryState

interface InitInventoryPayload {
    tag: Tag
    option?: Option
}
interface UpdateInventoryPayload {
    tag: Tag
    option: Option
}

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        /* If unset, initialize the inventory with a default value which may be null and does not
        advance the history */
        init: (state, action: PayloadAction<InitInventoryPayload>) => {
            const { tag, option } = action.payload
            if (!(tag in state)) {
                state[tag] = option
            }
        },
        update: (state, action: PayloadAction<UpdateInventoryPayload>) => {
            const { tag, option } = action.payload
            if (state[tag] !== option) {
                state[tag] = option
            }
        }
    }
})
export const { update, init } = inventorySlice.actions
export default undoable(inventorySlice.reducer, {
    filter: excludeAction('inventory/init'),
    syncFilter: true
})
