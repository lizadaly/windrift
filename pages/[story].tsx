import * as React from "react"

import { useRouter } from 'next/router'
import { Game, GameContainer } from '../core/components'
import { Config, Toc, TocItem } from '../core/types'
import { GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import reducers from '../core/reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import dynamic from 'next/dynamic'

export interface WindriftProps {
  toc: Toc
  configYaml: Config
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  env: any,
}

export const getStaticProps: GetStaticProps = async (context) => {

  const story = context.params.story as string
  const configPath = path.join(process.cwd(), `public/stories/${story}/story.yaml`)
  const configYaml = yaml.safeLoad(fs.readFileSync(configPath, "utf8"))

  const toc = configYaml["chapters"].map((item: TocItem) => (
    {
      filename: item["filename"],
      visible: item["visible"] || false,
      title: item["title"],
      bookmark: 0
    }
  ))
  const env = Object.keys(process.env).filter(key => key.startsWith("NEXT_PUBLIC")).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reduce((res: any = {}, key) => {
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
  const paths = fs.readdirSync(storyDirs, { withFileTypes: true }).filter((dir) =>
    dir.isDirectory()).map((dir) => `/${dir.name}`)
  return { paths, fallback: false }
}

export default function Home(props: WindriftProps): JSX.Element {
  const router = useRouter()
  const { story } = router.query
  const { toc, configYaml, env } = props
  const config = new Config(story as string, configYaml["title"],
    configYaml["pagination"], configYaml["enableUndo"], env)

  const persistConfig = {
    key: config.identifier,
    storage,
  }

  const persistedReducers = persistReducer(persistConfig, reducers)
  const store = createStore(persistedReducers, {
    config, toc: {
      past: [],
      present: toc,
      future: []
    }
  }, composeWithDevTools())
  const persistor = persistStore(store)

  const Index = dynamic(() => import(`../stories/${story}/index.tsx`))

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GameContainer>
          <Index>
            <Game story={story as string} />
          </Index>
        </GameContainer>
      </PersistGate>
    </Provider>
  )
}
