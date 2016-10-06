const React = require('react')
import { connect } from 'react-redux'

import { Chapter } from "./chapter1.js"

const mapStateToProps = (state, ownProps) => {
  return {
    currentSection: state.bookmarks[ownProps.chapterId],
    inventory: state.inventory
  }
}

export function chapters() {
  var unwrapped = [Chapter]
  var chapters = []

  unwrapped.forEach((chapter, index) => {
    let C = connect(mapStateToProps)(chapter)
    chapters.push(<C chapterId={index}/>)
  })
  return chapters
}
