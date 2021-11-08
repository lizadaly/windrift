import { Section, Chapter, Nav } from 'core/components'
import { PageType } from 'core/types'
import { SyntaxHighlighter, prism, styles } from '..'

export const Page: PageType = () => (
    <Chapter filename="introduction">
        <Section>
            <h2>About Windrift</h2>
            <p>
                Windrift is a hypertext story engine designed for writing highly customizable
                mutable narratives. It is specifically optimized for telling interactive stories
                with the following characteristics:
            </p>
            <ul>
                <li>A hypertext story primarily experienced on the web.</li>
                <li>
                    A story that emphasizes long-form narrative, mood, and the primacy of the text
                    itself.
                </li>
                <li>
                    Narratives that play with language and change their content in response to user
                    input, but not necessarily based on branching plotlines.
                </li>
                <li>
                    Stories that have unique, bespoke user interface components, or by authors who
                    want absolute control over the layout and presentation of their stories.
                </li>
            </ul>
            <p>This definition is extremely loose! There is no one kind of interactive fiction.</p>
            <h3>What is Windrift used for?</h3>
            <p>
                Windrift has been used to write several stories which placed highly in the
                Interactive Fiction Competition:{' '}
                <a href="https://stoneharborgame.com/">Stone Harbor</a> (2016),{' '}
                <a href="https://lizadaly.com/pages/harmonia/">Harmonia</a> (2017) both by{' '}
                <a href="https://lizadaly.com/">Liza Daly</a>. Harmonia won two{' '}
                <a href="https://xyzzyawards.org/">XYZZY Awards</a> for Innovation and use of
                Multimedia. <a href="https://lizadaly.com/projects/the-ballroom/">The Ballroom</a>{' '}
                (2019) is a short game which demonstrates some of Windrift's principles around
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
            <h2>About this manual</h2>
            <p>
                This manual is itself a Windrift story and contains many interactive examples. It
                also serves as the reference implementation for the framework itself—Windrift's core
                testing framework uses this manual to verify the library's behavior.
            </p>
            <p>
                Though the manual includes many inline code examples, be sure to look at the actual
                source code (in <code>stories/manual</code> in the Windrift repository). Some
                examples are elided for clarity.
            </p>
            <p>Windrift is packaged with other demonstration stories:</p>
            <ul>
                <li>
                    Stone Harbor prologue (<a href="https://windrift.app/stone-harbor">English</a>{' '}
                    and <a href="https://windrift.app/stone-harbor-pt">Portuguese</a>)
                </li>
                <li>
                    <a href="https://windrift.app/playground">The Playground</a> (a collection of
                    short scenes demonstrating some fun things you can do with the framework)
                </li>
                <li>
                    <a href="https://windrift.app/minimal">Minimal</a> — the simplest possible
                    Windrift story with no customizations
                </li>
            </ul>
        </Section>
    </Chapter>
)
export default Page
