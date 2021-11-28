import { Config } from 'core/types'
import { Multiplayer } from 'core/actions/multiplayer'

import StartStory from 'core/multiplayer/components/start-story-form'

import styles from 'public/stories/tic-tac-toe/styles/NewGame.module.scss'

type Props = {
    multiplayer: Multiplayer
    config: Config
}
const NewGame: React.FC<Props> = ({ multiplayer, config }) => {
    return (
        <div>
            <h1>Start a game of Tic-Tac-Toe</h1>

            <div className={styles.instructions}>
                <div>
                    <p>Start a game yourself and share the URL with a friend:</p>
                    <StartStory multiplayer={multiplayer} config={config}>
                        Start a new game of Tic-Tac-Toe
                    </StartStory>
                </div>
            </div>
        </div>
    )
}
export default NewGame
