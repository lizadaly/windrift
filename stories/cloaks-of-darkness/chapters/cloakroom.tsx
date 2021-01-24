import { C, R, Section, Chapter } from 'core/components'
import { BaseList as D } from 'core/components/widgets'
import { PageType } from 'core/types'
import Only from 'core/multiplayer/components/player-only'
import useNavListener from 'core/multiplayer/hooks/use-nav-listener'

import useCloak, { CloakStatus } from '../use-cloak'
import { Raccoon, Snake } from '..'

export const Page: PageType = () => {
    const cloak = useCloak()
    const { player, chapterName } = useNavListener()
    const both = player && chapterName === 'cloakroom'

    return (
        <Chapter filename="cloakroom">
            <Section>
                <h1>Cloakroom</h1>
                <p>
                    The walls of this small room were clearly once lined with hooks, though now only{' '}
                    <C choices={[['one hook', null]]} tag="cl-hook" widget={D} /> remains.{' '}
                    {
                        <R
                            tag="cl-hook"
                            to={{
                                hook: cloak === CloakStatus.Worn && (
                                    <>
                                        <Only player={Snake}>
                                            <aside>
                                                It looks like you could hang your cloak there, if
                                                you only had hands.
                                            </aside>
                                        </Only>
                                        {both && (
                                            <Only player={Raccoon}>
                                                <aside>
                                                    You could{' '}
                                                    <C
                                                        choices={[['pluck', null]]}
                                                        tag="cl-pluck"
                                                        widget={D}
                                                    />{' '}
                                                    the little cloak off the snake and hang it on
                                                    the hook, if you like.
                                                </aside>
                                            </Only>
                                        )}
                                    </>
                                )
                            }}
                        />
                    }
                    The exit is a door to the{' '}
                    <C choices={[['east', null]]} tag="cl-foyer" widget={D} next="foyer" />.
                </p>
                {cloak == CloakStatus.Hung && (
                    <p>There is a tiny snake-sized cloak hanging on the hook.</p>
                )}
            </Section>
        </Chapter>
    )
}
