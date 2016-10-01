/* The global state counter */
const React = require('react')
import { connect } from 'react-redux'
import { setStateBoolean } from "../actions"

class _Counter extends React.Component {
  constructor(props) {
    super(props)
//    console.log("Pushing initial state")
    this.updatePushState(props.serializedState, props.counter)
  }
  updatePushState(serializedState, counter) {
    //console.log("Updating push state with counter: ", counter)
    history.pushState(serializedState, "", "")
  }
  componentWillReceiveProps(p) {
    //console.log("Previous counter: ", this.props.counter)
    if (window.lockHistory) {
      history.replaceState(p.serializedState, "", "")
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
