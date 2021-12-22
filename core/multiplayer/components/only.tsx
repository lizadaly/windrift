import React from 'react'

import useLocation from '../hooks/use-location'

type Props = {
    playerName: string
    alone?: boolean
}
/**
 *
 * Render a block only if the current player matches the player name. If
 * `alone` is true, don't render if the other player is in the current
 *  chapter. To render only if both players are present, nest inside a
 * @see {Both} component and use this to limit to per-player text.
 *
 * @param playerName
 * @param alone
 *
 * @see {Both}
 */
const Only: React.FC<Props> = ({ playerName, children, alone = false }) => {
    const { current, other } = useLocation()

    if (current.playerName == playerName) {
        if (alone) {
            if (current.to !== other.to) {
                return <>{children}</>
            }
        }
        return <>{children}</>
    }
    return null
}

export default Only
