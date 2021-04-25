import { initMultiplayer, Multiplayer } from 'core/actions/multiplayer'
import { Config } from 'core/types'
import { useDispatch } from 'react-redux'
import { populateMultiplayer, createStoryInstance } from '..'

type Props = {
    multiplayer: Multiplayer
    config: Config
}
const StartStory: React.FC<Props> = ({ multiplayer, config, children = 'Start a new story' }) => {
    const dispatch = useDispatch()
    const initialPlayer = config.players[0].name
    return (
        <>
            <button
                onClick={async () => {
                    const instance = await createStoryInstance(initialPlayer, multiplayer, config)
                    populateMultiplayer(initialPlayer, multiplayer, config, instance.id)
                    dispatch(initMultiplayer(multiplayer))
                }}>
                {children}
            </button>
        </>
    )
}
export default StartStory
