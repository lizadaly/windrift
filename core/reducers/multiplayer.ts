import { InitMultiplayerType, INIT_MULTIPLAYER, Multiplayer, } from '../types'


const multiplayer = (state: Multiplayer = null, action: InitMultiplayerType): Multiplayer => {
    switch (action.type) {
        case INIT_MULTIPLAYER: {
            return action.multiplayer
        }
        default:
            return state
    }
}
export default multiplayer