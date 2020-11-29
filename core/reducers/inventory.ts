import undoable from 'redux-undo'
import cloneDeep from 'lodash.clonedeep'

import {
    Inventory, UpdateInventoryTypes, UPDATE_INVENTORY
} from 'core/types'


export const inventoryReducer = (
    state: Inventory = {},
    action: UpdateInventoryTypes,
): Inventory => {
    switch (action.type) {
        case UPDATE_INVENTORY: {
            const invState = cloneDeep(state)
            if (action.sel === undefined && action.tag in invState) {
                // no op, leave the current value alone
            } else {
                invState[action.tag] = action.sel
            }
            return invState
        }
        default:
            return state
    }
}
export default undoable(inventoryReducer)
