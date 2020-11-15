import * as React from "react"
import { ChapterType, COUNT_SECTION } from '../types'
import { RootState } from "../reducers"
import { useSelector, useDispatch } from 'react-redux'
import { countSections } from '../actions/navigation'
import { getChapter } from '../util'

export const ChapterContext = React.createContext(undefined)

const Chapter = ({ children, filename }: ChapterType): JSX.Element => {

    const item = useSelector((state: RootState) => getChapter(state.toc, filename),
        (prev, next) => (
            prev.bookmark != next.bookmark
        )
    )
    console.log(`rendering ${item.filename}`)

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(countSections(item,
            React.Children.count(children)
        ))
    }, [dispatch])

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