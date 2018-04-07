import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import { persistStore, persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

import gameReducers from './reducers'

require('es6-shim')


/* Jump to a point in time from the browser history, either onload or after a popstate event */
const jumpFromHistory = (store) => {
  if (window.history.state.hasOwnProperty(store.getState().config.identifier)) {
    const timeOffset = window.history.state[store.getState().config.identifier] - store.getState().counter.present
    store.dispatch(ActionCreators.jump(timeOffset))
  }
}


const renderGame = (game, store, persistor) => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div>
          <CheckHistory game={game} store={store} />
          {game}
        </div>
      </PersistGate>
    </Provider>
    ,
    document.getElementById('article')
  )
}

const CheckHistory = (game, store) => {
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
  return null
}

export const startGame = (game, localReducers = {}) => {
  const persistConfig = {
    key: game.props.config.identifier,
    storage,
    debug: true,
  }
  const reducers = persistCombineReducers(persistConfig, Object.assign(gameReducers, localReducers))
  const store = createStore(reducers, { config: game.props.config })
  const persistor = persistStore(store)
  renderGame(game, store, persistor)
}
