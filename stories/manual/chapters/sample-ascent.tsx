import { Chapter, Nav } from 'core/components'
import { PageType } from 'core/types'

import { styles } from '..'

export const Page: PageType = () => {
    return (
        <Chapter filename="sample-ascent">
            <h1>Sample story: On Putney Mountain</h1>
            <aside className={styles.note}>
                This is a sample story consisting of three chapters. If you'd like to continue with
                the manual, skip ahead to the section on <Nav text="images" next="images" />.
            </aside>
            <p>
                <a href="../putney-mountain">Begin the sample story</a> or{' '}
                <Nav text="continue with the next section of the manual" next="images" />.
            </p>
        </Chapter>
    )
}
