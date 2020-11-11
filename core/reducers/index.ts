import { combineReducers } from 'redux'
import inventory from './inventory'
import expansions from './expansions'
import counter from './counter'
import config from './config'

const rootReducer = combineReducers({
    inventory,
    counter,
    expansions,
    config,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer