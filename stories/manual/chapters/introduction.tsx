import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
import { FooterNav } from '..'

export const Page: PageType = () => (
    <Chapter filename="introduction">
        <Section>
            <h1>About Windrift</h1>
            <p>
                Windrift is a hypertext story engine designed for writing highly customizable
                mutable narratives. It is specifically optimized for telling the following kinds of
                interactive stories:
            </p>
            <ul>
                <li>Hypertext stories primarily experienced on the web.</li>
                <li>
                    Stories that emphasize long-form narrative, mood, and the primacy of the text
                    itself.
                </li>
                <li>
                    Narratives that play with language and change their content in response to user
                    input, but not necessarily based on branching plotlines.
                </li>
                <li>
                    Stories that have unique, bespoke user interface components, or are written by
                    authors who want absolute control over the layout and presentation of their
                    stories.
                </li>
            </ul>
            <p>This definition is extremely loose! There is no one kind of interactive fiction.</p>
            <h2>What is Windrift used for?</h2>
            <p>
                Windrift has been used to write several stories which placed highly in the
                Interactive Fiction Competition:{' '}
                <a href="https://stoneharborgame.com/">Stone Harbor</a> (2016) and{' '}
                <a href="https://lizadaly.com/pages/harmonia/">Harmonia</a> (2017), both by{' '}
                <a href="https://lizadaly.com/">Liza Daly</a>. Harmonia won two{' '}
                <a href="https://xyzzyawards.org/">XYZZY Awards</a> for Innovation and Use of
                Multimedia. <a href="https://lizadaly.com/projects/the-ballroom/">The Ballroom</a>{' '}
                (2019) is a short game that demonstrates some of Windrift's principles of
                "mutability". Enrique Henestroza Anguiano used Windrift to write{' '}
                <a href="http://springthing.net/2018/play_online/TheImposter/index.html">
                    The Imposter
                </a>{' '}
                (2018), and José Carlos Dias wrote the first non-English Windrift game, the{' '}
                <a href="https://stoneharborgame.com/pt/">Portuguese translation of Stone Harbor</a>{' '}
                (2021).
            </p>
            <h3>Caveats</h3>
            <p>
                Before working with Windrift, be sure it's really the right tool for you and your
                project:
            </p>
            <h4>Windrift is not great at branching stories!</h4>
            <p>
                Windrift does not provide strong affordances for managing complex parallel
                plotlines—you can implement such stories in Windrift, but you'll have to manage this
                state yourself. If these are the stories you want to tell, look instead at a library
                like <a href="https://www.inklestudios.com/ink/">ink</a>, which has first-order
                support for story threads that branch, join, and recombine.
            </p>
            <h4>Windrift does not have a parser!</h4>
            <p>
                There is no text input parser or world model in Windrift. If your story involves
                significant physical exploration or object manipulation, consider a parser-based
                game in <a href="http://inform7.com/">Inform 7</a> or a similar library.
            </p>
            <h4>Windrift is not for novice programmers!</h4>
            <p>
                This manual and Windrift itself expect the author to be familiar with web
                development and software engineering. It's especially helpful if you are comfortable
                with JavaScript or TypeScript and the <a href="https://reactjs.org/">ReactJS</a>{' '}
                framework. Novice programmers or people who want to just tell stories and not spend
                time on source code should start with the excellent{' '}
                <a href="https://twinery.org/">Twine</a>.
            </p>

            <h2>Windrift's building blocks</h2>
            <p>
                Windrift has always been written using the <a href="https://reactjs.org/">React</a>{' '}
                JavaScript library, using <a href="https://react-redux.js.org/">React Redux</a> as
                its mechanism for storing and updating story state. Windrift 2 is built on top of{' '}
                <a href="https://nextjs.org/">NextJS</a>, a well-designed framework for building
                React apps.
            </p>
            <p>
                Some exposure to React principles and concepts are necessary to successfully write a
                Windrift story. If you're new to React, reading through their{' '}
                <a href="https://reactjs.org/tutorial/tutorial.html">tutorial</a> will be very
                helpful. At a minimum, you should be familiar with what React components and props
                are, the syntax used by{' '}
                <a href="https://reactjs.org/docs/components-and-props.html">function components</a>{' '}
                specifically, and a little bit about{' '}
                <a href="https://reactjs.org/docs/hooks-intro.html">Hooks</a>.
            </p>
            <p>
                One of Windrift's design goals is to make as few assumptions about your story as
                possible. It assumes that authors have chosen this tool because they want to
                implement a story that might be hard or impossible to create using a more
                domain-specific language like Ink. Windrift supplies some foundational pieces, like
                the ability to store and retrieve the values of hypertext choices, and provides some
                design patterns to get you started on more custom work. It's best to think of it as
                a library of React components that you'll likely use in any kind of hypertext story,
                but otherwise a Windrift story is fundamentally a React webapp with some
                hopefully-reasonable default behaviors.
            </p>
            <h3>Relationship to Windrift v1</h3>
            <p>
                This is a major second release of the Windrift framework. Internally it is a
                complete rewrite into TypeScript using the <a href="https://nextjs.org/">NextJS</a>{' '}
                React framework as a base (replacing the independent windrift-starter repository).
                For authors, the primary differences are: changes to the names and arguments of the
                major components (<code>List</code> has become <code>Choice</code> and{' '}
                <code>Map</code> has become <code>Response</code>); the addition of the YAML story
                metadata file; and some simplifications in how chapters are constructed. In most
                cases an in-progress Windrift 1 story should require only cosmetic changes to port
                to Windrift 2.
            </p>
            <h2>About this manual</h2>
            <p>
                This manual is itself a Windrift story and contains many interactive examples. It
                also serves as the reference implementation for the framework itself—Windrift's core
                testing framework uses this manual to verify the library's behavior.
            </p>
            <p>
                Though the manual includes many inline code examples, be sure to look at the actual
                source code (in <code>stories/manual</code> in the Windrift repository), as some
                inline examples are elided for clarity.
            </p>
            <p>Windrift is packaged with other demonstration stories:</p>
            <ul>
                <li>
                    Stone Harbor prologue (<a href="https://windrift.app/stone-harbor">English</a>{' '}
                    and <a href="https://windrift.app/stone-harbor-pt">Portuguese</a>)
                </li>
                <li>
                    <a href="https://windrift.app/minimal">Minimal</a> — the simplest possible
                    Windrift story with no customizations
                </li>
            </ul>
            <p>
                A related repository called the{' '}
                <a href="https://playground.windrift.app/">Windrift Playground</a> contains{' '}
                <a href="https://github.com/lizadaly/windrift-playground">source code</a>
                for stories that are a bit further afield than the ones in this repository. These
                demonstrate how to extend Windrift's capabilities to produce digital poetry, visual
                novels, or stories that might otherwise be difficult to produce with domain-specific
                interactive fiction tools.
            </p>
            <h3>Get started</h3>
            <p>
                The table of contents at the top of this page allows you to read the manual in any
                order, but it's best to follow along linearly, as some examples build on each other.
            </p>

            <FooterNav
                text="Start learning about the structure of a Windrift story..."
                next="structure"
            />
        </Section>
    </Chapter>
)
export default Page
