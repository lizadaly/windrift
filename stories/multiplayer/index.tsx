import Head from 'next/head'
import * as React from "react"
import { RootState } from '../../core/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { PusherProvider, PusherProviderProps } from "@harelpls/use-pusher"

import Content from "./content"
import { v4 as uuidv4 } from 'uuid'
import { initMultiplayer } from 'core/actions'

interface IndexProps {
    children: React.ReactNode
}
const Index = ({ children }: IndexProps): JSX.Element => {
    const config = useSelector((state: RootState) => state.config)
    const multiplayer = useSelector((state: RootState) => state.multiplayer)


    const dispatch = useDispatch()
    React.useEffect(() => {
        if (!multiplayer.ready) {
            const { NEXT_PUBLIC_PUSHER_KEY, NEXT_PUBLIC_PUSHER_CLUSTER } = config.env

            const channelName = uuidv4()
            const gameUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
            const pusherConfig = {
                clientKey: NEXT_PUBLIC_PUSHER_KEY,
                cluster: NEXT_PUBLIC_PUSHER_CLUSTER
            } as PusherProviderProps
            multiplayer.clientKey = pusherConfig.clientKey
            multiplayer.cluster = pusherConfig.cluster
            multiplayer.channelName = channelName
            multiplayer.gameUrl = gameUrl
            multiplayer.ready = true
            dispatch(initMultiplayer(multiplayer))

            // Notify the user that they need to invite a friend
            alert(`To begin the story, send the other player ${gameUrl}?channel=${channelName}`)
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
                multiplayer.ready ? <PusherProvider clientKey={multiplayer.clientKey} cluster={multiplayer.cluster}>
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
