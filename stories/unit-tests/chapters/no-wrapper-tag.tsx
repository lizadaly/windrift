/** Example/assertion that passing nothing to the underlying render chapter function will just return an unwrapped section
 *
 */

import * as React from 'react'

import { Section } from 'core/components'
import { ChapterContext, renderChapterContent, useChapterSetup } from 'core/components/chapter'
import { PageType, RootState } from 'core/types'
import { useDispatch, useSelector } from 'react-redux'
import { getChapter } from 'core/util'
import { setSectionCount } from 'core/features/navigation'

const AltWrapper: React.FC = ({ children }) => {
    return <>{children}</>
}

const filename = 'no-wrapper-tag'

const AltChapter: React.FC = ({ children }) => {
    const item = useChapterSetup(filename, children)

    return (
        <ChapterContext.Provider value={{ filename }}>
            {renderChapterContent(children, item, false, { component: AltWrapper, props: {} })}
        </ChapterContext.Provider>
    )
}
export const Page: PageType = () => {
    return (
        <AltChapter>
            <Section>this should be rendered</Section>
        </AltChapter>
    )
}
