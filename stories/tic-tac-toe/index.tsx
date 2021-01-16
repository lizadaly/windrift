import Head from 'next/head'
import * as React from "react"
import { RootState } from 'core/reducers'
import { useSelector } from 'react-redux'
import { PusherProvider } from "@harelpls/use-pusher"

import Content from "./content"

import NewGame from './components/new-game'

interface IndexProps {
    children: React.ReactNode,

}



const Index = ({ children }: IndexProps): JSX.Element => {
    const config = useSelector((state: RootState) => state.config)
    const multiplayer = useSelector((state: RootState) => state.multiplayer)


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
                        <NewGame multiplayer={multiplayer} config={config} />
                    </Content>

            }
        </>
    )
}

export default Index
