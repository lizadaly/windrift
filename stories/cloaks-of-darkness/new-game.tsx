import { Config, Multiplayer } from "core/types"

import JoinStory from 'core/multiplayer/components/join-story-form'
import StartStory from 'core/multiplayer/components/start-story-form'

import styles from 'public/stories/tic-tac-toe/styles/NewGame.module.scss'


type Props = {
    multiplayer: Multiplayer
    config: Config
}
const NewGame: React.FC<Props> = ({ multiplayer, config }) => {


    return <div>
        <h1>Start or join a game of Tic-Tac-Toe</h1>

        <div className={styles.instructions}>

            <div>
                <p>
                    Start a game yourself and share the
                    channel name with a friend:
                </p>
                <StartStory multiplayer={multiplayer} config={config}>
                    Start a new game of Tic-Tac-Toe
                </StartStory>
            </div>
            <div>
                <p>...or get a channel name from a friend and paste it here:</p>
                <JoinStory multiplayer={multiplayer} config={config} />
            </div>
        </div>
    </div>
}
export default NewGame