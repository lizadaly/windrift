import { PusherProviderProps } from "@harelpls/use-pusher"
import { Config, Multiplayer } from "core/types"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from 'uuid'

import { initMultiplayer } from 'core/actions'

import styles from 'public/stories/multiplayer/styles/NewGame.module.scss'


const populateMultiplayer = (player: number, multiplayer: Multiplayer, config: Config, channelName?: string): void => {
    const { NEXT_PUBLIC_PUSHER_KEY, NEXT_PUBLIC_PUSHER_CLUSTER } = config.env
    const gameUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + window.location.pathname

    channelName = channelName || 'presence-' + uuidv4()
    const pusherConfig = {
        clientKey: NEXT_PUBLIC_PUSHER_KEY,
        cluster: NEXT_PUBLIC_PUSHER_CLUSTER,
        authEndpoint: `/api/auth/${player}`
    } as PusherProviderProps

    multiplayer.clientKey = pusherConfig.clientKey
    multiplayer.cluster = pusherConfig.cluster
    multiplayer.authEndpoint = pusherConfig.authEndpoint
    multiplayer.channelName = channelName
    multiplayer.gameUrl = gameUrl
    multiplayer.player = player
    multiplayer.ready = true
}

interface NewGameProps {
    multiplayer: Multiplayer
    config: Config
}
const NewGame = ({ multiplayer, config }: NewGameProps): JSX.Element => {
    const [channel, setChannel] = useState("")


    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        populateMultiplayer(2, multiplayer, config, channel)
        dispatch(initMultiplayer(multiplayer))
        e.preventDefault()
    }
    return <div>
        <h1>Start or join a game of Tic-Tac-Toe</h1>

        <div className={styles.instructions}>

            <div>
                <p>
                    Start a game yourself and share the
                    channel name with a friend:
                </p>
                <button onClick={() => {
                    populateMultiplayer(1, multiplayer, config)
                    dispatch(initMultiplayer(multiplayer))
                }
                }
                >
                    Start a new game
                        </button>
            </div>
            <div>
                <p>...or get a channel name from a friend and paste it here:</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="text" placeholder={"Channel name"} value={channel} onChange={e => setChannel(e.target.value)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    </div>
}
export default NewGame