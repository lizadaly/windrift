import { Next } from 'core/actions/navigation'
import { C, R, Section, Chapter, Nav } from 'core/components'
import { BulletedList, BaseList } from 'core/components/widgets'
import { PageType } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="chapter1">
        <Section>
            <h1>Chapter 1: Choices</h1>
            <R
                tag="c3-chapter1"
                to={{
                    '1': (
                        <>
                            <p>
                                <b>You came here via chapter 3.</b> Note that any previous choices
                                are still here.
                            </p>
                            <p>
                                If you don't need to remark on the navigation change, you can see
                                the shorthand <code>Nav</code> component to allow players to switch
                                between chapters. <Nav text="Go to chapter 4" next="chapter4" />.
                            </p>
                        </>
                    )
                }}
            />
            <h2>Default widget: inline</h2>
            <p>This will display each choice inline, leaving behind the chosen one.</p>
            Would you like a{' '}
            <C
                choices={[['ripe banana', 'bulbous orange', 'fuzzy kiwi']]}
                extra={{ conjunction: 'or' }}
                tag="fruit"
            />
            ?
        </Section>
        <Section>
            <h2>Bulleted list widget</h2>
            <p>
                This will display each item as a bulleted list, like a menu. All items will remain
                onscreen after the choice.
            </p>
            <p>What is your favorite kind of tree?</p>
            <C
                choices={[['poplar', 'elm', 'baobab']]}
                tag="tree"
                widget={BulletedList}
                next={Next.Chapter}
            />
        </Section>
    </Chapter>
)
