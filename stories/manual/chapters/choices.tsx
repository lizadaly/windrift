import { SyntaxHighlighter, prism } from '..'

import { Choice, Section, Chapter, Nav } from 'core/components'
import { BulletedList } from 'core/components/widgets'
import { PageType, Next } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="choices">
        <Section>
            <h2>Choices</h2>
            <p>
                Windrift interactivity is primarily composed of user choices—selecting from a menu
                of options to drive the next beat in the narrative.
            </p>

            <p>
                A user choice is represented using the <code>Choice</code> component. Each choice is
                given a unique string <code>tag</code>. The menu of options are composed of one or
                more <code>Option</code> strings collected into an array called an{' '}
                <code>OptionGroup</code>. The simplest type of choice is an array containing a
                single option group from which the user picks:
            </p>

            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Choice options={[['ripe banana', 'bulbous orange', 'fuzzy kiwi']]} tag="fruit" />`}
            </SyntaxHighlighter>
            <aside>
                Would you like a{' '}
                <Choice options={[['ripe banana', 'bulbous orange', 'fuzzy kiwi']]} tag="fruit" />?
            </aside>
            <p>
                By default, selecting an option will record the user's choice, leave the selected
                option visible, and then open the next <code>Section</code> in the chapter. Click on
                any of the options above to open the next section.
            </p>
        </Section>
        <Section>
            <h3>Adding multiple option groups</h3>
            <p>
                A common narrative pattern is to introduce some initial text before revealing the
                actual options. You can achieve this through adding two <code>OptionGroups</code>
                —the first introduces the choice being presented, and the second group represents
                the actual user's choice.
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Choice options={[
        ['fine choices today...'],
        ['orange kale', 'purple cucumbers', 'green pumpkins']
    ]}
    tag="vegetables" />`}
            </SyntaxHighlighter>
            <aside>
                The vegetable vendor is offering you some{' '}
                <Choice
                    options={[
                        ['fine choices today...'],
                        ['orange kale', 'purple cucumbers', 'green pumpkins']
                    ]}
                    tag="vegetables"
                    next={Next.None}
                />
                .
            </aside>
            <p>
                There's no limit to the number of option groups arrays you can include—Windrift will
                keep presenting the next in series until the user has chosen from the final option
                group available. At this point the choice is marked as <code>resolved</code>.
            </p>
            <h3>
                The <kbd>last</kbd> parameter
            </h3>
            <p>
                To override the usual behavior of printing the selected option once a choice is
                resolved, you can provide a <code>last</code> parameter to show some final text
                after the user's selection was made:
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Choice options={[
        ['towering birthday cake', 'bumbling soufflé', 'delicate cheesecake']
    ]}
    last="too many delicious things to count"
    tag="dessert" />`}
            </SyntaxHighlighter>
            <aside>
                The dessert cart contains{' '}
                <Choice
                    options={[
                        ['towering birthday cake', 'bumbling soufflé', 'delicate cheesecake']
                    ]}
                    last="too many delicious things to count"
                    tag="dessert"
                    next={Next.None}
                />
                .
            </aside>
            <p>Naturally both of these approaches can be applied to the same choice:</p>
            <aside>
                The waiter asks if you'd like to take home{' '}
                <Choice
                    options={[
                        ['the leftovers'],
                        [
                            'spare appetizers',
                            'the second Porterhouse steak',
                            'an entire cheese cart'
                        ]
                    ]}
                    last="enough food for a week"
                    tag="takehome"
                />
                .
            </aside>
        </Section>
        <Section>
            <h2>Choice displays: widgets</h2>
            <p>
                Display of choices is controlled by another component, called a widget, called by
                the
                <code>Choice</code>. By default, Windrift uses a widget called
                <code>InlineListEN</code>, which displays options in a comma-separated list ending
                in the conjunction "or". The separator and conjunction can be directly overridden,
                or a different widget can be substituted entirely by passing any widget's
                configuration options as an <code>extra</code> attribute:
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Choice
    tag="pet"
    options=[[['an adorable skink', 'a sweet-tempered marmot']]}
    extra={{ conjunction: 'and' }} />`}
            </SyntaxHighlighter>
            <aside>
                <p>
                    You are greeted by{' '}
                    <Choice
                        tag="pet"
                        options={[['an adorable skink', 'a sweet-tempered marmot']]}
                        extra={{ conjunction: 'and' }}
                    />
                    .
                </p>
            </aside>
            <p>
                See the source code for <code>InlineListEN</code> for an example of how to make a
                language-specific widget to avoid having to specify the conjunction each time, or to
                use a language-specific separator besides comma (or even to override Windrift's
                opinionated use of the Oxford comma!)
            </p>
            <h3>Bulleted list widget</h3>
            <p>
                Windrift ships with another type of widget with behavior worth noting. This
                preserves all of the options in a menu-style layout:
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Choice
    options={[['smarmy poplar', 'clever elm', 'big dumb baobab']]}
    tag="tree"
    widget={BulletedList} />`}
            </SyntaxHighlighter>
            <aside>
                <p>What is your favorite kind of sentient tree?</p>
                <Choice
                    options={[['smarmy poplar', 'clever elm', 'big dumb baobab']]}
                    tag="tree"
                    widget={BulletedList}
                />
            </aside>
            <p>
                This widget takes an additional parameter internally, called{' '}
                <code>initialOptions</code>, which is used to continue to display the possible
                choices even after a user has selected one. You're expected to use this code more as
                a guide rather than as-is, since you'll almost certainly want to customize the
                markup used to indicate the selected option.
            </p>
            <h3>Default options</h3>
            <p>
                It's possible to default a default option that will be populated in the store of
                choices even if the user makes no deliberate choice. This is most likely to be used
                for non-critical choices where you don't want to worry about whether the user
                selected it or not.
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Choice
    options={[['puce', 'magenta', 'green apple']]}
    defaultOption="magenta"
    tag="cravat" />`}
            </SyntaxHighlighter>
            <aside>
                <p>
                    What kind of cravat would you like to wear?{' '}
                    <Choice
                        options={[['Puce', 'magenta', 'green apple']]}
                        defaultOption="magenta"
                        tag="cravat"
                    />{' '}
                    (don't select an item here—we'll revisit this in the next section)
                </p>
            </aside>

            <p>In the next section we'll see how selected or default values can be retrieved.</p>
            <Nav text="Learn about displaying inventory..." next="inventory" persist={true} />
        </Section>
    </Chapter>
)
