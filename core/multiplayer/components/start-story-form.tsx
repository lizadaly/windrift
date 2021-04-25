import axios from 'axios'
import { initMultiplayer, Multiplayer } from 'core/actions/multiplayer'
import { Config } from 'core/types'
import { useDispatch } from 'react-redux'

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
                    axios(`/api/init/${config.identifier}`, {
                        method: 'post'
                    }).then((res) => {
                        const { instance, player1 } = res.data
                        const { protocol, hostname, port, pathname } = window.location
                        const storyUrl = `${protocol}//${hostname}${
                            port ? ':' + port : ''
                        }${pathname}`

                        multiplayer.instanceId = instance.id
                        multiplayer.storyUrl = storyUrl
                        multiplayer.currentPlayer = player1.id
                        multiplayer.ready = true
                        dispatch(initMultiplayer(multiplayer))
                    })
                }}>
                {children}
            </button>
        </>
    )
}
export default StartStory
