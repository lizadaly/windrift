import * as React from "react"
import { ChapterType, COUNT_SECTION } from '../types'
import { RootState } from "../reducers"
import { useSelector, useDispatch } from 'react-redux'
import { countSections } from '../actions/navigation'
import { getChapter } from '../util'

export const ChapterContext = React.createContext(undefined)

const Chapter = ({ children, filename }: ChapterType): JSX.Element => {

    const item = useSelector((state: RootState) => getChapter(state.toc.present, filename),
        // (prev, next) => (
        //     prev.bookmark != next.bookmark
        // )
    )
    console.log(`rendering ${item.filename}`)
    const dispatch = useDispatch()

    // On first render, record the number of sections
    React.useEffect(() => {
        dispatch(countSections(item,
            React.Children.count(children)
        ))
    }, [dispatch])

    // Display all visible child sections
    const kids = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && index <= item.bookmark) {
            return React.cloneElement(child, {
                visible: true
            }) // This might have some weird side effects because the components will be new
        }
        return child
    })

    return <ChapterContext.Provider value={item}>
        {kids}
    </ChapterContext.Provider>
}

export default Chapter