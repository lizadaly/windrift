import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Player } from '@prisma/client'
import useInterval from '@use-it/interval'

import { RootState } from 'core/reducers'
import { gotoChapter } from 'core/actions/navigation'
import { emitPresence, pollForChoices, pollForPresence } from 'core/multiplayer/api-client'
import { PresenceApiResponse } from 'pages/api/core/story/[story]/[instance]/presence'

export interface Players {
    currentPlayer: Player
    otherPlayer: Player
    presenceApiResponse: PresenceApiResponse
}
export const PlayerContext: React.Context<Players> = React.createContext({
    currentPlayer: null,
    otherPlayer: null,
    presenceApiResponse: null
})

const MultiplayerInit: React.FC = ({ children }) => {
    const { currentPlayer, otherPlayer, instanceId } = useSelector(
        (state: RootState) => state.multiplayer
    )
    const { identifier, players } = useSelector((state: RootState) => state.config)

    const log = useSelector((state: RootState) => state.log)
    const toc = useSelector((state: RootState) => state.toc.present)

    const [presenceApiResponse, setPresence] = React.useState<PresenceApiResponse | undefined>(
        undefined
    )

    const dispatch = useDispatch()

    // Display our start chapter on first render only. Since multiple players
    // may start in different locations, this switches the behavior to check
    // the per-player start if no global chapter start was provided.
    React.useEffect(() => {
        const visible = toc ? Object.values(toc).filter((c) => c.visible).length > 0 : false
        // if there are no visible chapters, use the current player default
        if (!visible) {
            const start = players.filter((p) => p.name === currentPlayer.name)[0].start
            dispatch(gotoChapter(start))
        }
    }, [])

    // Poll for choices
    useInterval(
        async () => pollForChoices(identifier, instanceId, currentPlayer, log, dispatch),
        parseInt(process.env.NEXT_PUBLIC_POLL_CHECK_CHOICES)
    )

    // Poll for movement
    useInterval(async () => {
        pollForPresence(identifier, instanceId, currentPlayer, setPresence)
    }, parseInt(process.env.NEXT_PUBLIC_POLL_CHECK_PRESENCE))

    // Send presence
    useInterval(async () => {
        emitPresence(identifier, instanceId, currentPlayer)
    }, parseInt(process.env.NEXT_PUBLIC_POLL_EMIT_PRESENCE))

    const PlayersContext: Players = {
        currentPlayer,
        otherPlayer,
        presenceApiResponse: presenceApiResponse
    }

    return (
        <>
            <PlayerContext.Provider value={PlayersContext}>{children}</PlayerContext.Provider>
        </>
    )
}
export default MultiplayerInit
