import { combineReducers } from 'redux'

import bookmarks from './bookmarks'
import inventory from './inventory'
import expansions from './expansions'

const gameApp = combineReducers({
  bookmarks,
  inventory,
  expansions
})

export default gameApp
