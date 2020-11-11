import undoable from 'redux-undo'

import { UPDATE_STATE_COUNTER, UpdateStateCounterType } from '../types'


export const counter = (state: number = 0, action: UpdateStateCounterType): number => {
    switch (action.type) {
        case UPDATE_STATE_COUNTER:
            return state + 1
        default:
            return state
    }
}

export default undoable(counter)
