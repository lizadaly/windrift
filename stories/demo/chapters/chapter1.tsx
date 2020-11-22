import { C, R, Section, Chapter } from '../../../core/components'
import { BulletedList } from '../../../core/components/widgets'
import { PageType } from '../../../core/types'

const Page: PageType = () => <Chapter filename="chapter1">
    <Section>
        <h1>Chapter 1</h1>
        Would you like a <C choices={[['banana', 'orange', 'kiwi']]}
            extra={{ conjunction: "or" }} tag="fruit" />

        <p>
            <R tag="fruit" to={{
                "banana": "You picked banana",
                "orange": "You picked orange",
                "kiwi": "You picked kiwi",
            }} />
        </p>

    </Section>
    <Section>
        <h2>Section 2</h2>
        <p>
            hello world.
        </p>
        <C choices={[["sec2", "sec2-2"]]} tag="bar" nextUnit="chapter" widget={BulletedList} />
    </Section>


</Chapter>

export default Page