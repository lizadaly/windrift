export const UPDATE_INVENTORY = 'UPDATE_INVENTORY'
export const PICK_CHOICE = 'PICK_CHOICE'
export const INIT_CHOICE = 'INIT_CHOICE'
export const UPDATE_STATE_COUNTER = 'UPDATE_STATE_COUNTER'
export const GET_CONFIG = "GET_CONFIG"
export const INCREMENT_SECTION = 'INCREMENT_SECTION'
export const SHOW_NEXT_CHAPTER = 'SHOW_NEXT_CHAPTER'
export const COUNT_SECTION = 'COUNT_SECTION'

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

/* Choices */

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
}
export type ChoicePickType = ChoicePickAction

interface ChoiceInitAction {
    type: typeof INIT_CHOICE
    choices: ChoicesType
    tag: Tag
}
export type ChoiceInitType = ChoiceInitAction


// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function Widget(props: any): JSX.Element
export type WidgetType = typeof Widget

/* Game counter */

interface UpdateStateCounterAction {
    type: typeof UPDATE_STATE_COUNTER
    counter: number
}
export type UpdateStateCounterType = UpdateStateCounterAction

/* Section counter */
interface IncrementSectionAction {
    type: typeof INCREMENT_SECTION
    item: TocItem
}
export type IncrementSectionType = IncrementSectionAction

interface CountSectionAction {
    type: typeof COUNT_SECTION,
    item: TocItem,
    count: number
}
export type CountSectionType = CountSectionAction

/* Chapter navigation */
interface ShowNextChapterAction {
    type: typeof SHOW_NEXT_CHAPTER
    item: TocItem
}
export type ShowNextChapterType = ShowNextChapterAction


/* Config */
export class Config {
    readonly identifier: string
    readonly pagination: string
    readonly title: string
    readonly enableUndo: boolean

    constructor(title: string, pagination = "scrolling", enableUndo = true) {
        this.identifier = title.toLowerCase().replace(/ /g, "-")
        this.title = title
        this.pagination = pagination
        this.enableUndo = enableUndo
    }
}

interface GetConfigAction {
    type: typeof GET_CONFIG,
    config: Config,
}
export type GetConfigType = GetConfigAction

/* Completion callbacks */
export type Callback = () => void

/* TOC and game setup */

export interface TocItem {
    readonly filename: string
    readonly title: string
    visible: boolean
    bookmark: number,
    sectionCount: number
}
export type Toc = {
    [c: string]: TocItem
}

export type PageType = React.FC
export interface ChapterType {
    filename: string
    children: React.ReactNode
}
