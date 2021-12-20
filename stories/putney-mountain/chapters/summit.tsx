import Image from 'next/image'

import { C, Section, Chapter, Nav, When } from 'core/components'
import { PageType } from 'core/types'
import useInventory from 'core/hooks/use-inventory'

import styles from 'public/stories/putney-mountain/styles/Index.module.scss'
import { allFindables, Score } from './ascent'

export const Page: PageType = () => {
    const [rock, hawk, snake] = useInventory(['rock', 'hawk', 'snake'])
    const findables = useInventory(allFindables).filter((f) => !!f)

    return (
        <Chapter filename="summit">
            <Section className={styles.sample}>
                <p>You emerge from tree cover beneath an overcast sky.</p>
                <Image
                    src="../stories/manual/images/bouquet-valley-richards.jpg"
                    unoptimized={true}
                    alt="An impressionist painting of a valley with autumn trees"
                    width="806"
                    height="297"
                />
                <h2>Putney Mountain Summit</h2>
                <p>
                    It's not a particularly high peak for the region, but it's still your favorite:
                    away from the crowds you find you can sit here for hours, gazing down over
                    further peaks in the range. A sliver of Duck Pond is visible behind some
                    autumn-painted trees.
                </p>
                <p>
                    Your <C tag="rock" options={[['favorite sitting boulder']]} /> is here, where it
                    always remains.
                    <When condition={rock}>
                        {' '}
                        You hop up on it—it's still warm from the day's sun. Peaking through the gap
                        of a neighboring rock is the head of a harmless young{' '}
                        <C
                            tag="snake"
                            options={[['milk snake']]}
                            className={`${styles.findable} ${styles.magnify}`}
                        />
                        .
                        <When condition={snake}>
                            {' '}
                            The red-and-white mottled snake is unfazed by your careful inspection
                            and after a moment slowly withdraws into the rock formation.
                        </When>
                    </When>{' '}
                </p>
                <p>
                    Overhead, a{' '}
                    <C
                        tag="hawk"
                        options={[['bird of prey']]}
                        className={`${styles.findable} ${styles.camera}`}
                    />{' '}
                    is soaring on the updrafts.{' '}
                    <When condition={hawk}>
                        Peering at it through your telephoto lens, it's easily recognizable as a
                        red-tailed hawk, the most common aerial predator of the region. You snap a
                        photo—not likely to be one of your best pictures, but it captures the
                        moment.{' '}
                    </When>
                </p>
                <p>
                    The trail{' '}
                    <When condition={findables.length >= 3} otherwise="continues north">
                        <Nav text="continues north" next="descent" />
                    </When>{' '}
                    down into the valley.
                </p>
            </Section>
            <Score />
        </Chapter>
    )
}
