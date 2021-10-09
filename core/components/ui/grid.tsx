import * as React from 'react'

import Head from 'next/head'

import ResetButton from './reset-button'
import { StoryContext } from 'pages/[story]'

export type GridProps = {
    head?: React.ReactNode
    header?: React.ReactNode
    left?: React.ReactNode
    right?: React.ReactNode
    styles?: Record<string, string>
}
const Grid: React.FC<GridProps> = ({ children, head, header, left, right, styles }) => {
    const { config } = React.useContext(StoryContext)
    return (
        <>
            <Head>
                <title lang={config.language}>{config.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {head}
            </Head>
            <header className={styles.header} lang={config.language}>
                {header || (
                    <nav>
                        <div></div>
                        <h1>{config.title}</h1>
                        <div className={styles.controls}>
                            <ResetButton />
                        </div>
                    </nav>
                )}
            </header>
            <main className={styles.main} lang={config.language}>
                <nav className={styles.left}>{left}</nav>
                <article className={styles.story}>{children}</article>
                <nav className={styles.right}>{right}</nav>
            </main>
        </>
    )
}

export default Grid
