import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInterval from '@use-it/interval'
import { RootState } from 'core/reducers'
import { gotoChapter } from 'core/actions/navigation'
import { Player } from '@prisma/client'
import axios from 'axios'

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
    const toc = useSelector((state: RootState) => state.toc.present)
    const { playerNames, identifier } = useSelector((state: RootState) => state.config)
    const dispatch = useDispatch()

    // Display our start chapter on first render only
    React.useEffect(() => {
        const visible = toc ? Object.values(toc).filter((c) => c.visible).length > 0 : false
        // if there are no visible chapters, use the player default
        if (!visible) {
            const start = playerNames.filter((p) => p.name === currentPlayer.name)[0].start
            dispatch(gotoChapter(start))
        }
    }, [currentPlayer, toc])

    // Poll for changes
    useInterval(() => {
        axios(
            `/api/core/story/${identifier}/${instanceId}/listen?playerId=${currentPlayer.id}`,
            {}
        ).then((res) => console.log(res.data))
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
