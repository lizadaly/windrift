import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'core/reducers'
import { usePresenceChannel } from '@harelpls/use-pusher'

import styles from 'public/styles/multiplayer/Presence.module.scss'

const Presence: React.FC = () => {
    const { player1Label, player2Label, channelLabel } = useSelector(
        (state: RootState) => state.config.multiplayer
    )
    const { channelName } = useSelector((state: RootState) => state.multiplayer)
    const { members } = usePresenceChannel(channelName)

    if (!channelName) {
        return null
    }
    return (
        <>
            <h2>Players online</h2>
            <p>
                {channelLabel}: {channelName}
            </p>
            <ol className={styles.userList}>
                <li>
                    <span
                        className={
                            `1--${channelName}` in members ? styles.active : styles.inactive
                        }>
                        <span className={styles.cap}>{player1Label}</span> is{' '}
                        {`1--${channelName}` in members ? 'online' : 'offline'}
                    </span>
                </li>
                <li>
                    <span
                        className={
                            `2--${channelName}` in members ? styles.active : styles.inactive
                        }>
                        <span className={styles.cap}>{player2Label}</span>{' '}
                        {`2--${channelName}` in members ? 'online' : 'offline'}
                    </span>
                </li>
            </ol>
        </>
    )
}

export default Presence
