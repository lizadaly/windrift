import type { AppProps } from 'next/app'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import reducers from '../core/reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

function Windrift({ Component, pageProps }: AppProps) {
    const persistConfig = {
        key: 'key',
        storage,
    }
    //const persistedReducers = persistCombineReducers(persistConfig, reducers)
    const store = createStore(reducers, composeWithDevTools());

    const persistor = persistStore(store)
    return <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Component {...pageProps} />
        </PersistGate>
    </Provider>

}

export default Windrift
