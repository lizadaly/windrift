import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
import { SyntaxHighlighter, prism, FooterNav } from '..'
export const Page: PageType = () => {
    return (
        <Chapter filename="deploying">
            <Section>
                <h1>Deploying your story</h1>

                <p>
                    NextJS, and therefore Windrift, has two mechanisms of deploying your
                    application: a purely "static" generation mechanism, and one that requires use
                    of a backend server. Most Windrift stories are static only, meaning they need no
                    backend and can be deployed on any site capable of hosting HTML files. This
                    document will focus on static deployment and hosting.
                </p>
                <h2>Generating a static build</h2>
                <p>
                    During development using <code>npm run dev</code>, you are running a local Node
                    server that comes packaged with NextJS. To build statically, you'll use a
                    different command:
                </p>
                <aside>
                    <code>npm run export</code>
                </aside>
                <p>
                    This command will generate a local folder, <code>out</code>, containing one HTML
                    page for each of your stories. For example, when run from the default Windrift
                    install, you'll get this manual plus all other included sample stories:
                </p>
                <SyntaxHighlighter language="bash" style={prism}>
                    {`$ npm run build
[...]

Page                              Size     First Load JS
┌   /_app                         0 B            69.2 kB
├ ● /[story]/[[...chapter]]       59.5 kB         129 kB
├   ├ /manual
├   ├ /minimal
├   ├ /stone-harbor
├   └ /stone-harbor-pt
└ ○ /404                          194 B          69.4 kB
+ First Load JS shared by all     69.2 kB
  ├ chunks/framework.c93ed7.js    42.6 kB
  ├ chunks/main.1f2c59.js         23.6 kB
  ├ chunks/pages/_app.dbf9d9.js   576 B
  ├ chunks/webpack.9c0dc3.js      2.46 kB
  └ css/c02acf3b427bae0b01cb.css  339 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)

info  - Loaded env from /Users/liza/github/windrift/.env
info  - Using webpack 5. Reason: Enabled by default https://nextjs.org/docs/messages/webpack5
info  - using build directory: /Users/liza/github/windrift/.next
info  - Copying "static build" directory
info  - No "exportPathMap" found in "next.config.js". Generating map from "./pages"
info  - Launching 9 workers
info  - Copying "public" directory
info  - Exporting (1/1)
Export successful. Files written to /Users/liza/github/windrift/out


$ ls -F out
404/             manual/            images/          stone-harbor/    stories/
_next/           global.scss      minimal/         stone-harbor-pt/ styles/
`}
                </SyntaxHighlighter>
                <p>
                    Note that each story is containined in a subdirectory containing an{' '}
                    <code>index.html</code> file. The easiest way to deploy a Windrift instance is
                    to copy the entire <code>out</code> folder to a bucket in Amazon S3, to use
                    Github Pages, or copy to any HTML-based hosting environment.
                </p>
                <p>
                    Don't just copy the single HTML file for your story—the actual source code is
                    contained in the <code>_next/</code> folder at the top of the tree. Any images
                    or CSS will also be at the root of the <code>out</code> folder. If you need to
                    output the JavaScript at a different location, you can modify{' '}
                    <code>next.config.js</code> at the root of the Windrift installation to use a
                    different <code>assetPath</code>, but this will not affect images or other
                    static assets. (Unfortunately the NextJS options for fine-grained control over
                    exported static asset paths are{' '}
                    <a href="https://github.com/vercel/next.js/issues/2581">somewhat limited</a>—you
                    may be better off doing a post-hoc transformation of the generated HTML.)
                </p>
                <p>
                    More information on the options and limitations of static output can be found in
                    the{' '}
                    <a href="https://nextjs.org/docs/advanced-features/static-html-export">
                        NextJS static HTML export
                    </a>{' '}
                    page.
                </p>
                <h3>Hosting with itch.io</h3>
                <p>
                    At the moment the file structure output by NextJS's static export is
                    incompatible with itch.io's{' '}
                    <a href="https://itch.io/docs/creators/html5">requirements for HTML games</a>. A
                    workaround commonly suggested by other React game developers is to host your
                    exported story on something like Github Pages, then on itch.io upload an HTML
                    file that contains just an iframe to your hosted story on Github.
                </p>
                <h2>Deploying with dynamic content</h2>
                <p>
                    One of NextJS's strengths is that it allows React developers to easily mix
                    server-side dynamic content with static, front-end-only content. Though not
                    covered in this version of the manual, NextJS provides tools for building rich
                    server-side APIs which can be used to connect to backend databases, talk to
                    third-party APIs, or procedurally generate content in real time.
                </p>
                <p>
                    Future versions of Windrift will directly support server-side tooling, but
                    stories that use these features won't be able to use purely static export
                    processes. Fortunately, NextJS has wide support in the ecosystem, so it should
                    be straightforward to find documentation on how to deploy a NextJS app on AWS,
                    Google Cloud, or "serverless" backends like Netlify or Serverless.com.
                </p>
                <h3>Hosting with Vercel</h3>
                <p>
                    By far the most straightforward hosting mechanism for any NextJS application is
                    to use the hosting site <a href="https://vercel.com">Vercel</a>, which is run by
                    the same company that produces NextJS itself. (This manual is itself hosted on
                    Vercel at <a href="https://windrift.app/manual">windrift.app</a>.) Hosting with
                    Vercel is free, well-documented, and provides many other benefits including use
                    of NextJS's server-side features. However, Vercel may not exist forever, so it
                    is always desirable to use purely static exports for longevity and inclusion on
                    sites like the <a href="https://www.ifarchive.org/">IF Archive</a>, assuming the
                    story itself allows for this option.
                </p>
                <p>
                    <a href="https://vercel.com/docs/concepts/next.js/overview">
                        Consult the NextJS documentation
                    </a>{' '}
                    for the most current instructions on deploying with Vercel.
                </p>
                <FooterNav text="How to write in Markdown..." next="writing-in-md.mdx" />
            </Section>
        </Chapter>
    )
}
