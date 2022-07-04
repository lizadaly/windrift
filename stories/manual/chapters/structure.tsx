import { Section, Chapter, Nav } from 'core/components'
import { PageType } from 'core/types'
import { SyntaxHighlighter, prism, styles, FooterNav } from '..'

export const Page: PageType = () => (
    <Chapter filename="structure">
        <Section>
            <h1>How a Windrift story is structured</h1>
            <h2>Generating a new story</h2>
            <p>
                To begin writing a Windrift story, run the generator script with a unique{' '}
                <code>story identifier</code>. The identifier should be a lowercase string with
                words separated by hyphens. The identifier will appear in the URL and on the file
                system as folders where story files are stored:
            </p>
            <aside>
                <SyntaxHighlighter language="bash" style={prism}>
                    {`$ npm run new <story-id>

# For example:
$ npm run new example-story`}
                </SyntaxHighlighter>
            </aside>
            <p>
                The story identifier <em>must</em> be unique within your Windrift installation.
            </p>
            <p>
                The generator script will create your story folders, CSS files, an example chapter,
                and the story configuration file, described below.
            </p>
            <h2>Running the development server</h2>
            <p>
                Once you've created a new story, run the bundled NextJS development server to start
                up the local Windrift install, running all the included sample stories (including
                this manual):
            </p>
            <SyntaxHighlighter language="bash" style={prism}>
                {`$ npm run dev`}
            </SyntaxHighlighter>
            <p>
                This will run a local dev server as <code>http://localhost:3000/</code>. NextJS
                comes bundled with hot reloading and other features to make development less
                painful. It's recommended that you also install the React and Redux Dev Toolkits for
                your web browser. Consult the{' '}
                <a href="https://nextjs.org/docs/api-reference/cli#development">
                    NextJS dev documentation
                </a>{' '}
                for additional instructions and customization options.
            </p>
            <p>
                The story you just generated will be available as{' '}
                <code>http://localhost:3000/example-story</code> (or whatever you picked as an
                identifier).
            </p>
            <h2>Story structure</h2>
            <p>
                A Windrift story is composed of a series of <code>Chapter</code> components
                contained in individual TypeScript or JavaScript files. Each <code>Chapter</code> is
                made up of <code>Section</code> components that are revealed in response to a user
                interaction.
            </p>
            <p>
                Starting a new <code>Chapter</code> will always clear the user's screen of previous
                input. Starting a new <code>Section</code> will not. There is no limit to the size
                of a chapter or section; use these divisions to express the rhythm and pacing of
                your story as needed. It would be perfectly acceptable to encode an entire linear
                story in a single <code>Chapter</code> component. You are free to arbitrarily break
                up your source code in whatever way is helpful to you by using standard JavaScript
                import syntax. Windrift only attends to <code>Chapter</code> and{' '}
                <code>Section</code> components, not source code layout.
            </p>
            <aside>
                <p>
                    Each chapter in a Windrift story consists of an import of the <code>Page</code>,{' '}
                    <code>Chapter</code> and <code>Section</code> components, followed by the
                    signature for the <code>Page</code> function component, followed by the content
                    itself. Use regular HTML inside each <code>Section</code> to mark up your story:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`// example.tsx
import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="example">
        <Section>
            <p>A very simple Windrift story.</p>
        </Section>
    </Chapter>`}
                </SyntaxHighlighter>
            </aside>
            <h3>
                The story template: <kbd>index.tsx</kbd>
            </h3>
            <p>
                Each story always contains one file, <code>index.tsx</code>, that contains the
                "frame" or template for your story. Every chapter in your story will inherit from
                this template, so it typically contains no narrative content, just layout, CSS, and
                fonts.
            </p>
            <aside>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`// index.tsx
// Optional layout provided by Windrift
import Grid from 'core/components/ui/grid'
import { PageType } from 'core/types'

// Per-story CSS files
import styles from 'public/stories/<your-story>/styles/Index.module.scss'

const Index: PageType = ({ children }) => {
    return (
        <Grid
            styles={styles}>
            {children}
        </Grid>
    )
}
export default Index`}
                </SyntaxHighlighter>
                <p>
                    For simple layouts (or if you're just getting comfortable) you may not need to
                    customize this at all—the story generator will give you something already
                    usable. Windrift provides a few default layouts to start with, or you can build
                    your own from scratch. There's more on this topic in the{' '}
                    <Nav text="section on styling" next="styling" />, but most stories can get
                    started with this layout just fine.
                </p>
            </aside>

            <h2>Story configuration</h2>

            <p>
                Each Windrift story is accompanied by a configuration file, expressed in YAML
                syntax, that describes the overall structure. This acts as a table of contents for
                the story, including where the story will begin:
            </p>
            <SyntaxHighlighter language="json" style={prism}>
                {`// story.yaml
title: Sample story
language: en
chapters:
  - filename: "example"
    title: "Example chapter"
  - filename: "another"
    title: "Another chapter"
players:
  - start: "example"`}
            </SyntaxHighlighter>
            <h3>Configuration metadata</h3>
            <h4>Title</h4>
            <p>
                The story's title. This will appear in the HTML <code>&lt;title&gt;</code> of the
                page.
            </p>
            <h4>Language</h4>
            <p>
                Used to annotate the HTML of the major elements on the page with the language in
                which the story is authored.{' '}
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang">
                    Browsers
                </a>{' '}
                and search engines can use this information to improve users' experience. Windrift
                is generally language-agnostic and does not use this information otherwise.
            </p>
            <h4>Chapters</h4>
            <p>
                Each chapter item in the JSON array is a discrete chapter. The filename of the
                chapter <em>must</em> match as either <code>filename.tsx</code> (TypeScript) or{' '}
                <code>filename.jsx</code> (JavaScript). TypeScript is strongly recommended,
                especially when paired with a code editor like VSCode that understands TypeScript
                natively. This value must also match the contents of the{' '}
                <code>&lt;Chapter filename="example"&gt;</code> attribute. Because the chapter list
                is an array, chapters have an implicit ordering; Windrift will not make use of this,
                but you can—see the source code that generates the <code>TableOfContents</code>{' '}
                component in this manual.
            </p>

            <h4>Players</h4>
            <p>
                Windrift 2.0 is a single-player experience, but a multiplayer experience is
                forthcoming. This parameter is reserved for further use, but in 2.0.x it is used
                exclusively to indicate which chapter is the start of the story.
            </p>
            <h4>Extra</h4>
            <p>
                <em>Advanced option</em>: You may add an optional <code>extra</code> configuration
                item to add your own metadata or configuration info. This is typed as a record of
                strings mapping to any kind of value. See below for an example that makes use of the{' '}
                <code>extra</code> block.
            </p>
            <aside className={styles.advanced}>
                <h2>Global, persistent content</h2>
                <p>
                    One thing you might want to do in the story template is provide some content
                    that should appear on every page. If the story is non-linear, you might include
                    some persistent navigation. An RPG-style story might include a score or stats
                    counter.
                </p>
                <p>
                    In the story template, <code>children</code> will always contain the child nodes
                    from each chapter, but you can add additional components here to create
                    persistent content either before or after the story content.
                </p>
                <p>
                    For example in this manual, the table of contents at the top of each chapter is
                    represented in <code>stories/manual/index.tsx</code> as:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`<Grid styles={styles} ... >
    // The table of contents component appears before all the other chapter content
    <TableOfContents />
    {children}
</Grid>`}
                </SyntaxHighlighter>
                <p>
                    This table of contents component uses the <code>extra</code> block in the
                    manual's YAML file to determine which sections should be displayed in the table
                    of contents, as there are more discrete <code>Chapter</code> components than
                    show up in the TOC.
                </p>
                <p>
                    Persistent content can also go in the right or left margin of the page if you're
                    using the built-in <code>Grid</code> component. See the{' '}
                    <Nav text="section on styling" next="styling" /> for more on customizing where
                    content flows on the page.
                </p>
            </aside>

            <aside className={styles.advanced}>
                <h3>
                    Persistent content within a <code>Chapter</code>
                </h3>
                <p>
                    You can display content in a chapter regardless of any current user behavior by
                    including it outside any <code>Section</code> components. (You'll learn more
                    about the <code>Nav</code> component in a subsequent section, but for now just
                    understand that it would reveal the subsequent section normally.)
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`<Chapter>
    <Section>
        This appears first: <Nav text="Next section" next={Next.Section} />
    </Section>
    <Section>
        This appears only after the previous Nav link is clicked.
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
            <FooterNav text="Learn about choices next..." next="choices" />
        </Section>
    </Chapter>
)
