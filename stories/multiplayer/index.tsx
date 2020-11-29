import Head from 'next/head'
import * as React from "react"
import { RootState } from '../../core/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { PusherProvider, PusherProviderProps } from "@harelpls/use-pusher"

import { useState } from 'react'
import Content from "./content"
import { v5 as uuidv5 } from 'uuid'
import { Multiplayer } from '../../core/types'
import { initMultiplayer } from '../../core/actions'

interface IndexProps {
    children: React.ReactNode
}
const Index = ({ children }: IndexProps): JSX.Element => {
    const config = useSelector((state: RootState) => state.config)

    const { NEXT_PUBLIC_PUSHER_KEY, NEXT_PUBLIC_PUSHER_CLUSTER } = config.env

    const [pusherConfig] = useState(() => ({
        clientKey: NEXT_PUBLIC_PUSHER_KEY,
        cluster: NEXT_PUBLIC_PUSHER_CLUSTER
    } as PusherProviderProps))

    const [channelName] = useState(() => (uuidv5('https://github.com/lizadaly/windrift',
        uuidv5.URL)))

    const dispatch = useDispatch()
    React.useEffect(() => {
        const multiplayer = new Multiplayer(pusherConfig.clientKey, pusherConfig.cluster, channelName)
        dispatch(initMultiplayer(multiplayer))
    }, [pusherConfig, channelName])

    return (
        <>
            <Head>
                <title>{config.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond&family=Elsie&display=swap');
                </style>
            </Head>
            <PusherProvider {...pusherConfig}>
                <Content>
                    {children}
                </Content>
            </PusherProvider>

        </>
    )
}

export default Index
