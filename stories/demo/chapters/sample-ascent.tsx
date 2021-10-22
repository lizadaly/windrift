import { capitalize } from 'lodash'
import { C, R, Section, Chapter, Nav, When } from 'core/components'
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
                    It casts long shadows, dappling through the trees, hiding nature's mysteries.
                </p>
                <p>
                    {capitalize(companion)} said to call when you're done exploring, and to promise
                    not to lose track of time. You, in turn, promised you'd limit yourself to
                    observing just five natural wonders on this short hike up old Putney Mountain.
                </p>
                <Nav text="Start your ascent..." next={Next.Section} />
            </Section>
            <Section className={styles.sample}>
                <h2>Putney Mountain Ascent</h2>
                <p>
                    The trailhead begins on the northeast slope and you find yourself in cool shade.
                    Last night brought high winds, and the path is blanketed in an ankle-deep quilt
                    of leaves, a rustling mosaic of gold and deep ruby.
                </p>
                <p>
                    The path on one side is bordered by{' '}
                    <C
                        tag="border"
                        options={['a low rock wall', 'a felled sugar maple']}
                        extra={{ conjunction: 'and' }}
                    />
                    .
                    <R
                        tag="border"
                        options={{
                            wall: (
                                <span>
                                    {' '}
                                    It's a vestige, really, a little strip of wall that in the 19th
                                    century probably demarcated a farm or pasture. It's mortar-less,
                                    hand-assembled from medium-size lumps of gneiss or shale,
                                    pleasingly coated with lichen and moss. A{' '}
                                    <C
                                        tag="chipmunk"
                                        options={['bright-eyed chipmunk', null]}
                                        className={styles.camera}
                                    />{' '}
                                    peeks between a gap, watching you.
                                </span>
                            ),
                            maple: <p>It's a tree</p>
                        }}
                    />
                </p>
                <p>
                    The trail{' '}
                    <When condition={border} otherwise="climbs up">
                        <Nav text="climbs up" next="sample-summit" />
                    </When>{' '}
                    into the amber light of the summit.
                </p>
            </Section>
        </Chapter>
    )
}
