const React = require('react')
const ReactDOM = require('react-dom')
const Shim = require('es6-shim')

import { Provider, connect } from 'react-redux'
import { createStore, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { showNextSection } from "./actions"
import { Counter } from './components/counter'
import gameApp from './reducers'

window.lockHistory = false  // GLOBAL to set the history for the browser as locked; unlocked on next tick

class _Game extends React.Component {
    constructor(props) {
      super(props)
      // Dynamically load all JS in the 'chapters' directory as a Chapter object
      this.chapters = []
      /*
      props.chaptersList.keys().forEach((filename, index) => {
        let chapter = props.chaptersList(filename).default
        // React requires this be uppercase, hooray
        let C = connect(chapterMapper)(chapter)
        this.chapters.push(<C chapterId={index}/>)
      })
      */
    }
    componentWillMount() {
      console.log("showing")
      this.props.showNextSection()
    }
    render() {
      // Display all chapters up to the currentChapter
      return <div>
        {
          Array(this.props.currentChapter + 1).fill().map((_, i) => {
            return <div key={"chapter" + i} className={i === this.props.currentChapter ? 'current-chapter' : 'chapter'}>{this.chapters[i]}</div>
          })
        }
      </div>
    }
}
_Game.contextTypes = {
  store: React.PropTypes.object,
  config: React.PropTypes.object,
  chapterList: React.PropTypes.array
}

const chapterMapper = (state, ownProps) => {
  return {
    currentSection: state.bookmarks.present[ownProps.chapterId],
    inventory: state.inventory
  }
}

const mapStateToProps = (state) => {
  return {
    currentChapter: state.bookmarks.present.length - 1
  }
}

export const Game = connect(
  mapStateToProps, {
    showNextSection: showNextSection
  }
)(_Game)


export const startGame = (game) => {
//    var store = createStore(gameApp, undefined, autoRehydrate())
    var store = createStore(gameApp, undefined)
/*
    var persister = persistStore(store, {keyPrefix: game.props.config.identifier})
    window.lockHistory = true
    window.addEventListener("popstate", function(e) {
      if (history.state.hasOwnProperty(game.props.config.identifier)) {
        // Use this state instead of reserializing
        if (history.state[game.props.config.identifier].counter != store.getState().counter) {
          persister.rehydrate(history.state[game.props.config.identifier])
          history.replaceState(history.state, "")
          window.lockHistory = true
        }
      }
    })
*/
    ReactDOM.render(<Provider store={store}>{game}</Provider>, document.getElementById('article'))
}

document.addEventListener('DOMContentLoaded', function () {
  var mode = localStorage.getItem("nightMode")
  document.getElementById('body').classList.toggle('nightmode', mode === 'true')
})
