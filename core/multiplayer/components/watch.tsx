import * as React from 'react'

import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'
import useChapter from 'core/hooks/use-chapter'
import { useSelector } from 'react-redux'
import { RootState } from 'core/types'
import moment from 'moment'

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

// TODO have this listen to an emitted Nav Change, not just the current position
export const Watch = ({ enter, exit }: Props): JSX.Element => {
    const navEntries = [...useSelector((state: RootState) => state.multiplayerNav)].reverse()

    const currentPlayer = React.useContext(PlayerContext).currentPlayer

    const thisPlayerLocation = useChapter()?.filename

    const [entered, setEntered] = React.useState(false)
    const [exited, setExited] = React.useState(false)

    React.useEffect(() => {
        const otherEntries = navEntries.filter((e) => e.playerName !== currentPlayer.name)
        const myEntries = navEntries.filter((e) => e.playerName === currentPlayer.name)
        const otherLocation = otherEntries.length > 0 ? otherEntries[0] : null
        const myLocation = myEntries.length > 0 ? myEntries[0] : null

        // If there's any location data at all...
        if (otherLocation && myLocation) {
            // and the players have recently been in the same room...
            if (otherLocation.to === myLocation.to && myLocation.to === thisPlayerLocation) {
                // and the other player arrived after me...
                if (moment(otherLocation.timestamp) > moment(myEntries[0].timestamp)) {
                    // Then the other player "entered" and did not leave
                    setEntered(true)
                    setExited(false)
                }
            }
            // if the other player's event was _from_ this location
            if (otherLocation.from === myLocation.to && myLocation.to === thisPlayerLocation) {
                // and the other player left after me...
                if (moment(otherLocation.timestamp) > moment(myEntries[0].timestamp)) {
                    setExited(true)
                    setEntered(false)
                }
            }
        }
    }, [thisPlayerLocation, navEntries])

    if (entered && enter) {
        return <>{enter}</>
    }
    if (exited && exit) {
        return <>{exit}</>
    }
    return null
}

export default Watch
