import Head from 'next/head'
import { Game, GameContainer } from '../core/components'
import { resetGame } from '../core/util'
import { Config, Toc, TocItem } from '../core/types'
import { GetStaticProps } from 'next'
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

export interface WindriftProps {
  stories: {
    name: string,
    settings: {
      toc: Toc
      configYaml: Config
    }
  }
}

export const getStaticProps: GetStaticProps = async () => {

  const storyDirs = path.join(process.cwd(), 'stories')
  const stories = fs.readdirSync(storyDirs).map((dir) => {
    const chapterPath = path.join(process.cwd(), `stories/${dir}/story.yaml`)
    const configYaml = yaml.safeLoad(fs.readFileSync(chapterPath, "utf8"))

    const toc = configYaml["chapters"].map((item: TocItem) => (
      {
        filename: item["filename"],
        visible: item["visible"] || false,
        title: item["title"],
        bookmark: 0
      }
    ))
    return {
      name: dir,
      settings: {
        toc,
        configYaml
      }
    }
  })
  return {
    props: {
      stories
    }
  }
}

export default function Home(props: WindriftProps): JSX.Element {
  const { stories } = props
  const { toc, configYaml } = stories[0].settings
  const config = new Config(configYaml["title"],
    configYaml["pagination"], configYaml["enableUndo"])

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
  return (
    <div className="container">
      <Head>
        <title>Windrift</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="top-bar-right">
          <button onClick={resetGame}>Restart</button>
        </div>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <GameContainer>
              <Game />
            </GameContainer>
          </PersistGate>
        </Provider>
      </main>
    </div>
  )
}
