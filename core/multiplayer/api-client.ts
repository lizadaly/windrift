import React from 'react'

import useSWR, { useSWRConfig } from 'swr'
import useSWRImmutable from 'swr/immutable'

import { Nav, Player, Presence } from '@prisma/client'
import axios from 'axios'
import { TocItem, Tag } from 'core/types'
import { ChoiceApiResponse } from 'pages/api/core/story/[story]/[instance]/listen'
import { NavApiResponse } from 'pages/api/core/story/[story]/[instance]/nav'
import { Multiplayer, P2P_ENABLED, POLL_FREQUENCY } from './components/multiplayer'
import { StoryApiResponse } from 'pages/api/core/story/[story]/[instance]/get'
import { PresenceApiResponse } from 'pages/api/core/story/[story]/[instance]/presence'

export const API_PREFIX = '/api/core/story'

// Set our polling policy based on whether P2P refresh is enabled
const SWR_CONFIG = P2P_ENABLED
    ? {
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          refreshWhenHidden: true
      }
    : {
          refreshInterval: POLL_FREQUENCY
      }

export const getStoryUrl = (instanceId: string): string => {
    const { protocol, hostname, port, pathname } = window.location
    return `${protocol}//${hostname}${port ? ':' + port : ''}${pathname}?instance=${instanceId}`
}

export const getChoiceListenerURL = (identifier: string, instanceId: string): string => {
    return `${API_PREFIX}/${identifier}/${instanceId}/listen/`
}

export const getNavListenerURL = (identifier: string, instanceId: string): string => {
    return `${API_PREFIX}/${identifier}/${instanceId}/nav/`
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

interface MultiplayerResponse {
    multiplayer: Multiplayer
    isLoading: boolean
    isError: boolean
}
export const useMultiplayer = (
    identifier: string,
    instanceId: string,
    playerId: string
): MultiplayerResponse => {
    const { data, error } = useSWRImmutable<StoryApiResponse>(
        `${API_PREFIX}/${identifier}/${instanceId}/get/`,
        fetcher
    )
    let multiplayer = null

    if (data) {
        const { instance, player1, player2 } = data
        let currentPlayer: Player, otherPlayer: Player

        const storyUrl = getStoryUrl(instance.id)

        if (playerId === player1.id) {
            currentPlayer = player1
            otherPlayer = player2
        } else if (playerId === player2.id) {
            currentPlayer = player2
            otherPlayer = player1
        }
        multiplayer = {
            identifier,
            storyUrl,
            instanceId,
            currentPlayer,
            otherPlayer,
            ready: true
        }
    }
    return {
        multiplayer,
        isLoading: !data && !error,
        isError: error
    }
}

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
        identifier,
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
            console.log(
                `Posted nav change event for player ${playerId} moving from ${from} to ${chapterName}`
            )
        })
        .catch((error) => console.error(error))
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
    // Presence POSTs are subject to Prisma upsert race condition (see https://github.com/prisma/prisma/issues/3242)
    // use try/catch here until that's fixed to use real postgres UPSERT conflict resolution
    try {
        axios
            .post(`${API_PREFIX}/${identifier}/${instanceId}/presence/`, {
                playerId
            })
            .then()
    } catch (error) {
        console.error(error)
    }
}

interface SWRResponse {
    isLoading: boolean
    isError: boolean
}
interface PresencePollResponse extends SWRResponse {
    presence: Presence
}
export const usePresencePoll = (
    identifier: string,
    instanceId: string,
    player: Player
): PresencePollResponse => {
    if (!player) {
        return {
            presence: null,
            isLoading: true,
            isError: false
        }
    }
    const { data, error } = useSWR<PresenceApiResponse>(
        `${API_PREFIX}/${identifier}/${instanceId}/presence/?playerId=${player.id}`,
        fetcher,
        SWR_CONFIG
    )

    if (data) {
        data.createdAt = new Date(data.createdAt)
        data.updatedAt = new Date(data.updatedAt)
    }
    return {
        presence: data,
        isLoading: !data && !error,
        isError: error
    }
}

/**
 * Poll for navigation events that were routed through the API
 * @param identifier
 * @param instanceId
 * @param playerId
 * @param navEntries
 * @param setPresence
 */
interface NavPollResponse {
    navEntries: Nav[]
    isLoading: boolean
    isError: boolean
}
export const useNavPoll = (identifier: string, instanceId: string): NavPollResponse => {
    const { data, error } = useSWR<NavApiResponse>(
        `${API_PREFIX}/${identifier}/${instanceId}/nav/`,
        fetcher,
        SWR_CONFIG
    )
    return {
        navEntries: data,
        isLoading: !data && !error,
        isError: error
    }
}
interface ChoicePollResponse {
    choices: ChoiceApiResponse[]
    isLoading: boolean
    isError: boolean
}

export const useChoicePoll = (
    identifier: string,
    instanceId: string,
    player?: Player
): ChoicePollResponse => {
    const url =
        getChoiceListenerURL(identifier, instanceId) + (player ? `?playerId=${player.id}` : '')

    const { data, error } = useSWR<ChoiceApiResponse[]>(url, fetcher, SWR_CONFIG)
    if (data) {
        data.forEach((c) => {
            c.createdAt = new Date(c.createdAt)
        })
    }
    return {
        choices: data || [],
        isError: error,
        isLoading: !error && !data
    }
}

/** Wrapper function to tell all relevant SWR calls to revalidate */
export const useSync = (identifier: string, instanceId: string): any => {
    const [sync, doSync] = React.useState(false)
    const { mutate } = useSWRConfig()

    React.useEffect(() => {
        if (sync) {
            mutate(getChoiceListenerURL(identifier, instanceId))
            // Clear the local state of the nav listener to have no data, then force revalidation
            mutate(getNavListenerURL(identifier, instanceId), [], true)
            doSync(false)
        }
    })
    return doSync
}
