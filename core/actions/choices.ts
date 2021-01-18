import { Tag } from 'core/types'

export const PICK_CHOICE = 'PICK_CHOICE'
export const INIT_CHOICE = 'INIT_CHOICE'
export const CLEAR_CHOICES = 'CLEAR_CHOICES'

export type Choice = string
export type ChoiceGroup = Array<Choice>
export type ChoicesType = Array<ChoiceGroup>

export interface RemainingChoices {
    [tag: string]: {
        choices: ChoicesType
        readonly initialChoices: ChoicesType
    }
}

interface ChoicePickAction {
    type: typeof PICK_CHOICE
    choices: ChoicesType
    index: number
    tag: Tag
    player?: string
}
export type ChoicePickType = ChoicePickAction

interface ChoiceInitAction {
    type: typeof INIT_CHOICE
    choices: ChoicesType
    tag: Tag
}
export type ChoiceInitType = ChoiceInitAction

interface ChoicesClearAction {
    type: typeof CLEAR_CHOICES
}

export type ChoicesClearType = ChoicesClearAction

export const pickChoice = (
    tag: Tag,
    choices: ChoicesType,
    index: number,
    player?: string
): ChoicePickType => {
    return {
        type: PICK_CHOICE,
        choices,
        index,
        tag,
        player
    }
}

export const initChoice = (tag: Tag, choices: ChoicesType): ChoiceInitType => {
    return {
        type: INIT_CHOICE,
        choices,
        tag
    }
}

export const clearChoices = (): ChoicesClearType => {
    return {
        type: CLEAR_CHOICES
    }
}
