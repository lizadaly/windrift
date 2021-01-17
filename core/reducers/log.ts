import { LogActionType, LOG_ACTION, LogItem } from 'core/types'
import cloneDeep from 'lodash.clonedeep'

const log = (state: LogItem[] = [], action: LogActionType): LogItem[] => {
    switch (action.type) {
        case LOG_ACTION: {
            const { tag, selection, player, timestamp } = action
            const log = cloneDeep(state)
            log.push({
                tag,
                selection,
                timestamp,
                player
            })
            return log
        }
        default:
            return state
    }
}

export default log
