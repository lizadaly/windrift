import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

import gameReducers from './reducers'
import { GameContainer } from './components'

require('es6-shim')

const renderGame = (game, store, persistor) => {
  ReactDOM.render(

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GameContainer>
          {game}
        </GameContainer>
      </PersistGate>
    </Provider>
    ,
    document.getElementById('article')
  )
}

export default (game, localReducers = {}) => {
  const persistConfig = {
    key: game.props.config.identifier,
    storage,
  }
  const reducers = persistCombineReducers(persistConfig, Object.assign(gameReducers, localReducers))
  const store = createStore(reducers, { config: game.props.config })
  const persistor = persistStore(store)
  renderGame(game, store, persistor)
}
