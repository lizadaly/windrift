import { C, R, Section, Chapter, Nav } from 'core/components'
import Only from 'core/multiplayer/components/only'
import { PageType } from 'core/types'

export const Page: PageType = () => {
    return (
        <Chapter filename="foyer">
            <Section>
                <Only playerName="raccoon">
                    <p>
                        Hurrying through the rainswept November night, you're glad to see the bright
                        lights of the Opera House. It's surprising that there aren't more people
                        about but, hey, that's great, since you're a raccoon, and you don't want any
                        trouble...
                    </p>
                </Only>

                <h1>Foyer of the Opera House</h1>
                <p>
                    You are in a spacious hall, splendidly decorated in red and gold, with
                    glittering chandeliers overhead. The entrance from the street is{' '}
                    <C options={[['back the way you came']]} tag="back" sync={false} />.
                    <R
                        tag="back"
                        options={{
                            came: (
                                <em>
                                    {' '}
                                    You decide to stay inside—you've only just arrived, and besides,
                                    the weather outside seems to be getting worse.
                                </em>
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
                            <em>
                                <Only playerName="raccoon">
                                    You flail your grabby little hands around the hole, but you can
                                    barely get one arm in. You're much too large to fit through.
                                    <R
                                        tag="bar"
                                        options={{
                                            '*': 'The snake slithers past you and through the hole effortlessly'
                                        }}
                                    />
                                </Only>
                                <Only playerName="snake">
                                    It's a nice cozy hole with room to spare. You could easily{' '}
                                    <Nav next="bar" text="slither through" tag="bar" sync={true} />.
                                </Only>
                            </em>
                        )
                    }}
                />
            </Section>
        </Chapter>
    )
}
