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
import dynamic, { DynamicOptions } from 'next/dynamic'
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

function initStore(config: Config, toc: Toc) {
    const persistConfig = {
        key: config.identifier,
        storage: storage,
        blacklist: ['config']
    }
    const persistedReducers = persistReducer(persistConfig, reducers)

    return configureStore({
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
}

const StoreContainer = ({ config, toc }: StoreProps): JSX.Element => {
    const store = initStore(config, toc)
    const persistor = persistStore(store)

    const Index = dynamic(
        import(`../../stories/${config.identifier}/index`) as DynamicOptions<
            Record<string, unknown>
        >,
        {}
    )

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

export type Store = ReturnType<typeof initStore>
export type AppDispatch = Store['dispatch']
export type RootState = ReturnType<Store['getState']>
