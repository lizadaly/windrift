import { combineReducers } from 'redux'
import inventory from './inventory'
import choices from './choice'
import counter from './counter'
import navigation from './navigation'
import log from './log'

import instance from '../multiplayer/features/instance'

const rootReducer = combineReducers({
    inventory,
    counter,
    choices,
    navigation,
    log,
    instance
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
