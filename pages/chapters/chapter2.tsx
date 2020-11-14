import * as React from "react"
import { List } from '../../core/components'

const Chapter = (): JSX.Element => <section>
    <h1>Chapter 2</h1>
    <List expansions={["dog", "cat"]} tag="foo" />
</section>

export default Chapter