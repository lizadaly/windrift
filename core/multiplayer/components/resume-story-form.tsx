import * as React from 'react'

import { resumeStoryInstance } from '../api-client'
import { StoryContext } from 'pages/[story]/[[...chapter]]'
import styles from 'public/styles/multiplayer/ResumeStory.module.scss'

const ResumeStory: React.FC = ({ children = 'Resume an existing story' }) => {
    const { persistor, config } = React.useContext(StoryContext)
    const instanceId = React.useRef<HTMLInputElement>(null)
    const player1 = React.useRef<HTMLInputElement>(null)
    const player2 = React.useRef<HTMLInputElement>(null)

    return (
        <div className={styles.resume}>
            <form
                className={styles.resumeForm}
                onSubmit={async (e) => {
                    e.preventDefault()
                    const isPlayer1 = player1.current.checked ? 'player1' : null
                    const isPlayer2 = player2.current.checked ? 'player2' : null
                    if (!isPlayer1 && !isPlayer2) {
                        alert('You must select which player to resume.')
                        return false
                    }

                    persistor.flush().then(() => {
                        persistor.pause()
                        persistor.purge().then(() => {
                            persistor.persist()
                        })
                    })
                    const resp = await resumeStoryInstance(
                        config.identifier,
                        instanceId.current.value,
                        isPlayer1 || isPlayer2
                    )
                    if (resp.status === 200 && resp.storyUrl) {
                        location.replace(resp.storyUrl)
                    } else if (resp.status === 404) {
                        alert("That instance ID wasn't found.")
                    } else {
                        alert('An unexpected error occurred.')
                    }
                }}>
                <h3>{children}</h3>
                <input
                    type="text"
                    name="instanceId"
                    placeholder="17425af5-8e4e-4e3e-8a14-51c1e7286424"
                    size={36}
                    className={styles.instanceIdField}
                    ref={instanceId}
                    required={true}
                />
                <label htmlFor="instanceId" className={styles.instanceIdField}>
                    The instance of the story to resume
                </label>

                <div>
                    <input
                        type="radio"
                        name="player"
                        value="player1"
                        ref={player1}
                        className={styles.player}
                    />
                    <label htmlFor="player1" className={styles.player}>
                        I was player one
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="player"
                        value="player2"
                        ref={player2}
                        className={styles.player}
                    />
                    <label htmlFor="player1" className={styles.player}>
                        I was player two
                    </label>
                </div>
                <input type="submit" />
            </form>
        </div>
    )
}
export default ResumeStory
