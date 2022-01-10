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
                <Only playerName="raccoon">
                    <aside>
                        This is a tragedy! The humans must've finally caught on that you've been
                        scurrying into the bar and stealing from the garbage. You won't be able to
                        complete this mission alone.
                    </aside>
                </Only>
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
                                        can barely get one arm in. You're much too large to fit
                                        through.
                                        <R
                                            tag="bar"
                                            options={{
                                                '*': 'The snake slithers past you and through the hole effortlessly'
                                            }}
                                        />
                                    </Only>
                                    <Only playerName="snake">
                                        It's a nice cozy hole with room to spare. You could easily{' '}
                                        <Nav next="bar" text="slither through" tag="bar" />.
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
