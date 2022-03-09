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
import dynamic from 'next/dynamic'
import { Provider } from 'react-redux'

import reducers from 'core/features'
import { Config, Toc } from 'core/types'
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
    const isMultiplayer = config.players.length > 1

    const storeReducer = isMultiplayer ? reducers : persistReducer(persistConfig, reducers)
    const store = configureStore({
        reducer: storeReducer,
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

    const Index = dynamic(() => import(`../../stories/${config.identifier}/index`))

    if (isMultiplayer) {
        return (
            <Provider store={store}>
                <StoryContainer config={config}>
                    <StoryContext.Provider value={{ config }}>
                        <Index>
                            <Story story={config.identifier} />
                        </Index>
                    </StoryContext.Provider>
                </StoryContainer>
            </Provider>
        )
    } else {
        const persistor = persistStore(store)
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
}
export default StoreContainer
