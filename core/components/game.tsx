import * as React from "react"
import { useSelector } from 'react-redux'
import { RootState } from "../reducers"
import dynamic from 'next/dynamic'
import { Toc } from '../types'

interface VisibleChapter {
    chapter: JSX.Element
    id: string
}
const visibleChapters = (toc: Toc): Array<VisibleChapter> => {
    const chapters = toc.filter(c => c.visible).map
        (c => {
            const C = dynamic(() => import(`../../pages/chapters/${c.filename}`))
            return {
                id: c.filename,
                chapter: <C />
            } as VisibleChapter
        })
    return chapters
}

const Game = (): JSX.Element => {
    const toc = useSelector((state: RootState) => state.config.toc)
    const chapters = visibleChapters(toc)

    return <div className="game">
        {
            chapters.map((chapter) => (
                <div key={chapter.id}>
                    {chapter.chapter}
                </div>
            ))
        }
    </div>
}
export default Game