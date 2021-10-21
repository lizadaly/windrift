import * as React from 'react'

import Grid from 'core/components/ui/grid'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'

import prism from 'react-syntax-highlighter/dist/esm/styles/prism/material-oceanic'

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
                <style>
                    @import
                    url('https://fonts.googleapis.com/css2?family=EB+Garamond&family=Elsie&display=swap');
                </style>
            }>
            <TableOfContents />
            {children}
        </Grid>
    )
}

export default Index
export { json, tsx, bash, prism, styles, SyntaxHighlighter }
