import undoable, { excludeAction, groupByActionTypes } from 'redux-undo'
import cloneDeep from 'lodash.clonedeep'

import { ChoicePickType, RemainingChoices, PICK_CHOICE, INIT_CHOICE, ChoiceInitType } from '../types'

export const choices = (
    state: RemainingChoices = {},
    action: ChoicePickType | ChoiceInitType): RemainingChoices => {

    switch (action.type) {

        case INIT_CHOICE:
            const newState = cloneDeep(state)
            newState[action.tag] = action.choices
            return newState

        case PICK_CHOICE:
            const choiceState = cloneDeep(state)

            // toss the first choice out
            const first = action.choices.slice(0, 1)[0]

            let remainder = action.choices.slice(1, action.choices.length)

            // If the choice array is now empty, this is the last item, so just populate it
            // with the index
            if (remainder.length === 0) {
                console.log(`No more items, so assigning the pick of ${action.index} from ${first} as ${first[action.index]}`)

                remainder = [[first[action.index]]]
            }
            choiceState[action.tag] = remainder
            return choiceState

        default:
            return state
    }
}

export default undoable(choices, { filter: excludeAction(INIT_CHOICE) })
