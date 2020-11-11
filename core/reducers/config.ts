import { GET_CONFIG, GetConfigType, Config } from '../types'

const config = (state: Config, action: GetConfigType): Config => {
    switch (action.type) {
        case GET_CONFIG:
            return state
        default:
            return state
    }
}
export default config
