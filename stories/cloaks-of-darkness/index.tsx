import Head from 'next/head'
import * as React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'core/types'
import TitleScreen from 'core/multiplayer/components/title-screen'
import NewStory from './new-story'
import UI from './ui'
import useMultiplayer from 'core/multiplayer/hooks/use-multiplayer'
import { StoryContext } from 'pages/[story]/[[...chapter]]'

const Index: React.FC = ({ children }) => {
    const { multiplayer } = useSelector((state: RootState) => state.multiplayer)
    const { config } = React.useContext(StoryContext)
    useMultiplayer()

    // Component tree to render for an active story
    const ready = <UI>{children}</UI>

    // Render tree for setting up the story
    const setup = (
        <UI>
            <NewStory multiplayer={multiplayer} />
        </UI>
    )

    return (
        <>
            <Head>
                <title>{config.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <TitleScreen ready={ready} setup={setup} />
        </>
    )
}

export default Index
