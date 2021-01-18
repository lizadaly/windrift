import { InitMultiplayerType, INIT_MULTIPLAYER, Multiplayer } from 'core/actions/multiplayer'

const defaultMultiplayer = new Multiplayer(null, null, null, null, null, null, false, null, null)

const multiplayer = (
    state: Multiplayer = defaultMultiplayer,
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
