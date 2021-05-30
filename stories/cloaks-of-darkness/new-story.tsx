import { Config } from 'core/types'
import { Multiplayer } from 'core/actions/multiplayer'

import StartStory from 'core/multiplayer/components/start-story-form'

type Props = {
    multiplayer: Multiplayer
    config: Config
}
const NewStory: React.FC<Props> = ({ multiplayer, config }) => {
    return (
        <div>
            <h1>Start or join Cloaks of Darkness</h1>
            <p>
                This is a demo multiplayer hypertext story based on the
                <i>Cloak of Darkness</i> starter interactive fiction story.
            </p>
            <p>
                Start the story yourself and share the story with a friend (or other browser
                window):
            </p>
            <StartStory multiplayer={multiplayer} config={config}>
                Start a new Cloaks of Darkness
            </StartStory>
        </div>
    )
}
export default NewStory
