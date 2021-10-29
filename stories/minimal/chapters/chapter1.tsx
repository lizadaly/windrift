import { Section, Chapter, C } from 'core/components'
import ResetButton from 'core/components/ui/reset-button'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="chapter1">
        <Section>
            <ResetButton />
            <h1>A minimal example</h1>
            all: <C tag="all" first="first" options={['option1', 'option2']} last="last" />
            <br />
            first: <C tag="first-only" first="first" options={['option1', 'option2']} />
            <br />
            last: <C tag="last-only" last="last" options={['option1', 'option2']} />
            <br />
            options: <C tag="options-only" options={['option1', 'option2']} />
        </Section>
        <Section>Next section</Section>
    </Chapter>
)
