import * as React from "react"
import { useSelector } from 'react-redux'


import { RootState } from 'core/reducers'
import { resetGame } from 'core/util'

import { StoryContext } from "pages/[story]"

import useChoiceListener from "core/multiplayer/hooks/use-choice-listener"
import ShareButton from "core/multiplayer/components/share-button"

import Presence from './components/presence'
import Log from "./components/log"

import styles from 'public/stories/tic-tac-toe/styles/Content.module.scss'

const Content: React.FC = ({ children }) => {
    const config = useSelector((state: RootState) => state.config)
    const multiplayer = useSelector((state: RootState) =>
        state.multiplayer)
    const currentPlayer = multiplayer.player
    const otherPlayer = currentPlayer === 1 ? 2 : 1

    // Listen for events from the other player. This should be at the root
    useChoiceListener(multiplayer.channelName, currentPlayer)

    const persistor = React.useContext(StoryContext)

    return (
        <><header className={styles.header}>
            <nav>
                <h1>
                    {config.title}
                </h1>
                {
                    currentPlayer && <>
                        <div className={styles.player}>
                            You are player {currentPlayer} ⟶
                    </div>
                        <div className={styles.share}>
                            <ShareButton multiplayer={multiplayer} otherPlayer={otherPlayer}/>
                        </div>
                        <div className={styles.controls}>
                            <button onClick={() => {
                                resetGame(true, persistor)
                            }}>Reset</button>
                        </div>
                    </>
                }

            </nav>
        </header>
            <main className={styles.main} id="multiplayer-demo">
                <nav className={styles.left}>

                </nav>
                <article className={styles.article}>
                    {children}
                </article>
                <nav className={styles.right}>
                    {multiplayer.ready && <>
                        <Presence />
                        <Log />
                    </>
                    }
                </nav>
            </main>
        </>
    )
}

export default Content
