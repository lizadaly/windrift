import * as React from 'react'

import useChapter from 'core/hooks/use-chapter'
import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Only from 'core/multiplayer/components/only'

/**
 * Display text only if both players are present.
 * Combine with this nested @see {Only} elements to show distinct text per player.
 *
 * @param children content to be shown only if both players are present
 * @returns content to be shown only if both players are present
 */
export const Both: React.FC = ({ children }) => {
    const otherPlayerLocation = React.useContext(PlayerContext)?.presenceApiResponse?.nav?.chapterName
    const thisPlayerLocation = useChapter()?.filename

    if (thisPlayerLocation === otherPlayerLocation) {
        return <>{children}</>
    }
    return null
}

export default Both
