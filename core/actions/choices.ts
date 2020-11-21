import { Choices, SetChoicesType, SET_CHOICES, Tag } from '../types'


// Initialize the expansions set
export const setChoices = (choices: Choices, tag: Tag, currentChoice: number): SetChoicesType => {
    const c: Choices = []
    c[tag] = { currentChoice, choices }
    return {
        type: SET_CHOICES,
        choices: c,
    }
}

