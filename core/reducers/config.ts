import { GET_CONFIG, GetConfigType, Config } from '../types'

// TODO Define defaults elsewhere
const defaultConfig = new Config("scrolling", "windrift")

const config = (state: Config = defaultConfig, action: GetConfigType): Config => {
    switch (action.type) {
        case GET_CONFIG:
            return state
        default:
            return state
    }
}
export default config
