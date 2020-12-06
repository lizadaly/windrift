import { C, R, Section, Chapter } from '../../../core/components'
import { PageType } from '../../../core/types'

const Page: PageType = () => <Chapter filename="chapter1">
    <Section>
        <h1>Chapter 1</h1>
        Would you like a <C choices={[['banana', 'orange', 'kiwi']]}
            extra={{ conjunction: "or" }} tag="fruit" />?

        <div>
            <R tag="fruit" to={{
                "banana": <p>You picked <b>a nice</b> banana</p>,
                "orange": "You picked orange",
                "kiwi": "You picked kiwi",
            }} />
        </div>

    </Section>

</Chapter>

export default Page