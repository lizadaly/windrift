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
    const [era] = useInventory(['era'])
    const years = ['1882', '1236', '-2500', '2021']
    React.useEffect(() => {
        dispatch(makeChoice('era', era || years[0]))
    }, [])
    if (!era) {
        return null
    }
    return (
        <Chapter filename="chapter1">
            <Section>
                <aside>
                    <h1>Mutable content</h1>
                    <p>
                        One of Windrift's key concepts is that it should support "mutable" content,
                        or content that can change, sometimes dramatically, in response to user
                        input.
                    </p>
                    <p>
                        A story that demonstrates this is{' '}
                        <a href="https://lizadaly.com/projects/the-ballroom/">The Ballroom</a>{' '}
                        (2019), which was developed using an earlier version of the library but this
                        sample demonstrates a similar concept.
                    </p>
                </aside>
                <p>
                    "I say, unhand me you foul creature!" you exclaim, but he does not, and you're
                    forced into the time machine. He slams the heavy circular door shut, and spins
                    the locking mechanism as if he imprisons assistants all the time, which you
                    imagine is quite possible.
                </p>
                <p>
                    Through the single porthole you can see a distorted fish-eye view of the
                    laboratory. He must have already left the room, as the{' '}
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
                    is open but he's nowhere in sight.
                    <R
                        tag="door"
                        options={{
                            'lab door': (
                                <>
                                    {' '}
                                    The sign reads:{' '}
                                    <R
                                        tag="era"
                                        options={{
                                            '1882': (
                                                <span
                                                    className={`${timemachine.sign} ${timemachine.victorian}`}>
                                                    ⟿ <br />
                                                    Quiet! Brilliant advancements in mankind in
                                                    progress
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
                                </>
                            )
                        }}
                    />
                </p>
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
            </Section>
            <Section>
                <p>
                    And beneath that is{' '}
                    <button
                        onClick={() => {
                            dispatch(makeChoice('era', years[years.indexOf(era) + 1]))
                        }}>
                        an enticing lever
                    </button>
                    .{' '}
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
                            )
                        }}
                    />
                </p>
            </Section>
        </Chapter>
    )
}
