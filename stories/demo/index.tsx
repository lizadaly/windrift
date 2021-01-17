import Head from 'next/head'
import * as React from "react"
import { RootState } from '../../core/reducers'
import { useSelector } from 'react-redux'

import styles from '../../public/stories/demo/Index.module.scss'
import ResetButton from 'core/components/ui/reset-button'

const Index: React.FC = ({ children }) => {
    const config = useSelector((state: RootState) => state.config)

    return (
        <>
            <Head>
                <title>{config.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond&family=Elsie&display=swap');
                </style>
            </Head>

            <header className={styles.header}>
                <nav>
                    <h1>
                        {config.title}
                    </h1>
                    <div className={styles.controls}>
                        <ResetButton />
                    </div>
                </nav>
            </header>
            <main className={styles.main}>
                <nav className={styles.left}>

                </nav>
                <article className={styles.story}>
                    {children}
                </article>
                <nav className={styles.right}>

                </nav>
            </main>
        </>
    )
}

export default Index
