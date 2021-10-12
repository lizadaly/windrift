import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/material-oceanic'

SyntaxHighlighter.registerLanguage('tsx', tsx)

import { Next } from 'core/reducers/navigation'
import { C, Section, Chapter, More } from 'core/components'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="chapter3">
        <Section>
            <h1>Chapter 3: Navigation</h1>
            <p>By default, exhausting the choice list will move to the next section.</p>
            <p>
                Note: from here on we'll use the <code>C</code> short form for all{' '}
                <code>Choice</code> components, since that's likely how you'll write them.
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<C options={['One', 'Two', 'Three']} tag="c3-next" />`}
            </SyntaxHighlighter>
            <aside>
                <C options={['One', 'Two', 'Three']} tag="c3-next" />
            </aside>
        </Section>

        <Section>
            <p>
                You can also navigate to a named chapter, skipping over any remaining sections, or
                set <code>next=Next.None</code> to do nothing.
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<C options={['This is a no-op.', 'Clicked!']} tag="c3-noop" next={Next.None} />`}
            </SyntaxHighlighter>
            <p>
                <C options={['This is a no-op.', 'Clicked!']} tag="c3-noop" next={Next.None} />
            </p>
            <p>
                There's a special navigational component, <code>More</code>, for just the previous
                case of a link with a single item that advances the story by section or chapter
                title. By default it will print "More..." but you can customize this with the{' '}
                <code>text</code> prop. It accepts the same <code>next</code> props as{' '}
                <code>Choice</code>.
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<More text="Click for more" />`}
            </SyntaxHighlighter>
            <aside>
                <More text="Click for more" />
            </aside>
        </Section>
        <Section>
            <p>
                Passing a string as the <code>next</code> parameter will jump the narrative to that
                chapter's filename. (You can't jump to a section, and the chapter must be named.)
            </p>
            <p>
                Note that we use a <code>Choice</code> here because we'll print a custom{' '}
                <code>Response</code> after this jump.
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {` <C options={[['Go to chapter 1', null]]}
    tag="c3-chapter1"
    next={'chapter1'} />`}
            </SyntaxHighlighter>
            <aside>
                <C options={[['Go to chapter 1', null]]} tag="c3-chapter1" next={'chapter1'} />
            </aside>
        </Section>
    </Chapter>
)
