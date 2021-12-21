import * as React from 'react'

import Grid from 'core/components/ui/layouts/grid'

import styles from 'public/stories/putney-mountain/styles/Index.module.scss'

const Index: React.FC = ({ children }) => {
    return (
        <Grid
            styles={styles}
            head={
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&family=EB+Garamond&family=Elsie&family=Roboto&&family=Roboto+Mono&display=block"
                    rel="stylesheet"
                />
            }>
            {children}
        </Grid>
    )
}

export default Index
