import Head from 'next/head'
import * as React from "react"
import { RootState } from 'core/reducers'
import { useSelector } from 'react-redux'

import Content from "./content"

import NewGame from './components/new-game'
import TitleScreen from 'core/multiplayer/components/title-screen'


const Index: React.FC = ({ children }) => {
    const config = useSelector((state: RootState) => state.config)
    const multiplayer = useSelector((state: RootState) => state.multiplayer)

    // Component tree to render for an active story
    const ready =  <Content>
        {children}
    </Content>

    // Render tree for setting up the game
    const setup = <Content>
        <NewGame multiplayer={multiplayer} config={config} />
    </Content>

    return (
        <>
            <Head>
                <title>{config.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond&family=Elsie&display=swap');
                </style>

            </Head>
            <TitleScreen ready={ready} setup={setup}/>
        </>
    )
}

export default Index
