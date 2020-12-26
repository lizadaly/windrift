import { RootState } from 'core/reducers'
import { useSelector } from 'react-redux'
import { C, R, Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
import styles from 'public/stories/multiplayer/Game.module.scss'
import { DefaultList } from 'core/components/widgets'

const Page: PageType = () => {
    const { player } = useSelector((state: RootState) =>
        state.multiplayer)
    const char = player === 1 ? "X" : "O"
    return <Chapter filename="game">
        <Section>
            <style global jsx>{`
                span.selected {
                    display: none !important;
                }
            `}
            </style>
            <h1>Tic-Tac-Toe</h1>

            <div className={styles.board}>
                <div className={styles.col}>

                    <C choices={[[char, '']]} tag="1x1" widget={DefaultList} />
                    <R tag="1x1" to={{ "x": "X", "o": "O" }} />

                </div>
                <div className={styles.col}>

                    <C choices={[[char, '']]} tag="1x2" widget={DefaultList} />
                    <R tag="1x2" to={{ "x": "X", "o": "O" }} />
                </div>
                <div className={styles.col}>

                    <C choices={[[char, '']]} tag="1x3" widget={DefaultList} />
                    <R tag="1x3" to={{ "x": "X", "o": "O" }} />
                </div>
                <div className={styles.col}>

                    <C choices={[[char, '']]} tag="2x1" widget={DefaultList} />
                    <R tag="2x1" to={{ "x": "X", "o": "O" }} />
                </div>
                <div className={styles.col}>

                    <C choices={[[char, '']]} tag="2x2" widget={DefaultList} />
                    <R tag="2x2" to={{ "x": "X", "o": "O" }} />
                </div>
                <div className={styles.col}>

                    <C choices={[[char, '']]} tag="2x3" widget={DefaultList} />
                    <R tag="2x3" to={{ "x": "X", "o": "O" }} />
                </div>
                <div className={styles.col}>

                    <C choices={[[char, '']]} tag="3x1" widget={DefaultList} />
                    <R tag="3x1" to={{ "x": "X", "o": "O" }} />
                </div>
                <div className={styles.col}>

                    <C choices={[[char, '']]} tag="3x2" widget={DefaultList} />
                    <R tag="3x2" to={{ "x": "X", "o": "O" }} />
                </div>
                <div className={styles.col}>

                    <C choices={[[char, '']]} tag="3x3" widget={DefaultList} />
                    <R tag="3x3" to={{ "x": "X", "o": "O" }} />
                </div>
            </div>

        </Section>

    </Chapter >
}

export default Page