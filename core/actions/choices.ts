import { ChoicePickType, ChoicesType, PICK_CHOICE, Tag } from '../types'


export const pickChoice = (tag: Tag, choices: ChoicesType, index: number): ChoicePickType => {
    return {
        type: PICK_CHOICE,
        choices,
        index,
        tag,
    }
}

