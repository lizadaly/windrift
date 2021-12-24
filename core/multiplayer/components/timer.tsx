/**
 * Call to set up repeating or one-time events.
 *
 */

import * as React from 'react'

import moment from 'moment'

interface TimerProps {
    on: moment.Moment
}
const Timer: React.FC<TimerProps> = ({ children, on }) => {
    if (on) {
        return <>{children}</>
    }
    return null
}

export default Timer
