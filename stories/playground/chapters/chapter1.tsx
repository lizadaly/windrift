import { C, R, Section, Chapter, Nav } from 'core/components'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="chapter1">
        <Section>
            <aside>
                <h1>Mutable content</h1>
                <p>
                    One of Windrift's key concepts is that it should support "mutable" content, or
                    content that can change, sometimes dramatically, in response to user input.
                </p>
                <p>
                    A story that demonstrates this is{' '}
                    <a href="https://lizadaly.com/projects/the-ballroom/">The Ballroom</a> (2019),
                    which was developed using an earlier version of the library but this sample
                    demonstrates a similar concept:
                </p>
            </aside>
        </Section>
    </Chapter>
)
