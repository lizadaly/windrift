import { LogActionType, LOG_ACTION, Tag } from 'core/types'
import { Selection } from 'core/actions/inventory'

export const logAction = (tag: Tag, selection: Selection, timestamp: Date, player?: number): LogActionType => {
    return {
        type: LOG_ACTION,
        tag,
        selection,
        timestamp,
        player
    }
}
