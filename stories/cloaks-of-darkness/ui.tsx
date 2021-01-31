import * as React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from 'core/reducers'

import ShareButton from 'core/multiplayer/components/share-button'
import { C, R } from 'core/components'

import Presence from 'core/multiplayer/components/presence'
import Log from 'core/multiplayer/components/log'
import ResetButton from 'core/components/ui/reset-button'
import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'
import Grid from 'core/components/ui/grid'

import styles from 'public/stories/cloaks-of-darkness/styles/Content.module.scss'
import useCloak, { CloakStatus } from './use-cloak'
import { Next } from 'core/actions/navigation'

const Content: React.FC = ({ children }) => {
    const multiplayer = useSelector((state: RootState) => state.multiplayer)
    const { currentPlayer, otherPlayer } = React.useContext(PlayerContext)
    const cloakStatus = useCloak()
    return (
        <Grid
            styles={styles}
            header={
                <nav>
                    <h1>Cloaks of Darkness</h1>
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
            }
            left={
                currentPlayer && // Story must have started
                (currentPlayer === 'raccoon' ? (
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
                                <C choices={[['cloak', null]]} tag="cloak-desc" next={Next.None} />.
                                <R tag="cloak-desc" to={{ cloak: " It's light-absorbing. " }} />
                            </p>
                        ) : (
                            ''
                        )}
                    </>
                ))
            }>
            {children}
        </Grid>
    )
}

export default Content
