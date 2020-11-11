import { GET_CONFIG, GetConfigType, Config } from '../types'

export const getConfig = (config: Config): GetConfigType => ({
    type: GET_CONFIG,
    config,
})
