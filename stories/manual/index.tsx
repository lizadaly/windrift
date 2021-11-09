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

const Index: React.FC = ({ children }) => {
    return (
        <Grid
            styles={styles}
            head={
                <>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&family=EB+Garamond&family=Elsie&display=block"
                        rel="stylesheet"
                    />
                    <link rel="stylesheet" href="/stories/manual/styles/traditional.css" />
                </>
            }>
            <TableOfContents />
            {children}
        </Grid>
    )
}

export default Index
export { json, tsx, bash, prism, styles, SyntaxHighlighter }
