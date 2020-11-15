import * as React from "react"
import { ChapterType, TocItem } from '../types'
import { RootState } from "../reducers"
import { useSelector, useDispatch } from 'react-redux'
import { countSections } from '../actions/navigation'
import { getChapter } from '../util'

export const ChapterContext = React.createContext(undefined)

const Chapter = ({ children, filename }: ChapterType): JSX.Element => {

    const toc = useSelector((state: RootState) => state.toc)

    const dispatch = useDispatch()
    console.log(toc)
    const item = getChapter(toc, filename)

    // React.useEffect(
    //     () => {
    //         dispatch(countSections(item, React.Children.count(children)))
    //     }, [children]
    // )

    const kids = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && index <= item.bookmark) {
            return React.cloneElement(child, {
                visible: true
            })
        }
        return child
    })

    return <ChapterContext.Provider value={item}>
        {kids}
    </ChapterContext.Provider>
}

export default Chapter