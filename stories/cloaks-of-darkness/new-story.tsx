import * as React from 'react'

import StartStory from 'core/multiplayer/components/start-story-form'
import ResumeStory from 'core/multiplayer/components/resume-story-form'
import { MultiplayerContext } from 'core/multiplayer/components/multiplayer'

/**
 * If the multiplayer story has not been initialized, start the "new story" process now.
 *
 * Otherwise, pass through to the current active chapter (as `children`).
 */
const NewStory: React.FC = ({ children }) => {
    const { ready } = React.useContext(MultiplayerContext).multiplayer
    return ready ? (
        <>{children}</>
    ) : (
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
            <StartStory>Start a new Cloaks of Darkness</StartStory>
            <ResumeStory>Resume an existing Cloaks of Darkness</ResumeStory>
        </div>
    )
}
export default NewStory
