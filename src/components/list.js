import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { iteratedList } from './util'
import * as actions from '../actions'

// Special value to match the last selection by the user
const MATCH_LAST = '_last'

/* An array of expansions that can be "examined." Accepts an array and
reveals items one-by-one. Arrays may be nested one-level deep; if the current
item is an array, each value will be displayed separated by commas and ending
with "and". When only one item remains, nextUnit is fired (which may be null)
in which case no event is triggered.

Each time an expansion is revealed, onSetExpansions is called and onUpdateInventory
sets the inventory property `key` to the current selected value. */

export class List extends React.Component {
  static defaultProps = {
    conjunction: 'and',
    currentExpansion: 0,
    nextUnit: 'section',
    persistLast: false,
    separator: ', ',
  }
  static propTypes = {
    expansions: PropTypes.array.isRequired,
    tag: PropTypes.string.isRequired,

    // optional
    config: PropTypes.object,
    conjunction: PropTypes.string,
    counter: PropTypes.number,
    currentExpansion: PropTypes.number,
    lastSelection: PropTypes.string,
    nextUnit: PropTypes.oneOf(['chapter', 'section', 'none']),
    onComplete: PropTypes.func,
    onCompleteChapter: PropTypes.func,
    onCompleteSection: PropTypes.func,
    onLoad: PropTypes.func,
    onSetExpansions: PropTypes.func,
    onUpdateCounter: PropTypes.func,
    onUpdateInventory: PropTypes.func,
    persistLast: PropTypes.bool,
    separator: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)

    if (props.onLoad) {
      props.onLoad()
    }
    this.state = {
      onComplete: this.props.onComplete,
    }
  }
  componentDidUpdate() {
    if (this.shouldCallOnComplete(this.state.onComplete)) {
      this.state.onComplete(this.props.lastSelection, this.props.tag)
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        onComplete: undefined,
      })
    }
  }
  shouldCallOnComplete(func) {
    const atLastExpansion = this.props.currentExpansion === this.props.expansions.length - 1
    return atLastExpansion && func
  }
  handleChange(e) {
    e.preventDefault()

    // Move the expansion counter by one unless we're already there
    const atLastExpansion = this.props.currentExpansion === this.props.expansions.length - 1
    const currentExpansion = !atLastExpansion ? this.props.currentExpansion + 1 : this.props.currentExpansion

    this.props.onSetExpansions(this.props.expansions, this.props.tag, currentExpansion)


    // Set the inventory property to be the value of what the user selected, unless
    // the special key "_last" (MATCH_LAST) was provided, in which case use the last item
    // set in the inventory (as determined by mapStateToProps)
    let userSelection = e.target.textContent
    if (e.target.textContent === MATCH_LAST) {
      userSelection = this.props.lastSelection
    }

    this.props.onUpdateInventory(userSelection, this.props.tag)

    // Are we at the last set? If so, there may be some events to fire
    if (!atLastExpansion && currentExpansion === this.props.expansions.length - 1) {
      if (this.props.nextUnit === 'chapter') {
        this.props.onCompleteChapter()
      } else if (this.props.nextUnit === 'section') {
        this.props.onCompleteSection()
      } else {
        // The no-op version just expands in place (usually because another selector
        // will do the expansion)
      }
    }

    // Update the counter in the browser (if check is a workaround to avoid test complaints)
    if (this.props.config && this.props.config.hasOwnProperty('identifier')) {
      const s = {}
      s[this.props.config.identifier] = this.props.counter
      window.history.pushState(s, '', '')
    }

    // Update the counter in the global store
    this.props.onUpdateCounter()
  }
  render() {
    let text = this.props.expansions[this.props.currentExpansion]
    const atLastExpansion = this.props.currentExpansion === this.props.expansions.length - 1

    // If this is MATCH_LAST, don't actually show that property, show the value of last selection
    if (text === MATCH_LAST && atLastExpansion) {
      text = this.props.lastSelection
    }

    // Create an onclick handler if we're at the last expansion and/or persisting the last item
    const handler = this.props.persistLast || !atLastExpansion ? this.handleChange : null

    return iteratedList(text, handler, this.props.conjunction, this.props.separator)
  }
}

const mapStateToProps = (state, ownProps, currentExpansion = 0, lastSelection = undefined) => {
  if (state.expansions.present.hasOwnProperty(ownProps.tag)) {
    if (state.expansions.present[ownProps.tag].hasOwnProperty('currentExpansion')) {
      currentExpansion = state.expansions.present[ownProps.tag].currentExpansion // eslint-disable-line
    }
  }
  if (state.inventory.present.hasOwnProperty(ownProps.tag)) {
    lastSelection = state.inventory.present[ownProps.tag] // eslint-disable-line
  }
  return {
    currentExpansion,
    counter: state.counter.present,
    config: state.config,
    lastSelection,
  }
}
export default connect(
  mapStateToProps,
  {
    onSetExpansions: actions.setExpansions,
    onUpdateInventory: actions.updateInventory,
    onCompleteSection: actions.showNextSection,
    onCompleteChapter: actions.showNextChapter,
    onUpdateCounter: actions.updateStateCounter,
  }
)(List)

