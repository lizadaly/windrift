import * as React from 'react'
import { Motion, spring } from '@korbav/react-motion'
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
                <When
                    condition={era !== '99999'}
                    otherwise={
                        <div>
                            <p>
                                The entire edifice has ceased shaking. Smoke rises from every crack
                                and gap in the bronze panels of the machine around you. The glass
                                surrounding the porthole has completely shattered, and the porthole
                                lies <C tag="escape" options={[['gaping open']]} />.
                            </p>
                            <R
                                tag="escape"
                                options={{
                                    gaping: (
                                        <p>
                                            You clamber through the remnants of the window, picking
                                            off glass shards and dust. The laboratory is completely
                                            gone, and you find yourself on an empty and quiet plain
                                            at night. The Milky Way glows brighter above you than
                                            you've ever seen before, and the constellations look
                                            different than you recall. Streaks of purple and orange
                                            light crisscross the night sky, but all is silent on the
                                            ground. You glance behind you, at the ruin of your grand
                                            machine, and begin to walk towards whatever this strange
                                            future holds.
                                        </p>
                                    )
                                }}
                            />
                        </div>
                    }>
                    <p>
                        "I say, unhand me you foul creature!" you exclaim, but your mad scientist
                        does not unhand you, and you're forced bodily into the time machine. He
                        slams the heavy door shut, and spins the locking mechanism with a certain
                        amount of flair, as if he imprisons assistants all the time. You imagine
                        this is quite possible.
                    </p>

                    <p>
                        Through the single ornate porthole you can just about make out the closed
                        door to the laboratory. He must have already left the room, as the{' '}
                        <C tag="door" options={[['lab door']]} />{' '}
                        <R
                            tag="era"
                            options={{
                                '1882': 'with its printed sign',
                                '1236': 'with its illuminated sign',
                                '-2500': 'with its inscribed stella',
                                '2021': 'with its glowing display'
                            }}
                        />{' '}
                        is shut and he's nowhere in sight.
                    </p>
                    <p>
                        The sign reads:
                        <R
                            tag="door"
                            options={{
                                'lab door': (
                                    <>
                                        {' '}
                                        <div
                                            style={{
                                                position: 'relative',
                                                width: '700px',
                                                height: '650px'
                                                //backgroundColor: '#2c2c2c'
                                            }}>
                                            <R
                                                tag="era"
                                                options={{
                                                    '1882': (
                                                        <span
                                                            className={`${timemachine.sign} ${timemachine.victorian}`}>
                                                            ⟿ <br />
                                                            Quiet! Brilliant <br />
                                                            scientific advancements <br /> in
                                                            progress!
                                                            <br /> ⬳
                                                        </span>
                                                    ),
                                                    '1236': (
                                                        <span
                                                            className={`${timemachine.sign} ${timemachine.medieval}`}>
                                                            Forsooth I beseech thee for thou hath
                                                            interrupteth Alchemy 🜩
                                                        </span>
                                                    ),
                                                    '-2500': (
                                                        <span
                                                            className={`${timemachine.sign} ${timemachine.bronzeage}`}>
                                                            𒀭𒆗𒀳𒀭𒁇𒀀𒈾𒀭𒀜𒋾𒀀𒇉𒈦 𒄘𒃼𒀭𒅎𒀭𒀀𒇉𒀀𒌑𒋛𒀪 𒀉𒁍𒁕𒀜𒋫𒀀𒈝𒀊𒁍𒀸
                                                            𒇻𒈾𒀫𒀀𒈾𒆪𒀠𒁍𒌝𒀀𒇉𒌓𒄒
                                                        </span>
                                                    ),
                                                    '2021': (
                                                        <span
                                                            className={`${timemachine.sign} ${timemachine.today}`}>
                                                            <span>
                                                                Select all squares with{' '}
                                                                <strong>traffic lights</strong>
                                                            </span>

                                                            <img
                                                                src="../stories/playground/images/captcha.jpg"
                                                                alt="a fake captcha"
                                                                width="250"
                                                            />
                                                        </span>
                                                    )
                                                }}
                                            />
                                            <img
                                                src="../stories/playground/images/porthole.png"
                                                alt="A Victorian frame in gold leaf"
                                                width="700"
                                                style={{
                                                    position: 'absolute'
                                                }}
                                            />
                                        </div>
                                    </>
                                )
                            }}
                        />
                    </p>
                </When>
                <When condition={!escape}>
                    <p>Inside the time machine you can see a large dial, which currently reads:</p>
                    <div className={timemachine.dial}>
                        <Motion
                            defaultStyle={{ x: parseInt(era) }}
                            style={{ x: spring(parseInt(era)) }}>
                            {(value) => (
                                <div className={timemachine.dial}>
                                    <span className={timemachine.numbers}>{parseInt(value.x)}</span>
                                </div>
                            )}
                        </Motion>
                    </div>
                </When>
            </Section>
            <Section>
                <p>
                    <When condition={era !== '99999'}>
                        And beneath that is{' '}
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
                    </When>
                    <R
                        tag="era"
                        options={{
                            '1882': <></>,
                            '1236': (
                                <span>
                                    You tentatively grasp the lever, and give it a pull. The entire
                                    machine around you shudders and the dial begins to spin!
                                </span>
                            ),
                            '-2500': (
                                <span>
                                    You confidentally pull the lever, and the machine shakes again
                                    somewhat alarmingly. The dial spins again, faster this time.
                                </span>
                            ),
                            '2021': (
                                <span>
                                    The lever resists at first, and then seems to catch. The entire
                                    machine groans as if it's in pain.
                                </span>
                            ),
                            '99999': (
                                <When condition={!escape}>
                                    <span>
                                        You push, then push harder, and the lever bends sickeningly
                                        under your hands and then snaps.
                                    </span>
                                </When>
                            )
                        }}
                    />
                </p>
            </Section>
        </Chapter>
    )
}
