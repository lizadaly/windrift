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
            <h1>
                Start a new session of <em>Cloaks of Darkness</em>
            </h1>
            <p>
                This is a simple two-player hypertext story based on the <i>Cloak of Darkness</i>{' '}
                interactive fiction game meant to demonstrate the multiplayer functionality of the
                hypertext library <a href="https://windrift.app">Windrift</a>.
            </p>
            <p>
                Each person will play the role of a different character. The story is cooperative,
                so you'll be working together to bring things to a happy conclusion. There is no way
                to lose and a typical session takes about 10 minutes.
            </p>
            <p>
                To play with a friend, start the story below, then click the "Share story link"
                button at the top. It will be pulsing subtly to help you find it!
            </p>
            <br />
            <StartStory>Start a new Cloaks of Darkness</StartStory>
            <br />
            <br />
            <aside>
                <p>
                    If you are trying to <em>join an existing story</em>, ask the other player to
                    click the "share story link" button—it will generate a link in their clipboard
                    which they can send to you.
                </p>
            </aside>
        </div>
    )
}
export default NewStory
