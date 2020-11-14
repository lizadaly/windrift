import * as React from "react"
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../reducers"
import dynamic from 'next/dynamic'

type GameProps = PropsFromRedux

class Game extends React.Component<GameProps> {
    constructor(props: GameProps) {
        super(props)

        //     // Dynamically load all JS in the 'chapters' directory as a Chapter object
        //     //this.chapters = this.initializeChapters(props.chaptersList)
    }
    render() {
        const chapters = this.props.config.toc.map(c => {
            const C = dynamic(() => import(`../../pages/chapters/${c.filename}`))
            return <C />
        })

        return <div className="game">
            {
                chapters.map((chapter) => (
                    <div
                        key={"x"}
                    >
                        {chapter}
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