import { combineReducers } from 'redux'

import bookmarks from './bookmarks'
import inventory from './inventory'
import expansions from './expansions'
import counter from './counter'
import config from './config'

const gameApp = combineReducers({
  bookmarks,
  inventory,
  expansions,
  counter,
  config
})

export default gameApp
