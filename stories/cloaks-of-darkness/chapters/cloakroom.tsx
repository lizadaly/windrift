import React from 'react'

import { C, R, Section, Chapter, Nav } from 'core/components'
import { BaseList as D } from 'core/components/widgets'
import { PageType } from 'core/types'
import Only from 'core/multiplayer/components/only'

import useCloak, { CloakStatus } from '../use-cloak'
import { PlayerContext } from 'core/multiplayer/components/multiplayer-init'
import Watch from 'core/multiplayer/components/watch'

export const Page: PageType = () => {
    const cloak = useCloak()
    const { otherPlayer, currentPlayer } = React.useContext(PlayerContext)
    const both = false // FIXME
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
                                    {both && (
                                        <Only playerName="raccoon">
                                            You could{' '}
                                            <C options={[['pluck']]} tag="pluck" widget={D} /> the
                                            little cloak off the snake and hang it on the hook, if
                                            you like.
                                        </Only>
                                    )}
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
                />
            </Section>
        </Chapter>
    )
}
