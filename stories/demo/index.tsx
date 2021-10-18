import * as React from 'react'

import Grid from 'core/components/ui/grid'

import styles from 'public/stories/demo/styles/Index.module.scss'
import Nav from './nav'

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
            <Nav />
            {children}
        </Grid>
    )
}

export default Index
