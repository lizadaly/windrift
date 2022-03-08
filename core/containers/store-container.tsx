import * as React from 'react'

import {
    persistStore,
    persistReducer,
    Persistor,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'

import reducers from 'core/features'
import { Config, Toc } from 'core/types'
import dynamic from 'next/dynamic'
import { Provider } from 'react-redux'
import { Story } from 'core/components'
import StoryContainer from 'core/containers/story-container'

export interface StoreProps {
    config: Config
    toc: Toc
}
export const StoryContext = React.createContext<Partial<ContextProps>>({})

type ContextProps = {
    persistor: Persistor
    config: Config
}

const StoreContainer = ({ config, toc }: StoreProps): JSX.Element => {
    const persistConfig = {
        key: config.identifier,
        storage: storage,
        blacklist: ['config']
    }
    const persistedReducers = persistReducer(persistConfig, reducers)
    const store = configureStore({
        reducer: persistedReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                },
                thunk: {
                    extraArgument: { config }
                }
            }),
        preloadedState: {
            navigation: {
                past: [],
                present: { toc },
                future: []
            },
            choices: {
                past: [],
                present: {},
                future: []
            }
        },
        devTools: true
    })
    const persistor = persistStore(store)

    const Index = dynamic(() => import(`../../stories/${config.identifier}/index`))

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <StoryContainer config={config}>
                    <StoryContext.Provider value={{ persistor, config }}>
                        <Index>
                            <Story story={config.identifier} />
                        </Index>
                    </StoryContext.Provider>
                </StoryContainer>
            </PersistGate>
        </Provider>
    )
}
export default StoreContainer
