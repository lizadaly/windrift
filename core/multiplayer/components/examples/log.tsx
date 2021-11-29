/*
    Example component for displaying the log, or action history,
    of the story. You can use the log to look back over the history
    of choices made over time.
*/
import { useSelector } from 'react-redux'
import { RootState } from 'core/types'
import moment from 'moment'
import { ENTRY_TYPES, LogEntry } from 'core/features/log'

const Log = (): JSX.Element => {
    const { log } = useSelector((state: RootState) => state.log)
    const copy = log.slice()
    return (
        <div>
            <br />
            <h3>Event log</h3>
            {copy
                .reverse()
                .filter((e) => e.entry === ENTRY_TYPES.Choice)
                .map((e, i) => {
                    const c = e as LogEntry
                    return (
                        <div key={i}>
                            {c.tag} {c.option} by {}
                            {c.playerName} on {moment(c.timestamp).format('MMM Do YYYY, h:mm:ss a')}
                        </div>
                    )
                })}
        </div>
    )
}

export default Log
