import * as React from 'react'

import Grid from 'core/components/ui/layouts/grid'

import styles from 'public/stories/unit-tests/styles/Index.module.scss'
import { PageType } from 'core/types'

const Index: PageType = ({ children }) => {
    return (
        <Grid styles={styles} head={<link></link>}>
            {children}
        </Grid>
    )
}

export default Index
