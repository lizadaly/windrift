export const UPDATE_INVENTORY = 'UPDATE_INVENTORY'
export const PICK_CHOICE = 'PICK_CHOICE'
export const INIT_CHOICE = 'INIT_CHOICE'
export const UPDATE_STATE_COUNTER = 'UPDATE_STATE_COUNTER'
export const INIT_CONFIG = "INIT_CONFIG"
export const INCREMENT_SECTION = 'INCREMENT_SECTION'
export const SHOW_NEXT_CHAPTER = 'SHOW_NEXT_CHAPTER'
export const COUNT_SECTION = 'COUNT_SECTION'
export const INIT_MULTIPLAYER = 'INIT_MULTIPLAYER'
export const LOG_ACTION = "LOG_ACTION"

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
    player?: number
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
    readonly identifier: string // safe for use in keys
    readonly pagination: string
    readonly title: string
    readonly enableUndo: boolean
    readonly env: Record<string, unknown>
    constructor(identifier: string, title: string, pagination = "scrolling", enableUndo = true, env) {
        this.identifier = identifier
        this.title = title
        this.pagination = pagination
        this.enableUndo = enableUndo
        this.env = env
    }
}

interface InitConfigAction {
    type: typeof INIT_CONFIG,
    config: Config,
}
export type InitConfigType = InitConfigAction

/* Multiplayer config */
export class Multiplayer {
    clientKey: string
    cluster: string
    gameUrl: string
    channelName: string
    ready: boolean // True when all the params have been initialized
    player: number

    constructor(clientKey: string, cluster: string, channelName: string, gameUrl: string, player: number, ready: boolean) {
        this.clientKey = clientKey
        this.cluster = cluster
        this.channelName = channelName
        this.gameUrl = gameUrl
        this.ready = ready
        this.player = player
    }
}

interface InitMultiplayerAction {
    type: typeof INIT_MULTIPLAYER,
    multiplayer: Multiplayer,
}
export type InitMultiplayerType = InitMultiplayerAction

/* Game log */
// TODO something something middleware?
interface LogAction {
    type: typeof LOG_ACTION
    tag: Tag
    selection: Selection
    timestamp: Date
    player?: number
}
export type LogActionType = LogAction

export interface Log {
    tag: Tag
    selection: Selection
    timestamp: Date
    player?: number
}

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

