import { Config } from 'core/types'
import { Multiplayer } from 'core/actions/multiplayer'

import JoinStory from 'core/multiplayer/components/join-story-form'
import StartStory from 'core/multiplayer/components/start-story-form'

import styles from 'public/stories/cloaks-of-darkness/styles/NewGame.module.scss'

type Props = {
    multiplayer: Multiplayer
    config: Config
}
const NewGame: React.FC<Props> = ({ multiplayer, config }) => {
    return (
        <div>
            <h1>Start or join Cloaks of Darkness</h1>
            <p>
                This is a demo multiplayer hypertext story based on the
                <i>Cloak of Darkness</i> starter interactive fiction game.
            </p>
            <div className={styles.instructions}>
                <div>
                    <p>
                        Start the story yourself and share the story code with a friend (or other
                        browser window):
                    </p>
                    <StartStory multiplayer={multiplayer} config={config}>
                        Start a new Cloaks of Darkness
                    </StartStory>
                </div>
                <div>
                    <p>...or get a story code from a friend and paste it here:</p>
                    <JoinStory multiplayer={multiplayer} config={config} />
                </div>
            </div>
        </div>
    )
}
export default NewGame
