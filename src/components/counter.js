/* The global state counter */
import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

class _Counter extends React.Component {
  constructor(props) {
    super(props)
    this.updateReplaceState(props.counter, props.identifier)
  }

  componentWillReceiveProps(p) {
    this.updateReplaceState(p.counter, this.props.identifier)
  }
  updateReplaceState(counter, identifier) {
    const s = {}
    s[identifier] = counter
    window.history.replaceState(s, '', '')
  }
  render() {
    return null
  }
}
_Counter.defaultProps = {
  counter: 0,
}
_Counter.propTypes = {
  identifier: PropTypes.string.isRequired,
  counter: PropTypes.number,
}

const mapStateToProps = (state) => ({
  counter: state.counter.present,
})
export const Counter = connect(mapStateToProps)(_Counter)
