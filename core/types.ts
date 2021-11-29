/* Re-export common types */

export type { Option, Options, OptionGroup } from 'core/features/choice'
export { ENTRY_TYPES } from 'core/features/log'
export type { RootState } from 'core/features'
export { Next } from 'core/features/navigation'
export type { NextType } from 'core/features/navigation'
export type { CounterState } from 'core/features/counter'

export type Tag = string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function Widget(props: any): JSX.Element
export type WidgetType = typeof Widget

/* Config */

export class PlayerConfig {
    readonly start: TocItem['filename']
    name?: string
}

export class Config {
    readonly identifier: string // safe for use in keys
    readonly title: string
    readonly enableUndo: boolean
    readonly players: PlayerConfig[]
    readonly language: string
    readonly extra?: Record<string, unknown>

    constructor(
        identifier: string,
        title: string,
        enableUndo = true,
        players: PlayerConfig[],
        language: string,
        extra?: Record<string, unknown>
    ) {
        this.identifier = identifier
        this.title = title
        this.enableUndo = enableUndo
        this.players = players
        this.language = language
        this.extra = extra
    }
    get isMultiplayer(): boolean {
        return this.players.length > 1
    }
}

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
