export const INIT_MULTIPLAYER = 'INIT_MULTIPLAYER'

/* Multiplayer config */
export class Multiplayer {
    storyUrl: string
    instanceId: string
    ready: boolean // True when all the params have been initialized
    currentPlayer: string
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
