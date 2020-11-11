import { combineReducers } from 'redux'
import inventory from './inventory'
import expansions from './expansions'

const rootReducer = combineReducers({
    inventory,
    expansions,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer