import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSectionCount } from 'core/reducers/navigation'
import { getChapter } from 'core/util'
import { RootState } from 'core/reducers'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

type ContextProps = {
    filename: string
}
export const ChapterContext = React.createContext<Partial<ContextProps>>({})

export type ChapterType = {
    filename: string
}

const Chapter: React.FC<ChapterType> = ({ children, filename }) => {
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

    // Display all visible child sections
    const kids = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
            const fc = child.type as React.FunctionComponent

            if (fc.displayName === 'Section') {
                if (index <= item.bookmark) {
                    return <CSSTransition {...SectionTransition}>{child}</CSSTransition>
                }
            } else {
                return <>{child}</>
            }
        }
    })

    return (
        <ChapterContext.Provider value={thisFilename}>
            <TransitionGroup component={null}>{kids}</TransitionGroup>
        </ChapterContext.Provider>
    )
}

// Wraps the "new section" display in a CSS transformation
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
