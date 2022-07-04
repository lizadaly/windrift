import * as React from 'react'

import Grid from 'core/components/ui/layouts/grid'

import styles from 'public/stories/stone-harbor/styles/Index.module.scss'

type Props = {
    children: React.ReactNode
}
const Index = ({ children }: Props): JSX.Element => {
    return <Grid styles={styles}>{children}</Grid>
}

export default Index
