import { capitalize } from 'lodash'
import Image from 'next/image'

import { C, R, Section, Chapter, Nav, When } from 'core/components'
import { PageType, Next, Option } from 'core/types'
import useInventory from 'core/hooks/use-inventory'

import styles from 'public/stories/putney-mountain/styles/Index.module.scss'

export const Page: PageType = () => {
    const [companion, chipmunk, trunk, mushroom] = useInventory([
        'companion',
        'chipmunk',
        'trunk',
        'mushroom'
    ])

    return (
        <Chapter filename="ascent">
            <Section className={styles.sample}>
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
                            <C
                                tag="companion"
                                options={[['your dad', 'your sister', 'your best friend']]}
                            />
                            ?
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
                    observing just three natural wonders on this short hike up old Putney Mountain.
                </p>
                <Nav text="Start your ascent..." next={Next.Section} />
            </Section>

            <Section className={styles.sample}>
                <Image
                    src="../stories/manual/images/the-trout-pool-whittredge.jpg"
                    unoptimized={true}
                    alt="A painting of a forest in autumn with deep trees rendered in orange and gold"
                    width="1000"
                    height="406"
                />
                <h2>Putney Mountain Ascent</h2>
                <p>
                    The trailhead begins on the northeast slope and you find yourself in deep shade.
                    Last night brought high winds, and the path is blanketed in an ankle-deep quilt
                    of leaves, a rustling mosaic of gold and deep ruby.
                </p>
                <p>
                    The path on one side is bordered by{' '}
                    <C
                        tag="border"
                        options={[['a low rock wall', 'a felled sugar maple']]}
                        last={'a low rock wall and a felled sugar maple'}
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
                                        options={[['bright-eyed chipmunk']]}
                                        className={`${styles.findable} ${styles.camera}`}
                                    />{' '}
                                    peeks between a gap, watching you.
                                    <When condition={chipmunk}>
                                        {' '}
                                        You take a photo of it, catching it between tail twitches.
                                    </When>
                                </span>
                            ),
                            maple: (
                                <span>
                                    {' '}
                                    The tree has been dramatically split three ways down the center
                                    line of the trunk, folded out like a peeled banana. The{' '}
                                    <C tag="trunk" options={[['inside of the trunk']]} /> is
                                    blackened throughout, with a deep hollow.
                                    <When condition={trunk}>
                                        {' '}
                                        Growing along the inside of the hollow is a pristine
                                        specimen of the edible{' '}
                                        <C
                                            tag="mushroom"
                                            options={[['oyster mushroom']]}
                                            className={`${styles.findable} ${styles.food}`}
                                        />
                                        , at peak freshness.
                                    </When>
                                    <When condition={mushroom}>
                                        {' '}
                                        You gently scoop it out and bag it.
                                    </When>
                                </span>
                            )
                        }}
                    />
                </p>
                <p>
                    The trail{' '}
                    <When condition={mushroom || chipmunk} otherwise="climbs up">
                        <Nav text="climbs up" next="summit" />
                    </When>{' '}
                    into the cool light of the summit.
                </p>
            </Section>
            <Score />
        </Chapter>
    )
}
export const allFindables: Option[] = ['chipmunk', 'mushroom', 'snake', 'hawk']

export const Score = (): JSX.Element => {
    const findables = useInventory(allFindables).filter((f) => !!f)
    const [companion] = useInventory(['companion'])
    return (
        <When condition={findables.length}>
            <section className={`windrift--section ${styles.sample}`}>
                (You've found {findables.length} out of {allFindables.length} possible natural
                items.
                <When condition={findables.length >= 3}>
                    {' '}
                    It's time to meet up with {companion} and head home!
                </When>
                )
            </section>
        </When>
    )
}
