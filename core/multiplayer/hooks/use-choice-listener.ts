import { useDispatch, useSelector } from 'react-redux'

import { useChannel, useEvent } from '@harelpls/use-pusher'

import { updateInventory, pickOption, logChoice } from 'core/actions'
import { ENTRY_TYPES } from 'core/actions/log'
import { Player, Tag } from 'core/types'
import { RootState } from 'core/reducers'

interface ApiChoice {
    tag: Tag
    choice: string
    player: Player
    timestamp: string
}

const useChoiceListener = (): void => {
    const { currentPlayer, channelName } = useSelector((state: RootState) => state.multiplayer)

    const dispatch = useDispatch()
    const channel = useChannel(channelName)

    useEvent(channel, 'choose', ({ tag, choice, player, timestamp }: ApiChoice) => {
        const eventPlayer = player
        // Dispatch events from other player
        if (eventPlayer !== currentPlayer) {
            dispatch(updateInventory(tag, choice))
            dispatch(pickOption(tag, [[choice]], 0, eventPlayer))
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
