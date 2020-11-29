import { combineReducers } from 'redux'
import inventory from './inventory'
import choices from './choices'
import counter from './counter'
import config from './config'
import toc from './toc'
import multiplayer from './multiplayer'

const rootReducer = combineReducers({
    inventory,
    counter,
    choices,
    config,
    toc,
    multiplayer,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer