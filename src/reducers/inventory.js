import undoable from 'redux-undo'
import { UPDATE_INVENTORY, REPLACE_INVENTORY } from "../actions"

export const _inventory = (state={}, action) => {
  switch (action.type) {
    case REPLACE_INVENTORY:
      state[action.tag] = action.sel
      return Object.assign({}, state)

    case UPDATE_INVENTORY:
      var inv = {}
      if (action.sel === undefined && action.tag in state) {
        // no op, leave the current value alone
      }
      else {
        inv[action.tag] = action.sel
      }
      return Object.assign({}, state, inv)
    default:
      return state
  }
}
export default undoable(_inventory)
