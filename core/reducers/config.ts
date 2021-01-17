import { InitConfigType, Config, INIT_CONFIG } from 'core/types'

const config = (state: Config = null, action: InitConfigType): Config => {
    switch (action.type) {
        case INIT_CONFIG: {
            return action.config
        }
        default:
            return state
    }
}

export default config
