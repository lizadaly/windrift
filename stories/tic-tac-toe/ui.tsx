import * as React from "react"
import { useSelector } from 'react-redux'

import { RootState } from 'core/reducers'

import ShareButton from "core/multiplayer/components/share-button"

import Presence from './components/presence'
import Log from "./components/log"

import styles from 'public/stories/tic-tac-toe/styles/Content.module.scss'
import ResetButton from "core/components/ui/reset-button"
import { PlayerContext } from "core/multiplayer/components/multiplayer-init"

const Content: React.FC = ({ children }) => {
    const config = useSelector((state: RootState) => state.config)
    const multiplayer = useSelector((state: RootState) => state.multiplayer)
    const { currentPlayer, otherPlayer } = React.useContext(PlayerContext)

    return <>
        <header className={styles.header}>
            <nav>
                <h1>
                    {config.title}
                </h1>
                {
                    multiplayer.ready && <>
                        <div className={styles.player}>
                            You are player {currentPlayer} ⟶
                        </div>
                        <div className={styles.share}>
                            <ShareButton multiplayer={multiplayer} otherPlayer={otherPlayer}/>
                        </div>
                        <div className={styles.controls}>
                            <ResetButton />
                        </div>
                    </>
                }

            </nav>
        </header>
        <main className={styles.main} id="multiplayer-demo">
            <nav className={styles.left}>

            </nav>
            <article className={styles.story}>
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
}

export default Content
