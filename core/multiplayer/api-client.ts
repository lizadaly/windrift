import { Dispatch } from 'react'

import { Player } from '@prisma/client'
import axios, { AxiosResponse } from 'axios'
import { LogEntry } from 'core/features/log'
import { TocItem, Tag } from 'core/types'
import { ChoiceApiResponse } from 'pages/api/core/story/[story]/[instance]/listen'
import { PresenceApiResponse } from 'pages/api/core/story/[story]/[instance]/presence'
import { init } from 'core/features/multiplayer'
import { makeChoice } from 'core/features/choice'

const API_PREFIX = '/api/core/story'

const getStoryUrl = (instanceId: string) => {
    const { protocol, hostname, port, pathname } = window.location
    return `${protocol}//${hostname}${port ? ':' + port : ''}${pathname}?instance=${instanceId}`
}

// Called by player 2 to retrieve info about the instance of the story they're joining
export const getStoryInstance = (
    identifier: string,
    instanceId: string,
    playerId: string,
    dispatch: Dispatch<any>
): void => {
    axios(`${API_PREFIX}/${identifier}/${instanceId}/get/`, {}).then((res) => {
        const { instance, player1, player2 } = res.data
        let currentPlayer: Player, otherPlayer: Player

        const storyUrl = getStoryUrl(instance.id)

        if (playerId === player1.id) {
            currentPlayer = player1
            otherPlayer = player2
        } else if (playerId === player2.id) {
            currentPlayer = player2
            otherPlayer = player1
        } else {
            console.error(
                `Did not get a matching playerId for instance ${instance.id}; got ${playerId}`
            )
            return
        }

        dispatch(
            init({
                multiplayer: {
                    storyUrl,
                    currentPlayer,
                    otherPlayer,
                    instanceId: instance.id,
                    ready: true
                }
            })
        )
    })
}

export const resumeStoryInstance = (
    identifier: string,
    instanceId: string,
    player: 'player1' | 'player2'
): void => {
    axios(`${API_PREFIX}/${identifier}/${instanceId}/get/`, {}).then((res) => {
        const { instance, player1, player2 } = res.data
        let currentPlayer: Player
        if (player === 'player1') {
            currentPlayer = player1
        } else {
            currentPlayer = player2
        }
        const storyUrl = getStoryUrl(instance.id) + `&playerId=${currentPlayer.id}`
        location.replace(storyUrl)
    })
}

// Called by player 1 to create the instance
export const createStoryInstance = (identifier: string, dispatch: Dispatch<any>): void => {
    axios(`${API_PREFIX}/${identifier}/init/`, {
        method: 'post'
    }).then((res) => {
        const { instance, player1, player2 } = res.data
        const storyUrl = getStoryUrl(instance.id) + `&playerId=${player2.id}`

        dispatch(
            init({
                multiplayer: {
                    storyUrl,
                    currentPlayer: player1,
                    otherPlayer: player2,
                    instanceId: instance.id,
                    ready: true
                }
            })
        )
    })
}

export const emitNavChange = (
    identifier: string,
    chapterName: TocItem['filename'],
    instanceId: string,
    player: Player
): void => {
    axios
        .post(`${API_PREFIX}/${identifier}/${instanceId}/nav/`, {
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
    next: string | null,
    chapterName: string,
    identifier: string,
    instanceId: string,
    player: Player
): void => {
    axios.post(`${API_PREFIX}/${identifier}/${instanceId}/choose/`, {
        id,
        tag,
        option,
        playerId: player.id,
        next,
        chapterName
    })
}

export const emitPresence = (identifier: string, instanceId: string, playerId: string): void => {
    axios
        .post(`${API_PREFIX}/${identifier}/${instanceId}/presence/`, {
            playerId
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
        .get(`${API_PREFIX}/${identifier}/${instanceId}/listen/?playerId=${player.id}`)
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
                            syncNext: false,
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
        .get(`${API_PREFIX}/${identifier}/${instanceId}/presence/?playerId=${player.id}`)
        .then((res: AxiosResponse<PresenceApiResponse>) => {
            setPresence(res.data)
        })
        .catch(function (error) {
            console.log(error)
        })
}
