import { PusherProviderProps } from "@harelpls/use-pusher"
import { v4 as uuidv4 } from 'uuid'

import { Multiplayer, Config } from "core/types"


export const populateMultiplayer = (player: number, multiplayer: Multiplayer, config: Config, channelName?: string): void => {
    const { NEXT_PUBLIC_PUSHER_KEY, NEXT_PUBLIC_PUSHER_CLUSTER } = config.env
    const gameUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + window.location.pathname

    channelName = channelName || 'presence-' + uuidv4()
    const pusherConfig = {
        clientKey: NEXT_PUBLIC_PUSHER_KEY,
        cluster: NEXT_PUBLIC_PUSHER_CLUSTER,
        authEndpoint: `/api/auth/${player}`
    } as PusherProviderProps

    multiplayer.clientKey = pusherConfig.clientKey
    multiplayer.cluster = pusherConfig.cluster
    multiplayer.authEndpoint = pusherConfig.authEndpoint
    multiplayer.channelName = channelName
    multiplayer.gameUrl = gameUrl
    multiplayer.player = player
    multiplayer.ready = true
}