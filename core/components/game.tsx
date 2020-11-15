import * as React from "react"
import { useSelector } from 'react-redux'
import { RootState } from "../reducers"
import dynamic from 'next/dynamic'
import { Toc } from '../types'

interface ChapterComponent {
    chapter: JSX.Element
    filename: string
}
const chapterComponents = (chapterList: Array<string>): Array<ChapterComponent> => {
    console.log('importing')
    const chapters = chapterList.map
        (c => {
            const chapter = React.createElement(dynamic(() =>
                import(`../../pages/chapters/${c}`)))

            return {
                filename: c,
                chapter,
            } as ChapterComponent
        })
    return chapters
}

type GameProps = {
    chapterList: Array<string>,
}

const Game = ({ chapterList }: GameProps): JSX.Element => {
    const toc = useSelector((state: RootState) => state.toc)
    const [components] = React.useState(() => chapterComponents(chapterList))

    return <div className="game">
        {
            Object.values(toc).filter(c => c.visible).map(chapter => (
                <div key={chapter.filename}>
                    {
                        components.filter(co => co.filename === chapter.filename).
                            map(component => component.chapter)[0]
                    }
                </div>
            ))
        }
    </div>
}
export default Game