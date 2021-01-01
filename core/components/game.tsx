import * as React from "react"
import { useSelector } from 'react-redux'
import { RootState } from "core/reducers"
import dynamic from 'next/dynamic'
import { Toc, TocItem } from 'core/types'

interface ChapterComponent {
    component: JSX.Element
    item: TocItem
}
const chapterComponents = (toc: Toc, story: string): Array<ChapterComponent> => {
    const chapters = Object.values(toc).map
        (item => {
            const component = React.createElement(dynamic(() =>
                import(`../../stories/${story}/chapters/${item.filename}`)))

            return {
                item,
                component,
            } as ChapterComponent
        })
    return chapters
}
interface GameProps {
    story: string
}

const Game = ({ story }: GameProps): JSX.Element => {

    const toc = useSelector((state: RootState) => state.toc.present)
    const [components] = React.useState(() => chapterComponents(toc, story))
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