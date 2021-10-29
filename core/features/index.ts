import { combineReducers } from 'redux'
import inventory from './inventory'
import counter from './counter'
import navigation from './navigation'
import log from './log'

const rootReducer = combineReducers({
    inventory,
    counter,
    navigation,
    log
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
