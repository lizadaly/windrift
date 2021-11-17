import * as React from 'react'

import { Transition, useSpring, animated, SpringConfig, config } from '@react-spring/web'

import { C } from 'core/components'
import { PageType } from 'core/types'

import cards from 'public/stories/playground/styles/Cards.module.scss'

import { ChapterContext, useChapterSetup } from 'core/components/chapter'
import useChapter from 'core/hooks/use-chapter'

const filename = 'game-of-cards'
const scenes = 999

const Card: React.FC = ({ children }) => {
    const { show } = React.useContext(SceneContext)

    return show && <div className={cards.card}>{children}</div>
}

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
                        <Card>
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
                        <Card>
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
