// Render a block only if the current player matches the player name
import React from 'react'

import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'

type Props = {
    playerName: string
}
const PlayerOnly: React.FC<Props> = ({ playerName, children }) => {
    const { currentPlayer } = React.useContext(PlayerContext)
    return <>{playerName === currentPlayer.name ? <>{children}</> : null}</>
}

export default PlayerOnly
