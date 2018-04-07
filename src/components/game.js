import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Counter } from '../components/counter'


export class Game extends React.Component {
  constructor(props) {
    super(props)

    // Dynamically load all JS in the 'chapters' directory as a Chapter object
    this.chapters = []
    props.chaptersList.keys().sort().forEach((filename, index) => {
      const chapter = props.chaptersList(filename).default
      // React requires this be uppercase, hooray
      const C = connect(chapterMapper)(chapter)
      this.chapters.push(<C chapterId={index} />)
    })
  }
  // Jump to the top of the browser if the pagination is by-chapter and there was a props change indicating a chapter move
  componentDidUpdate(prevProps) {
    if (this.props.config.pagination === 'by-chapter') {
      if (prevProps.currentChapter !== this.props.currentChapter) {
        window.scroll(0, 0)
      }
    }
  }
  render() {
    // Display all chapters up to the currentChapter
    let renderChapter
    // If by-chapter is set, only render this chapter, otherwise render all up to the current
    // FIXME this can be refactored to less code
    if (this.props.config.pagination === 'by-chapter') {
      renderChapter = (
        <div
          key={`chapter${this.props.currentChapter}`}
          className="current-chapter"
        >
          {
            this.chapters[this.props.currentChapter]
          }
        </div>
      )
    } else {
      renderChapter = Array(this.props.currentChapter + 1).fill().map((ch, i) => (
        <div
          key={this.chapters[i].chapterId}
          className={i === this.props.currentChapter ? 'current-chapter' : 'chapter'}
        >
          {this.chapters[i]}
        </div>
      ))
    }

    return (
      <div className="game">
        <Counter identifier={this.props.config.identifier} />
        {
          renderChapter
        }
      </div>)
  }
}
Game.propTypes = {
  config: PropTypes.object.isRequired,
  chaptersList: (props) => {
    const { chaptersList } = props
    if (!chaptersList.hasOwnProperty('keys')) {
      return new Error('chaptersList must include a keys func')
    }
    if (chaptersList.keys().length < 1) {
      return new Error('chaptersList must include at least one chapter')
    }
    return null
  },
  currentChapter: (props) => {
    const { currentChapter, chaptersList } = props
    if (!Number.isInteger(currentChapter) || currentChapter < 0) {
      return new Error('currentChapter must be a positive integer')
    }
    if (currentChapter > chaptersList.keys().length - 1) {
      return new Error('currentChapter cannot be greater than the total number of chapters')
    }
    return null
  },
}
Game.contextTypes = {
  config: PropTypes.object,
  chaptersList: PropTypes.func,
}
// A map-state-to-props for passing props to individual chapter components
const chapterMapper = (state, ownProps) => ({
  currentSection: state.bookmarks.present[ownProps.chapterId],
  inventory: state.inventory.present,
})

const mapStateToProps = (state) => ({
  currentChapter: state.bookmarks.present.length - 1,
})

export default connect(mapStateToProps)(Game)
