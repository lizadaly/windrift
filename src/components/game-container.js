import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo'

import { Counter } from '../components'

export class GameContainer extends React.Component {
  constructor(props) {
    super(props)
    if (props.config.enableUndo) {
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
    const { identifier } = this.props.config
    if (browserState.hasOwnProperty(identifier)) {
      const timeOffset = browserState[identifier] - this.props.counter
      console.log('Going to jump to time offset ', timeOffset)
      this.jump(timeOffset)
    }
  }

  render() {
    const { identifier } = this.props.config
    return (
      <div>
        <Counter identifier={identifier} />
        {this.props.children}
      </div>)
  }
}

GameContainer.propTypes = {
  children: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  counter: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  currentChapter: state.bookmarks.present.length - 1,
  counter: state.counter.present,
})
const mapDispatchToProps = (dispatch) => ({
  jump: (num) => dispatch(ActionCreators.jump(num)),
})
export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)

