import { capitalize } from 'lodash'
import { C, R, Section, Chapter, Nav, When } from 'core/components'
import { PageType } from 'core/types'
import { Next } from 'core/reducers/navigation'
import useInventory from 'core/hooks/use-inventory'

import { styles } from '..'
import { Score, allFindables } from './sample-ascent'

export const Page: PageType = () => {
    // Also collect all possible findable items to check for the win condition
    const findables = useInventory(allFindables).filter((f) => !!f)

    return (
        <Chapter filename="sample-summit">
            <Section className={styles.sample}>
                <img
                    src="/public/stories/demo/images/the-trout-pool-whittredge.jpg"
                    alt="A painting of a forest in autumn with deep trees rendered in orange and gold"
                />
                <h2>Putney Mountain Summit</h2>
            </Section>
        </Chapter>
    )
}
