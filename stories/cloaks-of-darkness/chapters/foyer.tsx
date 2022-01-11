import { C, R, Section, Chapter, Nav } from 'core/components'
import Only from 'core/multiplayer/components/only'
import Both from 'core/multiplayer/components/both'

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
                                    wood and nails look sturdy enough,{' '}
                                    <R
                                        tag="screwdriver-open"
                                        options={{
                                            screwdriver:
                                                'though the bottom board has been pried open',
                                            closed: "but there's a gap at the bottom corner, a few inches in diameter."
                                        }}
                                    />
                                    .
                                </p>
                                <aside>
                                    <Only playerName="raccoon">
                                        <R
                                            tag="screwdriver-open"
                                            options={{
                                                screwdriver: (
                                                    <p>
                                                        {' '}
                                                        You've managed to open a{' '}
                                                        <Nav
                                                            text="raccoon-sized gap"
                                                            next="bar"
                                                        />{' '}
                                                        in the boarded-up doorway and the smell from
                                                        beyond is enticing.
                                                    </p>
                                                ),
                                                closed: (
                                                    <>
                                                        <p>
                                                            You flail your grabby little hands
                                                            around the hole, but you can barely get
                                                            one arm in. The humans must've finally
                                                            caught on that you've been scurrying
                                                            into the bar and stealing from the
                                                            garbage. You won't be able to complete
                                                            this mission alone.
                                                        </p>
                                                        <R
                                                            tag="bar"
                                                            options={{
                                                                '*': (
                                                                    <p>
                                                                        The snake slithers past you
                                                                        and through the hole
                                                                        effortlessly. Hmm!
                                                                    </p>
                                                                )
                                                            }}
                                                        />
                                                    </>
                                                )
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
                <Only playerName="raccoon" alone={true}>
                    <R
                        tag="wrong"
                        options={{
                            '*': (
                                <p>
                                    A loud wailing sound is going off. As a raccoon you are very
                                    familiar with it: it's a burglar alarm. The sound seems to be
                                    coming from the{' '}
                                    <C options={[['hole in the boards']]} tag="hole-with-alarm" />.
                                </p>
                            )
                        }}
                    />
                    <R
                        tag="hole-with-alarm"
                        options={{
                            '*': (
                                <>
                                    <p>
                                        You bend over and peek through the hole. You see the snake
                                        sinuously moving around the bar, as if exploring. What
                                        appears to you to be a motion sensor is blinking in
                                        response. The snake settles back by the oven (probably for
                                        the warmth) and the alarm subsides.
                                    </p>
                                    <p>
                                        The smell of cooked, discarded food that wafts in from the
                                        bar is almost overwhelming. You notice suddenly that there's
                                        a screwdriver lying on the floor by the oven, right
                                        underneath the snake's tail. Maybe that could get the boards
                                        off, if you could only reach for it?
                                    </p>
                                </>
                            )
                        }}
                    />
                    <R
                        tag="eye-hole"
                        options={{
                            '*': (
                                <>
                                    <p>
                                        The snake senses your presence and you jam your little arm
                                        through the hole, pointing blindly at what you hope is the
                                        direction of the screwdriver.
                                    </p>
                                </>
                            )
                        }}
                    />
                </Only>
                <Both>
                    <R
                        tag="screwdriver"
                        options={{
                            '*': (
                                <>
                                    <Only playerName="raccoon">
                                        <p>
                                            The snake glides back through the hole, neatly guiding
                                            the{' '}
                                            <C
                                                tag="screwdriver-open"
                                                defaultOption="closed"
                                                options={[['screwdriver']]}
                                            />{' '}
                                            it has grasped in its tail. It looks at you expectantly.
                                        </p>
                                    </Only>
                                    <Only playerName="snake">
                                        <p>
                                            You emerge from the hole dragging the screwdriver behind
                                            you, and look steadily at the raccoon. Strange
                                            bedfellows, but it's a strange night at the opera.
                                        </p>
                                    </Only>
                                </>
                            )
                        }}
                    />
                    <R
                        tag="screwdriver-open"
                        options={{
                            screwdriver: (
                                <>
                                    <Only playerName="raccoon">
                                        <p>
                                            You delicately pull the screwdriver from the snake's
                                            tail (are corn snakes venomous?) and pry the bottom
                                            board off the doorway. It's great to have hands!
                                        </p>
                                    </Only>
                                    <Only playerName="snake">
                                        <p>
                                            The raccoon politely extracts the screwdriver from your
                                            tail's grasp and, almost like a human, pries the lowest
                                            board off the doorway. Now you can both fit through.
                                        </p>
                                    </Only>
                                </>
                            )
                        }}
                    />
                </Both>
            </Section>
        </Chapter>
    )
}
