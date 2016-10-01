import Immutable from 'immutable'
import { combineReducers } from 'redux'
import { SHOW_NEXT_CHAPTER, SHOW_NEXT_SECTION, UPDATE_INVENTORY,
         SET_EXPANSIONS, UPDATE_STATE_COUNTER } from "../actions"

const zeroed = Immutable.List([0])

function bookmarks(state=zeroed, action) {
  switch (action.type) {
    // Next chapter adds a new item to the array and sets its value to 0,
    // so we have a new chapter, at section 0
    case SHOW_NEXT_CHAPTER:
      return state.push([0])
    // Next section simply increments the last item in the current array by 1
    case SHOW_NEXT_SECTION:
      return state.set(-1, state.last() + 1)
    default:
      return state
  }
}

function inventory(state=Immutable.Map(), action) {
  switch (action.type) {
    case UPDATE_INVENTORY:
      var inv = Immutable.Map()
      if (action.sel === undefined && ! action.tag in state) {
        inv.set(action.tag, undefined)
      }
      else if (action.sel === undefined && action.tag in state) {
        // no op, leave the current value alone
      }
      else {
        inv.set(action.tag, action.sel)
      }
      return inv.merge(state)
    default:
      return state
  }
}

function expansions(state=Immutable.Map(), action) {
  switch (action.type) {
    case SET_EXPANSIONS:
      return state.merge(action.expansions)
    default:
      return state
  }
}

function counter(state=0, action) {
  switch (action.type) {
    case UPDATE_STATE_COUNTER:
      return state + 1
    default:
      return state
  }
}

export const gameApp = combineReducers({
  bookmarks,
  inventory,
  expansions,
  counter
})
