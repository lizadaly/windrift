import { RootState } from 'core/reducers'
import { useSelector } from 'react-redux'
import { C, R, Section, Chapter } from '../../../core/components'
import { PageType } from '../../../core/types'


const Page: PageType = () => {
    const { player } = useSelector((state: RootState) =>
        state.multiplayer)
    const char = player === 1 ? "X" : "O"
    return <Chapter filename="game">
        <Section>
            <h1>Tic-Tac-Toe</h1>

            <C choices={[[char, '']]} tag="1x1" />
            <R tag="1x1" to={{ "x": "X", "o": "O" }} />

            <C choices={[[char, '']]} tag="1x2" />
            <R tag="1x2" to={{ "x": "X", "o": "O" }} />

            <C choices={[[char, '']]} tag="1x3" />
            <R tag="1x3" to={{ "x": "X", "o": "O" }} />

        </Section>

    </Chapter>
}

export default Page