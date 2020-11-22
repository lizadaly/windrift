import Head from 'next/head'
import { useRouter } from 'next/router'
import { Game, GameContainer } from '../core/components'
import { resetGame } from '../core/util'
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

export interface WindriftProps {
  toc: Toc
  configYaml: Config
}

export const getStaticProps: GetStaticProps = async (context) => {

  const story = context.params.story as string
  const configPath = path.join(process.cwd(), `stories/${story}/story.yaml`)
  const configYaml = yaml.safeLoad(fs.readFileSync(configPath, "utf8"))

  const toc = configYaml["chapters"].map((item: TocItem) => (
    {
      filename: item["filename"],
      visible: item["visible"] || false,
      title: item["title"],
      bookmark: 0
    }
  ))
  return {
    props: {
      toc,
      configYaml
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const storyDirs = path.join(process.cwd(), 'stories')
  const paths = fs.readdirSync(storyDirs).map((dir) => `/${dir}`)
  return { paths, fallback: false }
}

export default function Home(props: WindriftProps): JSX.Element {
  const router = useRouter()
  const { story } = router.query
  const { toc, configYaml } = props
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
            <GameContainer >
              <Game story={story as string} />
            </GameContainer>
          </PersistGate>
        </Provider>
      </main>
    </div>
  )
}
