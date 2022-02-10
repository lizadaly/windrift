import * as React from 'react'

import ShareButton from 'core/multiplayer/components/share-button'

import Presence from 'core/multiplayer/components/examples/presence'
import Log from 'core/multiplayer/components/examples/log'

import styles from 'public/stories/tic-tac-toe/styles/Content.module.scss'
import ResetButton from 'core/components/ui/reset-button'
import Grid from 'core/components/ui/layouts/grid'
import { MultiplayerContext } from 'core/multiplayer/components/multiplayer'
import Pusher from 'core/multiplayer/components/p2p/pusher'

const Content: React.FC = ({ children }) => {
    const { ready } = React.useContext(MultiplayerContext).multiplayer
    if (!ready) {
        return (
            <Grid
                styles={styles}
                header={
                    <nav>
                        <h1>Multiplayer Demo</h1>
                    </nav>
                }>
                {children}
            </Grid>
        )
    }

    return (
        <Pusher>
            <Ready>{children}</Ready>
        </Pusher>
    )
}
const Ready: React.FC = ({ children }) => {
    const { currentPlayer } = React.useContext(MultiplayerContext).multiplayer
    return (
        <Grid
            styles={styles}
            header={
                <nav>
                    <h1>Multiplayer Demo</h1>
                    <div className={styles.player}>You are {currentPlayer.name} ⟶</div>
                    <div className={styles.share}>
                        <ShareButton />
                    </div>
                    <div className={styles.controls}>
                        <ResetButton />
                    </div>
                </nav>
            }
            right={
                <>
                    <Presence />
                    <Log />
                </>
            }>
            {children}
        </Grid>
    )
}

export default Content
