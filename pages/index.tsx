import Head from 'next/head'
import { List } from '../core/components'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Windrift</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        Hello world!
        <List expansions={["foo", "bar"]} tag="test" />
      </main>
    </div>
  )
}
