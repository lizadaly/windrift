import { List, Section, Chapter } from '../../core/components'
import { PageType } from '../../core/types'


const Page: PageType = () => <Chapter filename="chapter1">
    <Section>
        <h1>Chapter 1</h1>
        <List expansions={["dog", "cat"]} tag="foo" />
    </Section>
    <Section>
        <h2>Section 2</h2>
        <p>
            hello world.
        </p>
        <List expansions={["dog", "cat"]} tag="bar" />
    </Section>
    <Section>
        <h2>Section 3</h2>
        <p>
            hello world.
        </p>
        <List expansions={["dog", "cat"]} tag="baz" />
    </Section>
    <Section>
        <h2>Section 4</h2>
        <p>
            hello world.
        </p>
    </Section>
</Chapter>

export default Page