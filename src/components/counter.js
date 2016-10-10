/* The global state counter */
const React = require('react')
import { connect } from 'react-redux'
import { setStateBoolean } from "../actions"

class _Counter extends React.Component {
  constructor(props) {
    super(props)
    this.updateReplaceState(props.counter, props.identifier)
  }
  updateReplaceState(counter, identifier) {
    const s = {}
    s[identifier] = counter
    history.replaceState(s, "", "")
  }
  componentWillReceiveProps(p) {
    this.updateReplaceState(p.counter, this.props.identifier)
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
    counter: state.counter.present
  }
}
export const Counter = connect(
  mapStateToProps
)(_Counter)
