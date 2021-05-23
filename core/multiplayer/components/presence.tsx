import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'core/reducers'

import styles from 'public/styles/multiplayer/Presence.module.scss'
import axios, { AxiosResponse } from 'axios'
import { Heartbeat } from '.prisma/client'
import { HeartbeatApiResponse } from 'pages/api/core/story/[story]/[instance]/heartbeat'
import useInterval from '@use-it/interval'

const Presence: React.FC = () => {
    const { identifier, players } = useSelector((state: RootState) => state.config)
    const { instanceId, currentPlayer } = useSelector((state: RootState) => state.multiplayer)
    const [presence, setPresence] = React.useState<HeartbeatApiResponse | undefined>(undefined)
    useInterval(async () => {
        axios
            .get(
                `/api/core/story/${identifier}/${instanceId}/heartbeat?playerId=${currentPlayer.id}`
            )
            .then((res: AxiosResponse<HeartbeatApiResponse>) => {
                console.log(res.data)
                setPresence(res.data)
            })
    }, 10000)
    if (!instanceId || !presence) {
        return null
    }
    return (
        <>
            <h2>Players online</h2>
            <p>Story code: {instanceId}</p>
            <ol className={styles.userList}>
                <li>
                    <span
                        className={presence.heartbeat.createdAt ? styles.active : styles.inactive}>
                        <span className={styles.cap}>{presence.player.name}</span> is{' '}
                        {/* {'true' === 'true' ? 'online' : 'offline'} */}
                    </span>
                </li>
            </ol>
        </>
    )
}

export default Presence
