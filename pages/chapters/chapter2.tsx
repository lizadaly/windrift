import * as React from "react"
import { C } from '../../core/components'

const Chapter = (): JSX.Element => <section>
    <h1>Chapter 2</h1>
    <C choices={["dog", "cat"]} tag="foo" />
</section>

export default Chapter