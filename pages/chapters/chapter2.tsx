import * as React from "react"
import { C } from '../../core/components'

const Chapter = (): JSX.Element => <section>
    <h1>Chapter 2</h1>
    <C choices={[["dog", "cat"]]} tag="chapter-2" />
</section>

export default Chapter