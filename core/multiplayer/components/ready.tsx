/**
 * Called when the multiplayer context object is in the `ready` state. Sets up periodic sync jobs.
 *
 */

import * as React from 'react'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'core/types'
import { add, NavEntry } from '../features/navigation'
import { gotoChapter } from 'core/features/navigation'
import {
    emitNavChange,
    emitPresence,
    pollForChoices,
    pollForNav,
    pollForPresence
} from '../api-client'
import useInterval from '@use-it/interval'
import { MultiplayerContext } from './multiplayer'
import { set } from '../features/presence'
import { init } from '../features/instance'
import { makeChoice } from 'core/features/choice'

const NEXT_PUBLIC_POLL_EMIT_PRESENCE = 30000
const NEXT_PUBLIC_POLL_CHECK_PRESENCE = 10000
const NEXT_PUBLIC_POLL_CHECK_CHOICES = 10000
const NEXT_PUBLIC_POLL_CHECK_NAV = 10000

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
            console.log('Dispatching ready events')
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

    const { identifier } = React.useContext(StoryContext).config

    const { log } = useSelector((state: RootState) => state.log)
    const navEntries = useSelector((state: RootState) => state.multiplayerNav)

    const dispatch = useDispatch()

    // Poll for choices
    useInterval(
        async () => {
            const choices = await pollForChoices(
                identifier,
                multiplayer.instanceId,
                multiplayer.currentPlayer,
                log
            )
            choices.forEach((choice) => {
                const { id, tag, option, next, chapterName, eventPlayer } = choice
                dispatch(
                    makeChoice(tag, option, next, chapterName, {
                        eventPlayer,
                        currentPlayer: multiplayer.currentPlayer,
                        identifier,
                        instanceId: multiplayer.instanceId,
                        sync: false,
                        syncNext: false,
                        choiceId: id
                    })
                )
            })
        },

        NEXT_PUBLIC_POLL_CHECK_CHOICES
    )

    // Poll for the other player's presence
    useInterval(async () => {
        const presence = await pollForPresence(
            identifier,
            multiplayer.instanceId,
            multiplayer.otherPlayer.id
        )
        dispatch(
            set({
                presence
            })
        )
    }, NEXT_PUBLIC_POLL_CHECK_PRESENCE)

    // Poll for nav changes
    useInterval(async () => {
        const entry = await pollForNav(identifier, multiplayer.instanceId, navEntries)
        dispatch(add({ entry }))
    }, NEXT_PUBLIC_POLL_CHECK_NAV)

    // Send presence
    useInterval(async () => {
        emitPresence(identifier, multiplayer.instanceId, multiplayer.currentPlayer.id)
    }, NEXT_PUBLIC_POLL_EMIT_PRESENCE)

    return null
}
export default Ready
