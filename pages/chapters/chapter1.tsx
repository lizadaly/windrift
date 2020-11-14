import * as React from "react"
import { List } from '../../core/components'

export default (): JSX.Element => (
    <section>
        <h1>Chapter 1</h1>
        <List expansions={["dog", "cat"]} tag="foo" />
    </section>
)