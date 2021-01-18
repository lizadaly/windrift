import { Tag } from 'core/types'
import { Selection } from 'core/actions/inventory'

export const LOG_ACTION = 'LOG_ACTION'

// TODO something something middleware?
interface LogAction {
    type: typeof LOG_ACTION
    tag: Tag
    selection: Selection
    timestamp: Date
    player?: string
}
export type LogActionType = LogAction

export interface LogItem {
    tag: Tag
    selection: Selection
    timestamp: Date
    player?: string
}
export const logAction = (
    tag: Tag,
    selection: Selection,
    timestamp: Date,
    player?: string
): LogActionType => {
    return {
        type: LOG_ACTION,
        tag,
        selection,
        timestamp,
        player
    }
}
