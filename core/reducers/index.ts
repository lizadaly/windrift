import { combineReducers } from 'redux'
import inventory from './inventory'
import choices from './choice'
import counter from './counter'
import config from './config'
import toc from './toc'
import multiplayer from './multiplayer'
import log from './log'

const rootReducer = combineReducers({
    inventory,
    counter,
    choices,
    config,
    toc,
    multiplayer,
    log
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
