import { combineReducers } from 'redux'
import inventory from './inventory'
import choices from './choice'
import counter from './counter'
import navigation from './navigation'
import log from './log'

const rootReducer = combineReducers({
    inventory,
    counter,
    choices,
    navigation,
    log
})

export default rootReducer
