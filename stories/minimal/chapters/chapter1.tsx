import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="chapter1">
        <Section>
            <h1>A minimal example</h1>
        </Section>
    </Chapter>
)
