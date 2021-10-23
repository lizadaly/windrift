import * as React from 'react'

import Grid from 'core/components/ui/grid'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'

import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/material-oceanic'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('bash', bash)

import styles from 'public/stories/demo/styles/Index.module.scss'
import TableOfContents from './table-of-contents'

const Index: React.FC = ({ children }) => {
    return (
        <Grid
            styles={styles}
            head={
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&family=EB+Garamond&family=Elsie&display=optional"
                    rel="stylesheet"
                />
            }>
            <TableOfContents />
            {children}
        </Grid>
    )
}

export default Index
export { json, tsx, bash, prism, styles, SyntaxHighlighter }
