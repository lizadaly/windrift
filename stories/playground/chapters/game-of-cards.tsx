import * as React from 'react'
import { Motion, spring, presets } from '@korbav/react-motion'
import { useDispatch } from 'react-redux'

import { C, R, Section, Chapter, When } from 'core/components'
import { Next, PageType } from 'core/types'

import { makeChoice } from 'core/features/choice'
import cards from 'public/stories/playground/styles/Cards.module.scss'
import useInventory from 'core/hooks/use-inventory'
import { styles } from 'stories/manual'

import { InlineList, InlineListProps } from 'core/components/widgets/inline-list'

// maybe something something have the widget render the html?
const CardWidget: typeof InlineList = ({ group, handler, tag, className }: InlineListProps) => {
    const hideHandler = () => {}
    return InlineList({ group, handler, tag, className, separator: ',', conjunction: 'or' })
}

const Stage: React.FC = ({ children }) => {
    return <div className={cards.stage}>{children}</div>
}
const Card: React.FC = ({ children }) => {
    let clsname = 'in'

    React.useEffect(() => {
        return () => {
            console.log('Exiting')
            window.setTimeout(() => {
                clsname = 'out'
            }, 5000)
        }
    })
    return <div className={`${cards.card} ${clsname}`}>{children}</div>
}

export const Page: PageType = () => {
    return (
        <div className={cards.container}>
            <Chapter
                filename="game-of-cards"
                useDefaultTransitions={false}
                showOnlyCurrentSection={true}>
                <Section>
                    <Stage>
                        <Card>
                            <h2>Card 1</h2>
                            <C options={[['click']]} tag="card1" widget={CardWidget} />
                        </Card>
                        <Motion
                            defaultStyle={{ x: -5000 }}
                            style={{ x: spring(0, presets.linear) }}>
                            {(value: any) => {
                                return (
                                    <div
                                        className={`${cards.tree} ${cards.left} ${cards.object}`}
                                        style={{ transform: `translate(${value.x}px, 0)` }}>
                                        left tree
                                    </div>
                                )
                            }}
                        </Motion>
                        <div className={`${cards.tree} ${cards.right} ${cards.object}`}>
                            right tree
                        </div>
                    </Stage>
                </Section>
                <Section>
                    <Stage>
                        <Card>
                            <h2>Card 2</h2>
                            <p>Has some other text and should be behind.</p>
                            <C options={[['click']]} tag="card2" />
                        </Card>
                    </Stage>
                </Section>
            </Chapter>
        </div>
    )
}
