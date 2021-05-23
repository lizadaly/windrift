import { Player } from '@prisma/client'
import axios, { AxiosResponse } from 'axios'
import { logChoice, pickOption, updateInventory } from 'core/actions'
import { ENTRY_TYPES, LogEntryType } from 'core/actions/log'
import { TocItem, Tag } from 'core/types'
import { ChoiceApiResponse } from 'pages/api/core/story/[story]/[instance]/listen'
import { Dispatch } from 'react'

const API_PREFIX = '/api/core/story'

export const emitNavChange = (
    identifier: string,
    chapterName: TocItem['filename'],
    instanceId: string,
    player: Player
): void => {
    axios
        .post(`${API_PREFIX}/${identifier}/${instanceId}/nav`, {
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
    axios.post(`${API_PREFIX}/${identifier}/${instanceId}/choose`, {
        id,
        tag,
        option,
        playerId: player.id
    })
}

export const pollForChoices = (
    identifier: string,
    instanceId: string,
    player: Player,
    log: LogEntryType[],
    dispatch: Dispatch<any>
): void => {
    axios(`/api/core/story/${identifier}/${instanceId}/listen?playerId=${player.id}`).then(
        (res: AxiosResponse<ChoiceApiResponse[]>) => {
            // Get all the existing log IDs
            const logIds = log.map((l) => l.id)
            res.data
                .filter((row) => !logIds.includes(row.id))
                .forEach((row) => {
                    const { id, tag, option, createdAt } = row

                    const eventPlayer = row.player

                    dispatch(updateInventory(tag, option))
                    dispatch(pickOption(tag, [[option]], 0, eventPlayer))
                    dispatch(
                        logChoice({
                            id,
                            tag,
                            selection: option,
                            entry: ENTRY_TYPES.Choice,
                            timestamp: new Date(createdAt),
                            playerName: eventPlayer.name
                        })
                    )
                })
        }
    )
}
