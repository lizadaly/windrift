import { Section, Chapter, C, R } from 'core/components'
import { PageType } from 'core/types'
import FadeIn from 'core/components/ui/fadein'
import { SyntaxHighlighter, prism, styles, FooterNav } from '..'
import { BulletedList } from 'core/components/widgets'

export const Page: PageType = () => {
    return (
        <Chapter filename="styling">
            <Section>
                <h1>Layout, styling, and animation</h1>
                <p>
                    Windrift stories are primarily composed of text, so attention to detail
                    regarding the presentation of text—both visually and for screenreaders—is
                    encouraged. Where possible, defer to general web and accessibility guidelines on
                    good user experience. This section highlights some affordances available as part
                    of Windrift, as well as some best practices that are unique to digital
                    narrative.
                </p>
                <h2>Terminology</h2>
                <ol>
                    <li>
                        Windrift provides components called <strong>layouts</strong>, found in{' '}
                        <code>core/components/ui/layouts</code>. These are designed to be{' '}
                        <strong>reusable across many stories</strong> and control the structure of
                        the HTML page.
                    </li>
                    <li>
                        Each individual story has a <strong>story template</strong>. This is the{' '}
                        <code>index.tsx</code> page created for you when you run the story
                        generator. By default this will use the default <strong>layout</strong>.
                        Every chapter in your story will be rendered inside this page.
                    </li>
                    <li>
                        Finally, within each story, chapter, or section you can control the{' '}
                        <strong>styling</strong> of the text and other media.
                    </li>
                </ol>
                <h2>
                    Layout using the <kbd>Grid</kbd> component
                </h2>
                <p>
                    Your story template calls a layout component provided in{' '}
                    <code>core/components/ui/layouts</code>.
                </p>

                <p>
                    The default layout is <code>core/components/ui/layouts/grid.tsx</code>, which
                    implements the HTML <code>&lt;head&gt;</code>, a top <code>&lt;header&gt;</code>
                    , and a <code>&lt;main&gt;</code> block.
                </p>
                <p>
                    The main block is composed of a three-column layout with the following HTML
                    structure:
                </p>
                <div style={{ textAlign: 'center' }}>
                    <img
                        src="/stories/manual/images/page-template.svg"
                        alt="Diagram of default page layout"
                    />
                </div>
                <br />
                <br />
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
     * import styles from 'public/stories/manual/styles/Index.module.scss'
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
                    When you run <code>npm run start &lt;your-story-id&gt;</code>, Windrift
                    generates a file <code>stories/&lt;your-story-id&gt;/index.tsx</code>. By
                    default it looks like this:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`import * as React from 'react'

import Grid from 'core/components/ui/layouts/grid'
import { PageType } from 'core/types'

import styles from 'public/stories/<your-story-id>/styles/Index.module.scss'

const Index: PageType = ({ children }) => {
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
                    As you can see, it passes along your story's styles and an empty placeholder for
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
                        src="/stories/manual/images/rendered-template.svg"
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
                        src="/stories/manual/images/left.svg"
                        alt="Diagram of layout with left nav"
                    />
                </div>
                <p>
                    Similarly, to put a common element in the center pane of any story, add it
                    before or after <code>{`{children}`}</code>. For example, the table of contents
                    at the top of this manual is implemented as a custom component which is
                    prepended before all the chapter content:
                </p>
                <SyntaxHighlighter language="tsx" style={prism}>
                    {`// stories/manual/index.tsx
import TableOfContents from './table-of-contents'
import { PageType } from 'core/types'

const Index: PageType = ({ children }) => (
    <Grid ...>
        <TableOfContents />
        {children}
    </Grid>)`}
                </SyntaxHighlighter>
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

                <h2>Styling</h2>

                <p>
                    Windrift ships with <a href="https://sass-lang.com/">Sass</a> (SCSS), an
                    extension to CSS that allows a richer expression of styles, reusable rules, and
                    variables. All plain CSS is valid SCSS, so you don't have to use SCSS if you
                    don't want to. However, there are a few Windrift-specific features to get
                    oriented on before customizing your story's styles.
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
                    The word "module" in the file indicates that this is a CSS Module, which means
                    its use is limited to a specific React component. In this case it will be scoped
                    to your specific story, since it's associated with the <code>index.tsx</code>{' '}
                    story template.
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
                    style={prism}>{`/* public/stories/manual/Index.module.scss */
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
                    }>{`import styles from 'public/stories/manual/styles/Index.module.scss'
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
                    Typically, multiword CSS class names are hyphen-separated, but because CSS
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
                    You're not confined to putting all styles in your single{' '}
                    <code>Index.module.scss</code> file; for large stylesheets you can break up the
                    files and import them using SCSS syntax, and if your story includes styles that
                    only apply to specific chapters or components, use and import CSS modules just
                    for those components.
                </p>
                <p>
                    Though the technique may be unfamiliar at first, using CSS Modules prevents a
                    style from one story from bleeding over into another and has become a
                    recommended best practice in the React community. You will also get the benefit
                    of hot reloading (changes to styles will immediately update in your story while
                    you develop) and compatibility with any future improvements from Windrift core.
                </p>
                <aside className={styles.advanced}>
                    NextJS (and therefore Windrift) support other mechanisms of importing CSS,
                    including the "CSS in JS" approach. See the{' '}
                    <a href="https://nextjs.org/docs/basic-features/built-in-css-support">
                        NextJS documentation on CSS support
                    </a>{' '}
                    for a full reference.
                </aside>
                <h2>Fonts</h2>
                <p>
                    You're encouraged to use <a href="https://fonts.google.com/">Google Fonts</a>,
                    which load quickly and reliably, offer a huge range of character sets, and are
                    optimized for screen (rather than print) usage.
                </p>
                <p>You'll need to do the following steps to add a new font to a story:</p>
                <ol>
                    <li>
                        Import the font in the <code>Index.module.scss</code> file
                    </li>
                    <li>Assign the new font to the desired style</li>
                </ol>
                <h3>Step 1: Import the font in your story CSS</h3>
                <p>
                    After any SCSS `@use` declarations, add an import call to the specific fonts.
                    Google Fonts will give you the correct syntax:
                </p>
                <SyntaxHighlighter language="css" style={prism}>
                    {`/* public/stories/<your-story-id>/Index.module.scss */
@use '/public/styles/grid';
@use '/public/styles/colors';

/* Add the import statement that Google Fonts generated for you: */
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond&display=block");

.main {
    /* Customizations can go here */
 }
`}
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

                <h3>Step 2: Assign the new font as the default, or to a specific element</h3>
                <p>
                    To use your new font as the default for all text, make use of the built-in SCSS{' '}
                    <code>$body</code> variable and assign it to your font:
                </p>
                <SyntaxHighlighter
                    language="css"
                    style={prism}>{`/* public/stories/<your-story-id>/Index.module.scss */

/* Add this block: */
@use '/public/styles/fonts' with (
    $body: 'EB Garamond',
);
@use '/public/styles/grid';
@use '/public/styles/colors';

@import url("https://fonts.googleapis.com/css2?family=EB+Garamond&display=block");

.main {
    /* Customizations can go here */
 }`}</SyntaxHighlighter>

                <p>
                    To limit your new font to only specific elements, such as{' '}
                    <code>&lt;h1&gt;</code>, you can skip the inherited template and add a specific
                    rule:
                </p>
                <SyntaxHighlighter
                    language="css"
                    style={prism}>{`/* public/stories/<your-story-id>y/Index.module.scss */

@import url("https://fonts.googleapis.com/css2?family=EB+Garamond&display=block");

.main {
    h1 {
        font-family: 'EB Garamond';
    }
}`}</SyntaxHighlighter>
                <aside className={styles.warning}>
                    NextJS has a framework for{' '}
                    <a href="https://nextjs.org/docs/basic-features/font-optimization">
                        Font Optimization
                    </a>{' '}
                    that offers attractive performance benefits but requires globally modifying your
                    entire Windrift config and affecting all stories within it. These benefits are
                    negligible for a hypertext story so it's recommended to follow the CSS-based{' '}
                    <code>@import</code> process documented here for maximum flexibility.
                </aside>
                <h2>Animation</h2>

                <p>
                    Windrift comes bundled with two methods for animating or transitioning elements:{' '}
                    <a href="https://reactcommunity.org/react-transition-group/">
                        react-transition-group
                    </a>{' '}
                    and <a href="https://react-spring.io/">react-spring</a>. React Transition Group
                    applies and removes CSS classes when React elements enter or leave the DOM and
                    is good for animations that don't require complex timings or dependency chains.
                    React Spring is a powerful library that uses spring physics to animate value
                    changes and apply them to any value, including position, opacity, or scale.
                </p>
                <p>
                    React Transition Group is used in the core library for the default fade-in
                    animation for new Sections.
                </p>
                <p>
                    The timings for the section fade-in are controlled in{' '}
                    <code>public/styles/_transitions.scss</code>. You can override these transition
                    classes with different values in your story's CSS, but note that you'll need to
                    use "traditional" CSS (not CSS Modules), as those classes are defined outside
                    the scope of your specific story.
                </p>
                <h3>
                    Using <kbd>FadeIn</kbd>
                </h3>
                <p>
                    By default, new sections fade in but <code>Response</code>s simply appear. A{' '}
                    <code>FadeIn</code> UI component is provided if you want to change this
                    behavior:
                </p>
                <SyntaxHighlighter
                    language="tsx"
                    style={prism}>{`// import FadeIn from 'core/components/ui/fadein'

 <R tag="animation"
    options={{
        fade: <FadeIn>I will fade in.</FadeIn>,
        appear: <p>I will just appear.</p>
    }} />`}</SyntaxHighlighter>
                <aside>
                    <p>Select how you want the response to be displayed: </p>
                    <C
                        tag="animation"
                        options={[['fade', 'appear']]}
                        persist={true}
                        widget={BulletedList}
                    />
                    <p>
                        <R
                            tag="animation"
                            options={{
                                fade: <FadeIn>I will fade in.</FadeIn>,
                                appear: <p>I will just appear.</p>
                            }}
                        />
                    </p>
                </aside>
                <p>
                    In text-heavy stories, use animation sparingly. It's recommended that you make
                    the durations quick and use short delays. Animations that are novel at first
                    tend to fatigue readers over time.
                </p>
                <p>
                    The <code>FadeIn</code> component takes only one option, which is the element
                    that wraps the faded component and defaults to <code>span</code>.{' '}
                    <code>FadeIn</code> is just a convenient pass-through to React Spring, so
                    customize it by creating your own version.
                </p>
                <p>
                    Animating in React and tying the animation events to Windrift choice/inventory
                    responses is beyond the scope of this document, but there are several examples
                    of such animations in the{' '}
                    <a href="https://playground.windrift.app">Windrift Playground</a> (
                    <a href="https://github.com/lizadaly/windrift-playground">source</a>).
                </p>
                <FooterNav
                    text="Learn about automated browser testing and continuous integration..."
                    next="testing"
                />
            </Section>
        </Chapter>
    )
}
