import { C, R, Section, Chapter } from '../../core/components'
import { PageType } from '../../core/types'


const Page: PageType = () => <Chapter filename="chapter1">
    <Section>
        <h1>Chapter 1</h1>
        <C choices={[['awkward'], ['interesting'], ['wonderful']]} tag="foo" />
        <C choices={[['the usual'], ['mutton pudding', 'salad cake', 'pine nut loaf']]} tag="lunch" />

        <p>
            <R tag="foo" to={{
                "awkward": "Well this is awkward"
            }} />
        </p>

    </Section>
    <Section>
        <h2>Section 2</h2>
        <p>
            hello world.
        </p>
        <C choices={[["sec2", "sec2-2"]]} tag="bar" />
    </Section>
    <Section>
        <h2>Section 3</h2>
        <p>
            hello world.
        </p>
        <C choices={[["sec3", "sec3-2"]]} tag="baz" nextUnit="chapter" />
    </Section>

</Chapter>

export default Page