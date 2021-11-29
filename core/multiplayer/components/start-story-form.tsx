import * as React from 'react'

import { useDispatch } from 'react-redux'
import { createStoryInstance } from '../api-client'
import { StoryContext } from 'pages/[story]/[[...chapter]]'

const StartStory: React.FC = ({ children = 'Start a new story' }) => {
    const dispatch = useDispatch()
    const { config } = React.useContext(StoryContext)

    return (
        <>
            <button
                onClick={async () => {
                    createStoryInstance(config.identifier, dispatch)
                }}>
                {children}
            </button>
        </>
    )
}
export default StartStory
