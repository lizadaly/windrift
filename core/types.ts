export const UPDATE_STATE_COUNTER = 'UPDATE_STATE_COUNTER'
export const INIT_CONFIG = 'INIT_CONFIG'

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

export class PlayerConfig {
    readonly start: TocItem['filename']
    name?: string
}

export class Config {
    readonly identifier: string // safe for use in keys
    readonly pagination: string
    readonly title: string
    readonly enableUndo: boolean
    readonly env: Record<string, unknown>
    readonly playerNames: PlayerConfig[]

    constructor(
        identifier: string,
        title: string,
        pagination = 'scrolling',
        enableUndo = true,
        playerNames: PlayerConfig[],
        env: Record<string, unknown>
    ) {
        this.identifier = identifier
        this.title = title
        this.pagination = pagination
        this.enableUndo = enableUndo
        this.playerNames = playerNames
        this.env = env
    }
}

interface InitConfigAction {
    type: typeof INIT_CONFIG
    config: Config
}
export type InitConfigType = InitConfigAction

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
