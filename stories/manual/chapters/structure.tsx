import { Section, Chapter, Nav } from 'core/components'
import { PageType } from 'core/types'
import { string } from 'yargs'
import { SyntaxHighlighter, prism, styles } from '..'

export const Page: PageType = () => (
    <Chapter filename="structure">
        <Section>
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
                The generator script will create your story folders, CSS files, and example chapter
                and story configuration script, described below.
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
                    Each chapter in a Windrift story will consist of an import of the
                    <code>Page</code>, <code>Chapter</code> and <code>Section</code> components,
                    followed by the signature for the <code>Page</code> functional component,
                    followed by the content itself. Use regular HTML inside each{' '}
                    <code>Section</code> to mark up your story:
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
            <h2>
                The story template: <code>index.tsx</code>
            </h2>
            <p>
                Each story will always contain one file, <code>index.tsx</code>, that contains the
                "frame" or template for your story. Every chapter in your story will inherit from
                this template, so this typically contains no narrative content, just layout, CSS,
                and fonts.
            </p>
            <aside>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`// index.tsx
// Optional layout provided by Windrift
import Grid from 'core/components/ui/grid'

// Per-story CSS files
import styles from 'public/stories/<your-story>/styles/Index.module.scss'

const Index: React.FC = ({ children }) => {
    return (
        <Grid
            styles={styles}
            head={ // Google fonts or other font imports
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/..." />
            }>
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
                    your own from scratch. Consult the{' '}
                    <a href="https://nextjs.org/docs/">full NextJS documentation</a> for best
                    practices around building HTML pages in a NextJS context.
                </p>
            </aside>
            <aside className={styles.advanced}>
                <h2>Global, persistent content</h2>
                <p>
                    One thing you might choose to customize in your story template is persistent
                    navigation, a score counter, or other content blocks that should appear in every
                    chapter. In the story template, <code>children</code> will always contain the
                    child nodes from each chapter, but you can add additional components here to
                    create persistent content either before or after the story content.
                </p>
                <p>
                    In this documentation, a "table of contents" appears at the top of each chapter.
                    This is represented in <code>stories/demo/index.tsx</code> as:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`<Grid styles={styles} ... >
    // The table of contents component appears before all the other chapter content
    <TableOfContents />
    {children}
</Grid>`}
                </SyntaxHighlighter>
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
            <h3>Title</h3>
            <p>
                The story's title. This generally will not appear in the story itself, but is
                reserved for future use to generate an index of stories available in a given
                Windrift installation.
            </p>
            <h3>Language</h3>
            <p>
                Used to annotate the HTML of the major elements on the page. Browsers and search
                engines will use this information to assist in providing users with a good
                experience. Windrift is generally language-agnostic and does not use this
                information otherwise.
            </p>
            <h3>Chapters</h3>
            <p>
                Each chapter item in the JSON array is a discrete chapter. The filename of the
                chapter <em>must</em> match as either <code>filename.tsx</code> (TypeScript) or{' '}
                <code>filename.tsx</code> (JavaScript). TypeScript is strongly recommended,
                especially when paired with a code editor like VSCode that understands TypeScript
                natively. This value must also match the contents of the{' '}
                <code>&lt;Chapter filename="example"&gt;</code> attribute. Because it's an array,
                chapters have an implicit ordering; Windrift will not make use of this, but you
                can—see the source code that generates the <code>TableOfContent</code> component in
                this demo.
            </p>
            <p>
                The chapter title will appear in the <code>&lt;title&gt;</code> of the HTML page.
            </p>
            <h3>Players</h3>
            <p>
                Windrift 2.0 is a single-player experience, but a multiplayer experience is
                forthcoming. This parameter is reserved for further use, but in 2.0.x it is used
                exclusively to indicate which chapter is the start of the story.
            </p>
            <h3>Extra</h3>
            <p>
                <em>Advanced option</em>. You may add an optional <code>extra</code> configuration
                item to put your own metadata or configuration info. This is typed as a record of
                strings mapping to any kind of value. See the <code>extra</code> block in the
                manual's configuration for an example, used in the <code>TableOfContents</code>{' '}
                component to limit which chapters are displayed in the header.
            </p>
            <Nav text="Learn about choices next..." next="choices" />
        </Section>
    </Chapter>
)
