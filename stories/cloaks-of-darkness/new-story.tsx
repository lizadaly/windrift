import * as React from 'react'

import StartStory from 'core/multiplayer/components/start-story-form'
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
            <h1>Start a new Cloaks of Darkness</h1>
            <p>
                This is a demo multiplayer hypertext story based on the
                <i>Cloak of Darkness</i> starter interactive fiction story.
            </p>
            <p>
                Start the story yourself and share the story with a friend (or other browser
                window):
            </p>
            <StartStory>Start a new Cloaks of Darkness</StartStory>
            <aside>
                If you are trying to join an existing story, ask the other player to click the
                "share story link" button and paste that link in a chat session with
            </aside>
        </div>
    )
}
export default NewStory
