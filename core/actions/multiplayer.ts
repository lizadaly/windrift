import { INIT_MULTIPLAYER, InitMultiplayerType, Multiplayer } from '../types'

export const initMultiplayer = (multiplayer: Multiplayer): InitMultiplayerType => {
    return {
        type: INIT_MULTIPLAYER,
        multiplayer,
    }
}
