import * as React from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'

import { RootState } from 'core/types'
import TitleScreen from 'core/multiplayer/components/title-screen'

import UI from './ui'
import NewGame from './components/new-game'

import useMultiplayer from 'core/multiplayer/hooks/use-multiplayer'
import { StoryContext } from 'pages/[story]/[[...chapter]]'

const Index: React.FC = ({ children }) => {
    const { config } = React.useContext(StoryContext)

    const { multiplayer } = useSelector((state: RootState) => state.multiplayer)

    useMultiplayer()

    // Component tree to render for an active story
    const ready = <UI>{children}</UI>

    // // Render tree for setting up the game
    const setup = (
        <UI>
            <NewGame multiplayer={multiplayer} />
        </UI>
    )

    return (
        <>
            <Head>
                <title>{config.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <style>
                    @import
                    url(https://fonts.googleapis.com/css2?family=EB+Garamond&family=Elsie&display=swap);
                </style>
            </Head>
            <TitleScreen ready={ready} setup={setup} />
        </>
    )
}

export default Index
