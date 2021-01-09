import { C, Section, Chapter } from 'core/components'
import { BulletedList } from 'core/components/widgets'
import { PageType } from 'core/types'

const Page: PageType = () => <Chapter filename="chapter1">

    <Section>
        <h1>Chapter 1: Choices</h1>

        <h2>Default widget: inline</h2>
        <p>
            This will display each choice inline, leaving behind the
            chosen one.
        </p>
        Would you like a <C choices={[['banana', 'orange', 'kiwi']]}
            extra={{ conjunction: "or" }} tag="fruit" />?

    </Section>
    <Section>
        <h2>Bulleted list widget</h2>
        <p>
            This will display each item as a bulleted list, like a
            menu. All items will remain onscreen after the choice.

        </p>
        <p>
            What is your favorite kind of tree?
        </p>
        <C choices={[["poplar", "elm", "baobab"]]} tag="tree" nextUnit="chapter"
            widget={BulletedList} />
    </Section>


</Chapter>

export default Page