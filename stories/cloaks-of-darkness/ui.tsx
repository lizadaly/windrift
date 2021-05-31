import * as React from 'react'
import { useSelector } from 'react-redux'
import v from 'voca'

import { RootState } from 'core/reducers'
import { C, R } from 'core/components'
import { Next } from 'core/actions/navigation'
import ResetButton from 'core/components/ui/reset-button'
import Grid from 'core/components/ui/grid'

import ShareButton from 'core/multiplayer/components/share-button'
import Presence from 'core/multiplayer/components/examples/presence'
import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'

import styles from 'public/stories/cloaks-of-darkness/styles/Content.module.scss'
import useCloak, { CloakStatus } from './use-cloak'

const Content: React.FC = ({ children }) => {
    const multiplayer = useSelector((state: RootState) => state.multiplayer)
    const toc = useSelector((state: RootState) => state.toc.present)
    const currentChapter = Object.values(toc).filter((c) => c.visible)[0]

    const { currentPlayer, otherPlayer, presenceApiResponse: presence } = React.useContext(
        PlayerContext
    )
    const cloakStatus = useCloak()
    return (
        <Grid
            styles={styles}
            header={
                <nav>
                    <h1>Cloaks of Darkness</h1>
                    {multiplayer.ready && (
                        <>
                            <div className={styles.player}>
                                You are player {currentPlayer.name} ⟶
                            </div>
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
            right={multiplayer.ready && <Presence />}
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
                                <C options={[['cloak', null]]} tag="cloak-desc" next={Next.None} />.
                                <R tag="cloak-desc" to={{ cloak: " It's light-absorbing. " }} />
                            </p>
                        ) : (
                            ''
                        )}
                    </>
                ))
            }>
            {children}

            <div>
                {presence && presence.nav && presence.nav.chapterName === currentChapter.filename
                    ? `${v.capitalize(otherPlayer.name)} is here!`
                    : ''}
            </div>
        </Grid>
    )
}

export default Content
