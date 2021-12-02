import * as React from 'react'

import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'
import useChapter from 'core/hooks/use-chapter'

interface Props {
    enter?: React.ReactNode
    exit?: React.ReactNode
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
 * @param exist Content to display when the other player exits.
 *
 * @see {Only}
 * @see {Both}

 * @returns
 */

// TODO have this listen to an emited Nav Change, not just the current position
export const Watch = ({ enter, exit }: Props): JSX.Element => {
    const otherPlayerLocation =
        React.useContext(PlayerContext)?.presenceApiResponse?.nav?.chapterName
    const thisPlayerLocation = useChapter()?.filename
    const [isPresent, setIsPresent] = React.useState(false)

    const [entered, setEntered] = React.useState(false)
    const [exited, setExited] = React.useState(false)

    React.useEffect(() => {
        const previouslyPresent = isPresent
        const newPresent = thisPlayerLocation === otherPlayerLocation

        console.log(thisPlayerLocation, otherPlayerLocation)
        console.log(previouslyPresent, newPresent)
        // After evaluation, check the new state
        if (previouslyPresent === true && newPresent === false) {
            setExited(true)
            setEntered(false)
        } else if (previouslyPresent === false && newPresent === true) {
            setExited(false)
            setEntered(true)
        } else {
            setExited(false)
            setEntered(false)
        }
        setIsPresent(newPresent)
    }, [otherPlayerLocation, thisPlayerLocation])

    if (entered && enter) {
        return <>{enter}</>
    }
    if (exited && exit) {
        return <>{exit}</>
    }
    return null
}

export default Watch
