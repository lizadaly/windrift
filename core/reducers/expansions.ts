import undoable from 'redux-undo'
import { Expansions, SetExpansionsType, SET_EXPANSIONS } from '../types'

const initialState: Expansions = []


export const expansions = (state = initialState, action: SetExpansionsType): Expansions => {
    switch (action.type) {
        case SET_EXPANSIONS:
            return Object.assign({}, state, action.expansions)
        default:
            return state
    }
}

export default undoable(expansions)
