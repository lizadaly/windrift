/** Example/assertion that passing the React Fragment (</>) to the underlying render
 * chapter function will just return an unwrapped section
 */

import * as React from 'react'

import { Section, Nav } from 'core/components'
import { ChapterContext, renderChapterContent, useChapterSetup } from 'core/components/chapter'
import { PageType, ReactFCC } from 'core/types'

const filename = 'no-wrapper-tag'

const AltChapter: ReactFCC = ({ children }) => {
    const item = useChapterSetup(filename, React.Children.count(children))

    return (
        <ChapterContext.Provider value={{ filename }}>
            {renderChapterContent(children, item, false, { component: React.Fragment, props: {} })}
        </ChapterContext.Provider>
    )
}
export const Page: PageType = () => {
    return (
        <AltChapter>
            <Section>this should be rendered</Section>
            <Nav text="mdx-support.mdx" next="mdx-support.mdx" />
        </AltChapter>
    )
}
