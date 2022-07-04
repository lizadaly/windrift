import * as React from 'react'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/material-oceanic'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('css', css)

import Grid from 'core/components/ui/layouts/grid'

import styles from 'public/stories/manual/styles/Index.module.scss'
import TableOfContents from './table-of-contents'
import { Nav } from 'core/components'
import { NavProps } from 'core/components/nav'
import { ReactFCC } from 'core/types'

const Index: ReactFCC = ({ children }) => {
    return (
        <Grid
            styles={styles}
            head={
                <>
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/images/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/images/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/images/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/images/site.webmanifest" />
                    <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#5bbad5" />
                    <link rel="shortcut icon" href="/images/favicon.ico" />
                    <meta name="msapplication-TileColor" content="#2b5797" />
                    <meta name="msapplication-config" content="/images/browserconfig.xml" />
                    <meta name="theme-color" content="#ffffff" />
                </>
            }>
            <TableOfContents />
            {children}
        </Grid>
    )
}

export const FooterNav = ({ text, next }: NavProps): JSX.Element => (
    <Nav text={text} next={next} className={styles.nav} />
)

export default Index
export { json, tsx, bash, prism, styles, SyntaxHighlighter }
