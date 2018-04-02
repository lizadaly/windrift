import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { combineReducers, createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import { persistStore, autoRehydrate } from 'redux-persist'
import { Counter } from './components/counter'
import gameReducers from './reducers'

require('es6-shim')

class Game extends React.Component {
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
    if (this.props.config.pagination === 'by-chapter') {
      renderChapter = <div key={`chapter${this.props.currentChapter}`} className="current-chapter">{this.chapters[this.props.currentChapter]}</div>
    } else {
      renderChapter = Array(this.props.currentChapter + 1).fill().map((ch, i) => (
        <div key={i} className={i === this.props.currentChapter ? 'current-chapter' : 'chapter'}>{this.chapters[i]}</div> // eslint-disable-line react/no-array-index-key
      ))
    }

    return (
      <div>
        <Counter identifier={this.props.config.identifier} />
        {
          renderChapter
        }
      </div>)
  }
}
Game.propTypes = {
  config: PropTypes.object,
  chaptersList: PropTypes.func,
  currentChapter: PropTypes.number,
}
Game.contextTypes = {
  config: PropTypes.object,
  chaptersList: PropTypes.func,
}

const chapterMapper = (state, ownProps) => ({
  currentSection: state.bookmarks.present[ownProps.chapterId],
  inventory: state.inventory.present,
})

const mapStateToProps = (state) => ({
  currentChapter: state.bookmarks.present.length - 1,
})

/* Jump to a point in time from the browser history, either onload or after a popstate event */
const jumpFromHistory = (store) => {
  if (window.history.state.hasOwnProperty(store.getState().config.identifier)) {
    const timeOffset = window.history.state[store.getState().config.identifier] - store.getState().counter.present
    store.dispatch(ActionCreators.jump(timeOffset))
  }
}

export default connect(mapStateToProps, {})(Game)

const renderGame = (store, game) => {
  ReactDOM.render(
    <Provider store={store}>{game}</Provider>,
    document.getElementById('article'),
    () => {
      // After render callbacks
    }
  )
}

export const startGame = (game, localReducers) => {
  const reducers = combineReducers(Object.assign(gameReducers, localReducers))
  const store = createStore(reducers, { config: game.props.config }, autoRehydrate())
  persistStore(
    store, { keyPrefix: game.props.config.identifier },
    () => renderGame(store, game)
  )

  // Jump to the current point in history after hydration if there's any state at all
  if (window.history.state) {
    jumpFromHistory(store)
  }

  if (game.props.config.enableUndo) {
    // If we received a browser forward/back, jump to the relevant point in history
    window.addEventListener('popstate', () => {
      jumpFromHistory(store)
    })
  }
}
