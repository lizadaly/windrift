/** Example/assertion that options for alternate display of chapters works as expected,
 * including refining the node that wraps each discrete Section.
 *
 * This technique would be used mostly for animation purposes, to provide a wrapper component that
 * manages mount/unmount animations like React Transition Group, but customized, e.g. React Motion.
 *
 */

import * as React from 'react'

import { Section, Nav } from 'core/components'
import { ChapterContext, renderChapterContent } from 'core/components/chapter'
import { PageType, RootState } from 'core/types'
import { useDispatch, useSelector } from 'react-redux'
import { getChapter } from 'core/util'
import { setSectionCount } from 'core/features/navigation'

interface AltWrapperProps {
    id: string
}
const AltWrapper: React.FC<AltWrapperProps> = ({ children, id }) => {
    return <div id={id}>{children}</div>
}

const filename = 'alt-wrapper-tag'

const AltChapter: React.FC = ({ children }) => {
    const dispatch = useDispatch()
    const item = useSelector((state: RootState) =>
        getChapter(state.navigation.present.toc, filename)
    )
    // On first render, record the number of sections and scroll to top
    React.useEffect(() => {
        dispatch(setSectionCount({ filename, count: React.Children.count(children) }))
    }, [dispatch])

    return (
        <ChapterContext.Provider value={{ filename }}>
            {renderChapterContent(children, item, false, {
                component: AltWrapper,
                props: { id: 'alt-wrapper-tag-example' }
            })}
        </ChapterContext.Provider>
    )
}
export const Page: PageType = () => {
    return (
        <AltChapter>
            <Section>
                this should be wrapped in a div with an id
                <Nav text="no-wrapper-tag" next="no-wrapper-tag" />
            </Section>
        </AltChapter>
    )
}
