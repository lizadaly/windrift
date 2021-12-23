import * as React from 'react'

import { createStoryInstance } from 'core/multiplayer/api-client'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import { MultiplayerContext } from './multiplayer'

const StartStory: React.FC = ({ children = 'Start a new story' }) => {
    const { setMultiplayer } = React.useContext(MultiplayerContext)

    const { config } = React.useContext(StoryContext)

    return (
        <>
            <button
                onClick={async () => {
                    const multiplayer = await createStoryInstance(config.identifier)
                    console.log(multiplayer)
                    setMultiplayer(multiplayer)
                }}>
                {children}
            </button>
        </>
    )
}
export default StartStory
