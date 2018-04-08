import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


export class Game extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    chaptersList: (props) => {
      const { chaptersList } = props
      if (!('keys' in chaptersList)) {
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
  static contextTypes = {
    config: PropTypes.object,
    chaptersList: PropTypes.func,
  }

  constructor(props) {
    super(props)

    // Dynamically load all JS in the 'chapters' directory as a Chapter object
    this.chapters = this.initializeChapters(props.chaptersList)
  }

  // Jump to the top of the browser if the pagination is by-chapter and there was a props change indicating a chapter move
  componentDidUpdate(prevProps) {
    if (this.props.config.pagination === 'by-chapter') {
      if (prevProps.currentChapter !== this.props.currentChapter) {
        window.scroll(0, 0)
      }
    }
  }

  /* If by-chapter, show only the current chapter. Otherwise show all chapters up to that one. */
  getVisibleChapters() {
    const { currentChapter } = this.props
    const { pagination } = this.props.config
    return pagination === 'by-chapter'
      ? this.chapters.slice(currentChapter, currentChapter + 1)
      : this.chapters.slice(0, currentChapter + 1)
  }

  /* Given a function that returns a list of chapter objects from the filesystem, return an array of
     initialized chapters connected to the redux store */
  initializeChapters(chaptersList) {
    const chapters = []
    chaptersList.keys().sort().forEach((filename, index) => {
      const chapter = chaptersList(filename).default
      // React requires this be uppercase, hooray
      const C = connect(chapterMapper)(chapter)
      chapters.push(<C chapterId={index} />)
    })
    return chapters
  }

  render() {
    // Display all chapters up to the currentChapter
    const { currentChapter } = this.props
    const visible = this.getVisibleChapters()

    return (
      <div className="game">
        {
          visible.map((chapter) => (
            <div
              key={chapter.props.chapterId}
              className={chapter.props.chapterId === currentChapter ? 'current-chapter' : 'chapter'}
            >
              {chapter}
            </div>
          ))
        }
      </div>)
  }
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
