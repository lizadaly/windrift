import * as React from "react"
import { useSelector } from 'react-redux'
import { RootState } from "../reducers"
import dynamic from 'next/dynamic'
import { Toc, TocItem } from '../types'

interface ChapterComponent {
    component: JSX.Element
    item: TocItem
}
const chapterComponents = (toc: Toc): Array<ChapterComponent> => {
    const chapters = Object.values(toc).map
        (item => {
            const component = React.createElement(dynamic(() =>
                import(`../../pages/chapters/${item.filename}`)))

            return {
                item,
                component,
            } as ChapterComponent
        })
    return chapters
}


const Game = (): JSX.Element => {
    const toc = useSelector((state: RootState) => state.toc.present)
    const [components] = React.useState(() => chapterComponents(toc))
    return <div className="game">
        {
            Object.values(toc).filter(c => c.visible).map(chapter => (
                <div key={chapter.filename}>
                    {
                        components.filter(co => co.item.filename === chapter.filename).
                            map(component => component.component)[0]
                    }
                </div>
            ))
        }
    </div>
}
export default Game