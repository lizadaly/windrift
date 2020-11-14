import Head from 'next/head'
import { Game } from '../core/components'
import { resetGame } from '../core/util'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { StoryConfig, Toc, TocItem } from '../core/types'
import { GetStaticProps } from 'next'

interface HomeProps {
  toc: Toc
  storyConfig: StoryConfig
}

export const getStaticProps: GetStaticProps = async () => {
  const chapterPath = path.join(process.cwd(), 'pages/chapters/story.yaml')
  const storyConfig = yaml.safeLoad(fs.readFileSync(chapterPath, "utf8")) as StoryConfig

  const toc: Toc = storyConfig["chapters"].map((item: TocItem) => (
    {
      filename: item["filename"],
      visible: item["visible"] || false,
      title: item["title"]
    }
  ))
  return {
    props: { toc, storyConfig }
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
        <Game {...props} />
      </main>
    </div>
  )
}
