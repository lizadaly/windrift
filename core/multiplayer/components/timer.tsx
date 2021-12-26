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
export const TimerContext = React.createContext(0)

const Timer: React.FC<TimerProps> = ({ children, every, duration }) => {
    const [content, setContent] = React.useState(null)
    const [tick, setTick] = React.useState(0)

    useInterval(() => {
        setContent(children)
        setTick(tick + 1)
    }, every.as('milliseconds'))
    return (
        <TimerContext.Provider value={tick}>
            <Timeout duration={duration} setter={setContent}>
                {content}
            </Timeout>
        </TimerContext.Provider>
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
