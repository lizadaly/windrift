import React from 'react'

import useLocation from '../hooks/use-location'
import { playerFromName } from '../utils'
import { MultiplayerContext } from './multiplayer'

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
    const player = playerFromName(playerName)

    if (current && current.playerId == player.id) {
        if (alone) {
            if (current.chapterName !== other.chapterName) {
                return <>{children}</>
            }
        }
        return <>{children}</>
    }
    return null
}

export default Only
