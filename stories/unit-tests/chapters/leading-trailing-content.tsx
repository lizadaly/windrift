import { Section, Chapter, Nav } from 'core/components'
import { PageType } from 'core/types'

export const Page: PageType = () => {
    return (
        <Chapter filename="leading-trailing-content">
            <div id="leading-content">
                <h1>Unit tests</h1>
                <p>
                    This chapter contains tiny code samples used for the unit tests. You don't need
                    to read this!
                </p>
                <p>Test displaying content outside of Section nodes</p>
            </div>
            <Section>
                <Nav text="alt-wrapper-tag" next="alt-wrapper-tag" />
            </Section>
            <div id="trailing-content"></div>
        </Chapter>
    )
}
