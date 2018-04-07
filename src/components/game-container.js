import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo'

import { Counter } from '../components'

export class GameContainer extends React.Component {
  constructor(props) {
    super(props)
    this.jumpFromHistory = this.jumpFromHistory.bind(this)
    if (props.enableUndo) {
      // If we received a browser forward/back, jump to the relevant point in history
      window.document.addEventListener('popstate', this.jumpFromHistory)
    }
  }
  componentDidMount() {
    // On the first mount, also jump from the history
    this.jumpFromHistory()
  }
  jumpFromHistory() {
    const browserState = window.history.state
    const { identifier } = this.props

    if (browserState.hasOwnProperty(identifier)) {
      const timeOffset = browserState[identifier] - this.props.counter
      console.log('Going to jump to time offset ', timeOffset)
      this.props.jump(timeOffset)
    }
  }

  render() {
    return (
      <div>
        <Counter identifier={this.props.identifier} counter={this.props.counter} />
        {this.props.children}
      </div>)
  }
}

GameContainer.propTypes = {
  children: PropTypes.element.isRequired,
  enableUndo: PropTypes.bool.isRequired,
  identifier: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  jump: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  enableUndo: state.config.enableUndo,
  identifier: state.config.identifier,
  counter: state.counter.present,
})
const mapDispatchToProps = (dispatch) => ({
  jump: (num) => dispatch(ActionCreators.jump(num)),
})
export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)

