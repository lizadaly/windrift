import * as React from 'react'

import { Next } from 'core/types'
import { C, R } from 'core/components'

import ResetButton from 'core/components/ui/reset-button'
import Grid from 'core/components/ui/layouts/grid'

import ShareButton from 'core/multiplayer/components/share-button'
import Presence from 'core/multiplayer/components/examples/presence'

import styles from 'public/stories/cloaks-of-darkness/styles/Content.module.scss'
import useCloak, { CloakStatus } from './use-cloak'
import DebugToolbar from 'core/multiplayer/components/debug'
import { MultiplayerContext } from 'core/multiplayer/components/multiplayer'

const Content: React.FC = ({ children }) => {
    const { ready, currentPlayer, otherPlayer } = React.useContext(MultiplayerContext).multiplayer

    const cloakStatus = useCloak()
    return (
        <Grid
            styles={styles}
            header={
                <nav>
                    <h1>Cloaks of Darkness</h1>
                    {ready && (
                        <>
                            <div className={styles.player}>
                                You are player {currentPlayer.name} ⟶
                            </div>
                            <div className={styles.share}>
                                {/* <ShareButton otherPlayer={otherPlayer} /> */}
                            </div>
                            <div className={styles.controls}>
                                <ResetButton />
                            </div>
                        </>
                    )}
                </nav>
            }
            right={ready && <Presence />}
            left={
                currentPlayer && // Story must have started
                (currentPlayer.name === 'raccoon' ? (
                    <>
                        <h3>You are a raccoon</h3>
                        <p>You have very dextrous hands and a lovely coat of fur.</p>
                    </>
                ) : (
                    <>
                        <h3>You are a corn snake</h3>
                        <p>You are a fine, healthy snake with lustrous orange mottles.</p>
                        {cloakStatus === CloakStatus.Worn ? (
                            <p>
                                You are wearing a very tiny dark{' '}
                                <C options={[['cloak']]} tag="cloak-desc" next={Next.None} />.
                                <R
                                    tag="cloak-desc"
                                    options={{ cloak: " It's light-absorbing. " }}
                                />
                            </p>
                        ) : (
                            ''
                        )}
                    </>
                ))
            }>
            {children}
            <DebugToolbar />
        </Grid>
    )
}

export default Content
