import undoable from 'redux-undo'
import cloneDeep from 'lodash.clonedeep'

import {
    Inventory, UpdateInventoryTypes, UPDATE_INVENTORY,
    CLEAR_INVENTORY, ClearInventoryTypes
} from 'core/actions/inventory'


export const inventoryReducer = (
    state: Inventory = {},
    action: UpdateInventoryTypes | ClearInventoryTypes,
): Inventory => {
    switch (action.type) {

        case CLEAR_INVENTORY:
            return state

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
