import * as React from 'react'
import moment from 'moment'

import useLocation from 'core/multiplayer/hooks/use-location'

import styles from 'public/styles/multiplayer/Presence.module.scss'

import { MultiplayerContext } from '../multiplayer'
import { usePresencePoll } from 'core/multiplayer/api-client'

const RECENCY_WINDOW = moment().subtract(15, 'minutes')

/**
 *
 *  Example component for displaying the presence, or current status, of other
 *   players. You will probably want to customize this for your story,
 *   for example by mapping chapter names to something meaningful in your
 *   story.

 */
const Presence: React.FC = () => {
    const { otherPlayer, instanceId, identifier } = React.useContext(MultiplayerContext).multiplayer
    const { presence, isLoading, isError } = usePresencePoll(identifier, instanceId, otherPlayer.id)
    const { other } = useLocation()

    if (isLoading) {
        return <p>Retrieving other player status...</p>
    }
    if (isError) {
        return <p>There was an error retrieving other player status.</p>
    }
    const isActive = moment(presence.updatedAt) >= RECENCY_WINDOW

    return (
        <>
            <h2>Player info</h2>
            <ol className={styles.userList}>
                <li>
                    <span className={isActive ? styles.active : styles.inactive}>
                        <span className={styles.cap}>{otherPlayer.name}</span>
                        {!isActive && ` (last active ${moment(presence.updatedAt).fromNow()})`}
                        {other ? ` ${isActive ? 'is' : 'was'} in ${other?.chapterName}` : null}
                    </span>
                </li>
            </ol>
        </>
    )
}

export default Presence
