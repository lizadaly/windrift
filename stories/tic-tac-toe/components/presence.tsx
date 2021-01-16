import * as React from "react"
import { useSelector } from "react-redux"
import { RootState } from "core/reducers"
import { usePresenceChannel } from "@harelpls/use-pusher"

import styles from 'public/stories/tic-tac-toe/styles/Presence.module.scss'


const Presence: React.FC = (): JSX.Element => {
    const { channelName } = useSelector((state: RootState) =>
        state.multiplayer)
    const { members } = usePresenceChannel(channelName)

    if (!channelName) {
        return null
    }
    return <>
        <h2>Players online</h2>
        <p>Channel name: {channelName}</p>
        <ol className={styles.userList}>
            <li>
                <span className={`1--${channelName}` in members ? styles.active : styles.inactive}>
                    Player 1 is {`1--${channelName}` in members ? "online" : "offline"}
                </span>
            </li>
            <li>
                <span className={`2--${channelName}` in members ? styles.active : styles.inactive}>
                    Player 2 {`2--${channelName}` in members ? "online" : "offline"}
                </span>
            </li>
        </ol>
    </>
}

export default Presence