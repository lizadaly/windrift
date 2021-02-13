import { Tag } from 'core/types'

export const PICK_OPTION = 'PICK_OPTION'
export const INIT_CHOICE = 'INIT_CHOICE'
export const CLEAR_OPTIONS = 'CLEAR_OPTIONS'

export type Option = string
export type OptionGroup = Array<Option>
export type OptionsType = Array<OptionGroup>

export interface RemainingOptions {
    [tag: string]: {
        options: OptionsType
        readonly initialOptions: OptionsType
    }
}

interface OptionPickAction {
    type: typeof PICK_OPTION
    options: OptionsType
    index: number
    tag: Tag
    player?: string
}
export type OptionPickType = OptionPickAction

interface ChoiceInitAction {
    type: typeof INIT_CHOICE
    options: OptionsType
    tag: Tag
}
export type ChoiceInitType = ChoiceInitAction

interface OptionsClearAction {
    type: typeof CLEAR_OPTIONS
}

export type OptionsClearType = OptionsClearAction

export const pickOption = (
    tag: Tag,
    options: OptionsType,
    index: number,
    player?: string
): OptionPickType => {
    return {
        type: PICK_OPTION,
        options,
        index,
        tag,
        player
    }
}

export const initChoice = (tag: Tag, options: OptionsType): ChoiceInitType => {
    return {
        type: INIT_CHOICE,
        options,
        tag
    }
}

export const clearOptions = (): OptionsClearType => {
    return {
        type: CLEAR_OPTIONS
    }
}
