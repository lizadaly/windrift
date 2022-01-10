import { C, R, Section, Chapter, Nav, When } from 'core/components'
import Only from 'core/multiplayer/components/only'
import { PageType } from 'core/types'
import useCloak, { CloakStatus } from '../use-cloak'

export const Page: PageType = () => {
    const cloakStatus = useCloak()
    return (
        <Chapter filename="bar">
            <Section>
                <Only playerName="snake">
                    <When
                        condition={cloakStatus === CloakStatus.Worn}
                        otherwise={
                            <>
                                <h1>In the bar</h1>
                            </>
                        }>
                        <>
                            <h1>Darkness</h1>
                            <p>
                                You can't see a thing, but no matter—sight isn't that important to
                                you anyway.
                            </p>
                            <p>
                                Some food must have been prepared here earlier in the evening,
                                because the air tastes of meat and there's residual heat eminating
                                from the surface of a large industrial oven. Vague shapes of objects
                                surround you on all sides.
                            </p>
                            <p>
                                You could slither off into the darkness to the{' '}
                                <C options={[['east', 'west', 'south']]} tag="wrong" sync={true} />,
                                or go back through the hole to the{' '}
                                <C options={[['north']]} tag="north" />.
                            </p>
                            <p>
                                Or you could just remain here. The dark warmth makes you quite
                                drowsy!
                            </p>
                            <R
                                tag="wrong"
                                options={{
                                    '*': (
                                        <aside>
                                            <p>
                                                Slithering around in the dark isn't a good idea,
                                                even for fine corn snakes like yourself.
                                            </p>
                                            <p>
                                                You don't turn up anything very interesting, though
                                                you have a vague sense that something is vibrating
                                                somewhere. But then again you don't have ears!
                                            </p>
                                        </aside>
                                    )
                                }}
                            />
                            <R
                                tag="hole-with-alarm"
                                options={{
                                    '*': (
                                        <>
                                            <p>
                                                The room dims a bit and you get the feeling that
                                                you're being watched.
                                            </p>
                                            <p>
                                                The hole in the board is now obscured by a giant{' '}
                                                <C tag="eye-hole" options={[['raccoon eye']]} />.
                                                <R
                                                    tag="eye-hole"
                                                    options={{
                                                        '*': (
                                                            <>
                                                                {' '}
                                                                When you meet its gaze, the raccoon
                                                                eye disappears and is replaced by a
                                                                wiggly raccoon arm. Its hand points
                                                                its little fingers excitedly at a{' '}
                                                                <C
                                                                    tag="screwdriver"
                                                                    options={[['thin metal tool']]}
                                                                />{' '}
                                                                on the floor near you.{' '}
                                                            </>
                                                        )
                                                    }}
                                                />
                                                <R
                                                    tag="screwdriver"
                                                    options={{
                                                        '*': (
                                                            <>
                                                                You curl your tail tightly around
                                                                the tool, effectively picking it up.
                                                                Presumably now the raccoon wants you
                                                                to{' '}
                                                                <Nav
                                                                    text="bring it through the hole."
                                                                    next="foyer"
                                                                />
                                                            </>
                                                        )
                                                    }}
                                                />
                                            </p>
                                        </>
                                    )
                                }}
                            />
                        </>
                    </When>
                </Only>
            </Section>
        </Chapter>
    )
}
