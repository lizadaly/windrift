import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInterval from '@use-it/interval'
import { RootState } from 'core/reducers'
import { gotoChapter } from 'core/actions/navigation'
import { Player } from '@prisma/client'
import axios from 'axios'
import { logChoice, pickOption, updateInventory } from 'core/actions'
import { ENTRY_TYPES } from 'core/actions/log'

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
    // Display our start chapter on first render only
    React.useEffect(() => {
        const visible = toc ? Object.values(toc).filter((c) => c.visible).length > 0 : false
        // if there are no visible chapters, use the player default
        if (!visible) {
            const start = players.filter((p) => p.name === currentPlayer.name)[0].start
            dispatch(gotoChapter(start))
        }
    }, [currentPlayer, toc])

    // Poll for changes
    useInterval(async () => {
        axios(
            `/api/core/story/${identifier}/${instanceId}/listen?playerId=${currentPlayer.id}`
        ).then((res) => {
            // Get all the existing log IDs
            const logIds = log.map((l) => l.id)
            res.data
                .filter((row) => !logIds.includes(row.id))
                .forEach((row) => {
                    const { id, tag, option, createdAt } = row

                    const eventPlayer = res.data.player

                    dispatch(updateInventory(tag, option))
                    dispatch(pickOption(tag, [[option]], 0, eventPlayer))
                    dispatch(
                        logChoice({
                            id,
                            tag,
                            selection: option,
                            entry: ENTRY_TYPES.Choice,
                            timestamp: new Date(createdAt),
                            playerName: eventPlayer
                        })
                    )
                    console.log(res.data)
                })
        })
    }, 10000)

    const PlayersContext: Players = {
        currentPlayer,
        otherPlayer
    }

    // Listen for events from the other player
    //useChoiceListener()

    // Emit any chapter switches to the API
    //  useNavEmitter()

    return (
        <>
            <PlayerContext.Provider value={PlayersContext}>{children}</PlayerContext.Provider>
        </>
    )
}
export default MultiplayerInit
