import { Section, Chapter, C } from 'core/components'
import { PageType } from 'core/types'
import ResetButton from 'core/components/ui/reset-button'

export const Page: PageType = () => (
    <Chapter filename="chapter1">
        <Section>
            <ResetButton />
            <h1>A minimal example</h1>
            <C tag="test" options={[['first'], ['option1', 'option2']]} last={'last'} />
        </Section>
        <Section>
            <C tag="test2" options={[['first'], ['option1', 'option2'], ['last option']]} />
        </Section>
        <Section>Section 3</Section>
    </Chapter>
)
