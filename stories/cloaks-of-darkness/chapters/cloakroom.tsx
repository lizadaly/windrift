import { Next } from 'core/actions/navigation'
import { C, R, Section, Chapter } from 'core/components'
import { BulletedList, DefaultList } from 'core/components/widgets'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="cloakroom">
        <Section>
            <h1>Cloakroom</h1>
        </Section>
    </Chapter>
)
