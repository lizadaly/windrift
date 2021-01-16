import { useChannel, useEvent } from "@harelpls/use-pusher"
import { updateInventory, pickChoice, logAction } from "core/actions"
import { Tag } from "core/types"
import { useDispatch } from "react-redux"


interface ApiChoice {
    tag: Tag
    choice: string
    player: string
    timestamp: string
}

const useChoiceListener = (channelName: string, currentPlayer: number) => {
    const dispatch = useDispatch()
    const channel = useChannel(channelName)
    useEvent(channel, "choose", ({ tag, choice, player, timestamp }: ApiChoice) => {
        // Dispatch events from other player
        const eventPlayer = parseInt(player)
        const eventTimestamp = new Date(timestamp)
        if (currentPlayer !== eventPlayer) {
            dispatch(updateInventory(tag, choice))
            dispatch(pickChoice(tag, [[choice]], 0, eventPlayer))
            dispatch(logAction(tag, choice, eventTimestamp, eventPlayer))
        }
    })
}
export default useChoiceListener