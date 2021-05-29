import { Dispatch } from 'react'

import { Player } from '@prisma/client'
import axios, { AxiosResponse } from 'axios'
import { logChoice, pickOption, updateInventory } from 'core/actions'
import { ENTRY_TYPES, LogEntryType } from 'core/actions/log'
import { TocItem, Tag } from 'core/types'
import { ChoiceApiResponse } from 'pages/api/core/story/[story]/[instance]/listen'
import { PresenceApiResponse } from 'pages/api/core/story/[story]/[instance]/presence'
import { initMultiplayer, Multiplayer } from 'core/actions/multiplayer'

const API_PREFIX = '/api/core/story'

// Called by player 2 to retrieve info about the instance of the story they're joining
export const getStoryInstance = (
    identifier: string,
    instanceId: string,
    multiplayer: Multiplayer,
    playerId: string,
    dispatch: Dispatch<any>
): void => {
    axios(`${API_PREFIX}/${identifier}/${instanceId}/get`, {}).then((res) => {
        const { instance, player1, player2 } = res.data
        if (playerId === player1.id) {
            multiplayer.currentPlayer = player1
            multiplayer.otherPlayer = player2
        }
        if (playerId === player2.id) {
            multiplayer.currentPlayer = player2
            multiplayer.otherPlayer = player1
        }
        multiplayer.instanceId = instance.id
        multiplayer.currentPlayer = player2
        multiplayer.ready = true
        dispatch(initMultiplayer(multiplayer))
    })
}

// Called by player 1 to create the instance
export const createStoryInstance = (
    identifier: string,
    multiplayer: Multiplayer,
    dispatch: Dispatch<any>
): void => {
    axios(`${API_PREFIX}/${identifier}/init`, {
        method: 'post'
    }).then((res) => {
        const { instance, player1, player2 } = res.data
        const { protocol, hostname, port, pathname } = window.location
        const storyUrl = `${protocol}//${hostname}${port ? ':' + port : ''}${pathname}?instance=${
            instance.id
        }&playerId=${player2.id}`

        multiplayer.instanceId = instance.id
        multiplayer.storyUrl = storyUrl
        multiplayer.currentPlayer = player1
        multiplayer.otherPlayer = player2
        multiplayer.ready = true
        dispatch(initMultiplayer(multiplayer))
    })
}

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

export const emitPresence = (identifier: string, instanceId: string, player: Player): void => {
    axios
        .post(`${API_PREFIX}/${identifier}/${instanceId}/presence`, {
            playerId: player.id
        })
        .then()
}

export const pollForChoices = (
    identifier: string,
    instanceId: string,
    player: Player,
    log: LogEntryType[],
    dispatch: Dispatch<any>
): void => {
    axios
        .get(`${API_PREFIX}/${identifier}/${instanceId}/listen?playerId=${player.id}`)
        .then((res: AxiosResponse<ChoiceApiResponse[]>) => {
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
        })
}

export const pollForPresence = (
    identifier: string,
    instanceId: string,
    player: Player,
    setPresence: React.Dispatch<React.SetStateAction<PresenceApiResponse>>
): void => {
    axios
        .get(`${API_PREFIX}/${identifier}/${instanceId}/presence?playerId=${player.id}`)
        .then((res: AxiosResponse<PresenceApiResponse>) => {
            setPresence(res.data)
        })
        .catch(function (error) {
            console.log(error)
        })
}
