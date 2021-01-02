import Head from 'next/head'
import * as React from "react"
import { RootState } from 'core/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { PusherProvider, PusherProviderProps } from "@harelpls/use-pusher"

import Content from "./content"
import { v4 as uuidv4 } from 'uuid'
import { initMultiplayer } from 'core/actions'
import { Config, Multiplayer } from 'core/types'
import { useState } from 'react'

interface IndexProps {
    children: React.ReactNode,

}

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

const Index = ({ children }: IndexProps): JSX.Element => {
    const config = useSelector((state: RootState) => state.config)
    const multiplayer = useSelector((state: RootState) => state.multiplayer)
    const [channel, setChannel] = useState("")


    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        populateMultiplayer(2, multiplayer, config, channel)
        dispatch(initMultiplayer(multiplayer))
        e.preventDefault()
    }

    return (
        <>
            <Head>
                <title>{config.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond&family=Elsie&display=swap');
                </style>

            </Head>
            {
                multiplayer.ready ? <PusherProvider
                    clientKey={multiplayer.clientKey}
                    cluster={multiplayer.cluster}
                    authEndpoint={multiplayer.authEndpoint}
                >
                    <Content>
                        {children}
                    </Content>
                </PusherProvider>
                    : <Content>
                        <h1>Start or join a game</h1>
                        <button onClick={() => {
                            populateMultiplayer(1, multiplayer, config)
                            dispatch(initMultiplayer(multiplayer))
                            alert(`To begin the story, send the other player ${multiplayer.channelName}`)
                        }
                        }
                        >
                            Start a new game
                        </button>
                        or ...
                        <form onSubmit={handleSubmit}>
                            <label>
                                Join a game:
                            <input type="text" placeholder={"Channel name"} value={channel} onChange={e => setChannel(e.target.value)} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </Content>

            }
        </>
    )
}

export default Index
