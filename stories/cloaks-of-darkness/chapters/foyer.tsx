import { C, R, Section, Chapter, Nav } from 'core/components'
import Only from 'core/multiplayer/components/only'
import { PageType } from 'core/types'

export const Page: PageType = () => {
    return (
        <Chapter filename="foyer">
            <Section>
                <h1>Foyer of the Opera House</h1>
                <p>
                    You are in a spacious hall, splendidly decorated in red and gold, with
                    glittering chandeliers overhead.
                    <Only playerName="snake">
                        {' '}
                        The chandeliers are electric though, giving off useless amounts of light
                        with no heat. The main entrance to the street is{' '}
                        <C options={[['to the north.']]} tag="back" sync={false} />
                    </Only>
                    <Only playerName="raccoon">
                        The entrance from the street is{' '}
                        <C options={[['back the way you came.']]} tag="back" sync={false} />
                    </Only>
                    <R
                        tag="back"
                        options={{
                            came: (
                                <>
                                    {' '}
                                    but you decide to stay inside—you've only just arrived, and
                                    besides, the weather outside seems to be getting worse.
                                </>
                            ),
                            north: (
                                <>
                                    {' '}
                                    but no way you're going there, it's cold as heck outside. You're
                                    looking for a place that's even cozier.
                                </>
                            )
                        }}
                    />{' '}
                </p>
                <p>
                    There's a regular human-sized doorway <Nav text="west" next="cloakroom" />.
                    Another <C options={[['door to the south']]} tag="south" sync={false} /> has
                    been recently boarded up.
                </p>

                <R
                    tag="south"
                    options={{
                        '*': (
                            <div>
                                <p>
                                    Someone hastily nailed boards across the entire doorway. The
                                    wood and nails look sturdy enough, but there's a gap at the
                                    bottom corner, a few inches in diameter.
                                </p>
                                <aside>
                                    <Only playerName="raccoon">
                                        You flail your grabby little hands around the hole, but you
                                        can barely get one arm in. The humans must've finally caught
                                        on that you've been scurrying into the bar and stealing from
                                        the garbage. You won't be able to complete this mission
                                        alone.
                                        <R
                                            tag="bar"
                                            options={{
                                                '*': 'The snake slithers past you and through the hole effortlessly'
                                            }}
                                        />
                                    </Only>
                                    <Only playerName="snake">
                                        It's a nice cozy hole with room to spare, and you can sense
                                        waves of heat radiating out from the room beyond. You could
                                        easily <Nav next="bar" text="slither through" tag="bar" />.
                                    </Only>
                                </aside>
                            </div>
                        )
                    }}
                />
            </Section>
        </Chapter>
    )
}
