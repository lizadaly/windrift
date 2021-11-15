import * as React from 'react'
import { Motion, spring, presets } from '@korbav/react-motion'
import { useDispatch } from 'react-redux'

import { C, R, Section, Chapter, When } from 'core/components'
import { Next, PageType } from 'core/types'

import { makeChoice } from 'core/features/choice'
import useInventory from 'core/hooks/use-inventory'
import { useEffect } from 'hoist-non-react-statics/node_modules/@types/react'

import houseofdust from 'public/stories/playground/styles/HouseOfDust.module.scss'
import transitions from 'public/stories/playground/styles/Stanza.module.scss'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { SectionTransition } from 'core/components/chapter'

const materials = [
    'A house of leaves',
    'A house of plastic',
    'A house of steel',
    'A house of brick',
    'A house of sand',
    'A house of discarded clothing',
    'A house of weeds',
    'A house of wood',
    'A house of roots',
    'A house of paper',
    'A house of broken dishes',
    'A house of mud',
    'A house of glass',
    'A house of dust'
]

const locations = [
    'on an island',
    'in a deserted church',
    'among other houses',
    'by a river',
    'in heavy jungle undergrowth',
    'underwater',
    'among small hills',
    'in a place with both heavy rain and bright sun',
    'on the sea',
    'in a desert',
    'in a cold, windy climate',
    'in southern France',
    'in Michigan',
    'in dense woods'
]

const lighting = [
    'using natural light',
    'using all available lighting',
    'using electricity',
    'using candles'
]

const inhabited = [
    'inhabited by all races of men represented wearing predominantly red clothing',
    'inhabited by people who sleep almost all the time',
    'inhabited by fishermen and families',
    'inhabited by various birds and fish',
    'inhabited by French- and German-speaking people',
    'inhabited by lovers',
    'inhabited by people who sleep very little',
    'inhabited by collectors of all types',
    'inhabited by people who enjoy eating together',
    'inhabited by vegetarians',
    'inhabited by friends',
    'inhabited by little girls'
]

const rand = (items: string[]) => {
    return items[randFromLen(items)]
}

const stanza = () => (
    <>
        <span>{rand(materials)}</span>
        <span>{rand(locations)}</span>
        <span>{rand(lighting)}</span>
        <span>{rand(inhabited)}</span>
    </>
)

const randFromLen = (items) => Math.floor(Math.random() * items.length)

export const Page: PageType = () => {
    const [stanzas, setStanza] = React.useState([
        <CSSTransition
            in={true}
            appear={true}
            timeout={600}
            classNames={{ ...transitions }}
            key={-1}>
            <p>{stanza()}</p>
        </CSSTransition>
    ])
    const [running, setRunning] = React.useState(true)
    const [counter, setCounter] = React.useState(0)
    console.log(transitions)
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCounter(counter + 1)

            if (running) {
                setStanza([
                    <CSSTransition
                        in={true}
                        appear={true}
                        timeout={600}
                        classNames={{ ...transitions }}
                        key={counter}>
                        <p>{stanza()}</p>
                    </CSSTransition>,
                    ...stanzas
                ])
            }
        }, 5000)
        return () => {
            clearInterval(interval)
        }
    })
    return (
        <Chapter filename="house-of-dust">
            <div className={houseofdust.section}>
                <button onClick={() => setRunning(!running)}>{running ? 'Stop' : 'Start'} </button>
                <div className={houseofdust.layout}>
                    {stanzas.map((stanza) => (
                        <>{stanza}</>
                    ))}
                </div>
            </div>
        </Chapter>
    )
}
