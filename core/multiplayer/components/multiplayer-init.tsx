import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInterval from '@use-it/interval'
import { RootState } from 'core/reducers'
import { gotoChapter } from 'core/actions/navigation'
import { Player } from '@prisma/client'
import axios from 'axios'

import { pollForChoices } from '../api-client'

export interface Players {
    currentPlayer: Player
    otherPlayer: Player
}
export const PlayerContext: React.Context<Players> = React.createContext({
    currentPlayer: null,
    otherPlayer: null
})

const MultiplayerInit: React.FC = ({ children }) => {
    const { currentPlayer, otherPlayer, instanceId } = useSelector(
        (state: RootState) => state.multiplayer
    )
    const log = useSelector((state: RootState) => state.log)
    const toc = useSelector((state: RootState) => state.toc.present)
    const { players, identifier } = useSelector((state: RootState) => state.config)
    const dispatch = useDispatch()

    const [currentChapter, setCurrentChapter] = React.useState(undefined)

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

    React.useEffect(() => {
        // setCurrentChapter(visibleChapters)
        const visibleChapters = Object.values(toc)
            .filter((c) => c.visible)
            .map((c) => c.filename)
        console.log('visible: ', visibleChapters)
    }, [toc])

    // Poll for changes
    useInterval(
        async () => pollForChoices(identifier, instanceId, currentPlayer, log, dispatch),
        30000
    ) // every 30 seconds

    // Send heartbeat
    useInterval(async () => {
        axios
            .post(`/api/core/story/${identifier}/${instanceId}/heartbeat?`, {
                playerId: currentPlayer.id
            })
            .then()
    }, 60000 * 2) // every two minutes

    const PlayersContext: Players = {
        currentPlayer,
        otherPlayer
    }

    return (
        <>
            <PlayerContext.Provider value={PlayersContext}>{children}</PlayerContext.Provider>
        </>
    )
}
export default MultiplayerInit
