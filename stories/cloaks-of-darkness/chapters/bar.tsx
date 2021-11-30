import { C, R, Section, Chapter, Nav } from 'core/components'
import Only from 'core/multiplayer/components/only'
import { PageType } from 'core/types'

export const Page: PageType = () => {
    return (
        <Chapter filename="bar">
            <Section>In the bar</Section>
        </Chapter>
    )
}
