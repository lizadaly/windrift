import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'core/reducers'
import { gotoChapter } from 'core/actions/navigation'
import { Player } from '@prisma/client'

export interface Players {
    currentPlayer: Player
    otherPlayer: Player
}
export const PlayerContext: React.Context<Players> = React.createContext({
    currentPlayer: null,
    otherPlayer: null
})

const MultiplayerInit: React.FC = ({ children }) => {
    const { currentPlayer, otherPlayer } = useSelector((state: RootState) => state.multiplayer)
    const toc = useSelector((state: RootState) => state.toc.present)
    const { playerNames } = useSelector((state: RootState) => state.config)
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
