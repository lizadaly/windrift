/*
    Example component for displaying the log, or action history,
    of the story. You can use the log to look back over the history
    of choices made over time.
*/
import { useSelector } from 'react-redux'
import { RootState } from 'core/types'
import { DateTime } from 'luxon'

import { LogEntry } from 'core/features/log'

const Log = (): JSX.Element => {
    const { log } = useSelector((state: RootState) => state.log)
    const copy = log.slice()
    return (
        <>
            {copy.reverse().map((e, i) => {
                const c = e as LogEntry
                const dt = DateTime.fromISO(c.timestamp).toLocal()
                return (
                    <div key={i}>
                        [{dt.toISODate()} {dt.toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET)}]{' '}
                        {c.playerName}
                        {` picked ${c.option} from ${c.tag}`}
                    </div>
                )
            })}
        </>
    )
}

export default Log
