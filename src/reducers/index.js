import { combineReducers } from 'redux'
import { SHOW_NEXT_CHAPTER, SHOW_NEXT_SECTION, UPDATE_INVENTORY,
         SET_EXPANSIONS, UPDATE_STATE_COUNTER, UPDATE_DECK, UPDATE_HANDS, UPDATE_CHOSEN } from "../actions"

function bookmarks(state=[0], action) {
  switch (action.type) {
    // Next chapter adds a new item to the array and sets its value to 0
    case SHOW_NEXT_CHAPTER:
      return [
        ...state,
        0
      ]
    case SHOW_NEXT_SECTION:
      let b = state.slice()
      b[b.length - 1] += 1
      return b
    default:
      return state
  }
}

function inventory(state={}, action) {
  switch (action.type) {
    case UPDATE_INVENTORY:
      var inv = {}
      if (action.sel === undefined && ! action.tag in state) {
        inv[action.tag] = undefined
      }
      else if (action.sel === undefined && action.tag in state) {
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

function expansions(state=[], action) {
  switch (action.type) {
    case SET_EXPANSIONS:
      return Object.assign({}, state, action.expansions)
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

function deck(state=[], action) {
  switch (action.type) {
    case UPDATE_DECK:
      return action.deck || state // Replace the previous deck entirely
    default:
      return state
  }
}
function hands(state=[], action) {
  switch (action.type) {
    case UPDATE_HANDS:
      return [...state, action.hands] // Just add the new set of hands
    default:
      return state
  }
}
function chosen(state=[], action) {
  switch (action.type) {
    case UPDATE_CHOSEN:
      return [...state, action.chosen] // Add the chosen card
    default:
      return state
  }
}

export const gameApp = combineReducers({
  bookmarks,
  inventory,
  expansions,
  counter,
  deck,
  hands,
  chosen
})
