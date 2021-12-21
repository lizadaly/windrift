import { combineReducers } from 'redux'
import inventory from './inventory'
import choices from './choice'
import counter from './counter'
import navigation from './navigation'
import log from './log'
import multiplayer from '../multiplayer/features/multiplayer'
import multiplayerNav from '../multiplayer/features/navigation'

const rootReducer = combineReducers({
    inventory,
    counter,
    choices,
    navigation,
    log,
    multiplayer,
    multiplayerNav
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
