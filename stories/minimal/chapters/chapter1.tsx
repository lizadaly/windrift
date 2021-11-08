import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
import ResetButton from 'core/components/ui/reset-button'

export const Page: PageType = () => (
    <Chapter filename="chapter1">
        <Section>
            <ResetButton />
            <h1>A minimal example</h1>
        </Section>
    </Chapter>
)
