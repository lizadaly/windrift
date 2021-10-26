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
                    the presentation of text (both visually and for screenreaders) is encouraged.
                    Where possible, defer to general web and accessibility guidelines on good user
                    experience. This section will highlight some affordances avaialble as part of
                    Windrift, as well as some best practices that are unique to digitial narrative.
                </p>
                <h3>
                    Layout with <kbd>Grid</kbd>
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
                            The default layout provided is{' '}
                            <code>core/components/ui/layouts/grid.tsx</code>, which implements the
                            HTML <code>&lt;head&gt;</code>, a top <code>&lt;header&gt;</code>, and a{' '}
                            <code>&lt;main&gt;</code> block.
                        </p>
                        <p>
                            The body is composed of a three-column layout with the following HTML
                            structure:
                        </p>
                    </div>
                    <img
                        src="/stories/demo/images/page-template.svg"
                        alt="Diagram of default page layout"
                    />
                    <div>
                        <p>
                            When called with the default code provided by the story generator,
                            you'll get a rendered layout like this. The left and right{' '}
                            <code>&lt;nav&gt;</code> elements are empty and used as gutters.
                        </p>
                        <p>
                            The top header provides the story title and a reset button:{' '}
                            <code>core/components/ui/reset-button.tsx</code>. You are strongly
                            encouraged to provide a reset button for all stories, but you can
                            customize the text and design as much as needed.
                        </p>
                    </div>
                    <img
                        src="/stories/demo/images/rendered-template.svg"
                        alt="Diagram of layout populated with page contents"
                    />
                </div>
                <aside className={styles.advanced}>
                    <p>
                        You don't need to use <code>Grid</code>. A minimal layout as{' '}
                        <code>core/components/ui/layouts/minimal.tsx</code> is provided if you want
                        to completely customize the whole thing. See{' '}
                        <code>stories/minimal/index.tsx</code> for an example of using the Minimal
                        layout. If you use <code>Minimal</code> you'll need to write all of your CSS
                        from the ground up, as the default CSS is designed to match{' '}
                        <code>Grid</code>.
                    </p>
                </aside>
                <h3>Fonts</h3>
                <p>
                    NextJS provides a good foundation for{' '}
                    <a href="https://nextjs.org/docs/basic-features/font-optimization">
                        font management
                    </a>
                    , but most authors can follow the defaults provided in the Windrft sample
                    stories. You're encouraged to use{' '}
                    <a href="https://fonts.google.com/">Google Fonts</a>, which are served quickly
                    and reliably, offer a huge range of character sets, and are optimized for
                    display (rather than print) usage.
                </p>
                <p>You'll need to do the following steps to add a new font to a story:</p>
                <ol>
                    <li>Import the font in the story template</li>
                    <li>Assign the new font to the desired style</li>
                </ol>
                <h4>Step 1: Import the font in your story template</h4>
                <p>
                    The story template will wrap every page in your story, so put the font import in
                    the header here:
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
                    Note the use of <code>display=block</code>. This instructs the browser to wait
                    for the font to be completely loaded before rendering the text content. This is{' '}
                    <em>not</em> the usual web recommendation, where it's typically better to put
                    some content in front of users as fast as possible and then switch in the
                    correct font later. Hypertext stories are generally loaded all at once up-front,
                    so using the <code>block</code> loading instruction provides a better user
                    experience than a font that shifts midway into the introduction. (See{' '}
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
                    style={prism}>{`/* public/stories/your-story/Index.module.scss */
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
                    style={prism}>{`/* public/stories/your-story/Index.module.scss */
.main {
    h1 {
        font-family: 'EB Garamond';
    }
}`}</SyntaxHighlighter>
            </Section>
        </Chapter>
    )
}
