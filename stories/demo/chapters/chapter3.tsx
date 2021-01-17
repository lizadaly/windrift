import { Next } from 'core/actions/navigation'
import { C, Section, Chapter } from 'core/components'
import { DefaultList } from 'core/components/widgets'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="chapter3">
        <Section>
            <h1>Chapter 3: Navigation</h1>
            <p>By default, exhausting the choice list will move to the next section.</p>
            <p>
                <C choices={[['Next section.', null]]} tag="c3-next" widget={DefaultList} />
            </p>
        </Section>
        <Section>
            <p>
                You can force skipping to the next chapter by setting
                <code>next=Next.Chapter</code>, skipping over any remaining sections, or set{' '}
                <code>next=Next.None</code> to do nothing.
            </p>
            <p>
                <C
                    choices={[['This is a no-op.', null], ['Clicked!']]}
                    tag="c3-noop"
                    widget={DefaultList}
                    next={Next.None}
                />
            </p>
            <p>
                Passing a string as the <code>next</code> parameter will jump the narrative to that
                chapter's filename. (You can't jump to a section.)
            </p>
            <C
                choices={[['Go to chapter 1', null]]}
                tag="c3-chapter1"
                widget={DefaultList}
                next={'chapter1'}
            />
        </Section>
    </Chapter>
)
