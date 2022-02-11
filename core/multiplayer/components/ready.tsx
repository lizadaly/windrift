/**
 * Called when the multiplayer context object is in the `ready` state. Sets up periodic sync jobs.
 *
 */

import * as React from 'react'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'core/types'
import { gotoChapter } from 'core/features/navigation'
import { emitNavChange, emitPresence, useChoicePoll } from '../api-client'
import { useInterval } from 'usehooks-ts'
import { MultiplayerContext, POLL_FREQUENCY } from './multiplayer'
import { init } from '../features/instance'
import { makeChoice } from 'core/features/choice'
import Pusher from './p2p/pusher'

const Ready: React.FC = ({ children }): JSX.Element => {
    const { multiplayer } = React.useContext(MultiplayerContext)
    const { identifier, players } = React.useContext(StoryContext).config

    const { toc } = useSelector((state: RootState) => state.navigation.present)

    const dispatch = useDispatch()

    // Display our start chapter on first render only. Since multiple players
    // may start in different locations, this switches the behavior to check
    // the per-player start if no global chapter start was provided.
    React.useEffect(() => {
        if (multiplayer.ready) {
            dispatch(
                init({
                    instance: {
                        instanceId: multiplayer.instanceId,
                        playerId: multiplayer.currentPlayer.id
                    }
                })
            )
            const visible = toc ? Object.values(toc).filter((c) => c.visible).length > 0 : false
            // if there are no visible chapters, use the current player default
            if (!visible) {
                const start = players.filter((p) => p.name === multiplayer.currentPlayer.name)[0]
                    .start
                dispatch(gotoChapter({ filename: start }))
                emitNavChange(
                    identifier,
                    start,
                    multiplayer.instanceId,
                    multiplayer.currentPlayer.id,
                    null
                )
                emitPresence(identifier, multiplayer.instanceId, multiplayer.currentPlayer.id)
            }
        }
    }, [multiplayer])

    return (
        <>
            {multiplayer.ready && <Polls />}
            {children}
        </>
    )
}

const Polls = (): JSX.Element => {
    const { multiplayer } = React.useContext(MultiplayerContext)
    const { log } = useSelector((state: RootState) => state.log)

    const dispatch = useDispatch()

    const { choices } = useChoicePoll(multiplayer.identifier, multiplayer.instanceId)

    // Poll for choices
    React.useEffect(() => {
        const logIds = log.map((l) => l.id)
        choices
            .filter((row) => !logIds.includes(row.id))
            .forEach((row) => {
                const { id, tag, option, next, chapterName, player } = row
                console.log(`Replaying event ${tag} / ${next}`)
                dispatch(
                    makeChoice(tag, option, next, chapterName, {
                        eventPlayer: player,
                        currentPlayer: multiplayer.currentPlayer,
                        identifier: multiplayer.identifier,
                        instanceId: multiplayer.instanceId,
                        sync: false,
                        choiceId: id,
                        emit: false
                    })
                )
            })
    }, [choices])

    // Send presence manually if Pusher is not present
    useInterval(async () => {
        emitPresence(multiplayer.identifier, multiplayer.instanceId, multiplayer.currentPlayer.id)
    }, POLL_FREQUENCY)

    return null
}
export default Ready
