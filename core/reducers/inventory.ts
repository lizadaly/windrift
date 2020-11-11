import undoable from 'redux-undo'
import { Inventory, UpdateInventoryTypes, UPDATE_INVENTORY } from '../types'


export function inventoryReducer(
    state: Inventory = {},
    action: UpdateInventoryTypes,
): Inventory {
    switch (action.type) {
        case UPDATE_INVENTORY: {
            const inv: Inventory = {}
            if (action.sel === undefined && action.tag in state) {
                // no op, leave the current value alone
            } else {
                inv[action.tag] = action.sel
            }
            return Object.assign({}, state, inv)
        }
        default:
            return state
    }
}
export default undoable(inventoryReducer)
