import * as React from 'react'

import Grid from 'core/components/ui/layouts/grid'

import styles from 'public/stories/unit-tests/styles/Index.module.scss'

const Index: React.FC = ({ children }) => {
    return (
        <Grid styles={styles} head={<link></link>}>
            {children}
        </Grid>
    )
}

export default Index
