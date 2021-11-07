import { Section, Chapter, Nav } from 'core/components'
import { PageType } from 'core/types'
import { SyntaxHighlighter, prism, styles } from '..'
export const Page: PageType = () => {
    return (
        <Chapter filename="deploying">
            <Section>
                <h2>Deploying your story</h2>

                <p>
                    NextJS, and therefore Windrift, have two mechanisms of deploying your
                    application: a purely "static" generation mechanism, and one that requires use
                    of a backend server. Most Windrift stories are static only, meaning they have no
                    backend needed and can be deployed on any site capable of hosting HTML files.
                    This document will focus on static deployment and hosting, which is the most
                    flexible.
                </p>
                <h3>Generating a static build</h3>
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
├   ├ /demo
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
404/             demo/            images/          stone-harbor/    stories/
_next/           global.scss      minimal/         stone-harbor-pt/ styles/
`}
                </SyntaxHighlighter>
                <p>
                    Because of browser security restrictions you won't be able to just open those
                    HTML files from your local file system, but dropping the entire <code>out</code>{' '}
                    directory in Amazon S3 or any HTML-based hosting environment will work.
                </p>
                <h3>Hosting with itch.io</h3>
                <p>
                    At the moment the file structure output by NextJS's static export is
                    incompatible with itch.io's requirements for HTML games. A workaround commonly
                    suggested by other React game developers is to host your exported story on
                    something like Github Pages, then on itch.io upload an HTML file that contains
                    just an iframe to your hosted story on Github.
                </p>
            </Section>
        </Chapter>
    )
}
