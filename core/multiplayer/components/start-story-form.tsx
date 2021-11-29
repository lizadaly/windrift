import * as React from 'react'

import { Multiplayer } from 'core/features/multiplayer'
import { useDispatch } from 'react-redux'
import { createStoryInstance } from '../api-client'
import { StoryContext } from 'pages/[story]/[[...chapter]]'

type Props = {
    multiplayer: Multiplayer
}
const StartStory: React.FC<Props> = ({ multiplayer, children = 'Start a new story' }) => {
    const dispatch = useDispatch()
    const { config } = React.useContext(StoryContext)

    return (
        <>
            <button
                onClick={async () => {
                    createStoryInstance(config.identifier, multiplayer, dispatch)
                }}>
                {children}
            </button>
        </>
    )
}
export default StartStory
