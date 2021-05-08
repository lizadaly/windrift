import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'core/reducers'

import styles from 'public/styles/multiplayer/Presence.module.scss'

const Presence: React.FC = () => {
    const players = useSelector((state: RootState) => state.config.players)
    const { instanceId } = useSelector((state: RootState) => state.multiplayer)
    const members = []

    if (!instanceId) {
        return null
    }
    return (
        <>
            <h2>Players online</h2>
            <p>Story code: {instanceId}</p>
            <ol className={styles.userList}>
                <li>
                    <span
                        className={
                            `${players[0].name}--${instanceId}` in members
                                ? styles.active
                                : styles.inactive
                        }>
                        <span className={styles.cap}>{players[0].name}</span> is{' '}
                        {`${players[0].name}--${instanceId}` in members ? 'online' : 'offline'}
                    </span>
                </li>
                <li>
                    <span
                        className={
                            `${players[1].name}--${instanceId}` in members
                                ? styles.active
                                : styles.inactive
                        }>
                        <span className={styles.cap}>{players[1].name}</span>{' '}
                        {`${players[1].name}--${instanceId}` in members ? 'online' : 'offline'}
                    </span>
                </li>
            </ol>
        </>
    )
}

export default Presence
