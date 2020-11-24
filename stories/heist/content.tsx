import Head from 'next/head'
import * as React from "react"
import { RootState } from '../../core/reducers'
import { useSelector } from 'react-redux'
import { GetStaticProps, GetStaticPaths } from 'next'

import { PusherProvider, useChannel } from "@harelpls/use-pusher"
import { resetGame } from '../../core/util'

import styles from './Content.module.scss'
import { useState } from 'react'


interface IndexProps {
    children: React.ReactNode
}
const Content = ({ children }: IndexProps): JSX.Element => {
    const config = useSelector((state: RootState) => state.config)


    const channel = useChannel("test");

    return (
        <>

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

export default Content
