import { combineReducers } from 'redux'
import inventory from './inventory'
import choices from './choice'
import counter from './counter'
import navigation from './navigation'
import log from './log'

import instance from '../multiplayer/features/instance'
import trigger from '../multiplayer/features/trigger'

const rootReducer = combineReducers({
    inventory,
    counter,
    choices,
    navigation,
    log,
    instance,
    trigger
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
