import { Multiplayer } from 'core/actions/multiplayer'
import { Config } from 'core/types'
import { useDispatch } from 'react-redux'
import { createStoryInstance } from '../api-client'

type Props = {
    multiplayer: Multiplayer
    config: Config
}
const StartStory: React.FC<Props> = ({ multiplayer, config, children = 'Start a new story' }) => {
    const dispatch = useDispatch()
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
