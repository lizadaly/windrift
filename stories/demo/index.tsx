import Head from 'next/head'
import * as React from "react"
import { RootState } from '../../core/reducers'
import { useSelector } from 'react-redux'

import { resetGame } from '../../core/util'

import styles from './Index.module.scss'

const Index: React.FC = ({ children }): JSX.Element => {
    const config = useSelector((state: RootState) => state.config)

    return (
        <>
            <Head>
                <title>{config.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <header className={styles.header}>
                <nav>
                    <h1>
                        {config.title}
                    </h1>
                    <div className={styles.controls}>
                        <button onClick={resetGame}>Reset</button>
                    </div>
                </nav>
            </header>
            <main className={styles.main}>
                <nav className={styles.left}>

                </nav>
                <article className={styles.article}>
                    {children}
                </article>
                <nav className={styles.right}>

                </nav>
            </main>
        </>
    )
}

export default Index
