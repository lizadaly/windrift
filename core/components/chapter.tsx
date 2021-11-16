import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'

import { setSectionCount } from 'core/features/navigation'
import { getChapter } from 'core/util'
import { RootState } from 'core/types'

type ContextProps = {
    filename: string
}
export const ChapterContext = React.createContext<Partial<ContextProps>>({})

export type ChapterType = {
    filename: string
    useDefaultTransitions?: boolean
    showOnlyCurrentSection?: boolean
}
/**
 * Render a chapter containing some number of child nodes, usually Sections.
 * @param filename The filename of this chapter
 * @param wrappingComponent Replace the CSS Transition wrapper with another node, or null to disable
 * @param showOnlyCurrentSection Whether to show all sections up to the current (the default) or to only show the current
 * @returns
 */
const Chapter: React.FC<ChapterType> = ({
    children,
    filename,
    useDefaultTransitions = true,
    showOnlyCurrentSection = false
}) => {
    const item = useSelector((state: RootState) =>
        getChapter(state.navigation.present.toc, filename)
    )
    const [thisFilename] = React.useState({ filename })

    const dispatch = useDispatch()

    // On first render, record the number of sections and scroll to top
    React.useEffect(() => {
        dispatch(setSectionCount({ filename, count: React.Children.count(children) }))

        document.querySelector('body').scrollIntoView()
    }, [dispatch])

    // Display all visible child nodes, only checking Sections for bookmark counts
    let index = -1

    const kids = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const fc = child.type as React.FunctionComponent

            if (fc.displayName === 'Section') {
                index += 1
                const condition = showOnlyCurrentSection
                    ? index === item.bookmark
                    : index <= item.bookmark
                if (condition) {
                    return useDefaultTransitions ? (
                        <CSSTransition {...SectionTransition}>{child}</CSSTransition>
                    ) : (
                        child
                    )
                }
            } else {
                return <>{child}</>
            }
        }
    })
    return (
        <ChapterContext.Provider value={thisFilename}>
            {useDefaultTransitions ? (
                <TransitionGroup component={null}>{kids}</TransitionGroup>
            ) : (
                kids
            )}
        </ChapterContext.Provider>
    )
}

// Wraps the "new section" display in a CSS transformation if useDefaultTransitions is enabled
const SectionTransition = {
    classNames: 'windrift--section',
    timeout: {
        appear: 500,
        enter: 500,
        exit: 300
    },
    ariaLive: 'polite'
}
export default Chapter
