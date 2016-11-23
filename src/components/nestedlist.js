const React = require('react')
import { connect } from 'react-redux'

import {iteratedList} from "./util"
import Link from "./link"
import * as actions from "../actions"

class _NestedList extends React.Component {
  constructor(props) {
    super(props)
    var tokenized = readFromTokens(tokenize(props.expansions))
    this.handler = this.handler.bind(this)
    this.state = {
      tokenized: tokenized
    }
  }
  handler(tokens) {

    for (var r of tokens) {
      if (typeof r === 'object') {
        let directive = r[0]
        if (directive === 'hide') {
          r[0] = 'show'
        }
      }
    }

    this.setState({
      tokenized: this.state.tokenized
    })
  }
  render() {
    return <div>{renderText(this.state.tokenized, this.handler, false)}</div>
  }
}
_NestedList.propTypes = {
  nextUnit: React.PropTypes.oneOf(['chapter', 'section', 'none']),
  tag: React.PropTypes.string.isRequired,
  expansions: React.PropTypes.string.isRequired,
  config: React.PropTypes.object,
  currentExpansion: React.PropTypes.number,
  conjunction: React.PropTypes.string,
  persistLast: React.PropTypes.bool,
  onLoad: React.PropTypes.func,
  onComplete: React.PropTypes.func
}

const mapStateToProps = (state, ownProps, currentExpansion=0, lastSelection=undefined) => {
  if (state.expansions.present.hasOwnProperty(ownProps.tag)) {
    if (state.expansions.present[ownProps.tag].hasOwnProperty('currentExpansion')) {
    currentExpansion = state.expansions.present[ownProps.tag].currentExpansion
    }
  }
  if (state.inventory.present.hasOwnProperty(ownProps.tag)) {
    lastSelection = state.inventory.present[ownProps.tag]
  }
  return {
    currentExpansion: currentExpansion,
    counter: state.counter.present,
    config: state.config,
    lastSelection: lastSelection
  }
}

export const renderText = (tokens, handler, inAnchor=false) => {
  if (typeof tokens === 'string') {
    return <span key={tokens}>{" " + tokens + " "}</span>
  }
  var ret = []
  var asAnchor = false
  if (tokens[0] === 'show') {
    // Check the siblings for any hidden nodes
    for (var i=1;i<tokens.length;i++) {
      if (typeof tokens[i] === 'object') {
        var directive = tokens[i][0]
        if (directive === 'hide' && inAnchor === false) {
          asAnchor = true
        }
      }
    }
    for (var i=1;i<tokens.length;i++) {
      var anchorValue = inAnchor || asAnchor
      ret.push(renderText(tokens[i], handler, anchorValue))
    }
  }
  if (asAnchor) {
    return <a onClick={() => handler(tokens)} key={tokens.length}>{ret}</a>
  }
  else {
    return ret
  }
}


export const serialize = (tokens) => {
  // Serialize a set of tokens back into the string grammar
  if (typeof tokens === 'string') {
    return tokens
  }
  var ret = ""
  var remainder = tokens.slice(1)

  if (tokens[0] === 'show') {
    ret += '['
  }
  else if (tokens[0] === 'hide') {
    ret += '('
  }
  for (var r of remainder) {
    ret += serialize(r)
  }
  if (tokens[0] === 'show') {
    ret += ']'
  }
  else if (tokens[0] === 'hide') {
    ret += ')'
  }
  return ret
}

export const tokenize = (s) => {
  // convert escaped brackets into html entities
  // because it's annoying to handle it in the regular expression for splitting
  s = s.replace(String.raw`\(`, '&#40;').replace(String.raw`\)`, '&#41;')
  s = s.replace(String.raw`\[`, '&#91;').replace(String.raw`\]`, '&#93;')

  // tokenize
  let tokens = []
  for (let token of s.split(/([\[\]\(\)])/)) {
    if (token.trim() != '') {
      tokens.push(token.trim())
    }
  }

  // don't allow empty list of tokens
  if (!tokens) {
    throw ("No tokens")
  }
  // ensure that the first token must be a bracket of some kind - don't allow "abc (def) ghi",
  // it has to be "[abc (def) ghi]".
  if (!'[('.includes(tokens[0])) {
      throw ("sequence of tokens should start with an open bracket, got " + tokens[0])
  }

  // similarly ensure last token must be bracket of some kind - no straggling text
  // (parser as written will fail to capture all of it)
  // alternatively, rewrite parser to allow it but I think this is a reasonable constraint
  if (!'])'.includes(tokens[tokens.length - 1])) {
      throw ("sequence of tokens should end with a close bracket")
  }
  return tokens
}

export const readFromTokens = (tokens) => {
  // Build a parse tree from a sequence of tokens.
  let token = tokens.shift()  // tokenize function takes care of case where it's an empty list
  var L
  if (token === '(') {
    L = ['hide']
    while (tokens[0] != ')') {
      L.push(readFromTokens(tokens))
      if (tokens.length === 0) {  // never closed the open ( bracket
        throw ("unexpected EOF while reading sequence of tokens")
      }
    }
    tokens.shift()  // pop off closing ) bracket
    return L
  }
  else if (token === '[') {
    L = ['show']
    while (tokens[0] != ']') {
      L.push(readFromTokens(tokens))
      if (tokens.length === 0) {  // never closed the open [ bracket
        throw ("unexpected EOF while reading sequence of tokens")
      }
    }
    tokens.shift()  // pop off closing ] bracket
    return L
  }
  else if ('])'.includes(token)) {  // encountered a closing bracket where none should have been found
    throw ("unexpected closing bracket from token " + token + " and tokens " + tokens)
  }
  else {
      // otherwise, it's just a string - don't do anything fancy
      return token
    }
}

export const NestedList = connect(
  mapStateToProps,
  {
    onSetExpansions: actions.setExpansions,
    onUpdateInventory: actions.updateInventory,
    onCompleteSection: actions.showNextSection,
    onCompleteChapter: actions.showNextChapter,
    onUpdateCounter: actions.updateStateCounter
  }
)(_NestedList)

export default NestedList

/* Special export for unit tests */
export const TestNestedList = _NestedList
