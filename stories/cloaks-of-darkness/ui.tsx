import * as React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'core/reducers'

import ShareButton from 'core/multiplayer/components/share-button'

import Presence from 'core/multiplayer/components/presence'
import Log from 'core/multiplayer/components/log'
import ResetButton from 'core/components/ui/reset-button'
import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'
import Grid from 'core/components/ui/grid'

import styles from 'public/stories/cloaks-of-darkness/styles/Content.module.scss'

const Content: React.FC = ({ children }) => {
    const multiplayer = useSelector((state: RootState) => state.multiplayer)
    const { currentPlayer, otherPlayer } = React.useContext(PlayerContext)

    return (
        <Grid
            styles={styles}
            header={
                <nav>
                    <h1>Multiplayer Demo</h1>
                    {multiplayer.ready && (
                        <>
                            <div className={styles.player}>You are player {currentPlayer} ⟶</div>
                            <div className={styles.share}>
                                <ShareButton multiplayer={multiplayer} otherPlayer={otherPlayer} />
                            </div>
                            <div className={styles.controls}>
                                <ResetButton />
                            </div>
                        </>
                    )}
                </nav>
            }
            right={
                multiplayer.ready && (
                    <>
                        <Presence />
                        <Log />
                    </>
                )
            }>
            {children}
        </Grid>
    )
}

export default Content
