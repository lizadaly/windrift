/**
 * Call to set up repeating or one-time events.
 *
 */

import * as React from 'react'

import { DateTime, Duration } from 'luxon'
import { useTimeout, useInterval } from 'usehooks-ts'

interface TimerProps {
    every: Duration
    duration?: Duration
}
const Timer: React.FC<TimerProps> = ({ children, every, duration }) => {
    const [content, setContent] = React.useState(null)
    useInterval(() => {
        setContent(children)
    }, every.as('milliseconds'))
    return (
        <>
            <Timeout duration={duration} setter={setContent}>
                {content}
            </Timeout>
        </>
    )
}
interface TimeoutProps {
    duration: Duration
    setter: any
    children: React.ReactNode
}

const Timeout: React.FC<TimeoutProps> = ({ duration, setter, children }) => {
    useTimeout(() => setter(null), children && duration ? duration.as('milliseconds') : null)
    return <>{children}</>
}
export default Timer
