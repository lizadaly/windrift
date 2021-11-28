import Head from 'next/head'
import * as React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'core/reducers'
import TitleScreen from 'core/multiplayer/components/title-screen'
import NewStory from './new-story'
import UI from './ui'
import useMultiplayer from 'core/multiplayer/hooks/use-multiplayer'

const Index: React.FC = ({ children }) => {
    const config = useSelector((state: RootState) => state.config)
    const multiplayer = useSelector((state: RootState) => state.multiplayer)
    useMultiplayer(config)

    // Component tree to render for an active story
    const ready = <UI>{children}</UI>

    // Render tree for setting up the story
    const setup = (
        <UI>
            <NewStory multiplayer={multiplayer} config={config} />
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
