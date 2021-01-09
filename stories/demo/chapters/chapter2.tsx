import { C, R, Section, Chapter } from 'core/components'
import { PageType } from 'core/types'


const Page: PageType = () => <Chapter filename="chapter2">
    <Section>
    <h1>Chapter 2: Responses</h1>
    <p>
        The <code>inventory</code>, or selected list of choices,
        is global to a Windrift story, so we can look back
        at what was selected in Chapter 1:
    </p>
    <p>
            <R tag="fruit" to={{
                "banana": <span>You picked <b>a nice</b> banana</span>,
                "orange": "You picked orange",
                "kiwi": "You picked kiwi",
            }} />.
    </p>

    </Section>
</Chapter>

export default Page