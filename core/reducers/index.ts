import { combineReducers } from 'redux'
import inventory from './inventory'
import choices from './choices'
import counter from './counter'
import config from './config'
import toc from './toc'
import multiplayer from './multiplayer'
import log from './log'
import { INIT_STATE } from 'core/actions/init'

const appReducer = combineReducers({
    inventory,
    counter,
    choices,
    config,
    toc,
    multiplayer,
    log
})
const rootReducer = (state: any, action: any) => {
    if (action.type == INIT_STATE) {
        state = undefined
    }
    return appReducer(state, action)
}
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer