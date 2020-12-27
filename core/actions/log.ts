import { LogActionType, LOG_ACTION, Selection, Tag } from 'core/types'


export const logAction = (tag: Tag, selection: Selection, timestamp: Date, player?: number): LogActionType => {
    return {
        type: LOG_ACTION,
        tag,
        selection,
        timestamp,
        player
    }
}
