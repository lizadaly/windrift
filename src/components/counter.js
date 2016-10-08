/* The global state counter */
const React = require('react')
import { connect } from 'react-redux'
import { setStateBoolean } from "../actions"

class _Counter extends React.Component {
  constructor(props) {
    super(props)
    this.updatePushState(props.serializedState, props.counter)
  }
  prepState(serializedState) {
    // Return the state prefixed with our unique key
    var state = {}
    state[this.props.identifier] = serializedState
    return state
  }
  updatePushState(serializedState, counter) {
    var state = this.prepState(serializedState)
    history.pushState(state, "", "")
  }
  componentWillReceiveProps(p) {
    if (window.lockHistory) {
      let state = this.prepState(p.serializedState)
      history.replaceState(state, "", "")
      window.lockHistory = false
    }
    else if (p.counter > this.props.counter) {
      this.updatePushState(p.serializedState, p.counter)
    }
  }
  render() {
    return null
  } 
}
_Counter.defaultProps = {
  counter: 0
}
_Counter.propTypes = {
  identifier: React.PropTypes.string.isRequired,
  counter: React.PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
    serializedState: state //{bookmarks: state.bookmarks, inventory: state.inventory, expansions: state.expansions}
  }
}
export const Counter = connect(
  mapStateToProps,
  { setStateBoolean }
)(_Counter)
