import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'

import prism from 'react-syntax-highlighter/dist/esm/styles/prism/material-oceanic'

SyntaxHighlighter.registerLanguage('tsx', tsx)

import { C, R, Section, Chapter, Nav } from 'core/components'

import { PageType } from 'core/types'
import useInventory from 'core/hooks/use-inventory'

export const Page: PageType = () => {
    const fruit = useInventory('fruit')
    return (
        <Chapter filename="inventory">
            <Section>
                <h2>Inventory and Responses</h2>
                <p>
                    Whenver a user selects an option from a <code>Choice</code>, the option text is
                    added to a global store called the <code>Inventory</code>. The inventory will
                    contain the final option selected from every <code>Choice</code> presented up to
                    that point, accessible via the value of each choice's <code>tag</code>{' '}
                    attribute.
                </p>
                <p>
                    Because the inventory is global to the entire story, at any time you can
                    retrieve the value that the user picked. For example, back in the initial
                    chapter on choices, you picked a fruit—we'll use this as the example value in
                    this chapter.
                </p>
                <h3>
                    The <kbd>useInventory</kbd> hook
                </h3>
                <p>
                    There are two ways to retrieve the value from the inventory. One is to use the
                    <code>useInventory</code> React hook. This method give you access to the raw
                    value provided by the user:
                </p>
                <SyntaxHighlighter language="ts" style={prism}>
                    {`export const Page: PageType = () => {
    const fruit = useInventory('fruit')
    return (
        <Chapter filename="inventory">
            <Section>
                <p>You picked {fruit}</p> // ${fruit}
            </Section>
        </Chapter>
    )`}
                </SyntaxHighlighter>
                <h3>
                    The <kbd>Response</kbd> component
                </h3>
                <p>
                    In most hypertext stories you will want to branch content and even navigation
                    based on user input. For this, you'll use the <code>Response</code> component.
                    <code>Choices</code> and <code>Responses</code> will make up the majority of
                    your branching code in a Windrift story.
                </p>
                <p>
                    A <code>Repsonse</code> is composed of a <code>tag</code> that matches the
                    original <code>Choice</code>, and a map of keywords to strings or additional
                    React elements:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`<Response
    tag="fruit"
    to={{
        banana: (
            <span>
                You picked <b>a nice</b> banana
            </span>
        ),
        orange: 'You picked a spherical orange',
        kiwi: 'You picked the fuzziest of kiwis'
    }}/>`}
                </SyntaxHighlighter>
                <aside>
                    <R
                        tag="fruit"
                        to={{
                            banana: (
                                <span>
                                    You picked <b>a nice</b> banana
                                </span>
                            ),
                            orange: 'You picked a spherical orange',
                            kiwi: 'You picked the fuzziest of kiwis'
                        }}
                    />
                </aside>
                <p>
                    The parameters to the <code>to</code> map are substring matches to the original
                    options. You can match by explicit wildcards too, which will override the
                    default substring behavior in favor of exactly what you provide. This supports
                    full regular expressions via{' '}
                    <a href="https://www.npmjs.com/package/minimatch">minimatch</a>.
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`<Response
    tag="fruit"
    to={{
        'r?pe ban*': 'This also matches banana',
        '*range': 'This also matches orange',
        '*iw*': 'This also matches kiwi'
    }}
/>
            `}
                </SyntaxHighlighter>
                <aside>
                    <R
                        tag="fruit"
                        to={{
                            'r?pe ban*': 'This also matches banana',
                            '*range': 'This also matches orange',
                            '*iw*': 'This also matches kiwi'
                        }}
                    />
                    .
                </aside>
                <p>
                    Because a <code>Response</code> match can be any React node, you can branch from
                    this point as much or as little as you like.
                </p>
                <Nav text="Learn about navigation..." next="navigation" />
            </Section>
        </Chapter>
    )
}
