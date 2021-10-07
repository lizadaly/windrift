export const UPDATE_STATE_COUNTER = 'UPDATE_STATE_COUNTER'
export const INIT_CONFIG = 'INIT_CONFIG'

export type Tag = string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function Widget(props: any): JSX.Element
export type WidgetType = typeof Widget

/* Story counter */

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
    readonly title: string
    readonly pagination: string
    readonly enableUndo: boolean
    readonly players: PlayerConfig[]
    readonly language: string

    constructor(
        identifier: string,
        title: string,
        pagination = 'scrolling',
        enableUndo = true,
        players: PlayerConfig[],
        language: string
    ) {
        this.identifier = identifier
        this.title = title
        this.pagination = pagination
        this.enableUndo = enableUndo
        this.players = players
        this.language = language
    }
}

interface InitConfigAction {
    type: typeof INIT_CONFIG
    config: Config
}
export type InitConfigType = InitConfigAction

/* Completion callbacks */
export type Callback = () => void

/* TOC and story setup */

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
