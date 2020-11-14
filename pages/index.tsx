import Head from 'next/head'
import { Game } from '../core/components'
import { resetGame } from '../core/util'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

import { GetStaticProps } from 'next'

interface HomeProps {
  toc: Toc
}

interface TocItem {
  filename: string
  visible: boolean
  title: string
}

type Toc = Array<TocItem>

export const getStaticProps: GetStaticProps = async () => {
  const chapterPath = path.join(process.cwd(), 'pages/chapters/toc.yaml')
  const tocYaml = yaml.safeLoad(fs.readFileSync(chapterPath, "utf8"))

  const toc: Toc = tocYaml["chapters"].map((item: TocItem) => (
    {
      filename: item["filename"],
      visible: item["visible"] || false,
      title: item["title"]
    }
  ))
  return {
    props: { toc }
  }
}


export default function Home(props: HomeProps): JSX.Element {
  console.log(props.toc)
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
        <Game />
      </main>
    </div>
  )
}
