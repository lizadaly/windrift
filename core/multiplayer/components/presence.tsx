import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'core/reducers'
import { usePresenceChannel } from '@harelpls/use-pusher'

import styles from 'public/styles/multiplayer/Presence.module.scss'

const Presence: React.FC = () => {
    const players = useSelector((state: RootState) => state.config.players)
    const { channelName } = useSelector((state: RootState) => state.multiplayer)
    const { members } = usePresenceChannel(channelName)

    if (!channelName) {
        return null
    }
    return (
        <>
            <h2>Players online</h2>
            <p>Story code: {channelName}</p>
            <ol className={styles.userList}>
                <li>
                    <span
                        className={
                            `${players[0].name}--${channelName}` in members
                                ? styles.active
                                : styles.inactive
                        }>
                        <span className={styles.cap}>{players[0].name}</span> is{' '}
                        {`${players[0].name}--${channelName}` in members ? 'online' : 'offline'}
                    </span>
                </li>
                <li>
                    <span
                        className={
                            `${players[1].name}--${channelName}` in members
                                ? styles.active
                                : styles.inactive
                        }>
                        <span className={styles.cap}>{players[1].name}</span>{' '}
                        {`${players[1].name}--${channelName}` in members ? 'online' : 'offline'}
                    </span>
                </li>
            </ol>
        </>
    )
}

export default Presence
