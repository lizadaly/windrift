import { Tag } from 'core/types'
import { Selection } from 'core/actions/inventory'

export const LOG_ACTION = 'LOG_ACTION'

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
export const logAction = (
    tag: Tag,
    selection: Selection,
    timestamp: Date,
    player?: number
): LogActionType => {
    return {
        type: LOG_ACTION,
        tag,
        selection,
        timestamp,
        player
    }
}
