import undoable, { excludeAction } from 'redux-undo'
import cloneDeep from 'lodash.clonedeep'

import {
    PICK_CHOICE,
    INIT_CHOICE,
    CLEAR_CHOICES,
    ChoicePickType,
    RemainingChoices,
    ChoiceInitType,
    ChoicesClearType
} from 'core/actions/choices'

export const choices = (
    state: RemainingChoices = {},
    action: ChoicePickType | ChoiceInitType | ChoicesClearType
): RemainingChoices => {
    switch (action.type) {
        case INIT_CHOICE: {
            const newState = cloneDeep(state)
            newState[action.tag] = {
                choices: action.choices,
                initialChoices: action.choices
            }
            return newState
        }
        case CLEAR_CHOICES:
            return state

        case PICK_CHOICE: {
            const choiceState = cloneDeep(state)

            // if the choices list is empty, we're deliberately destroying this
            // choice list, so just exit early

            if (action.choices.length === 0) {
                choiceState[action.tag] = {
                    choices: [],
                    initialChoices: state[action.tag].initialChoices
                }
                return choiceState
            }
            // toss the first choice out
            const first = action.choices.slice(0, 1)[0]

            let remainder = action.choices.slice(1, action.choices.length)

            // If the choice array is now empty, this is the last item, so just populate it
            // with the index
            if (remainder.length === 0) {
                console.log(
                    `No more items, so assigning the pick of ${action.index} from ${first} as ${
                        first[action.index]
                    }`
                )

                remainder = [[first[action.index]]]
            }
            choiceState[action.tag] = {
                choices: remainder,
                initialChoices: state[action.tag] ? state[action.tag].initialChoices : []
            }
            return choiceState
        }
        default:
            return state
    }
}

export default undoable(choices, {
    filter: excludeAction(INIT_CHOICE),
    initTypes: [CLEAR_CHOICES]
})
