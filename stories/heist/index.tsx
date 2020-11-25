import Head from 'next/head'
import * as React from "react"
import { RootState } from '../../core/reducers'
import { useSelector } from 'react-redux'
import { PusherProvider, PusherProviderProps } from "@harelpls/use-pusher"

import { useState } from 'react'
import Content from "./content"

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
