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
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&family=EB+Garamond&family=Elsie&family=Roboto&&family=Roboto+Mono&display=block"
                    rel="stylesheet"
                />
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
                        <a href="windrift.app/manual">online manual</a>! A copy of this manual as an
                        active Windrift story is installed as part of this repository.
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
