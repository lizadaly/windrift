import * as React from "react"
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../reducers"


interface OwnProps {
    chapters: any
}
type GameProps = OwnProps & PropsFromRedux

class Game extends React.Component<GameProps> {
    constructor(props: GameProps) {
        super(props)

        //     // Dynamically load all JS in the 'chapters' directory as a Chapter object
        //     //this.chapters = this.initializeChapters(props.chaptersList)
    }
    render() {
        const { chapters } = this.props
        return <div>
            hello world
            {chapters}
        </div>

    }
}

const mapState = (state: RootState) => ({
    inventory: state.inventory
})

const connector = connect(
    mapState,
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Game)