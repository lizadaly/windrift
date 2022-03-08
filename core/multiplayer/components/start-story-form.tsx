import * as React from 'react'

import { createStoryInstance } from 'core/multiplayer/api-client'
import { StoryContext } from 'core/containers/store-container'
import { useRouter } from 'next/router'

const StartStory: React.FC = ({ children = 'Start a new story' }) => {
    const { config } = React.useContext(StoryContext)
    const router = useRouter()
    const [clicked, setClicked] = React.useState(router.query.instance ? true : false)
    return (
        <>
            <button
                disabled={clicked}
                onClick={async () => {
                    setClicked(true)

                    const resp = await createStoryInstance(config.identifier)
                    // Rewrite the URL to include the query params
                    router.push(
                        {
                            pathname: `/[story]/[[...chapter]]`,
                            query: {
                                instance: resp.instanceId,
                                playerId: resp.currentPlayer.id
                            }
                        },
                        `/${config.identifier}/?instance=${resp.instanceId}&playerId=${resp.currentPlayer.id}`,
                        { shallow: true }
                    )
                }}>
                {clicked ? 'Setting up story...' : children}
            </button>
        </>
    )
}
export default StartStory
