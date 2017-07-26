import { combineReducers } from 'redux'

import bookmarks from './bookmarks'
import inventory from './inventory'
import expansions from './expansions'
import counter from './counter'
import config from './config'

var localReducers = {}

const gameReducers = {
  bookmarks,
  inventory,
  expansions,
  counter,
  config,
  localReducers
}

export default gameReducers
