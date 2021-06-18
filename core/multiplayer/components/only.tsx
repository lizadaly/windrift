// Render a block only if the current player matches the player name. If
// `alone` is true, don't render if the other player is in the current
// chapter. To render only if both players are present, nest inside a
// <Both> component and use this to limit to per-player text.

import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'core/reducers'
import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'

type Props = {
    playerName: string
    alone?: boolean
}
const Only: React.FC<Props> = ({ playerName, children, alone = false }) => {
    const { currentPlayer } = React.useContext(PlayerContext)
    const { presenceApiResponse: presence } = React.useContext(PlayerContext)
    const toc = useSelector((state: RootState) => state.toc.present)

    if (toc && presence && alone) {
        const otherPlayerLocation = presence.nav.chapterName
        const thisPlayerLocation = Object.values(toc).filter((c) => c.visible)[0].filename
        if (thisPlayerLocation === otherPlayerLocation) {
            return null
        }
    }

    return <>{playerName === currentPlayer.name ? <>{children}</> : null}</>
}

export default Only
