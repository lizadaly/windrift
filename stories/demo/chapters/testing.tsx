import { Section, Chapter, Nav } from 'core/components'
import { PageType } from 'core/types'
import { SyntaxHighlighter, prism, styles } from '..'

export const Page: PageType = () => {
    return (
        <Chapter filename="testing">
            <Section>
                <h2>Testing stories</h2>

                <p>
                    Windrift ships with support for the browser testing framework{' '}
                    <a href="https://www.cypress.io/">Cypress</a>, which it uses paired with this
                    manual's examples to verify that components and features work as expected. You
                    can use the same testing framework for your own stories. This can be especially
                    useful to detect when unexpected changes crop up as you work through a whole
                    story's development process, and is invaluable when extending Windrift with
                    custom components.
                </p>
                <aside>
                    To start up Cypress locally, run: <code>npm run cypress</code>
                </aside>
                <p>
                    Put your tests in <code>cypress/integration/stories</code>—a few examples will
                    be there already.
                </p>
                <h3>Automatic test running with Github Actions</h3>
                <p>
                    Github will automatically run any Cypress tests as a Github Action if you push
                    changes using pull requests. You can modify the frequency at which automatic
                    tests are run via <code>.github/workflows/cypress.yml</code>; Github does impose
                    a limit on the number of actions you can run in a month so you may not want to
                    modify this to run on each push.
                </p>
                <p>
                    If you aren't modifying any code in <code>core</code>, it should be safe to
                    bypass the built-in tests by using{' '}
                    <a href="https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Excluding-and-Including-Tests">
                        Cypress's support for skipping tests
                    </a>
                    . It's recommended to keep the tests around in your code base to facilitate
                    merges from upstream, and you can always re-enable them if you're concerned one
                    of your own changes may have affected default Windrift behavior.
                </p>
                <h3>Writing story tests</h3>
                <p>
                    Cypress has a lot of features, most of which aren't covered by the example
                    tests. Start with their{' '}
                    <a href="https://docs.cypress.io/guides/references/best-practices">
                        best practices
                    </a>{' '}
                    documentation which covers techniques for writing reliable tests. Note though
                    that they specifically discourage writing tests based on source text in the
                    document; since your story is composed primarily of text, you'll probably want
                    to (thoughtfully!) disregard this advice.
                </p>
                <p>
                    Don't write tests too early in the process. You'll very likely be changing the
                    prose often, and reordering sections. However, providing even a minimal test
                    that ensures that each chapter can be run through end-to-end is a nice safety
                    feature. You'll know right away if you accidentally closed off some critical
                    path.
                </p>
                <p>
                    Do try to write multiple test specs for each major path through a branching
                    story. If there's critical information your reader must get in a particular
                    path, write a test to assert that they still see that content. Similarly, if a
                    branch should authoritatively cut off some pathway, write a negative test to
                    assert that they never see the now-forbidden text.
                </p>
                <p>
                    If you're writing a custom component or special UI feature for your story,
                    consider also writing a "hello world" story that just exercises that feature.
                    This way you can put that component under a consistent test framework, and still
                    feel free to make major revisions to the actual story prose that will use it.
                </p>
                <h3>Unit testing</h3>
                <p>
                    Windrift doesn't ship with a unit testing framework, but Cypress has some
                    limited support for{' '}
                    <a href="https://docs.cypress.io/guides/component-testing/introduction">
                        component-level testing
                    </a>{' '}
                    in addition to browser-level testing. You could also integrate a traditional
                    component-level test library like{' '}
                    <a href="https://testing-library.com/docs/react-testing-library/intro/">
                        React Testing Library
                    </a>{' '}
                    or <a href="https://airbnb.io/projects/enzyme/">Enzyme</a>. It's probably
                    overkill to unit test most Windrift stories—start with functional testing via
                    the browser and see how far that takes you.
                </p>
            </Section>
        </Chapter>
    )
}
