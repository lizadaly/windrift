import React from 'react'

import { C, R, Section, Chapter, Nav } from 'core/components'
import { PageType } from 'core/types'

import useCloak, { CloakStatus } from '../use-cloak'

import Only from 'core/multiplayer/components/only'

export const Page: PageType = () => {
    const cloak = useCloak()

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
            </Section>
        </Chapter>
    )
}
