import * as React from 'react'

import Head from 'next/head'

import ResetButton from 'core/components/ui/reset-button'
import { StoryContext } from 'core/containers/store-container'

export type GridProps = {
    /**
     * Content to be included inside the NextJS {@link Head} (@see {@link https://nextjs.org/docs/api-reference/next/head}).
     * Defaults to the HTML title and viewport specification. */
    head?: React.ReactNode

    /** Optional content for the top nav header; defaults to a top-level nav with the story title and {@link ResetButton}. */
    header?: React.ReactNode

    /** Optional content for the left-hand body column. @default "" */
    left?: React.ReactNode

    /** Optional content for the right-hand body column. @default "" */
    right?: React.ReactNode

    /** A style object as imported from a CSS or SCSS file
     *
     * @example
     * import styles from 'public/stories/manual/styles/Index.module.scss'
     */
    styles?: Record<string, string>
}

/**
 * The default HTML layout including a three-column body grid.
 * Will automatically pull in the {@link Config} from {@link StoryContext} to provide
 * access to story-level details.
 *
 * @see stories/manual/index for an example implementation
 *
 */
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
