import Head from 'next/head'
import { List } from '../core/components'
import { resetGame } from '../core/util'

export default function Home() {
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
        <List expansions={["foo", "bar"]} tag="test" />
      </main>
    </div>
  )
}
