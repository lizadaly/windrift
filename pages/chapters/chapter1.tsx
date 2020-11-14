import * as React from "react"
import { List } from '../../core/components'

export default (): JSX.Element => (
    <div>
        <section>
            <h1>Chapter 1</h1>
            <List expansions={["dog", "cat"]} tag="foo" />
        </section>
        <section>
            <h2>Section 2</h2>
            <p>
                hello world.
        </p>
        </section>
    </div>
)