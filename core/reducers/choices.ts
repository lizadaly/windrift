import undoable from 'redux-undo'

import { ChoicePickType, ChoicePick, PICK_CHOICE } from '../types'

export const choices = (state: ChoicePick = null, action: ChoicePickType): ChoicePick => {
    switch (action.type) {
        case PICK_CHOICE:
            return {
                ...action
            }
        default:
            return state
    }
}

export default undoable(choices)
