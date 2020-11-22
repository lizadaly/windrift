import Head from 'next/head'
import * as React from "react"
import { RootState } from '../../core/reducers'
import { useSelector } from 'react-redux'

import styles from './Index.module.scss'

const Index: React.FC = ({ children }): JSX.Element => {
    const config = useSelector((state: RootState) => state.config)

    return (
        <>
            <Head>
                <title>{config.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={styles.container}>
                {children}
            </div>
        </>
    )
}

export default Index
