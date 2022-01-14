import React from 'react'
import { Duration } from 'luxon'

import { C, R, Section, Chapter, Nav } from 'core/components'
import { BaseList as D } from 'core/components/widgets'
import { PageType } from 'core/types'

import useCloak, { CloakStatus } from '../use-cloak'
import { MultiplayerContext } from 'core/multiplayer/components/multiplayer'

import Watch from 'core/multiplayer/components/watch'
import Both from 'core/multiplayer/components/both'
import Only from 'core/multiplayer/components/only'

import Cycle from 'core/components/cycle'

export const Page: PageType = () => {
    const cloak = useCloak()

    const { otherPlayer } = React.useContext(MultiplayerContext).multiplayer

    return (
        <Chapter filename="cloakroom">
            <Section>
                <h1>Cloakroom</h1>
                <p>
                    The walls of this small room were clearly once lined with hooks, though now only{' '}
                    <C
                        options={[['one hook']]}
                        last="one small brass hook"
                        tag="hook"
                        sync={false}
                    />{' '}
                    remains.{' '}
                    <R
                        tag="hook"
                        options={{
                            '*': (
                                <>
                                    {cloak == CloakStatus.Hung ? (
                                        <>
                                            There is a{' '}
                                            <C
                                                tag="cloak-examine"
                                                options={[['curiously small cloak']]}
                                                sync={false}
                                            />{' '}
                                            hanging on the hook.
                                            <R
                                                tag="cloak-examine"
                                                options={{
                                                    '*': (
                                                        <>
                                                            {' '}
                                                            The cloak appears to be absorbing the
                                                            light around it
                                                            <Only playerName="raccoon">
                                                                {' '}
                                                                and it looks like it might{' '}
                                                                <C
                                                                    tag="cloak-wear"
                                                                    options={[['fit you']]}
                                                                />
                                                                , though you're not normally the
                                                                clothes-wearing type
                                                            </Only>
                                                            .
                                                        </>
                                                    )
                                                }}
                                            />
                                        </>
                                    ) : (
                                        'The hook is empty.'
                                    )}
                                </>
                            )
                        }}
                    />{' '}
                    The exit is a door to the <Nav text="east" next="foyer" />.
                </p>
                <R
                    tag="cl-pluck"
                    options={{
                        pluck: (
                            <Only playerName="raccoon">
                                <p>
                                    You delicately remove the tiny cloak from the snake and hang it
                                    up.
                                </p>
                            </Only>
                        )
                    }}
                />
                <Only playerName="snake">
                    <aside>
                        Normally you find forgotten scarves and other still-warm items left behind
                        by humans who just attended the opera, but the cloakroom is empty and cold.
                        Perhaps the performances were cancelled tonight? You can sense warmth
                        radiating from the east, though.
                    </aside>
                </Only>

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
                            <>Your butt itches so you absently scratch it with a hind leg.</>
                        </Only>
                        <Both>
                            <Only playerName="snake">
                                <>
                                    You are astonished by the raccoon's ability to scratch its own
                                    butt.
                                </>
                            </Only>
                        </Both>
                    </>
                    <>
                        <Only playerName="raccoon">
                            <>
                                Your tummy rumbles and you wonder if there's any trash to be found
                                here.
                            </>
                        </Only>
                        <Both>
                            <Only playerName="snake">
                                <>The raccoon's stomach lets out an audible rumble.</>
                            </Only>
                        </Both>
                    </>
                </Cycle>
            </Section>
        </Chapter>
    )
}
