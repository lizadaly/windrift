import { List, Section, Chapter } from '../../core/components'
import { PageType } from '../../core/types'


const Page: PageType = () => <Chapter filename="chapter1">
    <Section>
        <h1>Chapter 1</h1>
        <List expansions={["ch1", "ch1-2"]} tag="foo" />
    </Section>
    <Section>
        <h2>Section 2</h2>
        <p>
            hello world.
        </p>
        <List expansions={["sec2", "sec2-2"]} tag="bar" />
    </Section>
    <Section>
        <h2>Section 3</h2>
        <p>
            hello world.
        </p>
        <List expansions={["sec3", "sec3-2"]} tag="baz" nextUnit="chapter" />
    </Section>

</Chapter>

export default Page