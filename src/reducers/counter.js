import undoable from 'redux-undo'

import { UPDATE_STATE_COUNTER } from '../actions'

export const counter = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_STATE_COUNTER:
      return state + 1
    default:
      return state
  }
}

export default undoable(counter)
