import { Selection } from './actions/inventory'

export const UPDATE_STATE_COUNTER = 'UPDATE_STATE_COUNTER'
export const INIT_CONFIG = 'INIT_CONFIG'
export const INIT_MULTIPLAYER = 'INIT_MULTIPLAYER'
export const LOG_ACTION = 'LOG_ACTION'

export type Tag = string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function Widget(props: any): JSX.Element
export type WidgetType = typeof Widget

/* Game counter */

interface UpdateStateCounterAction {
    type: typeof UPDATE_STATE_COUNTER
    counter: number
}
export type UpdateStateCounterType = UpdateStateCounterAction

/* Config */
export class Config {
    readonly identifier: string // safe for use in keys
    readonly pagination: string
    readonly title: string
    readonly enableUndo: boolean
    readonly env: Record<string, unknown>
    constructor(
        identifier: string,
        title: string,
        pagination = 'scrolling',
        enableUndo = true,
        env: Record<string, unknown>
    ) {
        this.identifier = identifier
        this.title = title
        this.pagination = pagination
        this.enableUndo = enableUndo
        this.env = env
    }
}

interface InitConfigAction {
    type: typeof INIT_CONFIG
    config: Config
}
export type InitConfigType = InitConfigAction

/* Multiplayer config */
export class Multiplayer {
    clientKey: string
    cluster: string
    authEndpoint: string
    gameUrl: string
    channelName: string
    ready: boolean // True when all the params have been initialized
    player: number

    constructor(
        clientKey: string,
        cluster: string,
        channelName: string,
        gameUrl: string,
        player: number,
        authEndpoint: string,
        ready: boolean
    ) {
        this.clientKey = clientKey
        this.cluster = cluster
        this.authEndpoint = authEndpoint
        this.channelName = channelName
        this.gameUrl = gameUrl
        this.ready = ready
        this.player = player
    }
}

interface InitMultiplayerAction {
    type: typeof INIT_MULTIPLAYER
    multiplayer: Multiplayer
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

export interface LogItem {
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
    bookmark: number
    sectionCount: number
}
export type Toc = {
    [c: string]: TocItem
}

export type PageType = React.FC
