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
  toc: Toc
  configYaml: Config
}

export const getStaticProps: GetStaticProps = async () => {
  const chapterPath = path.join(process.cwd(), 'story.yaml')
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
    props: { toc, configYaml: configYaml }
  }
}

export default function Home(props: WindriftProps): JSX.Element {
  const { configYaml, toc } = props
  const config = new Config(configYaml["title"],
    configYaml["pagination"], configYaml["enableUndo"])

  const persistConfig = {
    key: config.identifier,
    storage,
  }

  const persistedReducers = persistReducer(persistConfig, reducers)
  const store = createStore(persistedReducers, { config, toc }, composeWithDevTools())
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
              <Game chapterList={Object.values(toc).map(c => c.filename)} />
            </GameContainer>
          </PersistGate>
        </Provider>
      </main>
    </div>
  )
}
