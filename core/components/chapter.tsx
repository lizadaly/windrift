import * as React from 'react'
import { useTransition, animated, config } from '@react-spring/web'
import { useSelector, useDispatch } from 'react-redux'

import { setSectionCount } from 'core/features/navigation'
import { getChapter } from 'core/util'
import { ReactFCC, RootState, TocItem } from 'core/types'

type ContextProps = {
    filename: string
}
export const ChapterContext = React.createContext<Partial<ContextProps>>({})

export interface ChapterSetup {
    item: TocItem
}
/**
 * Initialize a chapter and dispatch initial events.
 * @return the TocItem for this chapter
 */
export const useChapterSetup = (filename: string, count: number): TocItem => {
    const item = useSelector((state: RootState) =>
        getChapter(state.navigation.present.toc, filename)
    )

    const dispatch = useDispatch()

    // On first render, record the number of sections and scroll to top
    React.useEffect(() => {
        dispatch(setSectionCount({ filename, count }))
        document.querySelector('body').scrollIntoView()
    }, [dispatch])
    return item
}
export interface ChapterType {
    filename: string
    showOnlyCurrentSection?: boolean
}
/**
 * Render a chapter containing some number of child nodes, usually Sections.
 * @param filename The filename of this chapter
 * @param sectionWrapper Wrapper for any Section nodes found in the chapter. Can be <></> for no wrapping.
 * @param showOnlyCurrentSection Whether to show all sections up to the current (the default) or to only show the current
 * @returns the chapter
 */
const Chapter: ReactFCC<ChapterType> = ({ children, filename, showOnlyCurrentSection = false }) => {
    const [thisFilename] = React.useState({ filename })

    const item = useChapterSetup(filename, React.Children.count(children))
    const visibleSections = getVisibleSections(children, item, showOnlyCurrentSection)

    const transitions = useTransition(visibleSections, {
        keys: (section) => section.key,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 1 }, // Sections accumulate, they don't leave
        config: config.molasses
    })

    return (
        <ChapterContext.Provider value={thisFilename}>
            {transitions((style, section) => (
                <animated.div style={style} aria-live="polite" className="windrift--section">
                    {section.element}
                </animated.div>
            ))}
        </ChapterContext.Provider>
    )
}

interface VisibleSection {
    key: string
    element: React.ReactNode
}

/**
 * Return currently-visible sections as an array for use with useTransition.
 * @param children The child nodes of the chapter
 * @param item The TOC item represented by this chapter
 * @param showOnlyCurrentSection Whether to show all sections up to the current (the default) or to only show the current
 * @returns Array of visible sections with keys
 */
const getVisibleSections = (
    children: React.ReactNode,
    item: TocItem,
    showOnlyCurrentSection: boolean
): VisibleSection[] => {
    const sections: VisibleSection[] = []
    let index = -1

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
            const fc = child.type as React.FunctionComponent

            if (fc.displayName === 'Section') {
                index += 1
                const condition = showOnlyCurrentSection
                    ? index === item.bookmark
                    : index <= item.bookmark

                if (condition) {
                    sections.push({
                        key: `section-${index}`,
                        element: child
                    })
                }
            } else {
                sections.push({
                    key: `content-${sections.length}`,
                    element: child
                })
            }
        }
    })

    return sections
}

/**
 * Return currently-visible chapter content containing any number of child nodes, usually Sections.
 * Sections are checked for visibility and wrapped in a wrapper node.
 * @param children The child nodes of the chapter
 * @param item The TOC item represented by this chapter
 * @param showOnlyCurrentSection Whether to show all sections up to the current (the default) or to only show the current
 * @param sectionWrapper Wrapper for any Section nodes found in the chapter; defaults to React.Fragment
 * @returns Array of wrapped visible sections
 */
export const renderChapterContent = (
    children: React.ReactNode,
    item: TocItem,
    showOnlyCurrentSection: boolean,
    sectionWrapper = { component: React.Fragment as React.ComponentType<any>, props: {} }
): React.ReactNode[] => {
    const sections: React.ReactNode[] = []
    let index = -1

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
            const fc = child.type as React.FunctionComponent

            if (fc.displayName === 'Section') {
                index += 1
                const condition = showOnlyCurrentSection
                    ? index === item.bookmark
                    : index <= item.bookmark

                if (condition) {
                    const Wrapper = sectionWrapper.component
                    sections.push(
                        <Wrapper key={`section-${index}`} {...sectionWrapper.props}>
                            {child}
                        </Wrapper>
                    )
                }
            } else {
                sections.push(
                    <React.Fragment key={`content-${sections.length}`}>{child}</React.Fragment>
                )
            }
        }
    })

    return sections
}

export default Chapter
