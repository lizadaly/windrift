import { Expansions, SetExpansionsType, SET_EXPANSIONS, Tag, Expansion } from '../types'


// Initialize the expansions set
export const setExpansions = (exps: Expansions, tag: Tag, currentExpansion: Expansion): SetExpansionsType => {
    const expansions: Expansions = []
    expansions[tag] = { currentExpansion, expansions: exps }
    return {
        type: SET_EXPANSIONS,
        expansions,
    }
}

