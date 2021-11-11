import * as React from 'react'

import Grid from 'core/components/ui/layouts/grid'

import styles from 'public/stories/playground/styles/Index.module.scss'

const Index: React.FC = ({ children }) => {
    return (
        <Grid
            styles={styles}
            head={
                <link
                    href="https://fonts.googleapis.com/css2?family=Smythe&family=Orbitron&family=Noto+Sans+Cuneiform&family=Macondo+Swash+Caps&display=swap"
                    rel="stylesheet"
                />
            }>
            {children}
        </Grid>
    )
}

export default Index
