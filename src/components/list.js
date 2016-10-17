const React = require('react')
import { connect } from 'react-redux'

import {iteratedList} from "./util"
import Link from "./link"
import * as actions from "../actions"


/* An array of expansions that can be "examined." Accepts an array and
reveals items one-by-one. Arrays may be nested one-level deep; if the current
item is an array, each value will be displayed separated by commas and ending
with "and". When only one item remains, nextUnit is fired (which may be null)
in which case no event is triggered.

Each time an expansion is revealed, onSetExpansions is called and onUpdateInventory
sets the inventory property `key` to the current selected value. */

class _List extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    e.preventDefault()

    // Move the expansion counter by one unless we're already there
    const atLastExpansion = this.props.currentExpansion === this.props.expansions.length - 1
    var currentExpansion = !atLastExpansion ? this.props.currentExpansion + 1 : this.props.currentExpansion
    this.props.onSetExpansions(this.props.expansions, this.props.tag, currentExpansion)
    this.props.onUpdateInventory(e.target.textContent, this.props.tag)

    // Are we at the last set? If so, there may be some events to fire
    if (!atLastExpansion && currentExpansion === this.props.expansions.length - 1) {

      if (this.props.nextUnit === "chapter") {
        this.props.onCompleteChapter()
      }
      else if (this.props.nextUnit === "section") {
        this.props.onCompleteSection()
      }
      // The no-op version just expands in place (usually because another selector
      // will do the expansion)
      else {
        // no-op
      }
    }
    // Update the counter in the browser (if check is a workaround to avoid test complaints)
    if (this.props.config && this.props.config.hasOwnProperty('identifier')) {
      const s = {}
      s[this.props.config.identifier] = this.props.counter
      history.pushState(s, "", "")
    }
    // Update the counter in the global store
    this.props.onUpdateCounter()
  }
  render () {
    let text = this.props.expansions[this.props.currentExpansion]
    let handler = this.props.persistLast || this.props.currentExpansion < this.props.expansions.length - 1 ? this.handleChange : null
    if (typeof(text) === "string") {
      return <Link handler={handler} text={text}/>
    }
    else {
      return iteratedList(text, handler, this.props.conjunction)
    }
  }
}
_List.propTypes = {
  nextUnit: React.PropTypes.oneOf(['chapter', 'section', 'none']),
  tag: React.PropTypes.string.isRequired,
  expansions: React.PropTypes.array.isRequired,
  config: React.PropTypes.object,
  currentExpansion: React.PropTypes.number,
  conjunction: React.PropTypes.string,
  persistLast: React.PropTypes.bool
}
_List.defaultProps = {
  nextUnit: 'section',
  conjunction: 'and',
  persistLast: false
}

const mapStateToProps = (state, ownProps, currentExpansion=0) => {
  if (state.expansions.present.hasOwnProperty(ownProps.tag)) {
    if (state.expansions.present[ownProps.tag].hasOwnProperty('currentExpansion')) {
    currentExpansion = state.expansions.present[ownProps.tag].currentExpansion
    }
  }
  return {
    currentExpansion: currentExpansion,
    counter: state.counter.present,
    config: state.config
  }
}
export const List = connect(
  mapStateToProps,
  {
    onSetExpansions: actions.setExpansions,
    onUpdateInventory: actions.updateInventory,
    onCompleteSection: actions.showNextSection,
    onCompleteChapter: actions.showNextChapter,
    onUpdateCounter: actions.updateStateCounter
  }
)(_List)

export default List

/* Special export for unit tests */
export const TestList = _List
