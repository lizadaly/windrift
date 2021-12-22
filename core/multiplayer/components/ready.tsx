/**
 * Called when the multiplayer context object is in the `ready` state. Sets up periodic sync jobs.
 *
 */

import * as React from 'react'
import { Player } from '@prisma/client'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'core/types'
import { PresenceApiResponse } from 'pages/api/core/story/[story]/[instance]/presence'
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
import { Presence, set } from '../features/presence'
import { init } from '../features/instance'

const NEXT_PUBLIC_POLL_EMIT_PRESENCE = 30000
const NEXT_PUBLIC_POLL_CHECK_PRESENCE = 10000
const NEXT_PUBLIC_POLL_CHECK_CHOICES = 10000
const NEXT_PUBLIC_POLL_CHECK_NAV = 10000

const Ready: React.FC = ({ children }): JSX.Element => {
    const { multiplayer } = React.useContext(MultiplayerContext)

    const { identifier, players } = React.useContext(StoryContext).config

    const { log } = useSelector((state: RootState) => state.log)
    const { toc } = useSelector((state: RootState) => state.navigation.present)
    const navEntries = useSelector((state: RootState) => state.multiplayerNav)

    const [navEntry, setNavEvent] = React.useState<NavEntry>()

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
                        playerName: multiplayer.currentPlayer.name,
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

    React.useEffect(() => {
        if (navEntry) {
            dispatch(add({ entry: navEntry }))
        }
    }, [navEntry])

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

    const [navEntry, setNavEvent] = React.useState<NavEntry>()
    const dispatch = useDispatch()

    // Poll for choices
    useInterval(
        async () =>
            pollForChoices(
                identifier,
                multiplayer.instanceId,
                multiplayer.currentPlayer,
                log,
                dispatch
            ),
        NEXT_PUBLIC_POLL_CHECK_CHOICES
    )

    // Poll for the other player's presence
    useInterval(async () => {
        const presence = await pollForPresence(
            identifier,
            multiplayer.instanceId,
            multiplayer.otherPlayer.id
        )
        dispatch(set({ presence }))
    }, NEXT_PUBLIC_POLL_CHECK_PRESENCE)

    // Poll for nav changes
    useInterval(async () => {
        pollForNav(identifier, multiplayer.instanceId, navEntries, setNavEvent)
    }, NEXT_PUBLIC_POLL_CHECK_NAV)

    // Send presence
    useInterval(async () => {
        emitPresence(identifier, multiplayer.instanceId, multiplayer.currentPlayer.id)
    }, NEXT_PUBLIC_POLL_EMIT_PRESENCE)

    return null
}
export default Ready
