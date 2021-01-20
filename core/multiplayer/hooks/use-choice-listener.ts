import { useDispatch } from 'react-redux'

import { useChannel, useEvent } from '@harelpls/use-pusher'

import { updateInventory, pickChoice, logChoice } from 'core/actions'
import { ENTRY_TYPES } from 'core/actions/log'
import { Player, Tag } from 'core/types'

interface ApiChoice {
    tag: Tag
    choice: string
    player: Player
    timestamp: string
}

const useChoiceListener = (channelName: string, currentPlayer: string): void => {
    const dispatch = useDispatch()
    const channel = useChannel(channelName)
    useEvent(channel, 'choose', ({ tag, choice, player, timestamp }: ApiChoice) => {
        // Dispatch events from other player
        const eventPlayer = player
        if (currentPlayer !== eventPlayer) {
            dispatch(updateInventory(tag, choice))
            dispatch(pickChoice(tag, [[choice]], 0, eventPlayer))
            dispatch(
                logChoice({
                    tag,
                    selection: choice,
                    entry: ENTRY_TYPES.Choice,
                    timestamp: new Date(timestamp),
                    player: eventPlayer
                })
            )
        }
    })
}
export default useChoiceListener
