/**
 * The entry-point for all story-level requests, e.g.
 * https://windrift.app/<story-identifier>
 *
 * Story authors should not need to modify this file.
 *
 * @todo In a future update this will support adding the chapter filename to the URL
 */

import * as React from 'react'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
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

import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'
import dynamic from 'next/dynamic'

import reducers from 'core/features'
import { Story, StoryContainer } from 'core/components'
import { Config, Toc, TocItem } from 'core/types'
import { getChapter } from 'core/util'

export interface WindriftProps {
    toc: Toc
    configYaml: Config
}

function getConfigYaml(story: string) {
    const configPath = path.join(process.cwd(), `public/stories/${story}/story.yaml`)
    const configYaml = yaml.safeLoad(fs.readFileSync(configPath, 'utf8')) as Record<string, any>
    return configYaml
}

export const getStaticProps: GetStaticProps = async (context) => {
    const story = context.params.story as string
    const configYaml = getConfigYaml(story)
    const toc = configYaml.chapters.map((item: TocItem) => ({
        filename: item.filename,
        visible: item.visible || false,
        title: item.title,
        bookmark: 0
    }))
    console.log(configYaml)

    return {
        props: {
            toc,
            configYaml
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const storyDirs = path.join(process.cwd(), 'public/stories')
    const paths = fs
        .readdirSync(storyDirs, { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .map((dir) => {
            return [
                {
                    params: {
                        story: dir.name,
                        chapter: null // TODO extend to pre-render all chapter paths
                    }
                }
            ]
        })
        .flat()
    return { paths, fallback: false }
}

type ContextProps = {
    persistor: Persistor
    config: Config
}
export const StoryContext = React.createContext<Partial<ContextProps>>({})

export default function Start(props: WindriftProps): JSX.Element {
    const router = useRouter()
    const { story, chapter } = router.query
    const { toc, configYaml } = props
    const config = new Config(
        story as string,
        configYaml.title,
        configYaml.enableUndo,
        configYaml.players,
        configYaml.language,
        configYaml.extra
    )

    const persistConfig = {
        key: config.identifier,
        storage: storage,
        blacklist: ['config']
    }
    if (chapter) {
        const chapters = Object.values(toc)
        chapters.filter((i) => i.visible).forEach((i) => (i.visible = false))
        getChapter(toc, chapter[0]).visible = true
    }
    // In a single player story, set the visible chapter as the start
    else if (config.players && config.players.length === 1) {
        getChapter(toc, config.players[0].start).visible = true
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
        }
    })
    const persistor = persistStore(store)

    const Index = dynamic(() => import(`../../stories/${story}/index`))
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <StoryContainer config={config}>
                    <StoryContext.Provider value={{ persistor, config }}>
                        <Index>
                            <Story story={story as string} />
                        </Index>
                    </StoryContext.Provider>
                </StoryContainer>
            </PersistGate>
        </Provider>
    )
}
