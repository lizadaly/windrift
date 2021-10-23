import { capitalize } from 'lodash'
import Image from 'next/image'

import { C, R, Section, Chapter, Nav, When } from 'core/components'
import { PageType } from 'core/types'
import useInventory from 'core/hooks/use-inventory'

import { styles } from '..'
import { Score } from './sample-ascent'

export const Page: PageType = () => {
    return (
        <Chapter filename="sample-summit">
            <Section className={styles.sample}>
                <p>You emerge from tree cover beneath an overcast sky.</p>
                <Image
                    src="/stories/demo/images/bouquet-valley-richards.jpg"
                    loader={({ src }) => src}
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
                    Overhead, a <C tag="hawk" options={['bird of prey', null]} /> is soaring on the
                    updrafts.
                </p>
                <p>
                    The trail <Nav text="continues due north" next="sample-descent" /> down into the
                    valley.
                </p>
            </Section>
            <Score />
        </Chapter>
    )
}
