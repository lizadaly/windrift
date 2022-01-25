import * as React from 'react'

import { MultiplayerContext } from 'core/multiplayer/components/multiplayer'
import StartStory from 'core/multiplayer/components/start-story-form'

import styles from 'public/stories/tic-tac-toe/styles/NewGame.module.scss'

const NewGame: React.FC = ({ children }) => {
    const { ready } = React.useContext(MultiplayerContext).multiplayer
    return ready ? (
        <>{children}</>
    ) : (
        <div>
            <h1>Start a game of Tic-Tac-Toe</h1>

            <div className={styles.instructions}>
                <div>
                    <p>Start a game yourself and share the URL with a friend:</p>
                    <StartStory>Start a new game of Tic-Tac-Toe</StartStory>
                </div>
            </div>
        </div>
    )
}
export default NewGame
