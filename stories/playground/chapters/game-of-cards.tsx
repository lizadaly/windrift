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
    z: number
}
interface SceneryProps {
    items: Item[]
    sceneConfig?: SpringConfig
}
const Scenery = ({ items, sceneConfig = config.stiff }: SceneryProps): JSX.Element => {
    const { show } = React.useContext(SceneContext)
    const showables = show ? items : []
    const transitions = useTransition(showables, {
        from: ({ x, y, z }) => ({ x, y, z }),
        enter: { x: 0, y: 0, z: 0 },
        leave: ({ x, y, z }) => ({ x, y, z }),
        delay: 200,
        config: sceneConfig
    })
    return transitions(
        ({ x, y, z }: Item, item) =>
            item && (
                <animated.div
                    style={{
                        transform: to([x, y, z], (x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`)
                    }}
                    className={item.cls.map((c) => `${cards[c]}`).join(' ')}></animated.div>
            )
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
        ({ xyz }, item) =>
            item && (
                <animated.div
                    style={{
                        transform: xyz.to((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`)
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
    className: string
}
const Scene: React.FC<SceneProps> = ({ children, turn, className }) => {
    const item = useChapter()

    return (
        <SceneContext.Provider value={{ show: item.bookmark === turn }}>
            <div className={`${className} ${cards.scene}`}>{children}</div>
        </SceneContext.Provider>
    )
}
export const Page: PageType = () => {
    useChapterSetup(filename, scenes)

    return (
        <div className={cards.container}>
            <ChapterContext.Provider value={{ filename }}>
                <Stage>
                    <Scene turn={0} className={cards.beach}>
                        <Card className={cards.card1}>
                            <h2>Talk to the animals!</h2>
                            <p>
                                It's a beautiful day at the beach and you can talk to animals. What
                                do they have to say?
                            </p>
                            {/* <C options={[['Go to next scene']]} tag="scene1" persist={true} /> */}
                        </Card>
                        <Scenery
                            items={[
                                { cls: ['sand', 'bottom', 'object'], x: 0, y: 100, z: 0 },
                                { cls: ['palm1', 'left', 'object'], x: -200, y: 0, z: 0 },
                                { cls: ['palm1', 'right', 'object'], x: 500, y: 0, z: 0 }
                            ]}
                        />
                        <Scenery
                            sceneConfig={config.molasses}
                            items={[{ cls: ['crab1', 'object'], x: -900, y: 0, z: 0 }]}
                        />
                    </Scene>

                    <Scene turn={1} className={cards.ocean}>
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
