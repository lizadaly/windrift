import * as React from 'react'

import { Multiplayer } from 'core/features/multiplayer'

import StartStory from 'core/multiplayer/components/start-story-form'

type Props = {
    multiplayer: Multiplayer
}
const NewStory: React.FC<Props> = ({ multiplayer }) => {
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
            <StartStory multiplayer={multiplayer}>Start a new Cloaks of Darkness</StartStory>
        </div>
    )
}
export default NewStory
