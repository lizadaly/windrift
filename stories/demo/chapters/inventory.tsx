import { useDispatch } from 'react-redux'

import { R, Section, Chapter, Nav, When } from 'core/components'
import { PageType } from 'core/types'
import useInventory from 'core/hooks/use-inventory'
import { update } from 'core/reducers/inventory'
import { wordFromInventory } from 'core/util'

import { SyntaxHighlighter, prism, styles } from '..'

export const Page: PageType = () => {
    const dispatch = useDispatch()
    const [fruit, cravat, tree, byAuthor] = useInventory([
        'fruit',
        'cravat',
        'tree',
        'set-by-author'
    ])

    return (
        <Chapter filename="inventory">
            <Section>
                <h2>Inventory and Responses</h2>
                {fruit ? null : (
                    <aside className={styles.warning}>
                        This section expects that you made some selections in the section on{' '}
                        <Nav text="Choices" next="choices" />. You might want to{' '}
                        <Nav text="visit" next="choices" /> that first before reading this section.
                    </aside>
                )}
                <p>
                    Whenever a user selects an option from a <code>Choice</code>, the option text is
                    added to a global store called the <code>Inventory</code>. The inventory is a
                    key/value store where the keys are each choice's <code>tag</code> attribute. The
                    inventory for a key is unpopulated until a user has made a selection.
                </p>
                <p>
                    Because the inventory is global to the entire story, you can retrieve any
                    Choice's selection from any chapter. Back in the initial chapter on choices, you
                    picked a fruit—we'll use this as the example value in this chapter.
                </p>
                <p>
                    There are two ways to retrieve the value from the inventory. One is to use the
                    <code>useInventory</code> React hook to retrieve the raw value selected by the
                    user. The other is to use the <code>Response</code> component to map specific
                    inventory selections to responses.
                </p>
                <h3>
                    The <kbd>useInventory</kbd> hook
                </h3>
                <p>
                    This hook give you access to the raw value provided by the users for any tag
                    passed in the array.
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`export const Page: PageType = () => {
    const [fruit] = useInventory(['fruit'])
    return (
        <Chapter filename="inventory">
            <Section>
                <p>You picked {fruit}</p> // ${fruit}
            </Section>
        </Chapter>
    )`}
                </SyntaxHighlighter>

                <p>
                    Often selections will contain multiple words, when in the narrative you may want
                    to only pick the noun. In English, this is typically the last word in the
                    phrase. The utility function <code>wordFromInventory</code>
                    can safely retrieve a specific substring based on a negative offset from the end
                    of the string (default to -1). The offset value will apply to every option in
                    the choice, so if you're planning on using this you'll either want options with
                    similar structure, or a custom rendering function:
                </p>
                <SyntaxHighlighter language="ts" style={prism}>
                    {`wordFromInventory(fruit) // ${wordFromInventory(fruit)}
wordFromInventory(fruit, -2) // ${wordFromInventory(fruit, -2)}`}
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
                    A <code>Response</code> is composed of a <code>tag</code> that matches the
                    original <code>Choice</code>, and a map of keywords to strings or additional
                    React elements:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`<Response
    tag="fruit"
    options={{
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
                        options={{
                            banana: (
                                <span>
                                    You picked <b>a nice</b> banana.
                                </span>
                            ),
                            orange: 'You picked a spherical orange.',
                            kiwi: 'You picked the fuzziest of kiwis.'
                        }}
                    />
                </aside>
                <p>
                    The parameters in the <code>options</code> map should contain substring matches
                    of the original options. You can match by explicit wildcards too, which will
                    override the default substring behavior in favor of exactly what you provide.
                    This supports full regular expressions via{' '}
                    <a href="https://www.npmjs.com/package/minimatch">minimatch</a>.
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`<Response
    tag="fruit"
    options={{
        'r?pe ban*': 'This also matches banana',
        'bulbous': 'This matches "bulbous orange"',
        '*iw*': 'This also matches kiwi'
    }}
/>
            `}
                </SyntaxHighlighter>
                <aside>
                    <R
                        tag="fruit"
                        options={{
                            'r?pe ban*': 'This also matches banana.',
                            bulbous: 'This matches "bulbous orange."',
                            '*iw*': 'This also matches kiwi.'
                        }}
                    />
                </aside>
                <p>
                    Because a <code>Response</code> match can be any React node, you can branch from
                    this point as much or as little as you like.
                </p>
                <h3>
                    Conditional text with <kbd>When</kbd>
                </h3>
                <p>
                    Another way to react to inventory changes, or any changes to the Windrift story
                    state, is to use the <code>When</code> component. It's got a straightforward
                    signature: when the <code>condition</code> evaluates to <code>true</code>,
                    display any child contents. If the <em>optional</em> prop <code>otherwise</code>{' '}
                    is passed, use that node instead.
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`export const Page: PageType = () => {
    const [fruit, tree ] = useInventory(['fruit', 'tree'])

    return (<Chapter filename="inventory">
        <Section>
            <When
                condition={fruit || tree}
                otherwise={<p>You haven't selected either option!</p>}>
                <p>You selected either a fruit or a tree, or both.
                (fruit="{fruit}", tree="{tree}")</p>
            </When>
        </Section>
    </Chapter>)`}
                </SyntaxHighlighter>
                <aside>
                    <When
                        condition={fruit || tree}
                        otherwise={<p>You haven't selected either option!</p>}>
                        <p>
                            You selected either a fruit or a tree, or both. (fruit="
                            {fruit}", tree="{tree}")
                        </p>
                    </When>
                </aside>
                <p>
                    The <code>Response</code> component specifically expects to receive inventory
                    tag arguments, as this will make up the bulk of your Windrift story, but{' '}
                    <code>When</code> accepts any expression that can be evaluated for truthiness.
                </p>
                <h3>
                    A note about <kbd>last</kbd> parameters
                </h3>
                <p>
                    Be aware that if you write a <code>Choice</code> including a <code>last</code>{' '}
                    parameter, the value of <code>last</code> is <em>not</em> stored in the
                    inventory—the inventory value will be whatever option the user selected from the{' '}
                    <code>option</code> array. Use <code>last</code> only for narrative effect. A
                    design principle of Windrift is that it should always be clear to the user that
                    a option was deliberately selected. (This is one reason why Twine-style{' '}
                    <a href="https://twinery.org/cookbook/cycling/chapbook/chapbook_cycling.html">
                        cycling links
                    </a>{' '}
                    that never resolve are not directly supported—it's not obvious to the reader
                    whether the choice is the option-last-clicked or the linked option remaining
                    on-screen.) An exception to this rule is made for default options, to allow for
                    the case where a choice may never be presented to a user because they did not
                    uncover that path.
                </p>
                <p>
                    (Speaking of default options: if you didn't make a selection for the{' '}
                    <code>defaultOption</code> example in the previous section, you should see
                    "magenta" here: <code>{cravat}</code> )
                </p>

                <aside className={styles.advanced}>
                    <h3>Setting inventory values for the player</h3>
                    <p>
                        If in response to some event you want to set an inventory value as a side
                        effect, you can dispatch the update function manually. Only do this in a
                        callback or as part of a <code>useEffect</code> cycle. This button shows an
                        example:
                    </p>
                    <button
                        className={styles.warning}
                        onClick={() => {
                            dispatch(update({ tag: 'set-by-author', option: 'pumpkin patch' }))
                        }}>
                        Set the value
                    </button>{' '}
                    <button
                        onClick={() => {
                            dispatch(update({ tag: 'set-by-author', option: undefined }))
                        }}>
                        Unset the value
                    </button>
                    <SyntaxHighlighter language="tsx" style={prism}>
                        {`export const Page: PageType = () => {
    const byAuthor = useInventory(['set-by-author'])
    return (
        <Chapter filename="inventory">
            <Section>
                <button
                    onClick={() => {
                        dispatch(update({ tag: 'set-by-author', option: 'pumpkin patch' }))
                    }}>
                    Set the value
                </button>
                <button
                    onClick={() => {
                        dispatch(update({ tag: 'set-by-author', option: undefined }))
                    }}>
                    Unset the value
                </button>
                <p>Value set by the story author: {byAuthor}</p>
                <!-- Current value: ${byAuthor}  -->
            </Section>
        </Chapter>
    )`}
                    </SyntaxHighlighter>
                </aside>
                <Nav text="Learn about navigation..." next="navigation" />
            </Section>
        </Chapter>
    )
}
