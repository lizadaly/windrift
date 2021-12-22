import * as React from 'react'

import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'
import useLocation from 'core/multiplayer/hooks/use-location'

import styles from 'public/styles/multiplayer/Presence.module.scss'

/**
 *
 *  Example component for displaying the presence, or current status, of other
 *   players. You will probably want to customize this for your story,
 *   for example by mapping chapter names to something meaningful in your
 *   story.

 */
const Presence: React.FC = () => {
    const { presenceApiResponse: presence } = React.useContext(PlayerContext)
    const { other } = useLocation()

    if (!presence) {
        return null
    }
    return (
        <>
            <h2>Player info</h2>
            <ol className={styles.userList}>
                <li>
                    <span className={presence.presence.createdAt ? styles.active : styles.inactive}>
                        <span className={styles.cap}>{presence.player.name}</span>

                        {other.playerName ? ` is in ${other.to}` : null}
                    </span>
                </li>
            </ol>
        </>
    )
}

export default Presence
