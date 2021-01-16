import * as React from "react"
import styles from 'public/stories/tic-tac-toe/styles/Game.module.scss'
import { DefaultList } from 'core/components/widgets'
import { C, R } from 'core/components'

interface BoardProps {
    char: string
    myTurn: boolean
}

const Board = ({ char, myTurn }: BoardProps): JSX.Element => {

    return <>

        <div className={styles.board}>

            <div className={styles.col}>

                {myTurn && <C choices={[[char, '']]} tag="1x1" widget={DefaultList} />}
                <R tag="1x1" to={{ "x": "X", "o": "O" }} />

            </div>
            <div className={styles.col}>

                {myTurn && <C choices={[[char, '']]} tag="1x2" widget={DefaultList} />}
                <R tag="1x2" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                {myTurn && <C choices={[[char, '']]} tag="1x3" widget={DefaultList} />}
                <R tag="1x3" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                {myTurn && <C choices={[[char, '']]} tag="2x1" widget={DefaultList} />}
                <R tag="2x1" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                {myTurn && <C choices={[[char, '']]} tag="2x2" widget={DefaultList} />}
                <R tag="2x2" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                {myTurn && <C choices={[[char, '']]} tag="2x3" widget={DefaultList} />}
                <R tag="2x3" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                {myTurn && <C choices={[[char, '']]} tag="3x1" widget={DefaultList} />}
                <R tag="3x1" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                {myTurn && <C choices={[[char, '']]} tag="3x2" widget={DefaultList} />}
                <R tag="3x2" to={{ "x": "X", "o": "O" }} />
            </div>
            <div className={styles.col}>

                {myTurn && <C choices={[[char, '']]} tag="3x3" widget={DefaultList} />}
                <R tag="3x3" to={{ "x": "X", "o": "O" }} />
            </div>
        </div>
    </>
}

export default Board
