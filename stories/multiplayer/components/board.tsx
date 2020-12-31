import * as React from "react"
import styles from 'public/stories/multiplayer/styles/Game.module.scss'
import { DefaultList } from 'core/components/widgets'
import { C, R } from 'core/components'
import { ChoicesProps } from 'core/components/choices'
interface BoardProps {
    char: string
    myTurn: boolean
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Noop = (_: ChoicesProps) => null

const Board = ({ char, myTurn }: BoardProps): JSX.Element => {

    const Play = myTurn ? C : Noop
    return <>

        <div className={styles.board}>

            <div className={styles.col}>

                <Play choices={[[char, '']]} tag="1x1" widget={DefaultList} />
                <R tag="1x1" to={{ "x": "X", "o": "O" }} />

            </div>
            <div className={styles.col}>

                <Play choices={[[char, '']]} tag="1x2" widget={DefaultList} />
                <R tag="1x2" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                <Play choices={[[char, '']]} tag="1x3" widget={DefaultList} />
                <R tag="1x3" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                <Play choices={[[char, '']]} tag="2x1" widget={DefaultList} />
                <R tag="2x1" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                <Play choices={[[char, '']]} tag="2x2" widget={DefaultList} />
                <R tag="2x2" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                <Play choices={[[char, '']]} tag="2x3" widget={DefaultList} />
                <R tag="2x3" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                <Play choices={[[char, '']]} tag="3x1" widget={DefaultList} />
                <R tag="3x1" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                <Play choices={[[char, '']]} tag="3x2" widget={DefaultList} />
                <R tag="3x2" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                <Play choices={[[char, '']]} tag="3x3" widget={DefaultList} />
                <R tag="3x3" to={{ "x": "X", "o": "O" }} />
            </div>
        </div>
    </>
}

export default Board
