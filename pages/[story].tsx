import * as React from 'react'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'

import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'
import dynamic from 'next/dynamic'

import reducers from 'core/reducers'
import { Game, GameContainer } from 'core/components'
import { Config, Toc, TocItem } from 'core/types'
import { getChapter } from 'core/util'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export interface WindriftProps {
    toc: Toc
    configYaml: Config
    env: any
}

export const getStaticProps: GetStaticProps = async (context) => {
    const story = context.params.story as string
    const configPath = path.join(process.cwd(), `public/stories/${story}/story.yaml`)
    const configYaml = yaml.safeLoad(fs.readFileSync(configPath, 'utf8')) as Record<string, any>

    const toc = configYaml.chapters.map((item: TocItem) => ({
        filename: item.filename,
        visible: item.visible || false,
        title: item.title,
        bookmark: 0
    }))
    if (configYaml.players && configYaml.players.length > 1) {
        initMultiplayerDb(story, configYaml)
    }

    // TODO decide whether this is needed without pusher
    const env = Object.keys(process.env)
        .filter((key) => key.startsWith('NEXT_PUBLIC'))
        .reduce((res: any = {}, key) => {
            res[key] = process.env[key]
            return res
        }, {})
    return {
        props: {
            toc,
            configYaml,
            env
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const storyDirs = path.join(process.cwd(), 'public/stories')
    const paths = fs
        .readdirSync(storyDirs, { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .map((dir) => `/${dir.name}`)
    return { paths, fallback: false }
}

export const StoryContext = React.createContext(undefined)

async function initMultiplayerDb(story: string, configYaml: Record<string, any>) {
    await prisma.story.upsert({
        where: {
            id: story
        },
        update: {
            title: configYaml.title
        },
        create: {
            id: story,
            title: configYaml.title
        }
    })

    Promise.all(
        configYaml.chapters.map((item: TocItem) =>
            prisma.chapter.upsert({
                where: {
                    filename_storyId: { filename: item.filename, storyId: story }
                },
                update: {
                    title: item.title,
                    filename: item.filename
                },
                create: {
                    filename: item.filename,
                    title: item.title,
                    storyId: story
                }
            })
        )
    )

    // Promise.all(
    //     configYaml.players.map((item) =>
    //         prisma.player.upsert({
    //             where: {
    //                 name_instanceId: { name: item.name, instanceId: instance.id }
    //             },
    //             update: {
    //                 name: item.name
    //             },
    //             create: {
    //                 name: item.name,
    //                 instanceId: instance.id
    //             }
    //         })
    //     )
    // )
}

export default function Home(props: WindriftProps): JSX.Element {
    const router = useRouter()
    const { story } = router.query
    const { toc, configYaml, env } = props

    const config = new Config(
        story as string,
        configYaml.title,
        configYaml.pagination,
        configYaml.enableUndo,
        configYaml.players,
        env
    )

    const persistConfig = {
        key: config.identifier,
        storage: storage
    }

    // In a single player game, set the visible chapter as the start
    if (config.players && config.players.length === 1) {
        const start = getChapter(toc, config.players[0].start)
        start.visible = true
    }

    const persistedReducers = persistReducer(persistConfig, reducers)
    const store = createStore(
        persistedReducers,
        {
            config,
            toc: {
                past: [],
                present: toc,
                future: []
            }
        },
        composeWithDevTools()
    )
    const persistor = persistStore(store)

    const Index = dynamic(() => import(`../stories/${story}/index`))
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <GameContainer>
                    <StoryContext.Provider value={persistor}>
                        <Index>
                            <Game story={story as string} />
                        </Index>
                    </StoryContext.Provider>
                </GameContainer>
            </PersistGate>
        </Provider>
    )
}
