import * as React from 'react'
import { Motion, spring, presets } from '@korbav/react-motion'
import { useDispatch } from 'react-redux'

import { C, R, Section, Chapter, Nav, When } from 'core/components'
import { PageType } from 'core/types'

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
                    do not unhand you, and you're forced bodily into the time machine. They slam the
                    heavy door shut, and spin the locking mechanism with a certain amount of flair.
                    Their cheering is muffled but audible, and as if to further rub it in, they wave
                    at you as they close your laboratory door behind them.
                </p>
                <When condition={era === '99999'}>
                    <div>
                        <p>
                            The entire edifice has ceased shaking. Smoke rises from every crack and
                            gap in the bronze panels of the machine around you. The glass
                            surrounding the porthole has completely shattered, and the porthole lies{' '}
                            <C tag="escape" options={[['gaping open']]} />.
                        </p>
                        <R
                            tag="escape"
                            options={{
                                gaping: (
                                    <p>
                                        You clamber through the remnants of the window, picking off
                                        glass shards and dust. The laboratory is completely gone,
                                        and you find yourself on an empty and quiet plain at night.
                                        The Milky Way glows brighter above you than you've ever seen
                                        before, and the constellations look different than you
                                        recall. Streaks of purple and orange light crisscross the
                                        night sky, but all is silent on the ground. You glance
                                        behind you, at the ruin of your grand machine, and begin to
                                        walk towards whatever this strange future holds.
                                    </p>
                                )
                            }}
                        />
                    </div>
                </When>
                <div className={timemachine.innergrid}>
                    <div className={timemachine.readout}>
                        <h2 className={timemachine.title}>Trapped in your Time Machine!</h2>
                        <p>
                            The door locks from the outside, which was maybe a poor design choice.
                        </p>
                        <p>
                            Inside the time machine you can see the large numeric readout displaying
                            the year {era}. Beneath that is{' '}
                            <button
                                onClick={() => {
                                    dispatch(makeChoice('era', years[years.indexOf(era) + 1]))
                                }}>
                                <R
                                    tag="era"
                                    options={{
                                        '1882': 'an enticing lever',
                                        '1236': "the time machine's lever",
                                        '-2500': 'the lever, looking a little worse for wear',
                                        '2021': 'the wobbling lever'
                                    }}
                                />
                            </button>
                            .{' '}
                        </p>
                    </div>

                    <div className={timemachine.dialFrame}>
                        <div className={timemachine.dial}>
                            <Motion
                                defaultStyle={{ x: parseInt(era) }}
                                style={{ x: spring(parseInt(era), presets.wobbly) }}>
                                {(value) => (
                                    <div className={timemachine.dial}>
                                        <span
                                            className={`${timemachine.numbers} ${
                                                era === '99999' ? timemachine.future : ''
                                            }`}>
                                            {parseInt(value.x)}
                                        </span>
                                    </div>
                                )}
                            </Motion>
                        </div>
                        <img
                            src="../stories/playground/images/readout.webp"
                            alt="Another Victorian frame in gold leaf"
                            width="400"
                        />
                    </div>
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
                                                <img
                                                    src="../stories/playground/images/rabbit.webp"
                                                    alt="A medieval rabbit riding a snail"
                                                />
                                                <span>
                                                    Prithee <br />
                                                    silence thyself <br />
                                                    A Great
                                                    <br /> Alchemist <br />
                                                    is at Work
                                                </span>
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
                                            <span>
                                                𒇷𒉺𒀀𒄑𒍣𒄿𒁕 𒋼𒉺𒄯𒂊𒊒𒌓𒀲𒆳 𒃷𒊩𒈗𒊏𒀸𒉿𒀀𒋻𒀀𒊏𒀸𒉺 𒊏𒍑𒃾𒅖𒁄𒋾𒌅𒌋𒉌𒅖 𒌅�𒍣�𒅖𒀜𒉺
                                                𒆪𒍑𒅈𒈠𒌋𒉿𒀭𒍝𒁍
                                            </span>
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
                                                The only other feature in this otherwise empty brass
                                                sphere is the ornate porthole you insisted on at
                                                great expense and to the detriment of your
                                                assistants' salaries.
                                            </p>
                                            <p>
                                                They’ve affixed the sign from your office to the
                                                outside of the porthole, presumably as some kind of
                                                taunt.
                                            </p>
                                        </>
                                    ),
                                    '1236': (
                                        <>
                                            <p>
                                                You tentatively grasp the lever and give it a pull.
                                                The entire machine around you shudders and the dial
                                                begins to spin!
                                            </p>
                                            <p>
                                                After an interminable moment of nausea—no wonder
                                                you'd intended to send one of <em>them</em> through
                                                first—the room settles, and outside the porthole a
                                                different sign is affixed to the window. You can
                                                also hear the muffled sound of a lute.
                                            </p>
                                            <p>
                                                Frustratingly, no one responds to your frantic cries
                                                and pounding on the door.
                                            </p>
                                        </>
                                    ),
                                    '-2500': (
                                        <p>
                                            You confidentally pull the lever, and the machine shakes
                                            again somewhat alarmingly. The dial spins again, faster
                                            this time.
                                        </p>
                                    ),
                                    '2021': (
                                        <p>
                                            The lever resists at first, and then seems to catch. The
                                            entire machine groans as if it's in pain.
                                        </p>
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
                </div>
            </Section>
        </Chapter>
    )
}
