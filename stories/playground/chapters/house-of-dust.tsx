import * as React from 'react'

import { Chapter } from 'core/components'
import { PageType } from 'core/types'

import houseofdust from 'public/stories/playground/styles/HouseOfDust.module.scss'
import transitions from 'public/stories/playground/styles/Stanza.module.scss'

import { CSSTransition } from 'react-transition-group'

const materials = [
    'brick',
    'broken dishes',
    'discarded clothing',
    'dust',
    'glass',
    'leaves',
    'mud',
    'paper',
    'plastic',
    'plastic',
    'roots',
    'sand',
    'steel',
    'stone',
    'straw',
    'tin',
    'weeds',
    'wood'
]

const locations = [
    'among high mountains',
    'among other houses',
    'among other houses',
    'among small hills',
    'by a river',
    'in a cold, windy climate',
    'in a depopulated area',
    'in a desert',
    'in a deserted church',
    'in a green, mossy terrain',
    'in a hot climate',
    'in a place with both heavy rain and bright sun',
    'in an overpopulated area',
    'in dense woods',
    'in heavy jungle undergrowth',
    'in Michigan',
    'in southern France',
    'inside a mountain',
    'on an island',
    'on the sea',
    'underwater'
]

const lighting = ['natural light', 'candles', 'all available lighting', 'electricity']

const inhabited = [
    'children and old people',
    'collectors of all types',
    'fishermen and families',
    'French- and German-speaking people',
    'friends and enemies',
    'friends',
    'horses and birds',
    'little boys',
    'lovers',
    'people from many walks of life',
    'people who eat a great deal',
    'people who sleep almost all the time',
    'speaking many languages wearing little or no clothing',
    'various birds and fish',
    'vegetarians',
    'women wearing all colors'
]

const rand = (items: string[]) => {
    return items[randFromLen(items)]
}

const palettes = [
    'palette1',
    'palette2',
    'palette3',
    'palette4',
    'palette5',
    'palette6',
    'palette7',
    'palette8',
    'palette9',
    'palette10',
    // Favor the light background ones
    'palette7',
    'palette7',
    'palette7',
    'palette7',
    'palette7',
    'palette8',
    'palette8',
    'palette8',
    'palette8',
    'palette8'
]

const stanza = () => (
    <>
        <span>A house of {rand(materials)}</span>
        <span>{rand(locations)}</span>
        <span>using {rand(lighting)}</span>
        <span>inhabited by {rand(inhabited)}</span>
    </>
)

const randFromLen = (items) => Math.floor(Math.random() * items.length)

export const Page: PageType = () => {
    const startPalette = 'palette7'

    const [stanzas, setStanza] = React.useState([
        <p className={houseofdust[startPalette]} key={-1}>
            {stanza()}
        </p>
    ])
    const [running, setRunning] = React.useState(true)
    const [counter, setCounter] = React.useState(0)

    // Never repeat a palette (except deliberately duplicated palettes)
    const [lastPalette, setLastPalette] = React.useState(startPalette)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCounter(counter + 1)
            let palette = rand(palettes)
            while (palette === lastPalette) {
                palette = rand(palettes)
            }
            setLastPalette(palette)
            if (running) {
                setStanza([
                    <p key={counter} className={houseofdust[palette]}>
                        {stanza()}
                    </p>,
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
                    {stanzas.map((s, index) => {
                        if (index === 0) {
                            return (
                                <CSSTransition
                                    in={true}
                                    appear={true}
                                    timeout={1000}
                                    classNames={{ ...transitions }}
                                    key={s.key}>
                                    {s}
                                </CSSTransition>
                            )
                        } else {
                            return s
                        }
                    })}
                </div>
            </div>
        </Chapter>
    )
}
