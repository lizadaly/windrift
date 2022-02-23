import { GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'

import styles from 'public/stories/manual/styles/Index.module.scss'

interface StoryProps {
    paths: string[]
}
export const getStaticProps: GetStaticProps = async () => {
    const storyDirs = path.join(process.cwd(), 'public/stories')
    const paths = fs
        .readdirSync(storyDirs, { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .map((dir) => dir.name)
        .flat()
    return {
        props: {
            paths
        }
    }
}

function Index({ paths }: StoryProps): JSX.Element {
    return (
        <>
            <Head>
                <title lang="en">Welcome to Windrift</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
                <link rel="manifest" href="/images/site.webmanifest" />
                <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#5bbad5" />
                <link rel="shortcut icon" href="/images/favicon.ico" />
                <meta name="msapplication-TileColor" content="#2b5797" />
                <meta name="msapplication-config" content="/images/browserconfig.xml" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <header className={styles.header}>
                <nav>
                    <div></div>
                    <h1>Welcome to Windrift!</h1>
                    <div> </div>
                </nav>
            </header>
            <main className={styles.main} lang="en">
                <nav className={styles.left}></nav>
                <article className={styles.story}>
                    <p>
                        This is the default index page for a{' '}
                        <a href="https://github.com/lizadaly/windrift">Windrift</a> installation.
                    </p>
                    <p>
                        If you're using the recommended static export process, each story will live
                        in its own folder and the public will typically not see this page. If you
                        are deploying Windrift stories using Vercel, or with server-side components,
                        you'll probably want to customize this.
                    </p>
                    <h2>Getting started with Windrift</h2>
                    <p>
                        Familiarize yourself with the{' '}
                        <a href="https://windrift.app/manual">online manual</a>! A copy of this
                        manual as an active Windrift story is installed as part of this repository.
                    </p>
                    <h3>In this local repository</h3>
                    <p>
                        The following stories are currently installed as part of this Windrift
                        deployment:
                    </p>
                    <ul>
                        {paths.map((s) => (
                            <li key={s}>
                                <a href={`${s}`}>{s}</a>
                            </li>
                        ))}
                    </ul>
                </article>
                <nav className={styles.right}></nav>
            </main>
        </>
    )
}

export default Index
