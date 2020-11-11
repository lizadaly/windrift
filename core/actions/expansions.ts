import { Expansions, SetExpansionsType, SET_EXPANSIONS, Tag } from '../types'


// Initialize the expansions set
export const setExpansions = (exps: Expansions, tag: Tag, currentExpansion: number): SetExpansionsType => {
    const expansions: Expansions = []
    expansions[tag] = { currentExpansion, expansions: exps }
    return {
        type: SET_EXPANSIONS,
        expansions,
    }
}

