import * as React from "react"
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../reducers"
import dynamic from 'next/dynamic'
import { Toc } from '../types'

type GameProps = PropsFromRedux

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

class Game extends React.Component<GameProps> {
    constructor(props: GameProps) {
        super(props)

    }
    render() {

        const chapters = visibleChapters(this.props.config.toc)

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
}

const mapState = (state: RootState) => {

    return {
        inventory: state.inventory,
        config: state.config
    }
}

const connector = connect(
    mapState,
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Game)