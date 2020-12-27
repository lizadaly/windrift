import { LogActionType, LOG_ACTION, Log } from 'core/types'
import undoable from 'redux-undo'


const log = (state: Log = null, action: LogActionType): Log => {
    switch (action.type) {
        case LOG_ACTION: {
            const { tag, selection, player, timestamp } = action
            return {
                tag,
                selection,
                timestamp,
                player
            }
        }
        default:
            return state
    }
}

export default undoable(log)

