import * as React from 'react'
import { Duration } from 'luxon'
import Pusher from 'core/multiplayer/components/p2p/pusher'

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
import Only from 'core/multiplayer/components/only'
import { When } from 'core/components'
import { usePresence } from 'core/multiplayer/hooks/use-presence'

const Content: React.FC = ({ children }) => {
    const { ready } = React.useContext(MultiplayerContext).multiplayer

    if (!ready) {
        return (
            <Grid
                styles={styles}
                header={
                    <nav>
                        <h1>Cloaks of Darkness</h1>
                    </nav>
                }
                left={<div className={styles.alcove}></div>}>
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
    const { otherPlayer } = React.useContext(MultiplayerContext).multiplayer
    const { isActive, lastSeen } = usePresence()

    const cloakStatus = useCloak()

    return (
        <Grid
            styles={styles}
            header={
                <nav>
                    <h1>Cloaks of Darkness</h1>
                    <div className={styles.player}>You are player {currentPlayer.name} ⟶</div>
                    <div className={styles.share}>{<ShareButton />}</div>
                    <div className={styles.controls}>
                        <ResetButton />
                    </div>
                </nav>
            }
            left={
                <>
                    <div className={`${styles.imageBlock} ${styles[currentPlayer.name]}`}></div>
                    <section className={`${styles.playerBlock}`}>
                        {currentPlayer.name === 'raccoon' ? (
                            <>
                                <h2>You are a raccoon</h2>
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
                                <p>You are a fine, healthy snake with lustrous orange mottles.</p>
                            </>
                        )}
                    </section>
                    <section className={`${styles.watch}`}>
                        <img
                            src={`/stories/cloaks-of-darkness/images/${otherPlayer.name}-icon.svg`}
                            className={`${styles.icon} ${
                                isActive ? styles.active : styles.inactive
                            }`}
                            alt=""
                        />

                        <p>
                            <Watch
                                enter={<>The {otherPlayer.name} has entered the room.</>}
                                exit={<>The {otherPlayer.name} has left the room.</>}
                                elsewhere={<>The {otherPlayer.name} is elsewhere.</>}
                                here={
                                    <>
                                        The {otherPlayer.name} is here.{' '}
                                        <Only playerName="snake">
                                            <When condition={cloakStatus === CloakStatus.Worn}>
                                                {' '}
                                                It's wearing some kind of magical cloak.
                                            </When>
                                        </Only>
                                    </>
                                }
                            />{' '}
                            <Both>
                                <Cycle
                                    count={20}
                                    every={Duration.fromObject({ seconds: 20 })}
                                    duration={Duration.fromObject({ seconds: 10 })}>
                                    <>
                                        <Only playerName="raccoon">
                                            <>The snake tastes the air with its tongue.</>
                                        </Only>
                                        <Only playerName="snake">
                                            <>The raccoon excitedly rub its tiny hands together.</>
                                        </Only>
                                    </>
                                    <>
                                        <Only playerName="raccoon">
                                            <>Its scales glimmer in the light.</>
                                        </Only>
                                        <Only playerName="snake">
                                            <>
                                                You are astonished by the raccoon's ability to
                                                scratch its own butt.
                                            </>
                                        </Only>
                                    </>
                                    <>
                                        <Only playerName="raccoon">
                                            <>The snake gazes back at you kindly.</>
                                        </Only>
                                        <Only playerName="snake">
                                            <>The raccoon's stomach lets out an audible rumble.</>
                                        </Only>
                                    </>
                                </Cycle>
                            </Both>
                        </p>
                    </section>
                    <section className={styles.randomEvent}></section>
                </>
            }>
            {children}

            <DebugToolbar />
        </Grid>
    )
}

export default Content
