export const INIT_MULTIPLAYER = 'INIT_MULTIPLAYER'

/* Multiplayer config */
export class Multiplayer {
    clientKey: string
    cluster: string
    authEndpoint: string
    gameUrl: string
    channelName: string
    ready: boolean // True when all the params have been initialized
    currentPlayer: number
    player1Label: string
    player2Label: string

    constructor(
        clientKey: string,
        cluster: string,
        channelName: string,
        gameUrl: string,
        currentPlayer: number,
        authEndpoint: string,
        ready: boolean,
        player1Label: string,
        player2Label: string
    ) {
        this.clientKey = clientKey
        this.cluster = cluster
        this.authEndpoint = authEndpoint
        this.channelName = channelName
        this.gameUrl = gameUrl
        this.ready = ready
        this.currentPlayer = currentPlayer
        this.player1Label = player1Label
        this.player2Label = player2Label
    }
}

interface InitMultiplayerAction {
    type: typeof INIT_MULTIPLAYER
    multiplayer: Multiplayer
}
export type InitMultiplayerType = InitMultiplayerAction

export const initMultiplayer = (multiplayer: Multiplayer): InitMultiplayerType => {
    return {
        type: INIT_MULTIPLAYER,
        multiplayer
    }
}
