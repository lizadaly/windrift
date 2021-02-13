import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/material-oceanic'

SyntaxHighlighter.registerLanguage('jsx', jsx)

import { C, R, Section, Chapter, Nav } from 'core/components'
import { BulletedList } from 'core/components/widgets'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="chapter1">
        <Section>
            <h1>Chapter 1: Choices</h1>
            <R
                tag="c3-chapter1"
                to={{
                    '1': (
                        <>
                            <p>
                                <b>You came here via chapter 3.</b> Note that any previous choices
                                are still here.
                            </p>
                            <p>
                                If you don't need to remark on the navigation change, you can see
                                the shorthand <code>Nav</code> component to allow players to switch
                                between chapters.
                                <SyntaxHighlighter language="jsx" style={prism}>
                                    {`<Nav text="Go to chapter 4" next="chapter4" />`}
                                </SyntaxHighlighter>
                                <aside>
                                    <Nav text="Go to chapter 4" next="chapter4" />.
                                </aside>
                            </p>
                        </>
                    )
                }}
            />
            <h2>Default widget: inline</h2>
            <p>This will display each option inline, leaving behind the chosen one.</p>
            <SyntaxHighlighter language="jsx" style={prism}>
                {` <Choices
    options={[['ripe banana', 'bulbous orange', 'fuzzy kiwi']]}
    extra={{ conjunction: 'or' }}
    tag="fruit" />`}
            </SyntaxHighlighter>
            <aside>
                Would you like a{' '}
                <C
                    options={[['ripe banana', 'bulbous orange', 'fuzzy kiwi']]}
                    extra={{ conjunction: 'or' }}
                    tag="fruit"
                />
                ?
            </aside>
        </Section>
        <Section>
            <h2>Bulleted list widget</h2>
            <p>
                This will display each item as a bulleted list, like a menu. All items will remain
                onscreen after the choice.
            </p>
            <SyntaxHighlighter language="jsx" style={prism}>
                {`<C options={[['poplar', 'elm', 'baobab']]} tag="tree" widget={BulletedList} />`}
            </SyntaxHighlighter>
            <aside>
                <p>What is your favorite kind of tree?</p>
                <C options={[['poplar', 'elm', 'baobab']]} tag="tree" widget={BulletedList} />
            </aside>
        </Section>
        <Section>
            <Nav text="Next..." next="chapter2" />
        </Section>
    </Chapter>
)
