import { LogActionType, LogEntryType, LOG_CHOICE_ACTION, LOG_NAV_ACTION } from 'core/actions/log'
import cloneDeep from 'lodash.clonedeep'

const log = (state: LogEntryType[] = [], action: LogActionType): LogEntryType[] => {
    switch (action.type) {
        case LOG_CHOICE_ACTION: {
            const log = cloneDeep(state)
            log.push(action.entry)
            return log
        }
        case LOG_NAV_ACTION: {
            const log = cloneDeep(state)
            log.push(action.entry)
            return log
        }
        default:
            return state
    }
}

export default log
