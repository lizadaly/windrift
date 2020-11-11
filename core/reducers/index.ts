import { combineReducers } from 'redux'
import inventory from './inventory'
import expansions from './expansions'
import counter from './counter'

const rootReducer = combineReducers({
    inventory,
    counter,
    expansions,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer