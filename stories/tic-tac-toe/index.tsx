import Head from 'next/head'
import * as React from 'react'

import NewStory from './components/new-game'
import UI from './ui'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import Multiplayer from 'core/multiplayer/components/multiplayer'
import Ready from 'core/multiplayer/components/ready'

const Index: React.FC = ({ children }) => {
    const { config } = React.useContext(StoryContext)

    return (
        <>
            <Head>
                <title>{config.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Multiplayer>
                <UI>
                    <NewStory>{children}</NewStory>
                </UI>
            </Multiplayer>
        </>
    )
}

export default Index
