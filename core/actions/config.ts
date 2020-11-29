import { INIT_CONFIG, InitConfigType, Config } from 'core/types'

export const initConfig = (config: Config): InitConfigType => ({
    type: INIT_CONFIG,
    config,
})
