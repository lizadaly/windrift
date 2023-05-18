import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
import { FooterNav } from '..'

export const Page: PageType = () => {
    return (
        <Chapter filename="testing">
            <Section>
                <h1>Debugging and testing</h1>

                <h2>Browser debugging tools</h2>
                <p>
                    Windrift works well with both the official React Developer Tools and the Redux
                    DevTools browser plugins, available for both Chrome and Firefox in their
                    respective app stores. The Redux DevTool is especially useful as it allows you
                    to navigate the inventory.
                </p>
                <h3>Debugging state and choices</h3>
                <p>
                    Windrift uses a combination of{' '}
                    <a href="https://github.com/omnidan/redux-undo">redux-undo</a> and{' '}
                    <a href="https://github.com/rt2zz/redux-persist">redux-persist</a> to provide a
                    history of current and past choices, and to persist those to the browser using
                    local storage.
                </p>
                <p>
                    When using the Redux DevTools to navigate the Redux store, look for your choice
                    or inventory values in the "present" part of their respective stores. For
                    example, after selecting the "fuzzy kiwi" option from the section on choices,
                    you would see a number of Redux reducer actions, including{' '}
                    <code>inventory/update</code>, which is recording that user choice.
                </p>
                <img
                    src="../stories/manual/images/debug-screenshot-1.png"
                    alt="Screenshot of the Redux debug screen"
                    width="500"
                    height="335"
                />
                <img
                    src="../stories/manual/images/debug-screenshot-2.png"
                    alt="Screenshot of the Redux debug screen"
                    width="564"
                    height="335"
                />
                <h3>Hard-resetting a story</h3>
                <p>
                    If you've included a reset button component in your story, you should be able to
                    unset most things in the story to their default state. Under the hood, the reset
                    button clears the current browser local storage, where redux-persist saves the
                    current snapshot of the Redux store.
                </p>
                <p>
                    If things have gone <em>really</em> wrong, though, the application might not
                    even be able to display the reset button. In that case deleting local storage
                    itself will absolutely start things over. The location varies by browser but you
                    should be able to find it in the browser's developer tools. For example, in
                    Firefox:
                </p>
                <aside>
                    <p>Select "delete all" from local storage to completely reset your story.</p>
                    <img
                        src="../stories/manual/images/reset-local-storage.png"
                        alt="Screenshot showing deleting the local storage of Firefox"
                        width="600"
                    />
                </aside>
                <h2>Automated testing</h2>
                <p>
                    Windrift ships with support for the browser testing framework{' '}
                    <a href="https://playwright.dev/">Playwright</a>, which it uses paired with this
                    manual's examples to verify that components and features work as expected. You
                    can use the same testing framework for your own stories. This can be especially
                    useful to detect when unexpected changes crop up as you work through a whole
                    story's development process, and is invaluable when extending Windrift with
                    custom components.
                </p>
                <aside>
                    To do all Playwright tests, run: <code>npm run test</code>
                    To run a specific Playwright test, run:{' '}
                    <code>npx playwright test FILENAME</code>
                </aside>
                <p>
                    Put your tests in <code>playwright/e2e/stories</code>—a few examples will be
                    there already.
                </p>
                <h3>Automatic test running with Github Actions</h3>
                <p>
                    Github will automatically run any Playwright tests as a Github Action if you
                    push changes using pull requests. You can modify the frequency at which
                    automatic tests are run via <code>.github/workflows/playwright.yml</code>;
                    Github does impose a limit on the number of actions you can run in a month so
                    you may not want to modify this to run on each push.
                </p>
                <p>
                    If you aren't modifying any code in <code>core</code>, it should be safe to
                    bypass the built-in tests by using{' '}
                    <a href="https://playwright.dev/docs/test-annotations">
                        Playwright test annotations
                    </a>
                    . It's recommended to keep the tests around in your code base to facilitate
                    merges from upstream, and you can always re-enable them if you're concerned that
                    one of your own changes may have affected default Windrift behavior.
                </p>
                <h3>Writing story tests</h3>
                <p>
                    Playwright has a lot of features, most of which aren't covered by the example
                    tests. Start with their{' '}
                    <a href="https://playwright.dev/docs/best-practices">best practices</a>{' '}
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
                    Windrift doesn't ship with a unit testing framework. You could integrate a
                    traditional component-level test library like{' '}
                    <a href="https://testing-library.com/docs/react-testing-library/intro/">
                        React Testing Library
                    </a>{' '}
                    or <a href="https://airbnb.io/projects/enzyme/">Enzyme</a>. It's probably
                    overkill to unit test most Windrift stories—start with functional testing via
                    the browser and see how far that takes you.
                </p>
                <FooterNav text="How to deploy your story to the web..." next="deploying" />
            </Section>
        </Chapter>
    )
}
