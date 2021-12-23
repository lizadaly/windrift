import * as React from 'react'

import useLocation from '../hooks/use-location'

/**
 * Display text only if both players are present.
 * Combine with this nested @see {Only} elements to show distinct text per player.
 *
 * @param children content to be shown only if both players are present
 * @returns content to be shown only if both players are present
 *
 * @see {Only}
 */
export const Both: React.FC = ({ children }) => {
    const { current, other } = useLocation()

    if (current.chapterName === other.chapterName) {
        return <>{children}</>
    }
    return null
}

export default Both
