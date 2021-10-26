import Image from 'next/image'

import { Section, Chapter, Nav, When, C } from 'core/components'
import { PageType } from 'core/types'
import useInventory from 'core/hooks/use-inventory'
import ImageChoice from 'core/components/widgets/image-choice'
import { SyntaxHighlighter, prism, styles } from '..'

export const Page: PageType = () => {
    return (
        <Chapter filename="styling">
            <Section>
                <h2>Layout and styling</h2>
                <p>
                    Windrift stories are primarily composed of text, so attention to detail around
                    the presentation of text (both visually and for screenreaders) is encouraged.
                    Where possible, defer to general web and accessibility guidelines related to
                    user experience. This section will highlight some affordances avaialble as part
                    of Windrift, as well as some best practices that are unique to digitial
                    narrative.
                </p>
                <h3>Layout</h3>
                <p>
                    As discussed in the section on <Nav text="story structure" next="structure" />,
                    a Windrift story will be contained inside a template called{' '}
                    <code>index.tsx</code>, provided by the story generator script. By default, this
                    will generate a template that calls a layout component provided in{' '}
                    <code>core/components/ui/layouts</code>.
                </p>

                <div className={styles.twoUp}>
                    <p>
                        The default layout provided is{' '}
                        <code>core/components/ui/layouts/grid.tsx</code>, which implements the
                        default HTML <code>&lt;head&gt;</code>, a top header, and a body area. The
                        body is composed of a three-column layout with the following HTML structure:
                    </p>
                    <img
                        src="/stories/demo/images/page-template.svg"
                        alt="Diagram of default page layout"
                    />
                    <div>
                        <p>
                            When called from the default <code>index.tsx</code> provided by the
                            story generator, you'll get a rendered layout like this. The left and
                            right <code>&lt;nav&gt;</code> elements are empty and used only for
                            right and left gutters.
                        </p>
                        <p>
                            The top header provides the story title, and a reset button component:{' '}
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
                <h3>Fonts</h3>
                <p>
                    NextJS provides a good basis for{' '}
                    <a href="https://nextjs.org/docs/basic-features/font-optimization">
                        font management
                    </a>
                    , but most authors can follow some defaults provided in the Windrft sample
                    stories. You're encouraged to use{' '}
                    <a href="https://fonts.google.com/">Google Fonts</a> in almost all cases. Google
                    Fonts are served quickly and reliably, offer a huge range of character sets, and
                    are optimized for display (rather than print) usage.
                </p>
                <p>You'll need to do the following steps to add a new font to a story:</p>
                <h4>Import the font in your story template</h4>
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
                    for the font to be completely loaded before rendering the text content. This is
                    not the usual web recommendation, where it's typically better to put some
                    content in front of users as fast as possible and then switch in the correct
                    font later. Hypertext stories are generally loaded all at once, rather than have
                    a confusing switch between default system and imported fonts, it's recommended
                    to use the <code>block</code> option here. (See{' '}
                    <a href="https://font-display.glitch.me/">font-display tutorial</a> by Monica
                    Dinculescu for an excellent summary of CSS font rendering options.)
                </p>
                <aside className={styles.warning}>
                    Don't use the shorter <code>@import</code> form of font loading that Google
                    Fonts might suggest—NextJS will perform useful optimizations on the{' '}
                    <code>&lt;link&gt;</code> syntax listed above only.
                </aside>
            </Section>
        </Chapter>
    )
}
