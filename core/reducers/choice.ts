import undoable, { excludeAction } from 'redux-undo'
import cloneDeep from 'lodash.clonedeep'

import {
    PICK_OPTION,
    INIT_CHOICE,
    CLEAR_OPTIONS,
    OptionPickType,
    RemainingOptions,
    ChoiceInitType,
    OptionsClearType
} from 'core/actions/choice'

export const choices = (
    state: RemainingOptions = {},
    action: OptionPickType | ChoiceInitType | OptionsClearType
): RemainingOptions => {
    switch (action.type) {
        case INIT_CHOICE: {
            const newState = cloneDeep(state)
            newState[action.tag] = {
                options: action.options,
                initialOptions: action.options
            }
            return newState
        }
        case CLEAR_OPTIONS:
            return state

        case PICK_OPTION: {
            const choiceState = cloneDeep(state)

            // if the choices list is empty, we're deliberately destroying this
            // choice list, so just exit early

            if (action.options.length === 0) {
                choiceState[action.tag] = {
                    options: [],
                    initialOptions: state[action.tag].initialOptions
                }
                return choiceState
            }
            // toss the first choice out
            const first = action.options.slice(0, 1)[0]

            let remainder = action.options.slice(1, action.options.length)

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
                options: remainder,
                initialOptions: state[action.tag] ? state[action.tag].initialOptions : []
            }
            return choiceState
        }
        default:
            return state
    }
}

export default undoable(choices, {
    filter: excludeAction(INIT_CHOICE),
    initTypes: [CLEAR_OPTIONS]
})
