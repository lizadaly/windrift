import { C, Section, Chapter, Nav, R } from 'core/components'
import { PageType, Next } from 'core/types'

import { SyntaxHighlighter, prism, styles, FooterNav } from '..'

export const Page: PageType = () => (
    <Chapter filename="navigation">
        <Section>
            <h2>Navigation</h2>
            <p>
                By default, exhausting a choice list (getting to its <code>resolved</code> state)
                will reveal the subsequent <code>Section</code> in the current <code>Chapter</code>.
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
                You can change this behavior by modifying the <code>next</code> parameter of a given
                choice. You can navigate to a named chapter (skipping over any remaining sections)
                or do nothing.
            </p>
            <p>
                The <code>next</code> parameter can be the name of a chapter to jump to, or a value
                of the <code>Next</code> enum:
            </p>

            <SyntaxHighlighter language="typescript" style={prism}>{`export enum Next {
    Section = 'SECTION',  // The default
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
                Directed navigation using the <kbd>Nav</kbd> component
            </h3>
            <p>
                There's a special navigational component, <code>Nav</code>, for the common special
                case illustrated above, where a link with a single item advances the story by
                section or chapter title. Two props are required: <code>text</code>, which is the
                text of the link, and <code>next</code>, which accepts the same values as
                <code>Choice</code>, but there is no provided default.
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Nav text="Click for more..." next={Next.Section} />`}
            </SyntaxHighlighter>
            <aside>
                <Nav text="Click for more..." next={Next.Section} persist={false} />
            </aside>
            <p>
                The <code>Nav</code> component uses <code>Choice</code> under the hood, and so
                requires a unique <code>tag</code> to correctly persist whether it's been clicked.
                By default the component will try to generate a unique tag out of the chapter
                filename, the supplied text, and the value of <code>next</code>, but if you find
                that it's displaying the wrong text value or otherwise behaving strangely, you can
                supply a <code>tag</code> prop as well. Make it unique!
            </p>
        </Section>
        <Section>
            <h3>Navigating to a specific chapter</h3>
            <p>
                Using a string as the <code>next</code> parameter in either of a <code>Choice</code>{' '}
                or <code>Nav</code> component will jump the narrative to that chapter's filename.
                You can't jump to a section, and because chapters are not naturally ordered, the
                chapter filename must be provided.
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {` <Nav text="Learn about deployment" next="deployment" />`}
            </SyntaxHighlighter>
            <h3>Branching the story on a user selection</h3>
            <p>
                In the <Nav text="section on responses" next="inventory" /> it was noted that it's
                not possible to use the <code>Response</code> component to immediately branch the
                user based on the option they chose. This is because <code>Response</code> is
                designed to display content, not affect story state.
            </p>
            <p>
                However, you can achieve the same effect by leveraging the <code>Nav</code>{' '}
                component multiple times, since they ultimately just render as hyperlinks, just like
                choices do:
            </p>
            <aside>
                <p>
                    You're standing in the VR version of this manual where moving in any direction
                    will take you to a different chapter. It looks very real! You can go{' '}
                    <Nav text="north" next="choices" tag="north" persist={false} />,{' '}
                    <Nav text="south" next="inventory" tag="south" persist={false} />,{' '}
                    <Nav text="east" next="introduction" tag="east" persist={false} />, or{' '}
                    <Nav text="west" next="styling" tag="west" persist={false} />.{' '}
                </p>
            </aside>
            <p>
                (Clicking on any of these links will take you to different chapters in this manual.
                Use the browser Back button to return here.){' '}
            </p>
            <aside className={styles.advanced}>
                <p>
                    If you want to look up the option the user selected in a <code>Nav</code> later,
                    this is a good reason to define the Nav's <code>tag</code> prop yourself so you
                    can reference it from the inventory. Note that each one will have to be unique:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`<p>You're standing in the VR version of this manual. It looks very real! You can go
    <Nav text="north" next="choices"      tag="north" />,
    <Nav text="south" next="inventory"    tag="south" />,
    <Nav text="east"  next="introduction" tag="east" />, or
    <Nav text="west"  next="styling"      tag="west" />.
</p>`}
                </SyntaxHighlighter>
                <p>
                    Then later in the story you can look these up individually, or perhaps OR them
                    together if this section is reachable only once.
                </p>
            </aside>
            <h3>Persisting the hyperlink</h3>
            <p>
                Normally, clicking on a linked choice will remove the hyperlink, indicating that no
                more options are available. To have the link behave more like a traditional web
                hyperlink, pass the prop <code>persist</code>
                and set it to <code>true</code>. This will cause the hyperlink to "persist" after
                clicking, and is most useful when presenting navigation on a chapter that can be
                visited more than once.
            </p>
            <p>
                {' '}
                By default, <code>persist</code> is <code>false</code> for <code>Choice</code>{' '}
                components but <code>true</code> for <code>Nav</code> components, because of the
                usual context in which they appear.
            </p>
            <aside>
                <C
                    options={[['This will stay hyperlinked when clicked']]}
                    persist={true}
                    next={Next.None}
                    tag="clicked"
                />{' '}
                <R tag="clicked" options={{ this: '(Clicked!)' }} />
            </aside>
            <FooterNav
                text="Let's work through a fully-realized example story now..."
                next="sample-ascent"
            />
        </Section>
    </Chapter>
)
