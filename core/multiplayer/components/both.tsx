// Display text only if both players are present
// Combine with this nested Only elements to show distinct text per user
import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'core/reducers'
import { PlayerContext } from './multiplayer-init'

export const Both: React.FC = ({ children }) => {
    const { presenceApiResponse: presence } = React.useContext(PlayerContext)
    const toc = useSelector((state: RootState) => state.toc.present)
    if (toc && presence) {
        const otherPlayerLocation = presence.nav.chapterName
        const thisPlayerLocation = Object.values(toc).filter((c) => c.visible)[0].filename
        if (thisPlayerLocation === otherPlayerLocation) {
            return <>{children}</>
        }
    }
    return null
}

export default Both
