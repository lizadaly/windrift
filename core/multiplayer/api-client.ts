import axios from 'axios'
import { TocItem, Player, Tag, Config } from 'core/types'

export const emitNavChange = (
    chapterName: TocItem['filename'],
    instanceId: string,
    currentPlayer: Player
): void => {
    const navBody = {
        chapterName,
        channel: instanceId,
        player: currentPlayer
    }
    fetch('/api/nav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(navBody)
    })
}

export const emitChoice = (
    identifier: string,
    tag: Tag,
    option: string,
    instanceId: string,
    player: Player
): void => {
    axios
        .post(`/api/core/story/${identifier}/${instanceId}/choose`, {
            tag,
            option,
            playerId: player.id
        })
        .then(() => {
            console.log('emitted')
        })
}
