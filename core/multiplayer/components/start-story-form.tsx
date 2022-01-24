import * as React from 'react'

import { createStoryInstance } from 'core/multiplayer/api-client'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import { MultiplayerContext } from './multiplayer'

const StartStory: React.FC = ({ children = 'Start a new story' }) => {
    const { setMultiplayer } = React.useContext(MultiplayerContext)

    const { config } = React.useContext(StoryContext)

    const [clicked, setClicked] = React.useState(false)

    return (
        <>
            <button
                disabled={clicked}
                onClick={async () => {
                    setClicked(true)
                    const multiplayer = await createStoryInstance(config.identifier)
                    setMultiplayer(multiplayer)
                }}>
                {clicked ? 'Setting up story...' : children}
            </button>
        </>
    )
}
export default StartStory
