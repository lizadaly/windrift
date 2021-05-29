import * as React from 'react'

import styles from 'public/styles/multiplayer/Presence.module.scss'

import { PlayerContext } from './multiplayer-init'

const Presence: React.FC = () => {
    const { presence } = React.useContext(PlayerContext)
    if (!presence) {
        return null
    }
    return (
        <>
            <h2>Players online</h2>
            <ol className={styles.userList}>
                <li>
                    <span className={presence.presence.createdAt ? styles.active : styles.inactive}>
                        <span className={styles.cap}>{presence.player.name}</span> is{' '}
                        {/* {'true' === 'true' ? 'online' : 'offline'} */}
                    </span>
                </li>
            </ol>
        </>
    )
}

export default Presence
