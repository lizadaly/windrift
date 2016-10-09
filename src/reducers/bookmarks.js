import undoable from 'redux-undo'
import { SHOW_NEXT_CHAPTER, SHOW_NEXT_SECTION } from "../actions"

const INITIAL_STATE = [0]

const bookmarks = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    // Next chapter adds a new item to the array and sets its value to 0
    case SHOW_NEXT_CHAPTER:
      return [
        ...state,
        0
      ]
    case SHOW_NEXT_SECTION:
      let b = state.slice()
      b[b.length - 1] += action.increment
      return b
    default:
      return state
  }
}
export default undoable(bookmarks, {debug: true})
