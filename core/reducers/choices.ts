import undoable from 'redux-undo'

import { Choices, SetChoicesType, SET_CHOICES } from '../types'

export const choices = (state: Choices = [], action: SetChoicesType): Choices => {
    switch (action.type) {
        case SET_CHOICES:
            return Object.assign({}, state, action.choices)
        default:
            return state
    }
}

export default undoable(choices)
