import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/material-oceanic'

SyntaxHighlighter.registerLanguage('jsx', jsx)

import { Next } from 'core/actions/navigation'
import { C, R, Section, Chapter } from 'core/components'
import { BaseList } from 'core/components/widgets'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="chapter2">
        <Section>
            <h1>Chapter 2: Responses</h1>
            <p>
                The <code>inventory</code>, or selected list of choices, is global to a Windrift
                story, so we can look back at what was selected in Chapter 1:
            </p>
            <aside>
                <R
                    tag="fruit"
                    to={{
                        banana: (
                            <span>
                                You picked <b>a nice</b> banana
                            </span>
                        ),
                        orange: 'You picked orange',
                        kiwi: 'You picked kiwi'
                    }}
                />
                .
            </aside>
            <SyntaxHighlighter language="jsx" style={prism}>
                {`<Response
    tag="fruit"
    to={{
        banana: (
            <span>
                You picked <b>a nice</b> banana
            </span>
        ),
        orange: 'You picked orange',
        kiwi: 'You picked kiwi'
    }}
/>`}
            </SyntaxHighlighter>

            <p>
                You can match by wildcards too. This supports full regular expressions via{' '}
                <a href="https://www.npmjs.com/package/minimatch">minimatch</a>.
            </p>
            <SyntaxHighlighter language="jsx" style={prism}>
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

            <p>Let's move on to navigation... </p>
            <C options={[['Next!', null]]} widget={BaseList} tag="c2-next" next="chapter3" />
        </Section>
    </Chapter>
)
