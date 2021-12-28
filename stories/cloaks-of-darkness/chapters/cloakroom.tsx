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
                    <C options={[['one hook']]} tag="cl-hook" widget={D} sync={false} /> remains.{' '}
                    <R
                        tag="cl-hook"
                        options={{
                            hook: cloak === CloakStatus.Worn && (
                                <>
                                    <Only playerName="snake">
                                        It looks like you could hang your cloak there, if you only
                                        had hands.
                                    </Only>
                                    <Both>
                                        <Only playerName="raccoon">
                                            You could{' '}
                                            <C options={[['pluck']]} tag="pluck" widget={D} /> the
                                            little cloak off the snake and hang it on the hook, if
                                            you like.
                                        </Only>
                                    </Both>
                                </>
                            )
                        }}
                    />
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
                {cloak == CloakStatus.Hung && (
                    <p>There is a tiny snake-sized cloak hanging on the hook.</p>
                )}

                <Watch
                    enter={
                        <>
                            <p>The {otherPlayer.name} enters!</p>
                        </>
                    }
                    exit={
                        <>
                            <p>The {otherPlayer.name} leaves!</p>
                        </>
                    }
                    here={
                        <>
                            <p>The {otherPlayer.name} is here!</p>
                        </>
                    }
                />
                <Cycle
                    count={10}
                    every={Duration.fromObject({ seconds: 5 })}
                    duration={Duration.fromObject({ seconds: 4 })}>
                    <>
                        <Only playerName="raccoon">
                            <>You excitedly rub your tiny hands together.</>
                        </Only>
                        <Both>
                            <Only playerName="snake">
                                <>The raccooon excitedly rub its tiny hands together.</>
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
