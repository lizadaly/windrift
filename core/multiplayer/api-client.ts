import { Dispatch } from 'react'

import { Player, Presence } from '@prisma/client'
import axios, { AxiosResponse } from 'axios'
import { LogEntry } from 'core/features/log'
import { TocItem, Tag, Option, Next } from 'core/types'
import { ChoiceApiResponse } from 'pages/api/core/story/[story]/[instance]/listen'
import { makeChoice } from 'core/features/choice'
import { NavEntry } from 'core/multiplayer/features/navigation'
import { NavApiResponse } from 'pages/api/core/story/[story]/[instance]/nav'
import { Multiplayer } from './components/multiplayer'
import { PresenceState } from './features/presence'

const API_PREFIX = '/api/core/story'

export const getStoryUrl = (instanceId: string): string => {
    const { protocol, hostname, port, pathname } = window.location
    return `${protocol}//${hostname}${port ? ':' + port : ''}${pathname}?instance=${instanceId}`
}

export const getStoryInstance = async (
    identifier: string,
    instanceId: string,
    playerId: string
): Promise<Multiplayer> => {
    const res = await axios(`${API_PREFIX}/${identifier}/${instanceId}/get/`, {})
    const { instance, player1, player2 } = res.data
    let currentPlayer: Player, otherPlayer: Player

    const storyUrl = getStoryUrl(instance.id)

    if (playerId === player1.id) {
        currentPlayer = player1
        otherPlayer = player2
    } else if (playerId === player2.id) {
        currentPlayer = player2
        otherPlayer = player1
    }
    return {
        storyUrl,
        instanceId,
        currentPlayer,
        otherPlayer,
        ready: true
    }
}

// // Now immediately get any missed events, including our own
// getAllChoices(identifier, instance.id, currentPlayer, dispatch, () => {
//     if (start) {
//         // Dispatch a start location if we got one from the API; otherwise this will fall back to the player default
//         console.log('Dispatching gotchapter to ', start)
//         dispatch(gotoChapter({ filename: start }))
//     }
// })

export interface ResumeResponse {
    storyUrl?: string
    status?: number
}
export const resumeStoryInstance = async (
    identifier: string,
    instanceId: string,
    player: 'player1' | 'player2'
): Promise<ResumeResponse> => {
    let resp: ResumeResponse

    await axios(`${API_PREFIX}/${identifier}/${instanceId}/get/`, {})
        .then((res) => {
            const { instance, player1, player2 } = res.data
            let currentPlayer: Player
            if (player === 'player1') {
                currentPlayer = player1
            } else {
                currentPlayer = player2
            }
            resp = {
                storyUrl: getStoryUrl(instance.id) + `&playerId=${currentPlayer.id}`,
                status: 200
            }
        })
        .catch((error) => {
            resp = {
                status: error.response?.status
            }
        })
    return resp
}

// Called by player 1 to create the instance
export const createStoryInstance = async (identifier: string): Promise<Multiplayer> => {
    const res = await axios(`${API_PREFIX}/${identifier}/init/`, {
        method: 'post'
    })
    const { instance, player1, player2 } = res.data
    const storyUrl = getStoryUrl(instance.id)
    return {
        storyUrl,
        currentPlayer: player1,
        otherPlayer: player2,
        instanceId: instance.id,
        ready: true
    }
}

export const emitNavChange = (
    identifier: string,
    chapterName: TocItem['filename'],
    instanceId: string,
    playerId: string,
    from?: string
): void => {
    axios
        .post(`${API_PREFIX}/${identifier}/${instanceId}/nav/`, {
            chapterName,
            playerId: playerId,
            from
        })
        .then(() => {
            emitPresence(identifier, instanceId, playerId)
            console.log(`Posted nav change event for player ${playerId}`)
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
    player: Player,
    synced: boolean
): void => {
    axios.post(`${API_PREFIX}/${identifier}/${instanceId}/choose/`, {
        id,
        tag,
        option,
        playerId: player.id,
        next,
        chapterName,
        synced
    })
}

export const emitPresence = (identifier: string, instanceId: string, playerId: string): void => {
    axios
        .post(`${API_PREFIX}/${identifier}/${instanceId}/presence/`, {
            playerId
        })
        .then()
}

interface PolledChoice {
    id: string
    tag: Tag
    option: Option
    next: string
    chapterName: string
    eventPlayer: Player
}
export const pollForChoices = async (
    identifier: string,
    instanceId: string,
    player: Player,
    log: LogEntry[]
): Promise<PolledChoice[]> => {
    const res: AxiosResponse<ChoiceApiResponse[]> = await axios.get(
        `${API_PREFIX}/${identifier}/${instanceId}/listen/?playerId=${player.id}`
    )

    // Get all the existing log IDs
    const logIds = log.map((l) => l.id)
    // console.group(`Already have these log ids: `)
    // console.log(logIds)
    // console.groupEnd()
    //console.group('Replaying log ids: ')
    const choices: PolledChoice[] = res.data
        .filter((row) => !logIds.includes(row.id))
        .map((row) => {
            const { id, tag, option, next, chapterName } = row
            const eventPlayer = row.player
            return {
                id,
                tag,
                option,
                next,
                chapterName,
                eventPlayer
            }
        })
    return choices
}
export const getAllChoices = (
    identifier: string,
    instanceId: string,
    player: Player,
    dispatch: Dispatch<any>,
    callback?: any
): void => {
    axios
        .get(`${API_PREFIX}/${identifier}/${instanceId}/listen/`)
        .then((res: AxiosResponse<ChoiceApiResponse[]>) => {
            // Get all the existing log IDs

            console.group('Replaying log ids: ')
            res.data.forEach((row) => {
                const { id, tag, option, next, chapterName, synced } = row
                const eventPlayer = row.player
                if (eventPlayer === player || synced) {
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
                }
            })
            console.groupEnd()
            if (callback) {
                callback()
            }
        })
}

export const pollForPresence = async (
    identifier: string,
    instanceId: string,
    playerId: string
): Promise<PresenceState> => {
    const res = await axios.get(
        `${API_PREFIX}/${identifier}/${instanceId}/presence/?playerId=${playerId}`
    )

    return res.data
}

/**
 * Poll for navigation events that were routed through the API
 * @param identifier
 * @param instanceId
 * @param playerId
 * @param navEntries
 * @param setPresence
 */
export const pollForNav = async (
    identifier: string,
    instanceId: string,
    navEntries: NavEntry[]
): Promise<NavEntry> => {
    const res = await axios.get(`${API_PREFIX}/${identifier}/${instanceId}/nav`)

    const navIds = navEntries.map((e) => e.id)
    const data = res.data.filter((row) => !navIds.includes(row.id))

    if (data.length > 0) {
        return data[0] // FIXME Not reliable; may skip updates
    }
}
