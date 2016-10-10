import { combineReducers } from 'redux'

import bookmarks from './bookmarks'
import inventory from './inventory'
import expansions from './expansions'
import counter from './counter'

const gameApp = combineReducers({
  bookmarks,
  inventory,
  expansions,
  counter
})

export default gameApp
