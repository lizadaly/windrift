import { Player } from '@prisma/client'
import axios from 'axios'
import { TocItem, Tag } from 'core/types'

export const emitNavChange = (
    identifier: string,
    chapterName: TocItem['filename'],
    instanceId: string,
    player: Player
): void => {
    axios
        .post(`/api/core/story/${identifier}/${instanceId}/nav`, {
            chapterName,
            playerId: player.id
        })
        .then(() => {
            console.log('emitted')
        })
}

export const emitChoice = (
    id: string,
    identifier: string,
    tag: Tag,
    option: string,
    instanceId: string,
    player: Player
): void => {
    axios
        .post(`/api/core/story/${identifier}/${instanceId}/choose`, {
            id,
            tag,
            option,
            playerId: player.id
        })
        .then(() => {
            console.log('emitted')
        })
}
