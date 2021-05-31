// Render a block only if the current player matches the player name
import { Player } from '@prisma/client'
import React from 'react'

import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'

type Props = {
    player: Player
}
const PlayerOnly: React.FC<Props> = ({ player, children }) => {
    const { currentPlayer } = React.useContext(PlayerContext)
    return <>{player === currentPlayer ? <>{children}</> : null}</>
}

export default PlayerOnly
