import { Next } from 'core/actions/navigation'
import { C, R, Section, Chapter } from 'core/components'
import { BaseList } from 'core/components/widgets'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="chapter2">
        <Section>
            <h1>Chapter 2: Responses</h1>
            <p>
                The <code>inventory</code>, or selected list of choices, is global to a Windrift
                story, so we can look back at what was selected in Chapter 1:
            </p>
            <p>
                <R
                    tag="fruit"
                    to={{
                        banana: (
                            <span>
                                You picked <b>a nice</b> banana
                            </span>
                        ),
                        orange: 'You picked orange',
                        kiwi: 'You picked kiwi'
                    }}
                />
                .
            </p>
            <p>You can match by regular expression too:</p>
            <p>
                <R
                    tag="fruit"
                    to={{
                        'r?pe ban*': 'This also matches banana',
                        '*range': 'This also matches orange',
                        '*iw*': 'This also matches kiwi'
                    }}
                />
                .
            </p>

            <p>
                Let's move on to navigation...{' '}
                <C
                    choices={[['Next!', null]]}
                    widget={BaseList}
                    tag="c2-next"
                    next={Next.Chapter}
                />
            </p>
        </Section>
    </Chapter>
)
