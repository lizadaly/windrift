/**
 * Randomly rotate through a list of N child nodes on a timer. Accepts luxor Duration objects for all
 * time periods.
 *
 * Items will not immediately repeat, but use as many as is reasonable to keep from obvious cycling.
 *
 *
 * @param every How frequently to show a new item from the array.
 * @param duration How long to display the current item before hiding it. Optional; if unset,
 * items will just replace without pausing.
 * @param count How many times to repeat until stopped entirely. If omitted, will cycle forever.
 *
 * @see {Duration}
 */

import * as React from 'react'

import { Duration } from 'luxon'
import { useTimeout, useInterval } from 'usehooks-ts'

interface CycleProps {
    every: Duration
    duration?: Duration
    count?: number
}

const Cycle: React.FC<CycleProps> = ({ children, every, duration, count }) => {
    const [array, setArray] = React.useState(React.Children.toArray(children))
    const [tick, setTick] = React.useState(0)

    const [item, setItem] = React.useState<React.ReactNode>(null)
    const [display, toggleDisplay] = React.useState(false)

    /** On first mount, shuffle the array */
    React.useEffect(() => {
        setArray(
            array
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
        )
    }, [])

    useInterval(() => {
        if (!count || count > tick) {
            // Pull a random item from the array that is not the last...
            const index = Math.floor(Math.random() * (array.length - 1))
            const selected = array.splice(index, 1)[0]
            setItem(selected)

            // Move the pulled item to the end of the array so it won't be picked next time...
            array.push(selected)
            toggleDisplay(true)
        } else {
            toggleDisplay(false)
        }
        setTick(tick + 1)
    }, every.as('milliseconds'))

    return (
        display && (
            <Timeout duration={duration} toggleDisplay={toggleDisplay}>
                {item}
            </Timeout>
        )
    )
}
interface TimeoutProps {
    duration: Duration
    toggleDisplay: (_: boolean) => void
    children: React.ReactNode
}

const Timeout: React.FC<TimeoutProps> = ({ duration, children, toggleDisplay }) => {
    useTimeout(() => toggleDisplay(false), duration ? duration.as('milliseconds') : null)
    return <>{children}</>
}

export default Cycle
