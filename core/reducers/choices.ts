import undoable from 'redux-undo'
import cloneDeep from 'lodash.clonedeep'

import { ChoicePickType, RemainingChoices, PICK_CHOICE } from '../types'

export const choices = (state: RemainingChoices = {}, action: ChoicePickType): RemainingChoices => {

    switch (action.type) {

        case PICK_CHOICE:
            const choiceState = cloneDeep(state)

            // toss the first choice out
            const first = action.choices.shift()

            let groups = action.choices
            // If the choice array is now empty, this is the last item, so just populate it
            // with the index
            if (action.choices.length === 0) {
                console.log(`No more items, so assigning the pick of ${action.index} from ${first} as ${[first[action.index]]}`)

                groups = [[first[action.index]]]
            }
            choiceState[action.tag] = groups
            return choiceState

        default:
            return state
    }
}

export default undoable(choices)
