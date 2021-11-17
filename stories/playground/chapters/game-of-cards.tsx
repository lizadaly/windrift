import * as React from 'react'

import { Transition, useTransition, animated, SpringConfig, config, to } from '@react-spring/web'

import { C } from 'core/components'
import { PageType } from 'core/types'

import cards from 'public/stories/playground/styles/Cards.module.scss'

import { ChapterContext, useChapterSetup } from 'core/components/chapter'
import useChapter from 'core/hooks/use-chapter'

const filename = 'game-of-cards'
const scenes = 999

const Stage: React.FC = ({ children }) => {
    return <div className={cards.stage}>{children}</div>
}
type SceneContextProps = {
    show: boolean
}
interface Item {
    cls: string[]
    x: number
    y: number
}
interface SceneryProps {
    items: Item[]
    sceneConfig?: SpringConfig
}
const Scenery = ({ items, sceneConfig = config.stiff }: SceneryProps): JSX.Element => {
    const { show } = React.useContext(SceneContext)
    const showables = show ? items : []
    return (
        <Transition
            items={showables}
            from={(item) => ({ translateX: `${item.x}px` })}
            enter={{
                translateX: '0px'
            }}
            leave={(item) => [{ translateX: `${item.x}px` }]}
            delay={200}
            config={sceneConfig}>
            {(styles, item) =>
                item && (
                    <animated.div
                        style={styles}
                        className={item.cls.map((c) => `${cards[c]}`).join(' ')}></animated.div>
                )
            }
        </Transition>
    )
}
interface CardProps {
    className?: string
}
const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    const { show } = React.useContext(SceneContext)
    const transitions = useTransition(show, {
        from: { xyz: [0, 200, -100] },
        enter: { xyz: [0, 0, 0] },
        leave: { xyz: [0, 200, 0] }
    })
    return transitions(
        (styles, item) =>
            item && (
                <animated.div
                    style={{
                        transform: styles.xyz.to((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`)
                    }}
                    className={`${cards.card} ${className}`}>
                    {children}
                </animated.div>
            )
    )
}

export const SceneContext = React.createContext<Partial<SceneContextProps>>({})
interface SceneProps {
    turn: number
}
const Scene: React.FC<SceneProps> = ({ children, turn }) => {
    const item = useChapter()

    return (
        <SceneContext.Provider value={{ show: item.bookmark === turn }}>
            {children}
        </SceneContext.Provider>
    )
}
export const Page: PageType = () => {
    useChapterSetup(filename, scenes)

    return (
        <div className={cards.container}>
            <ChapterContext.Provider value={{ filename }}>
                <Stage>
                    <Scene turn={0}>
                        <Card className={cards.card1}>
                            <h2>Card 1</h2>
                            <C options={[['Go to next scene']]} tag="scene1" persist={true} />
                        </Card>
                        <Scenery
                            items={[
                                { cls: ['left', 'tree', 'object'], x: -200, y: 0 },
                                { cls: ['right', 'tree', 'object'], x: 500, y: 0 }
                            ]}
                        />
                    </Scene>

                    <Scene turn={1}>
                        <Card className={cards.card2}>
                            <h2>Card 2</h2>
                            <p>Has some other text.</p>
                            <C options={[['click']]} tag="card2" />
                        </Card>
                    </Scene>
                </Stage>
            </ChapterContext.Provider>
        </div>
    )
}
