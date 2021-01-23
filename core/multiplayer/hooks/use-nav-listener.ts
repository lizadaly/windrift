// Listens for a remote player chapter change and then returns the player
// name and chapter name if changed

import { useChannel, useEvent } from '@harelpls/use-pusher'
import { RootState } from 'core/reducers'

import { Player, TocItem } from 'core/types'
import { useState } from 'react'
import { useSelector } from 'react-redux'

interface ApiNav {
    chapterName: TocItem['filename']
    player: Player
    timestamp: string
}

const useNavListener = (): ApiNav => {
    const { currentPlayer, channelName } = useSelector((state: RootState) => state.multiplayer)

    const [navEvent, updateNavEvent] = useState({
        chapterName: null,
        player: null,
        timestamp: null
    })
    const channel = useChannel(channelName)

    useEvent(channel, 'nav', ({ chapterName, player, timestamp }: ApiNav) => {
        const eventPlayer = player
        // Dispatch events from other player
        if (eventPlayer !== currentPlayer) {
            updateNavEvent({ chapterName, player, timestamp })
        }
    })
    return navEvent
}
export default useNavListener
