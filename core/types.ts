export const UPDATE_INVENTORY = 'UPDATE_INVENTORY'
export const SET_EXPANSIONS = 'SET_EXPANSIONS'
export const UPDATE_STATE_COUNTER = 'UPDATE_STATE_COUNTER'
export const GET_CONFIG = "GET_CONFIG"
export const SHOW_NEXT_SECTION = 'SHOW_NEXT_SECTION'
export const SHOW_NEXT_CHAPTER = 'SHOW_NEXT_CHAPTER'

/* Inventory */
export type Selection = string
export type Tag = string

export interface Inventory {
    [tag: string]: string
}

interface UpdateInventoryAction {
    type: typeof UPDATE_INVENTORY
    tag: Tag,
    sel: Selection,
}
export type UpdateInventoryTypes = UpdateInventoryAction

/* Expansions */

export type Expansion = string
export type Expansions = Array<Expansion>

interface SetExpansionsAction {
    type: typeof SET_EXPANSIONS
    expansions: Expansions
}
export type SetExpansionsType = SetExpansionsAction

/* Counter */

interface UpdateStateCounterAction {
    type: typeof UPDATE_STATE_COUNTER
    counter: number
}
export type UpdateStateCounterType = UpdateStateCounterAction

/* Config */
export class Config {
    readonly identifier: string
    readonly pagination: string

    constructor(identifier: string, pagination: string) {
        this.identifier = identifier;
        this.pagination = pagination;
    }
}

interface GetConfigAction {
    type: typeof GET_CONFIG,
    config: Config,
}
export type GetConfigType = GetConfigAction

/* Navigation */
export type Chapter = number
export type Section = number

interface ShowNextChapterAction {
    type: typeof SHOW_NEXT_CHAPTER,
    chapter: Chapter
}
export type ShowNextChapterType = ShowNextChapterAction

interface ShowNextSectionAction {
    type: typeof SHOW_NEXT_SECTION,
    section: Section
}
export type ShowNextSectionType = ShowNextSectionAction
