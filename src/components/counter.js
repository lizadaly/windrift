/* The global state counter */
import React from 'react'
import PropTypes from 'prop-types'

export default class Counter extends React.Component {
  static defaultProps = {
    counter: 0,
  }
  static propTypes = {
    identifier: PropTypes.string.isRequired,
    counter: PropTypes.number,
  }
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

