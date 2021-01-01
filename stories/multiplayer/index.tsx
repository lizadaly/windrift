import Head from 'next/head'
import * as React from "react"
import { RootState } from 'core/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { PusherProvider, PusherProviderProps } from "@harelpls/use-pusher"

import Content from "./content"
import { v4 as uuidv4 } from 'uuid'
import { initMultiplayer } from 'core/actions'
import { Config, Multiplayer } from 'core/types'
import { resetGame } from 'core/util'
import { StoryContext } from 'pages/[story]'
import { useContext } from 'react'

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
    const query = new URLSearchParams(window.location.search)
    const config = useSelector((state: RootState) => state.config)
    const persistor = useContext(StoryContext)

    const multiplayer = useSelector((state: RootState) => state.multiplayer)


    // If we got channel and player number via query params, we're not the game host
    const player = parseInt(query.get("player")) || 1
    const dispatch = useDispatch()

    React.useEffect(() => {
        const channelName = query.get("channel")
        if (channelName && multiplayer.channelName !== channelName) {
            console.log(`Clearing previous game for ${channelName}`)
            resetGame(false, persistor)
            return null
        }
        if (!multiplayer.ready) {
            populateMultiplayer(player, multiplayer, config, channelName)
            dispatch(initMultiplayer(multiplayer))
            if (player === 1) {
                // Notify the user that they need to invite a friend
                alert(`To begin the story, send the other player ${multiplayer.gameUrl}?channel=${multiplayer.channelName}&player=2&init=true`)
            }
        }
    }, [dispatch])

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
                        {children}
                    </Content>
            }


        </>
    )
}

export default Index
