import { capitalize } from 'lodash'
import { C, Section, Chapter, Nav, When } from 'core/components'
import { BulletedList } from 'core/components/widgets'
import { PageType } from 'core/types'
import { Next } from 'core/reducers/navigation'
import useInventory from 'core/hooks/use-inventory'

import { styles } from '..'
import next from 'next'

export const Page: PageType = () => {
    const companion = useInventory('companion')
    const border = useInventory('border')
    return (
        <Chapter filename="sample-ascent">
            <Section>
                <aside className={styles.note}>
                    This is a sample story consisting of three chapters. If you'd like to continue
                    with the manual, skip ahead to images and styling [TODO].
                </aside>
                <p>
                    In this story, you are a young person hiking up a mountain on a beautiful autumn
                    day in North America. Your goal is to observe three aspects of nature, at which
                    point a companion will arrive to pick you up.
                </p>
                <When
                    condition={companion}
                    otherwise={
                        <p>
                            Will your companion be{' '}
                            <C tag="companion" options={['your dad', 'your sister', 'a friend']} />?
                        </p>
                    }>
                    <p>Your companion will be {companion}.</p>
                </When>
            </Section>
            <Section className={styles.sample}>
                <p style={{ marginTop: '4rem' }}>
                    It's only early afternoon, but this late in the fall the sun is low in the sky.
                    Even on level ground, it casts long shadows, dappling through the trees.
                </p>
                <p>
                    {capitalize(companion)} said to call when you're done exploring, and to promise
                    not to lose track of time. You, in turn, promised you'd stick to observing just
                    three natural wonders on this short hike up old Townshend Mountain.
                </p>
                <Nav text="Start your ascent..." next={Next.Section} />
            </Section>
            <Section className={styles.sample}>
                <h2>Townshend Mountain Ascent</h2>
                <p>
                    The trailhead is on the north slope, so this path is in deep shadow. Last night
                    brought high winds, and the path is nestled in a deep layer of leaves, a palette
                    of gold and deep ruby.
                </p>
                <p>
                    The path on one side is bordered by{' '}
                    <C
                        tag="border"
                        options={['a low rock wall', 'a felled sugar maple']}
                        extra={{ conjunction: 'and' }}
                    />
                    .
                </p>
                <p>
                    The trail{' '}
                    <When
                        condition={border}
                        otherwise={<Nav text="climbs up" next="sample-summit" />}>
                        climbs up
                    </When>{' '}
                    into the golden light of the summit.
                </p>
            </Section>
        </Chapter>
    )
}
