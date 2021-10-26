import * as React from 'react'

import Minimal from 'core/components/ui/layouts/minimal'

import styles from 'public/stories/minimal/styles/Index.module.scss'
import Head from 'next/head'

const Index: React.FC = ({ children }) => {
    return (
        <Minimal styles={styles}>
            <Head>
                <title>A minimal example</title>
            </Head>
            {children}
        </Minimal>
    )
}

export default Index
