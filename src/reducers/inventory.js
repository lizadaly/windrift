import undoable from 'redux-undo'
import { UPDATE_INVENTORY } from '../actions'

export const inventory = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_INVENTORY: {
      const inv = {}
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
export default undoable(inventory)
