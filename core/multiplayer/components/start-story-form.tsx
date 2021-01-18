import { initMultiplayer, Multiplayer } from 'core/actions/multiplayer'
import { Config } from 'core/types'
import { useDispatch } from 'react-redux'
import { populateMultiplayer } from '..'

type Props = {
    multiplayer: Multiplayer
    config: Config
}
const StartStory: React.FC<Props> = ({ multiplayer, config, children = 'Start a new story' }) => {
    const dispatch = useDispatch()

    return (
        <>
            <button
                onClick={() => {
                    populateMultiplayer(1, multiplayer, config)
                    dispatch(initMultiplayer(multiplayer))
                }}>
                {children}
            </button>
        </>
    )
}
export default StartStory
