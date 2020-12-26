import * as React from "react"
import { RootState } from '../../core/reducers'
import { useSelector } from 'react-redux'

import { useChannel, useEvent } from "@harelpls/use-pusher"
import { resetGame } from '../../core/util'
import { useDispatch } from 'react-redux'
import { pickChoice, updateInventory } from "../../core/actions"

import styles from '../../public/stories/multiplayer/Content.module.scss'

import { Tag } from "../../core/types"


interface IndexProps {
    children: React.ReactNode
}
interface ApiChoice {
    tag: Tag
    choice: string
    player: string
}
const Content = ({ children }: IndexProps): JSX.Element => {
    const config = useSelector((state: RootState) => state.config)
    const multiplayer = useSelector((state: RootState) =>
        state.multiplayer)
    const { channelName } = multiplayer
    const currentPlayer = multiplayer.player

    const dispatch = useDispatch()
    const channel = useChannel(channelName)
    useEvent(channel, "choose", ({ tag, choice, player }: ApiChoice) => {
        // Dispatch events from other players
        const eventPlayer = parseInt(player)
        if (currentPlayer !== eventPlayer) {
            dispatch(updateInventory(tag, choice))
            dispatch(pickChoice(tag, [[choice]], 0, eventPlayer))
        }
    })

    return (
        <>

            <header className={styles.header}>
                <nav>
                    <h1>
                        {config.title}
                    </h1>
                    <div className={styles.channel}>
                        {channelName}
                        <br />
                        Player {currentPlayer}
                        { }
                    </div>
                    <div className={styles.controls}>

                        <button onClick={resetGame}>Reset</button>
                    </div>
                </nav>
            </header>
            <main className={styles.main} id="multiplayer-demo">
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
