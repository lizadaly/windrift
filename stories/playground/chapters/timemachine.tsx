import * as React from 'react'
import { Spring, animated } from '@react-spring/web'

import { useDispatch } from 'react-redux'

import { C, R, Section, Chapter, When } from 'core/components'
import { Next, PageType } from 'core/types'

import { makeChoice } from 'core/features/choice'
import timemachine from 'public/stories/playground/styles/TimeMachine.module.scss'
import useInventory from 'core/hooks/use-inventory'

export const Page: PageType = () => {
    const dispatch = useDispatch()
    const [era, escape] = useInventory(['era', 'escape'])
    const years = ['1882', '1236', '-2500', '2021', '99999']
    React.useEffect(() => {
        dispatch(makeChoice('era', era || years[0]))
    }, [])
    if (!era) {
        return null
    }
    return (
        <Chapter filename="timemachine">
            <Section>
                <p>
                    "I say, unhand me you foul creatures!" you cry, but your rebellious assistants
                    do not unhand you, and you‘re forced bodily into the time machine. They slam the
                    heavy door shut, and spin the locking mechanism with a certain amount of flair.
                    Their cheering is muffled but audible, and then you hear the sound of receding
                    footsteps followed by silence.
                </p>
                <p>
                    <C tag="start" options={[['You’ve been...']]} last="" next={Next.Section} />
                </p>
            </Section>
            <Section>
                <div className={timemachine.innergrid}>
                    <div className={timemachine.readout}>
                        <h2 className={timemachine.title}>Trapped in your time machine!</h2>
                        <p>
                            This door can only be unlocked from the outside, which was perhaps a
                            poor design choice on your part.
                        </p>
                        <p>
                            Inside the time machine you can see the large numeric readout displaying
                            the year {era}.{' '}
                            <When
                                condition={era === '99999'}
                                otherwise={
                                    <>
                                        Beneath that is{' '}
                                        <button
                                            onClick={() => {
                                                const next = era === '2021' ? Next.Section : null
                                                dispatch(
                                                    makeChoice(
                                                        'era',
                                                        years[years.indexOf(era) + 1],
                                                        next,
                                                        'timemachine'
                                                    )
                                                )
                                            }}>
                                            <R
                                                tag="era"
                                                options={{
                                                    '1882': 'an enticing lever.',
                                                    '1236': 'the time machine’s lever.',
                                                    '-2500': 'the worn lever.',
                                                    '2021': 'the wobbling lever.'
                                                }}
                                            />
                                        </button>
                                    </>
                                }>
                                The lever has broken off into your hand, now just a useless bent
                                piece of metal.
                            </When>
                        </p>
                    </div>

                    <div className={timemachine.dialFrame}>
                        <div className={timemachine.dial}>
                            <Spring
                                to={{ counter: parseInt(era) }}
                                onChange={() =>
                                    document
                                        .querySelectorAll(`.${timemachine.sign}`)
                                        .forEach((el) => {
                                            el.classList.add(timemachine.static)
                                        })
                                }
                                onRest={() =>
                                    document
                                        .querySelectorAll(`.${timemachine.static}`)
                                        .forEach((el) => {
                                            el.classList.remove(timemachine.static)
                                        })
                                }>
                                {(styles) => {
                                    return (
                                        <div className={timemachine.dial}>
                                            <span
                                                className={`${timemachine.numbers} ${
                                                    era === '99999' ? timemachine.future : ''
                                                }`}>
                                                <animated.span>
                                                    {styles.counter.to((n) => n.toFixed(0))}
                                                </animated.span>
                                            </span>
                                        </div>
                                    )
                                }}
                            </Spring>
                        </div>
                        <img
                            src="../stories/playground/images/readout.webp"
                            alt="Another Victorian frame in gold leaf"
                            width="400"
                        />
                    </div>
                    <When condition={era !== '99999'}>
                        <div className={timemachine.portholeRegion}>
                            <div className={timemachine.floatedcontainer}>
                                <R
                                    tag="era"
                                    options={{
                                        '1882': (
                                            <span
                                                className={`${timemachine.sign} ${timemachine.victorian}`}>
                                                ⟿ <br />
                                                Quiet! <br />
                                                Brilliant science <br /> in progress!
                                                <br /> ⬳
                                            </span>
                                        ),
                                        '1236': (
                                            <>
                                                <span
                                                    className={`${timemachine.sign} ${timemachine.medieval}`}>
                                                    <span>
                                                        Prithee <br />
                                                        silence thyself <br />
                                                        A Great
                                                        <br /> Alchemist <br />
                                                        is at Work
                                                    </span>
                                                    <img
                                                        src="../stories/playground/images/rabbit.webp"
                                                        alt="A medieval rabbit riding a snail"
                                                        width="100"
                                                    />
                                                </span>
                                            </>
                                        ),
                                        '-2500': (
                                            <span
                                                className={`${timemachine.sign} ${timemachine.bronzeage}`}>
                                                <img
                                                    src="../stories/playground/images/babylonian.webp"
                                                    alt="A Babylonian warrior carving"
                                                    width="200"
                                                />
                                                <span>𒇷𒉺𒀀𒄑𒍣𒄿𒁕 𒋼𒉺𒄯𒂊𒊒𒌓𒀲𒆳 𒃷𒊩𒈗𒊏𒀸𒉿𒀀 𒊏𒍑𒃾𒅖𒁄 </span>
                                            </span>
                                        ),
                                        '2021': (
                                            <span
                                                className={`${timemachine.sign} ${timemachine.today}`}>
                                                <span>
                                                    Select all squares <br />
                                                    with <strong>traffic lights</strong>
                                                </span>

                                                <img
                                                    src="../stories/playground/images/captcha.jpg"
                                                    alt="a fake captcha"
                                                    width="220"
                                                />
                                            </span>
                                        )
                                    }}
                                />
                                <img
                                    src="../stories/playground/images/porthole.webp"
                                    alt="A Victorian frame in gold leaf"
                                    width="550"
                                    className={timemachine.portholeFrame}
                                />
                            </div>
                            <div className={timemachine.porthole}>
                                <R
                                    tag="era"
                                    options={{
                                        '1882': (
                                            <>
                                                <p>
                                                    The only other feature in this otherwise empty
                                                    brass sphere is the ornate porthole you insisted
                                                    on at great expense and to the detriment of your
                                                    assistants' salaries.
                                                </p>
                                                <p>
                                                    They’ve affixed the sign from your office door
                                                    to the outside of the porthole, presumably as
                                                    some kind of taunt.
                                                </p>
                                            </>
                                        ),
                                        '1236': (
                                            <>
                                                <p>
                                                    You tentatively grasp the lever and give it a
                                                    pull. The entire machine around you shudders and
                                                    the dial begins to spin!
                                                </p>
                                                <p>
                                                    After an interminable period of nausea—no wonder
                                                    you'd intended to send one of <em>them</em>{' '}
                                                    through first—the room settles, and outside the
                                                    porthole a different sign is affixed to the
                                                    window. You can also hear the faint trill of a
                                                    lute.
                                                </p>
                                                <p>
                                                    Frustratingly, no one responds to your frantic
                                                    cries and pounding on the door.
                                                </p>
                                            </>
                                        ),
                                        '-2500': (
                                            <>
                                                <p>
                                                    You confidentally pull the lever, and the
                                                    machine shakes with a vengeful fervor. The dial
                                                    spins faster this time. As it slows, brass bolts
                                                    pop out of the casing and the seams of the
                                                    contraption are beginning to show.
                                                </p>
                                                <p>
                                                    It appears someone has propped a kind of stone
                                                    tablet in front of the porthole. The air smells
                                                    faintly of manure and myrrh.
                                                </p>
                                            </>
                                        ),
                                        '2021': (
                                            <>
                                                <p>
                                                    The lever resists at first, but then snaps down
                                                    and the entire machine groans as if in pain.
                                                </p>
                                                <p>
                                                    The porthole is glowing with a strange inner
                                                    light, and it seems you've been given an
                                                    incomprehensible puzzle to solve. You paw
                                                    fruitlessly at the glass. Acrid smoke is leaking
                                                    around the edges of the door, but it still holds
                                                    firm.
                                                </p>
                                            </>
                                        ),
                                        '99999': (
                                            <When condition={!escape}>
                                                <p>
                                                    You push, then push harder, and the lever bends
                                                    sickeningly under your hands and then snaps.
                                                </p>
                                            </When>
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    </When>
                </div>
            </Section>
            <Section>
                <p>
                    The entire edifice has ceased shaking. Smoke rises from every crack and gap in
                    the scorched panels of the machine around you. The tempered glass within the
                    porthole has completely shattered, and thus the porthole is{' '}
                    <C tag="escape" options={[['gaping open']]} />.
                </p>
            </Section>
            <Section>
                <R
                    tag="escape"
                    options={{
                        gaping: (
                            <p>
                                You clamber through the remnants of the window, picking off glass
                                shards and millennia of dust. The laboratory is long gone, and you
                                find yourself on an empty and quiet plain at night. The Milky Way
                                glows brighter above you than you've ever seen before, and the
                                constellations are unfamiliar. Streaks of blue and pink light
                                criss-cross the night sky, traveling with purpose. You are alone
                                among the trees and grass here. You glance behind you, at the ruin
                                of your grand machine, and begin to walk towards whatever this
                                strange far future holds.
                            </p>
                        )
                    }}
                />
                <figure>
                    <img
                        src="../stories/playground/images/meteors.webp"
                        alt="Painting of a meteor shower"
                        style={{ width: '100%', display: 'block' }}
                    />
                    <caption>
                        <em>
                            “The November meteors: As observed between midnight and 5 o'clock A.M.
                            <br />
                            on the night of November 13-14 1868.”
                        </em>{' '}
                        Trouvelot, E. L., 1881 (
                        <a href="https://digitalcollections.nypl.org/items/510d47dd-e6cf-a3d9-e040-e00a18064a99">
                            source
                        </a>
                        )
                    </caption>
                </figure>
            </Section>
        </Chapter>
    )
}
