import undoable from 'redux-undo'
import { SET_EXPANSIONS } from "../actions"


export const _expansions = (state=[], action) => {
  switch (action.type) {
    case SET_EXPANSIONS:
      return Object.assign({}, state, action.expansions)
    default:
      return state
  }
}

export default undoable(_expansions)
