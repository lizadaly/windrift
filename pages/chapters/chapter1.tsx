import { List, Section, Chapter } from '../../core/components'
import { PageType } from '../../core/types'


const Page: PageType = () => <Chapter>
    <Section>
        <h1>Chapter 1</h1>
        <List expansions={["dog", "cat"]} tag="foo" />
    </Section>
    <Section>
        <h2>Section 2</h2>
        <p>
            hello world.
        </p>
    </Section>
</Chapter>

export default Page