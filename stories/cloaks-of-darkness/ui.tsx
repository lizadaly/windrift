import * as React from 'react'

import ResetButton from 'core/components/ui/reset-button'
import Grid from 'core/components/ui/layouts/grid'

import ShareButton from 'core/multiplayer/components/share-button'

import styles from 'public/stories/cloaks-of-darkness/styles/Content.module.scss'

import useCloak, { CloakStatus } from './use-cloak'
import DebugToolbar from 'core/multiplayer/components/debug'
import { MultiplayerContext } from 'core/multiplayer/components/multiplayer'
import Both from 'core/multiplayer/components/both'
import Watch from 'core/multiplayer/components/watch'
import Cycle from 'core/components/cycle'
import { Duration } from 'luxon'
import Only from 'core/multiplayer/components/only'

const Content: React.FC = ({ children }) => {
    const { ready, currentPlayer } = React.useContext(MultiplayerContext).multiplayer
    const { otherPlayer } = React.useContext(MultiplayerContext).multiplayer

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
                            <div className={styles.share}>{<ShareButton />}</div>
                            <div className={styles.controls}>
                                <ResetButton />
                            </div>
                        </>
                    )}
                </nav>
            }
            left={
                currentPlayer ? ( // Story must have started
                    <>
                        <section className={`${styles.playerBlock}`}>
                            {currentPlayer.name === 'raccoon' ? (
                                <>
                                    <h3>You are a raccoon</h3>
                                    <p>You have very dextrous hands and a lovely coat of fur.</p>
                                    {cloakStatus === CloakStatus.Worn ? (
                                        <>
                                            <p>
                                                You have adorned yourself with a fine black velvet
                                                cloak. Darkness shimmers around you.
                                            </p>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </>
                            ) : (
                                <>
                                    <h2>You are a corn snake</h2>
                                    <p>
                                        You are a fine, healthy snake with lustrous orange mottles.
                                    </p>
                                </>
                            )}
                            <div className={`${styles[currentPlayer.name]}`}></div>
                        </section>
                        <section className={styles.watch}>
                            <Watch
                                enter={
                                    <>
                                        <p>The {otherPlayer.name} has entered the room.</p>
                                    </>
                                }
                                exit={
                                    <>
                                        <p>The {otherPlayer.name} has left the room.</p>
                                    </>
                                }
                                here={
                                    <>
                                        <p>The {otherPlayer.name} is here.</p>
                                    </>
                                }
                            />
                        </section>
                        <section className={styles.randomEvent}>
                            <Cycle
                                count={10}
                                every={Duration.fromObject({ seconds: 20 })}
                                duration={Duration.fromObject({ seconds: 10 })}>
                                <>
                                    <Only playerName="raccoon">
                                        <>You excitedly rub your tiny hands together.</>
                                    </Only>
                                    <Both>
                                        <Only playerName="snake">
                                            <>The raccoon excitedly rub its tiny hands together.</>
                                        </Only>
                                    </Both>
                                </>
                                <>
                                    <Only playerName="raccoon">
                                        <>
                                            Your butt itches so you absently scratch it with a hind
                                            leg.
                                        </>
                                    </Only>
                                    <Both>
                                        <Only playerName="snake">
                                            <>
                                                You are astonished by the raccoon's ability to
                                                scratch its own butt.
                                            </>
                                        </Only>
                                    </Both>
                                </>
                                <>
                                    <Only playerName="raccoon">
                                        <>
                                            Your tummy rumbles and you wonder if there's any trash
                                            to be found here.
                                        </>
                                    </Only>
                                    <Both>
                                        <Only playerName="snake">
                                            <>The raccoon's stomach lets out an audible rumble.</>
                                        </Only>
                                    </Both>
                                </>
                            </Cycle>
                        </section>
                    </>
                ) : (
                    <div className={styles.alcove}></div>
                )
            }>
            {children}

            <DebugToolbar />
        </Grid>
    )
}

export default Content
