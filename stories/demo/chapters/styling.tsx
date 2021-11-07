import { Section, Chapter, Nav } from 'core/components'
import { PageType } from 'core/types'
import { SyntaxHighlighter, prism, styles } from '..'

export const Page: PageType = () => {
    return (
        <Chapter filename="styling">
            <Section>
                <h2>Layout and styling</h2>
                <p>
                    Windrift stories are primarily composed of text, so attention to detail around
                    the presentation of text—both visually and for screenreaders—is encouraged.
                    Where possible, defer to general web and accessibility guidelines on good user
                    experience. This section will highlight some affordances available as part of
                    Windrift, as well as some best practices that are unique to digital narrative.
                </p>
                <h3>Terminology</h3>
                <ol>
                    <li>
                        Windrift provides components called <strong>layouts</strong>, found in{' '}
                        <code>core/components/ui/layouts</code>. These are designed to be{' '}
                        <strong>reusable across many stories</strong> and control the fundamental
                        structure of the HTML page. .
                    </li>
                    <li>
                        Each individual story then has a <strong>story template</strong>, which is
                        the <code>index.tsx</code> page created for you when you run the story
                        generator. By default this will call the default <strong>layout</strong>.
                        Every chapter in your story will be rendered inside this page.{' '}
                        <strong>Each story will have its own story template.</strong>
                    </li>
                    <li>
                        Finally, within each story, chapter, or section you can control the{' '}
                        <strong>styling</strong> of the text and other media.
                    </li>
                </ol>
                <h3>
                    Layout using the <kbd>Grid</kbd> component
                </h3>
                <p>
                    As discussed in the section on <Nav text="story structure" next="structure" />,
                    a Windrift story will be contained inside a template called{' '}
                    <code>index.tsx</code> that's provided by the story generator script. This
                    template calls a layout component provided in{' '}
                    <code>core/components/ui/layouts</code>.
                </p>
                <div className={styles.twoUp}>
                    <div>
                        <p>
                            The default layout is <code>core/components/ui/layouts/grid.tsx</code>,
                            which implements the HTML <code>&lt;head&gt;</code>, a top{' '}
                            <code>&lt;header&gt;</code>, and a <code>&lt;main&gt;</code> block.
                        </p>
                        <p>
                            The main block is composed of a three-column layout with the following
                            HTML structure:
                        </p>
                    </div>
                    <img
                        src="/stories/demo/images/page-template.svg"
                        alt="Diagram of default page layout"
                    />
                </div>
                <p>
                    To understand what's happening here, look at the Grid component in the Windrift
                    source (check the source code itself for the most current version). It accepts
                    the following parameters:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`export type GridProps = {
    /**
     * Content to be included inside the NextJS {@link Head}
     * (@see {@link https://nextjs.org/docs/api-reference/next/head}).
     * Defaults to the HTML title and viewport specification. */
    head?: React.ReactNode

    /** Optional content for the top nav header; defaults to a top-level
     * nav with the story title and {@link ResetButton}. */
    header?: React.ReactNode

    /** Optional content for the left-hand body column. @default "" */
    left?: React.ReactNode

    /** Optional content for the right-hand body column. @default "" */
    right?: React.ReactNode

    /** A style object as imported from a CSS or SCSS file
     *
     * @example
     * import styles from 'public/stories/demo/styles/Index.module.scss'
     */
    styles?: Record<string, string>
}`}
                </SyntaxHighlighter>
                <p>
                    All parameters are optional, which means that without making any changes, you'll
                    get a reasonable presentation of story title and content. Most stories will work
                    well with this layout and there is usually not a reason to change this.
                </p>
                <h3>Your story template</h3>
                <p>
                    When you run <code>npm run start &lt;your-story-id&gt;</code>, Windrift will
                    generate a file <code>stories/&lt;your-story-id&gt;/index.tsx</code>. By default
                    it will look like this:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`import * as React from 'react'

import Grid from 'core/components/ui/layouts/grid'
import styles from 'public/stories/<your-story-id>/styles/Index.module.scss'

const Index: React.FC = ({ children }) => {
    return (
        <Grid styles={styles}
              head={<link></link>}>
              {children} // This will always contain the current chapter's content
        </Grid>
    )
}
export default Index`}
                </SyntaxHighlighter>
                <p>
                    As you can see does pass along your story's styles and an empty placeholder for
                    content in the HTML <code>&lt;head&gt;</code>—these are the two areas you're
                    likely to customize.
                </p>
                <div className={styles.twoUp}>
                    <div>
                        <p>
                            The top header provides the story title and a reset button:{' '}
                            <code>core/components/ui/reset-button.tsx</code>. You are strongly
                            encouraged to provide a reset button for all stories, but you can
                            customize the text and design as much as needed.
                        </p>
                        <p>
                            The left and right <code>&lt;nav&gt;</code> elements end up empty and
                            are used as gutters (because no <code>left</code> or <code>right</code>{' '}
                            props are passed), and your story content is in the middle pane.
                        </p>
                    </div>
                    <img
                        src="/stories/demo/images/rendered-template.svg"
                        alt="Diagram of layout populated with page contents"
                    />
                    <div>
                        <p>
                            If you wanted to put something in the left pane—for example, other kinds
                            of navigation—you'd modify <code>index.tsx</code> to call the Grid like
                            so:{' '}
                        </p>
                        <SyntaxHighlighter language="tsx" style={prism}>
                            {`<Grid styles={styles}
    left={<div>
        <ul>
            <li>About</li>
            <li>Help</li>
        </ul>
    </div>}>
    {children}
</Grid>`}
                        </SyntaxHighlighter>
                    </div>
                    <img
                        src="/stories/demo/images/left.svg"
                        alt="Diagram of layout with left nav"
                    />
                </div>
                <p>
                    Similarly, to put a common element in the center pane of any story, add it
                    before or after <code>{`{children}`}</code>. For example, the table of contents
                    at the top of this manual is implemented as a custom component which is
                    prependied before all the chapter content:
                    <SyntaxHighlighter language="tsx" style={prism}>
                        {`// stories/demo/index.tsx
import TableOfContents from './table-of-contents'

const Index: React.FC = ({ children }) => (
    <Grid ...>
        <TableOfContents />
        {children}
    </Grid>)`}
                    </SyntaxHighlighter>
                </p>
                <aside className={styles.advanced}>
                    <p>
                        You don't need to use <code>Grid</code> at all. A minimal layout{' '}
                        <code>core/components/ui/layouts/minimal.tsx</code> is provided if you want
                        to completely customize the whole page or write your own layout using that
                        as an example. See <code>stories/minimal/index.tsx</code> for an example of
                        using the Minimal layout. If you use <code>Minimal</code> or your own layout
                        you'll need to write all of your CSS from the ground up, as the default CSS
                        is designed to match <code>Grid</code>.
                    </p>
                </aside>
                <h3>Fonts</h3>
                <p>
                    NextJS provides a good foundation for{' '}
                    <a href="https://nextjs.org/docs/basic-features/font-optimization">
                        font management
                    </a>
                    , and most authors can follow the defaults provided in the Windrft sample
                    stories. You're encouraged to use{' '}
                    <a href="https://fonts.google.com/">Google Fonts</a>, which load quickly and
                    reliably, offer a huge range of character sets, and are optimized for screen
                    (rather than print) usage.
                </p>
                <p>You'll need to do the following steps to add a new font to a story:</p>
                <ol>
                    <li>Import the font in the story template</li>
                    <li>Assign the new font to the desired style</li>
                </ol>
                <h4>Step 1: Import the font in your story template</h4>
                <p>
                    The story template will wrap every page in your story, so put the font import in
                    the header. There should already be a placeholder from the story generator:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`// stories/demo/index.tsx
<Grid styles={styles}
    head={
        <link
            href="https://fonts.googleapis.com/css2?family=EB+Garamond&display=block"
            rel="stylesheet"
        />
    }>
    {children}
</Grid>`}
                </SyntaxHighlighter>
                <p>
                    Note the use of <code>display=block</code>. This instructs the browser to{' '}
                    <em>block</em> (wait) for the font to be completely loaded before rendering the
                    text content. This is <em>not</em> the usual web recommendation, where it's
                    typically better to put some content in front of users as fast as possible and
                    then switch in the correct font later. Hypertext stories are generally loaded
                    all at once up-front, so using the <code>block</code> loading instruction
                    provides a better user experience than a font that shifts midway into the
                    introduction. (See{' '}
                    <a href="https://font-display.glitch.me/">font-display tutorial</a> by Monica
                    Dinculescu for an excellent summary of CSS font rendering options.)
                </p>
                <p>
                    Don't use the shorter <code>@import</code> form of font loading that Google
                    Fonts might suggest—NextJS will perform useful optimizations on the{' '}
                    <code>&lt;link&gt;</code> syntax listed above only.
                </p>
                <h4>Step 2: Assign the new font as the default, or to a specific element</h4>
                <p>
                    The story generator will give you some basic CSS to work with. This will be
                    discussed in more detail in the next section, but to use your new font as the
                    default for all text, add the following:
                </p>
                <SyntaxHighlighter
                    language="css"
                    style={prism}>{`/* public/stories/<your-story-id>/Index.module.scss */
@use '/public/styles/fonts' with (
    $body: 'EB Garamond',
);

/* This next rule will be inserted by the story generator */
.main {
    /* Customizations can go here */
 }`}</SyntaxHighlighter>
                <p>
                    This combination of <a href="https://sass-lang.com/">Sass/CSS</a> and{' '}
                    <a href="https://css-tricks.com/css-modules-part-1-need/">CSS Modules</a> may be
                    unfamiliar to you, but will be discussed more in the next section.
                </p>
                <p>
                    To limit your new font to only specific elements, such as{' '}
                    <code>&lt;h1&gt;</code>, you can use a more familiar syntax:
                </p>
                <SyntaxHighlighter
                    language="css"
                    style={prism}>{`/* public/stories/<your-story-id>y/Index.module.scss */
.main {
    h1 {
        font-family: 'EB Garamond';
    }
}`}</SyntaxHighlighter>
                <h2>Styling</h2>

                <p>
                    Windrift ships with <a href="https://sass-lang.com/">Sass</a> (SCSS), an
                    extension to CSS that allows a richer expression of styles, reusable rules, and
                    variables. All plain CSS is valid SCSS, so you don't have to use SCSS if you
                    don't want to. However, there are a few Windrift-specific features to get
                    oriented on before customizing your story's styles.
                </p>
                <h3>Customizing CSS in the most simple way</h3>
                <p>
                    You can add a CSS or SCSS file to the head of your story template in the way you
                    would for any HTML document. An example is provided in the head of the manual's{' '}
                    <code>stories/demo/index.tsx</code>:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`<Grid styles={styles}
    head={
        <>
            <link href="https://fonts.googleapis.com/..." rel="stylesheet" />
            <link rel="stylesheet" href="/stories/demo/styles/traditional.css" />
            <!-- Contents of traditional.css:
                .traditional {
                    color: white;
                    background: purple;
                }
            -->
        </>
    }>...</Grid>`}
                </SyntaxHighlighter>
                <aside>
                    This text is styled with a normal CSS class:{' '}
                    <span className="traditional">this should be purple</span>. (Note that in React,
                    you must use <code>className</code> rather than "class".)
                </aside>
                <p>
                    While this method is simple and effective, the CSS Modules approach described
                    next has many advantages, and for any significantly complex story or stories
                    will provide a lot of benefit.
                </p>
                <h3>
                    Using the per-story <kbd>Index.module.scss</kbd> file
                </h3>
                <p>
                    The story generator will give you an SCSS file where you can put per-story CSS
                    that will be pre-configured to make use of the included Grid layout and styling.
                    The file will be in{' '}
                    <code>public/stories/&lt;your-story-id&gt;/styles/Index.module.scss</code>:
                </p>
                <SyntaxHighlighter
                    language="css"
                    style={prism}>{`/* public/stories/<your-story-id>/Index.module.scss */
@use '/public/styles/grid';
@use '/public/styles/colors';

.main {
    /* Customizations can go here */
}
`}</SyntaxHighlighter>
                <p>
                    The first two lines import the default Windrift SCSS that matches the{' '}
                    <code>Grid</code> layout. This will give you a mobile-friendly, modern
                    presentation using (surprise!){' '}
                    <a href="https://css-tricks.com/snippets/css/complete-guide-grid/">CSS Grid</a>.
                    A number of useful variables related to fonts, colors, and margins are exported
                    that can be used to override default values without having to rigorously specify
                    new rules. Check out the Stone Harbor CSS for examples that use these variable
                    overrides.
                </p>
                <p>
                    The word "module" in the file indicates this is a CSS Module, which means its
                    use is limited to a specific React component. In this case it will be scoped to
                    your specific story, since it's associated with the <code>index.tsx</code> story
                    template.
                </p>
                <p>
                    CSS Modules should mostly work like any CSS file, with one surprising
                    "gotcha"—to use any class identifier you'll need to import the selector name as
                    a variable in your source code. It's easiest to explain by example.
                </p>
                <p>
                    Since this manual is a Windrift story, it has a <code>Index.module.scss</code>{' '}
                    to go with it. That file describes all the styles used in the manual, including
                    the following SCSS:
                </p>
                <SyntaxHighlighter
                    language="css"
                    style={prism}>{`/* public/stories/demo/Index.module.scss */
@use '/public/styles/grid';
@use '/public/styles/colors';

.main {
    /* ... */

    .styleExample {
        color: green;
    }
    address {
        color: blue;
    }
}
`}</SyntaxHighlighter>

                <p>
                    The first rule here uses a class selector: <code>.styleExample</code>. To
                    actually use this rule in the current chapter, it must be imported and
                    referenced as a variable:
                </p>
                <SyntaxHighlighter
                    language="tsx"
                    style={
                        prism
                    }>{`import styles from 'public/stories/demo/styles/Index.module.scss'
export const Page: PageType = () => {
    return (
        <Chapter filename="styling">
            [...]
            <span className={styles.styleExample}>should be green</span>.
            <address>should be blue</address>
        </Chapter>)}
                `}</SyntaxHighlighter>
                <aside>
                    This text will be wrapped in a <code>styleExample</code> class:{' '}
                    <span className={styles.styleExample}>should be green</span>.
                </aside>
                <p>
                    Typically multiword CSS class names are hyphen-separated, but because CSS
                    Modules will refer to them as JavaScript variables, camelCase is recommended
                    here. Also note that in React, you must use <code>className</code> rather than
                    "class".
                </p>
                <p>
                    However, if a CSS rule uses an element selector, you can just use it normally
                    without a special import:
                </p>
                <aside>
                    This text will be wrapped in an <code>address</code> element:{' '}
                    <address>should be blue</address>
                </aside>
                <p>
                    Though perhaps unfamiliar at first, using CSS Modules prevents a style from one
                    story from bleeding over into another and has become a recommended best practice
                    in the React community. You will also get the benefit of hot reloading (changes
                    to styles will immediately update in your story while you develop) and
                    compatibility with any future improvements from Windrift core.
                </p>
                <aside className={styles.advanced}>
                    NextJS (and therefore Windrift) support other mechanisms of importing CSS,
                    including the "CSS in JS" approach. See the{' '}
                    <a href="https://nextjs.org/docs/basic-features/built-in-css-support">
                        NextJS documentation on CSS support
                    </a>{' '}
                    for a full reference.
                </aside>
                <Nav
                    text="Learn about automated browser testing and continuous integration..."
                    next="testing"
                />
            </Section>
        </Chapter>
    )
}
