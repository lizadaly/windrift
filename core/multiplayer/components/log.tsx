import { useSelector } from 'react-redux'
import { RootState } from 'core/reducers'
import moment from 'moment'
import { ENTRY_TYPES, LoggedChoice } from 'core/actions/log'

const Log = (): JSX.Element => {
    const log = useSelector((state: RootState) => state.log)
    return (
        <div>
            {log
                .reverse()
                .filter((e) => e.entry === ENTRY_TYPES.Choice)
                .map((e, i) => {
                    const c = e as LoggedChoice
                    return (
                        <div key={i}>
                            {c.tag} {c.selection} by {}
                            {c.player} on {moment(c.timestamp).format('MMM Do YYYY, h:mm:ss a')}
                        </div>
                    )
                })}
        </div>
    )
}

export default Log
