import * as React from 'react'

import Grid from 'core/components/ui/grid'

import styles from 'public/stories/stone-harbor/styles/Index.module.scss'

const Index: React.FC = ({ children }) => {
    return (
        <Grid styles={styles} head={<style></style>}>
            {children}
        </Grid>
    )
}

export default Index
