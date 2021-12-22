import * as React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'core/types'

import ShareButton from 'core/multiplayer/components/share-button'

import Presence from 'core/multiplayer/components/examples/presence'
import Log from 'core/multiplayer/components/examples/log'

import styles from 'public/stories/tic-tac-toe/styles/Content.module.scss'
import ResetButton from 'core/components/ui/reset-button'
import Grid from 'core/components/ui/layouts/grid'
import { MultiplayerContext } from 'core/multiplayer/components/multiplayer'

const Content: React.FC = ({ children }) => {
    const multiplayer = React.useContext(MultiplayerContext).multiplayer
    const { currentPlayer, otherPlayer, ready } = multiplayer

    return (
        <Grid
            styles={styles}
            header={
                <nav>
                    <h1>Multiplayer Demo</h1>
                    {ready && (
                        <>
                            <div className={styles.player}>You are {currentPlayer.name} ⟶</div>
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
                multiplayer?.ready && (
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
