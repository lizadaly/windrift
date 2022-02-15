import * as React from 'react'

import useChapter from 'core/hooks/use-chapter'

import useLocation from '../hooks/use-location'
import { usePresence } from '../hooks/use-presence'

interface Props {
    enter?: React.ReactNode
    exit?: React.ReactNode
    here?: React.ReactNode
    elsewhere?: React.ReactNode
    alone?: React.ReactNode
}
/**
 * Stateful component to track enter/exit of the other player.
 *
 * This is distinct from {Both} where the component is not stateful; content will be shown/hidden
 * regardless of player movement.
 *
 * Combine with this nested {Only} elements to show distinct text per player or to limit to only one player.
 *
 * @param enter Content to display when the other player enters.
 * @param exit Content to display when the other player exits.
 * @param here Content to display when the other player was already here when we arrived.
 * @param elsewhere Content to display when the other player is not in the room and hasn't just left.
 * @param alone Content to display when the other player is not online.
 *
 * @see {Only}
 * @see {Both}

 * @returns
 */

// TODO have this listen to an emitted Nav Change, not just the current position
export const Watch = ({ enter, exit, here, elsewhere, alone }: Props): JSX.Element => {
    const { current, other } = useLocation()

    const { isActive, lastSeen } = usePresence()

    const thisPlayerLocation = useChapter()?.filename

    const [entered, setEntered] = React.useState(false)
    const [exited, setExited] = React.useState(false)
    const [isHere, setHere] = React.useState(false)
    const [isElsewhere, setElsewhere] = React.useState(false)
    const [isAlone, setAlone] = React.useState(true)

    React.useEffect(() => {
        // If there's any location data at all...
        if (current && other) {
            // and the players have recently been in the same room...
            if (
                other.chapterName === current.chapterName &&
                current.chapterName === thisPlayerLocation
            ) {
                // and the other player arrived after me...
                if (other.createdAt > current.createdAt) {
                    // Then the other player "entered" and did not leave
                    setEntered(true)
                    setExited(false)
                    setHere(false)
                    setElsewhere(false)
                    setAlone(false)
                }
                // Both players are here (same as <Both> but convenient to have expressed this way)
                else {
                    setHere(true)
                    setEntered(false)
                    setExited(false)
                    setElsewhere(false)
                    setAlone(false)
                }
            }
            // if the other player's event was _from_ this location
            else if (
                other.from === current.chapterName &&
                current.chapterName === thisPlayerLocation
            ) {
                // and the other player left after me...
                if (other.createdAt > current.createdAt) {
                    setExited(true)
                    setEntered(false)
                    setHere(false)
                    setElsewhere(false)
                    setAlone(false)
                }
            } else if (isActive) {
                setElsewhere(true)
                setExited(false)
                setEntered(false)
                setHere(false)
                setAlone(false)
            }
        }
        if (!isActive) {
            setAlone(true)
            setExited(false)
            setEntered(false)
            setHere(false)
            setElsewhere(false)
        }
    }, [thisPlayerLocation, current, other, isActive])

    if (entered && enter) {
        return <>{enter}</>
    }
    if (exited && exit) {
        return <>{exit}</>
    }
    if (isHere && here) {
        return <>{here}</>
    }
    if (isElsewhere && elsewhere) {
        return <>{elsewhere}</>
    }
    if (isAlone && alone) {
        return <>{alone}</>
    }
    return null
}

export default Watch
