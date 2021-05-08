import { Tag, TocItem } from 'core/types'
import { Selection } from 'core/actions/inventory'

export const LOG_CHOICE_ACTION = 'LOG_CHOICE_ACTION'
export const LOG_NAV_ACTION = 'LOG_NAV_ACTION'

export enum ENTRY_TYPES {
    Choice = 'CHOICE',
    Nav = 'NAV'
}
interface LogEntry {
    id: string
    timestamp: Date
    playerName?: string
    entry: ENTRY_TYPES
}
export type LogEntryType = LogEntry

export interface LoggedChoice extends LogEntry {
    tag: Tag
    selection: Selection
    entry: ENTRY_TYPES.Choice
}
export interface LoggedNav extends LogEntry {
    filename: TocItem['filename']
    entry: ENTRY_TYPES.Nav
}

// Actions

interface LogChoice {
    type: typeof LOG_CHOICE_ACTION
    entry: LoggedChoice
}
interface LogNav {
    type: typeof LOG_NAV_ACTION
    entry: LoggedNav
}
export type LogActionType = LogChoice | LogNav

export const logChoice = (entry: LoggedChoice): LogActionType => {
    return {
        type: LOG_CHOICE_ACTION,
        entry
    }
}
export const logNav = (entry: LoggedNav): LogActionType => {
    return {
        type: LOG_NAV_ACTION,
        entry
    }
}
