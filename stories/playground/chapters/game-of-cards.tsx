import * as React from 'react'

import { Transition, useTransition, animated, SpringConfig, config, to } from '@react-spring/web'

import { C, R, When } from 'core/components'
import { Next, Option, PageType, Tag } from 'core/types'

import cards from 'public/stories/playground/styles/Cards.module.scss'

import { ChapterContext, useChapterSetup } from 'core/components/chapter'
import useChapter from 'core/hooks/use-chapter'
import ImageChoice from 'core/components/widgets/image-choice'
import useInventory from 'core/hooks/use-inventory'
import { MultiResponse } from 'core/components/response'

const filename = 'game-of-cards'
const scenes = 999

const Animal: React.FC = ({ children }) => {
    return (
        <Transition
            items={children}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            delay={200}
            config={config.molasses}>
            {(styles, item) => item && <animated.p style={styles}>{item}</animated.p>}
        </Transition>
    )
}
const Stage: React.FC = ({ children }) => {
    return <div className={cards.stage}>{children}</div>
}
type SceneContextProps = {
    show: boolean
}
interface Chooseable {
    tag: Tag
    alt: string
    fn?: string
}
interface Item {
    cls: string[]
    x: number
    y: number
    z: number
    c?: Chooseable
}
interface SceneryProps {
    items: Item[]
    sceneConfig?: SpringConfig
    className?: string // Class applied to all objects in the scene
}
const Scenery = ({
    items,
    sceneConfig = config.stiff,
    className = ''
}: SceneryProps): JSX.Element => {
    const { show } = React.useContext(SceneContext)
    const [done, setDone] = React.useState(false)

    const showables = show ? items : []
    const transitions = useTransition(showables, {
        from: ({ x, y, z }) => ({ x, y, z }),
        enter: { x: 0, y: 0, z: 0 },
        leave: ({ x, y, z }) => ({ x, y, z }),
        delay: 200,
        config: sceneConfig,
        onRest: () => setDone(true)
    })
    return transitions(
        ({ x, y, z }: Item, item) =>
            item && (
                <animated.div
                    style={{
                        transform: to([x, y, z], (x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`)
                    }}
                    className={item.cls
                        .map((c) => `${className} ${cards[c]} ${item.c ? cards.chooseable : ''}`)
                        .join(' ')}>
                    {item.c && (
                        <C
                            tag={item.c.tag}
                            options={[[item.c.tag as Option]]}
                            widget={ImageChoice}
                            extra={{
                                src: `/stories/playground/images/${item.c.fn || item.c.tag}.webp`,
                                alt: item.c.alt,
                                option: item.c.tag as Option
                            }}
                            persist={false}
                            next={Next.None}
                            className={done ? cards.rest : ''} // Apply a 'rest' class, if it is defined, on animation completion
                        />
                    )}
                </animated.div>
            )
    )
}
interface CardProps {
    className?: string
}
const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    const { show } = React.useContext(SceneContext)
    const transitions = useTransition(show, {
        from: { xyz: [0, 2000, -100] },
        enter: { xyz: [0, 0, 0] },
        leave: { xyz: [0, 2000, 0] }
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
            <div
                className={`${className} ${cards.scene} ${
                    item.bookmark === turn ? cards.active : null
                }`}>
                {children}
            </div>
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
                        {/* Sea */}
                        <Scenery
                            sceneConfig={config.stiff}
                            className={cards.object}
                            items={[
                                { cls: ['sea'], x: 0, y: -100, z: 0 },
                                { cls: ['lighthouse'], x: 200, y: 0, z: 0 }
                            ]}
                        />
                        <Card className={cards.card1}>
                            <p>It's a beautiful day at the beach and you can talk to animals.</p>
                            <div className={cards.responses}>
                                <div>
                                    <R
                                        tag="crab1"
                                        options={{
                                            '*': (
                                                <Animal>
                                                    "I can live to be 40 years old," says the
                                                    blue-shelled hermit crab.
                                                </Animal>
                                            )
                                        }}
                                    />
                                </div>
                                <div>
                                    <R
                                        tag="crab2"
                                        options={{
                                            '*': (
                                                <Animal>
                                                    "Outside of my shell I'm quite soft," murmurs
                                                    the yellow-shelled hermit crab.
                                                </Animal>
                                            )
                                        }}
                                    />
                                </div>
                                <div>
                                    <R
                                        tag="gull"
                                        options={{
                                            '*': (
                                                <Animal>
                                                    "There's no ethical consumption under
                                                    capitalism," says the gull.
                                                </Animal>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                            <MultiResponse
                                tags={['crab1', 'crab2', 'gull']}
                                options={{
                                    '*': (
                                        <C
                                            options={[['Visit more animals!']]}
                                            tag="scene1"
                                            persist={true}
                                        />
                                    )
                                }}
                            />
                        </Card>
                        {/* Beach items */}
                        <Scenery
                            className={cards.object}
                            sceneConfig={config.gentle}
                            items={[
                                { cls: ['sand'], x: 0, y: 100, z: 0 },
                                { cls: ['palm1', 'left'], x: -200, y: 0, z: 0 },
                                { cls: ['palm2', 'right'], x: 500, y: 0, z: 0 }
                            ]}
                        />
                        {/* Foreground */}
                        <Scenery
                            className={cards.object}
                            sceneConfig={config.molasses}
                            items={[
                                {
                                    cls: ['crab1'],
                                    c: {
                                        alt: 'A hermit crab',
                                        tag: 'crab1'
                                    },
                                    x: -200,
                                    y: 0,
                                    z: 0
                                },
                                {
                                    cls: ['crab2'],
                                    c: {
                                        alt: 'A hermit crab',
                                        tag: 'crab2'
                                    },
                                    x: -1000,
                                    y: 0,
                                    z: 0
                                }
                            ]}
                        />
                        <Scenery
                            className={cards.object}
                            sceneConfig={{ tension: 180, friction: 6 }}
                            items={[
                                {
                                    cls: ['gull'],
                                    c: {
                                        alt: 'A gull',
                                        tag: 'gull'
                                    },
                                    x: 0,
                                    y: -100,
                                    z: 0
                                }
                            ]}
                        />
                    </Scene>

                    <Scene turn={1} className={cards.underwater}>
                        <Scenery
                            sceneConfig={config.gentle}
                            className={cards.object}
                            items={[
                                { cls: ['ocean'], x: 0, y: 1000, z: 0 },
                                { cls: ['sand'], x: 0, y: 100, z: 0 }
                            ]}
                        />
                        <Card className={cards.card2}>
                            <p>
                                Now you’re deep under the sea.
                                <br /> It sure is crowded here.
                            </p>
                            <div className={cards.responses}>
                                <div>
                                    <R
                                        tag="crab1b"
                                        options={{
                                            '*': (
                                                <Animal>
                                                    "Did you miss me?" asks the hermit crab.
                                                </Animal>
                                            )
                                        }}
                                    />
                                </div>
                                <div>
                                    <R
                                        tag="squid"
                                        options={{
                                            '*': <Animal>"SQUID GOES GLUG-GLUG."</Animal>
                                        }}
                                    />
                                </div>
                                <div>
                                    <R
                                        tag="seahorse"
                                        options={{
                                            '*': (
                                                <Animal>
                                                    "I'm the slowest fish in the world."
                                                </Animal>
                                            )
                                        }}
                                    />
                                </div>

                                <div>
                                    <R
                                        tag="hammerhead"
                                        options={{
                                            '*': <Animal>"I'm shy," admits the hammerhead.</Animal>
                                        }}
                                    />
                                </div>
                            </div>
                            <MultiResponse
                                tags={['crab1b', 'hammerhead', 'seahorse', 'squid']}
                                options={{
                                    '*': (
                                        <C
                                            options={[['Time to rise and shine!']]}
                                            tag="scene2"
                                            persist={true}
                                        />
                                    )
                                }}
                            />
                        </Card>
                        <Scenery
                            sceneConfig={config.slow}
                            className={cards.object}
                            items={[
                                { cls: ['shell1'], x: -1000, y: 0, z: 0 },
                                { cls: ['shell2'], x: 2000, y: 0, z: 0 }
                            ]}
                        />
                        <Scenery
                            sceneConfig={config.molasses}
                            className={cards.object}
                            items={[
                                {
                                    cls: ['hammerhead'],
                                    c: {
                                        alt: 'A hammerhead shark',
                                        tag: 'hammerhead'
                                    },
                                    x: -3000,
                                    y: 0,
                                    z: 0
                                },
                                {
                                    cls: ['crab1'],
                                    c: {
                                        alt: 'A hermit crab',
                                        tag: 'crab1b',
                                        fn: 'crab1'
                                    },
                                    x: -500,
                                    y: 0,
                                    z: 0
                                }
                            ]}
                        />
                        <Scenery
                            sceneConfig={{ tension: 180, friction: 6 }}
                            className={cards.object}
                            items={[
                                {
                                    cls: ['squid'],
                                    c: {
                                        alt: 'A squid',
                                        tag: 'squid'
                                    },
                                    x: 0,
                                    y: -300,
                                    z: 0
                                },
                                {
                                    cls: ['seahorse'],
                                    c: {
                                        alt: 'A seahorse',
                                        tag: 'seahorse'
                                    },
                                    x: 0,
                                    y: -500,
                                    z: 0
                                }
                            ]}
                        />
                    </Scene>
                    <Scene turn={2} className={cards.sky}>
                        <Scenery
                            sceneConfig={{ tension: 100, friction: 30 }}
                            className={cards.object}
                            items={[
                                {
                                    cls: ['globe-sky'],
                                    x: 0,
                                    y: 300,
                                    z: -100
                                },
                                {
                                    cls: ['lighthouse'],
                                    x: 0,
                                    y: 300,
                                    z: -100
                                }
                            ]}
                        />
                        <Card className={cards.card3}>
                            <div className={cards.responses}>
                                <div>
                                    <R
                                        tag="galbula-leptura"
                                        options={{
                                            '*': (
                                                <Animal>
                                                    "I don't usually fly this high," says the
                                                    jacamar.
                                                </Animal>
                                            )
                                        }}
                                    />
                                </div>
                                <div>
                                    <R
                                        tag="loxia-curvirostra"
                                        options={{
                                            '*': (
                                                <Animal>
                                                    "Not sure I'm to scale," murmurs the crossbill.
                                                </Animal>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                            <MultiResponse
                                tags={['galbula-leptura', 'loxia-curvirostra']}
                                options={{
                                    '*': (
                                        <C
                                            options={[['Higher skill...']]}
                                            tag="scene2"
                                            persist={true}
                                        />
                                    )
                                }}
                            />{' '}
                        </Card>
                        <Scenery
                            className={cards.object}
                            items={[
                                {
                                    cls: ['galbula-leptura'],
                                    x: -1000,
                                    y: 0,
                                    z: 0,
                                    c: {
                                        alt: 'Galbula Lapture',
                                        tag: 'galbula-leptura'
                                    }
                                },
                                {
                                    cls: ['loxia-curvirostra'],
                                    x: 0,
                                    y: 0,
                                    z: 0,
                                    c: {
                                        alt: 'Loxia curvirostra',
                                        tag: 'loxia-curvirostra'
                                    }
                                }
                            ]}
                        />
                    </Scene>
                    <Scene turn={3} className={cards.space}>
                        <Scenery
                            className={cards.object}
                            items={[
                                {
                                    cls: ['galaxy-sky'],
                                    x: 0,
                                    y: 0,
                                    z: 0
                                }
                            ]}
                        />
                        <h2>Fin.</h2>

                        <Scenery
                            sceneConfig={{ tension: 100, friction: 30 }}
                            className={cards.object}
                            items={[
                                {
                                    cls: ['globe-sky'],
                                    x: 0,
                                    y: 300,
                                    z: -100
                                },
                                {
                                    cls: ['lighthouse'],
                                    x: 0,
                                    y: 300,
                                    z: -100
                                },
                                {
                                    cls: ['comet'],
                                    x: 0,
                                    y: -1000,
                                    z: -100
                                }
                            ]}
                        />
                    </Scene>
                </Stage>
            </ChapterContext.Provider>
        </div>
    )
}
