import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'core/reducers'
import moment from 'moment'

const Log: React.FC = () => {
    const log = useSelector((state: RootState) => state.log)
    return (
        <div>
            {log.reverse().map((entry, i) => (
                <div key={i}>
                    {entry.tag} {entry.selection} by {}
                    {entry.player} on {moment(entry.timestamp).format('MMM Do YYYY, h:mm:ss a')}
                </div>
            ))}
        </div>
    )
}

export default Log
