import Image from 'next/image'

import { C, Section, Chapter, Nav, When } from 'core/components'
import { PageType } from 'core/types'
import useInventory from 'core/hooks/use-inventory'

import { styles } from '..'
import { Score } from './sample-ascent'

export const Page: PageType = () => {
    const [companion] = useInventory(['companion'])
    return (
        <Chapter filename="sample-descent">
            <Section className={styles.sample}>
                <p>
                    The descent into the valley is steeper than the ascent (fortunately!) so you
                    make quick work of the last section of trail.
                </p>
                <Image
                    src="/stories/demo/images/an-evening-in-the-woods-whittredge.jpg"
                    loader={({ src }) => src}
                    alt="A painting of dark wood, with a distant light in the center and a creek in the foreground"
                    width="1000"
                    height="419"
                />
                <p>
                    This last stretch joins up a fast-moving creek that wound down from the eastward
                    slope. Ahead the woods open up, and the light down here is once again warm,
                    filtered through autumn leaves.
                </p>
                <p>
                    You can just make out the shape of {companion} waving at you in the distance.{' '}
                    Satified by your short hike today,{' '}
                    <Nav text="set out to meet them" next="multimedia" />.
                </p>
                <br />
                <br />
                <aside className={styles.note}>
                    <h3>Image credits</h3>
                    <ul>
                        <li>
                            Detail from{' '}
                            <a href="https://www.metmuseum.org/art/collection/search/13315">
                                The Trout Pool
                            </a>{' '}
                            (1870), Worthington Whittredge
                        </li>
                        <li>
                            Detail from{' '}
                            <a href="https://www.metmuseum.org/art/collection/search/17574">
                                Bouquet Valley
                            </a>{' '}
                            (1877), William Trost Richards{' '}
                        </li>
                        <li>
                            Detail from{' '}
                            <a href="https://www.metmuseum.org/art/collection/search/13313">
                                Evening in the Woods
                            </a>{' '}
                            (1876), Worthington Whittredge
                        </li>
                    </ul>
                </aside>
            </Section>
        </Chapter>
    )
}
