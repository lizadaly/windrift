import * as React from 'react'

import Grid from 'core/components/ui/layouts/grid'

import styles from 'public/stories/stone-harbor/styles/Index.module.scss'

const Index: React.FC = ({ children }) => {
    return (
        <Grid
            styles={styles}
            head={
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=STIX+Two+Math&family=Raleway&display=block"
                />
            }>
            {children}
        </Grid>
    )
}

export default Index
