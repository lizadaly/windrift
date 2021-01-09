import { C, Section, Chapter } from 'core/components'
import { PageType } from 'core/types'


const Page: PageType = () => <Chapter filename="chapter2">
    <Section>
    <h1>Chapter 2</h1>
    <C choices={[["dog", "cat"]]} tag="chapter-2" />
    </Section>
</Chapter>

export default Page