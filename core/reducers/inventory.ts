import undoable, { groupByActionTypes } from 'redux-undo'
import cloneDeep from 'lodash.clonedeep'

import {
    Inventory, UpdateInventoryTypes, UPDATE_INVENTORY
} from '../types'


export const inventoryReducer = (
    state: Inventory = {},
    action: UpdateInventoryTypes,
): Inventory => {
    switch (action.type) {
        case UPDATE_INVENTORY: {
            if (action.sel === undefined && action.tag in state) {
                // no op, leave the current value alone
            } else {
                state[action.tag] = action.sel
            }
            return cloneDeep(state)
        }
        default:
            return state
    }
}
export default undoable(inventoryReducer)
