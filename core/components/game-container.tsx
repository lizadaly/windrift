import * as React from "react"

import { ActionCreators } from 'redux-undo'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "core/reducers"

import { Counter } from '../components'

interface GameProps extends PropsFromRedux {
    children: React.ReactNode
}

class GameContainer extends React.Component<GameProps> {
    constructor(props: GameProps) {
        super(props)
        this.jumpFromHistory = this.jumpFromHistory.bind(this)
        if (props.enableUndo) {
            // If we received a browser forward/back, jump to the relevant point in history
            window.addEventListener('popstate', this.jumpFromHistory)
        }
    }
    componentDidMount() {
        // On the first mount, also jump from the history
        this.jumpFromHistory()
    }
    jumpFromHistory() {
        const browserState = window.history.state
        const { identifier, counter } = this.props
        if (identifier in browserState) {
            const timeOffset = browserState[identifier] - counter
            console.log(`jumping from counter ${counter} offset ${timeOffset}`)
            this.props.jump(timeOffset)
        }
    }

    render() {
        return (
            <>
                <Counter identifier={this.props.identifier} counter={this.props.counter} />
                {this.props.children}
            </>)
    }
}


const mapState = (state: RootState) => ({
    enableUndo: state.config.enableUndo,
    identifier: state.config.identifier,
    counter: state.counter.present,
})
const mapDispatch = (dispatch) => ({
    jump: (offset: number) => dispatch(ActionCreators.jump(offset)),
})

const connector = connect(
    mapState,
    mapDispatch
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(GameContainer)
