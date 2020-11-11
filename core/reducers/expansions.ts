import undoable from 'redux-undo'
import { Expansions, SetExpansionsType, SET_EXPANSIONS } from '../types'

export const expansions = (state: Expansions = [], action: SetExpansionsType): Expansions => {
    switch (action.type) {
        case SET_EXPANSIONS:
            return Object.assign({}, state, action.expansions)
        default:
            return state
    }
}

export default undoable(expansions)
