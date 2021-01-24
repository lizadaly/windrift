import { Next } from 'core/actions/navigation'
import { C, Section, Chapter } from 'core/components'
import { BaseList } from 'core/components/widgets'
import { PageType } from 'core/types'
import More from 'core/components/more'

export const Page: PageType = () => (
    <Chapter filename="chapter3">
        <Section>
            <h1>Chapter 3: Navigation</h1>
            <p>By default, exhausting the choice list will move to the next section.</p>
            <p>
                <C choices={[['Next section.', null]]} tag="c3-next" widget={BaseList} />
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
                    widget={BaseList}
                    next={Next.None}
                />
            </p>
            <p>
                There's a special navigational component, <code>More</code>, for just the previous
                case of a link with a single item that advances the story. By default it will print
                "More..." but you can customize this with the <code>text</code> prop. It accepts the
                same <code>next</code> props as <code>Choice</code>.
            </p>
            <aside>
                Unlike a <code>Choice</code>, it will not set anything in the inventory, so you
                can't check <code>Response</code> based on that. Use a single-item
                <code>Choice</code> in this case.
            </aside>
            <More text="More..." />
        </Section>
        <Section>
            <p>
                Passing a string as the <code>next</code> parameter will jump the narrative to that
                chapter's filename. (You can't jump to a section.)
            </p>
            <aside>
                Note that we use a <code>Choice</code> here because we'll print a custom{' '}
                <code>Response</code> after this jump.
            </aside>
            <C
                choices={[['Go to chapter 1', null]]}
                tag="c3-chapter1"
                widget={BaseList}
                next={'chapter1'}
            />
        </Section>
    </Chapter>
)
