import * as React from 'react'

import Grid from 'core/components/ui/layouts/grid'

import styles from 'public/stories/cease-and-desist/styles/Index.module.scss'

const Index: React.FC = ({ children }) => {
    return <Grid styles={styles}>{children}</Grid>
}

export default Index
