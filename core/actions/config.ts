import { INIT_CONFIG, InitConfigType, Config } from '../types'

export const initConfig = (config: Config): InitConfigType => ({
    type: INIT_CONFIG,
    config,
})
