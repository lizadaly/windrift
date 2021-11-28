import { InitMultiplayerType, INIT_MULTIPLAYER, Multiplayer } from 'core/actions/multiplayer'

const multiplayer = (
    state: Multiplayer = new Multiplayer(),
    action: InitMultiplayerType
): Multiplayer => {
    switch (action.type) {
        case INIT_MULTIPLAYER: {
            return { ...action.multiplayer }
        }
        default:
            return state
    }
}
export default multiplayer
