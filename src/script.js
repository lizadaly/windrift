const React = require('react')
const ReactDOM = require('react-dom')
const Shim = require('es6-shim')

import { Provider, connect } from 'react-redux'
import { createStore, compose } from 'redux'
import { gameApp } from './reducers'
import { persistStore, autoRehydrate } from 'redux-persist'

import { Counter } from './components/counter'
import { setStateBoolean } from "./actions"
import { GameUtils } from "./util"

import { Introduction } from './chapters'

// Call the polyfill
GameUtils()

window.lockHistory = false  // GLOBAL to set the history for the browser as locked; unlocked on next tick

class _Game extends React.Component {
    constructor(props) {
      super(props)
      this.chapters = [
        <Introduction chapterId="0"/>,
      ]
    }
    render() {
      // Return all chapters up to the currentChapter
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
};

const mapStateToProps = (state) => {
  return {
    currentChapter: state.bookmarks.size - 1
  }
}

export const Game = connect(
  mapStateToProps
)(_Game)


const startGame = () => {
    var store = createStore(gameApp, undefined, autoRehydrate())
    var persister = persistStore(store)
    window.lockHistory = true
    window.addEventListener("popstate", function(e) {
      if (history.state) {
        // Use this state instead of reserializing
        if (history.state.counter != store.getState().counter) {
          persister.rehydrate(history.state)
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
