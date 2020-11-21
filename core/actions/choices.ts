import { ChoicePickType, PICK_CHOICE, Tag } from '../types'


export const pickChoice = (tag: Tag, index: number): ChoicePickType => {
    return {
        type: PICK_CHOICE,
        tag,
        index,

    }
}

