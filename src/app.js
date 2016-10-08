const React = require('react')
const ReactDOM = require('react-dom')
const Shim = require('es6-shim')

import { Provider, connect } from 'react-redux'
import { createStore, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { Counter } from './components/counter'
import { gameApp } from './reducers'
import config from './config.json'

// Dynamically load all JS in the 'chapters' directory as a Chapter object
var chaptersList = require.context('./chapters', true, /\.js$/)


window.lockHistory = false  // GLOBAL to set the history for the browser as locked; unlocked on next tick

class _Game extends React.Component {
    constructor(props) {
      super(props)
      this.chapters = []
      chaptersList.keys().forEach((filename, index) => {
        let chapter = chaptersList(filename).default
        // React requires this be uppercase, hooray
        let C = connect(chapterMapper)(chapter)
        this.chapters.push(<C chapterId={index}/>)
      })
    }
    render() {
      // Display all chapters up to the currentChapter
      return <div>
        <Counter/>
        {
          Array(this.props.currentChapter + 1).fill().map((_, i) => {
            return <div key={"chapter" + i} className={i === this.props.currentChapter ? 'current-chapter' : ''}>{this.chapters[i]}</div>
          })
        }
      </div>
    }
}
_Game.contextTypes = {
  store: React.PropTypes.object.isRequired
}

const chapterMapper = (state, ownProps) => {
  return {
    currentSection: state.bookmarks[ownProps.chapterId],
    inventory: state.inventory
  }
}

const mapStateToProps = (state) => {
  return {
    currentChapter: state.bookmarks.length - 1
  }
}

export const Game = connect(
  mapStateToProps
)(_Game)


const startGame = () => {
    var store = createStore(gameApp, undefined, autoRehydrate())
    var persister = persistStore(store, {keyPrefix: config.identifier})
    window.lockHistory = true
    window.addEventListener("popstate", function(e) {
      if (history.state.hasOwnProperty(config.identifier)) {
        // Use this state instead of reserializing
        if (history.state[config.identifier].counter != store.getState().counter) {
          persister.rehydrate(history.state[config.identifier])
          history.replaceState(history.state, "")
          window.lockHistory = true
        }
      }
    })
    ReactDOM.render(<Provider store={store}><Game/></Provider>, document.getElementById('article'))
}


if (document.readyState != 'loading') {
  startGame()
  var mode = localStorage.getItem("nightMode")
  document.getElementById('body').classList.toggle('nightmode', mode === 'true')
}
else {
  document.addEventListener('DOMContentLoaded', startGame)
}
