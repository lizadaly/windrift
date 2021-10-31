import { C, Section, Chapter, Nav } from 'core/components'
import { PageType, Next } from 'core/types'

import { SyntaxHighlighter, prism, styles } from '..'

export const Page: PageType = () => (
    <Chapter filename="navigation">
        <Section>
            <h1>Navigation</h1>
            <p>
                By default, exhausting a choice list will reveal the subsequent <code>Section</code>{' '}
                in the current <code>Chapter</code>.
            </p>
            <p>
                (Note: from here on we'll use the <code>C</code> short form for <code>Choice</code>{' '}
                components, since that's likely how you'll write them.)
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`import { C } from 'core/components'
[...]
<C options={[['Click me']]} tag="continue" />`}
            </SyntaxHighlighter>
            <aside>
                <C options={[['Click me']]} tag="continue" />
            </aside>
        </Section>

        <Section>
            <h3>
                Using <kbd>next</kbd>
            </h3>
            <p>
                You can change this behavior by modifying the <code>next</code> parameter passed to
                a given choice. You can navigate to a named chapter, skipping over any remaining
                sections, or to do nothing.
            </p>
            <p>
                The options are represented by the enum <code>Next</code>:
            </p>

            <SyntaxHighlighter language="typescript" style={prism}>{`export enum Next {
    Section = 'SECTION',  // The default
    Chapter = 'CHAPTER',
    None = 'NONE'
}`}</SyntaxHighlighter>
            <p>Here's how you'd use it:</p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<C options={[['This is a no-op.']]} last="Clicked!" tag="noop"
    next={Next.None} />`}
            </SyntaxHighlighter>
            <aside>
                <C options={[['This is a no-op.']]} last="Clicked!" tag="noop" next={Next.None} />
            </aside>
            <h3>
                Navigating without a choice: Using <kbd>Nav</kbd>
            </h3>
            <p>
                There's a special navigational component, <code>Nav</code>, for just the previous
                case of a link with a single item that advances the story by section or chapter
                title. Two props are required: <code>text</code>, which will be the text of the
                link, and <code>next</code>, which accepts the same values as
                <code>Choice</code>, but there is no provided default.
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Nav text="Click for more..." next={Next.Section} />`}
            </SyntaxHighlighter>
            <aside>
                <Nav text="Click for more..." next={Next.Section} />
            </aside>
            <p>
                The <code>Nav</code> component uses <code>Choice</code> under the hood, and so
                requires a unique <code>tag</code> to correctly persist whether it's been clicked.
                By default the component will try to generate a unique tag out of the chapter
                filename, the supplied text, and the value of <code>next</code>, but if you find
                that it's displaying the wrong text value or otherwise behaving strangely, you can
                supply a <code>tag</code> prop as well. Make it unique!
            </p>
            <aside className={styles.advanced}>
                <h3>
                    Adding content outside of a <code>Section</code>
                </h3>
                <p>
                    In the first chapter on <Nav text="story structure" next="structure" /> you
                    learned how to add a global, persistent block of content that would appear on
                    every page in the story. You can also do this within a single or group of
                    chapters by appending content beneath a <code>Chapter</code> that is not
                    contained within a <code>Section</code>.
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`<Chapter>
    <Section>
        This appears first: <Nav text="Next section" next={Next.Section} />
    </Section>
    <Section>
        This appears only after the previous link is clicked.
    </Section>
    <div>This content will appear at the bottom of the page regardless of
    whether the user has reached the second Section.</div>
</Chapter>`}
                </SyntaxHighlighter>
                <p>
                    Windrift will always display all children of a <code>Chapter</code> in whatever
                    order you specify, skipping over any <code>Section</code> components that aren't
                    yet revealed.
                </p>
            </aside>
        </Section>
        <Section>
            <h3>Navigating to a specific chapter</h3>
            <p>
                Passing a string as the <code>next</code> parameter in either of a{' '}
                <code>Choice</code> or <code>Nav</code> component will jump the narrative to that
                chapter's filename. You can't jump to a section, and because chapters are not
                naturally ordered, its filename must be provided.
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {` <Nav text="Learn about deployment" next="deployment" />`}
            </SyntaxHighlighter>
            <h3>Persisting the hyperlink</h3>
            <p>
                Normally clicking on a linked choice or nav component will remove the hyperlink when
                the user has clicked it, indicating that no more options are available. To have the
                link behave more like a traditional web hyperlink, pass the parameter{' '}
                <code>persist</code>
                and set it to <code>true</code>. This will cause the hyperlink to "persist" after
                clicking, and is most useful when presenting navigation on a chapter that can be
                visited more than once. (For linear stories, it will usually have no effect because
                the reader has moved on, and for section navigation, it would just be confusing as
                the next section has already been revealed.)
            </p>
            <Nav
                text="Let's work through a fully-realized example story now..."
                next="sample-ascent"
            />
        </Section>
    </Chapter>
)
