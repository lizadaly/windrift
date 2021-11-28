import { Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
export const Page: PageType = () => {
    return (
        <Chapter filename="next">
            <Section>
                <h1>Next steps and further resources</h1>
                <p>
                    Previous sections have covered all the basics (and then some!) about installing
                    and writing a story using Windrift.
                </p>
                <h2>Recommended next steps</h2>
                <ul>
                    <li>
                        Fork the Windrift repository, check it out locally, and read through this
                        manual's source code.
                    </li>
                    <li>
                        Review the code for the other bundled stories, including{' '}
                        <a href="/stone-harbor">Stone Harbor</a>, which provides a quick foundation
                        on how a "typical" Windrift story is structured.
                    </li>
                    <li>
                        Start up the dev server with <code>npm run dev</code> and create a sample
                        story with <code>npm run start [some-story-id]</code>.
                    </li>
                    <li>
                        Check out the stories and code in the{' '}
                        <a href="https://playground.windrift.app/">Windrift Playground</a> (
                        <a href="https://github.com/lizadaly/windrift-playground">source code</a>),
                        which contains sample stories that stretch the boundaries of what a "normal"
                        hypertext story can be.
                    </li>
                </ul>
                <p>
                    Please open an <a href="https://github.com/lizadaly/windrift/issues">Issue</a>{' '}
                    if you have any problems or bug reports. Pull requests for bugs or typos are
                    also gratefully accepted!
                </p>
                <h2>Keeping up with new versions</h2>
                <p>
                    Windrift is expected to be under active development through 2021 and at least
                    early 2022. Keep an eye on the project{' '}
                    <a href="https://github.com/lizadaly/windrift#readme">README</a> for any new
                    release info and an updated roadmap.
                </p>
                <p>
                    Windrift will not be released as an npm installable library (because it's
                    intertwined with the NextJS framework) nor is it planned to be a{' '}
                    <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository">
                        template repository
                    </a>
                    (because upstream changes can't be pulled in). Instead, it's expected that users
                    will{' '}
                    <a href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork">
                        sync their fork
                    </a>{' '}
                    as needed.
                </p>
                <p>Happy Windrifting!</p>
            </Section>
        </Chapter>
    )
}
