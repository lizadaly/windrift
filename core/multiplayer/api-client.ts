import { Dispatch } from 'react'

import { Player } from '@prisma/client'
import axios, { AxiosResponse } from 'axios'
import { LogEntry } from 'core/features/log'
import { TocItem, Tag } from 'core/types'
import { ChoiceApiResponse } from 'pages/api/core/story/[story]/[instance]/listen'
import { PresenceApiResponse } from 'pages/api/core/story/[story]/[instance]/presence'
import { init, Multiplayer } from 'core/features/multiplayer'
import { makeChoice } from 'core/features/choice'

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
        dispatch(init({ multiplayer }))
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
        dispatch(init({ multiplayer }))
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
    tag: Tag,
    option: string,
    identifier: string,
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
    log: LogEntry[],
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
                    const { id, tag, option, next, chapterName } = row

                    const eventPlayer = row.player

                    dispatch(
                        makeChoice(tag, option, next, chapterName, {
                            eventPlayer,
                            currentPlayer: player,
                            identifier,
                            instanceId,
                            sync: false,
                            choiceId: id
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
