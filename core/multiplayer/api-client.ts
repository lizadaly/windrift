import { TocItem, Player, Tag } from 'core/types'

export const emitNavChange = (
    chapterName: TocItem['filename'],
    channelName: string,
    currentPlayer: Player
): void => {
    const navBody = {
        chapterName,
        channel: channelName,
        player: currentPlayer
    }
    fetch('/api/nav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(navBody)
    })
}

export const emitChoice = (tag: Tag, choice: string, channelName: string, player: Player): void => {
    const choiceBody = {
        tag,
        choice,
        channel: channelName,
        player
    }
    fetch('/api/choose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(choiceBody)
    })
}
