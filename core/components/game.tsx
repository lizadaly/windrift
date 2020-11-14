import * as React from "react"
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../reducers"


type GameProps = PropsFromRedux

class Game extends React.Component<GameProps> {
    constructor(props: GameProps) {
        super(props)

        //     // Dynamically load all JS in the 'chapters' directory as a Chapter object
        //     //this.chapters = this.initializeChapters(props.chaptersList)
    }
    render() {
        const { toc } = this.props.config
        console.log(this.props.config)
        return <div>
            hello world
        </div>

    }
}

const mapState = (state: RootState) => ({
    inventory: state.inventory,
    config: state.config
})

const connector = connect(
    mapState,
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Game)