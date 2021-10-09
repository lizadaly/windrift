import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { WidgetType } from 'core/types'
import { RootState } from 'core/reducers'
import { increment } from 'core/reducers/counter'
import { gotoChapter, Next, incrementSection } from 'core/reducers/navigation'

import { ChapterContext } from './chapter'
import InlineList from './widgets/inline-list'
import { update as updateInventory } from 'core/reducers/inventory'
import { ENTRY_TYPES, update as logUpdate } from 'core/reducers/log'
import { init, advance, Options, OptionGroup } from 'core/reducers/choice'
import { wordFromInventory } from 'core/util'
import { StoryContext } from 'pages/[story]'

interface MutableChoiceProps {
    tag: string
    /** At completion of the choice list, go to the Next section/chapter, go to the named chapter (if a string) or do nothing*/
    next?: Next | string
    widget?: WidgetType
    /** Arbitrary arguments passed unchanged to the underlying widget */
    extra?: Record<string, unknown>
    /** Whether to retain the last choice as a hyperlink, as for navigation. @defaultValue false */
    persist?: boolean
    /** Text to display last (at completion) instead of the default last-chosen item  */
    last?: string
}
export interface ChoiceProps extends MutableChoiceProps {
    options: Options
}

const Choice = ({
    options,
    tag,
    extra,
    widget = InlineList,
    next = Next.Section,
    persist = false,
    last = null
}: ChoiceProps): JSX.Element => {
    const dispatch = useDispatch()

    // On first render, record the initial options
    React.useEffect(() => {
        dispatch(init({ tag, options }))
    }, [dispatch])

    return (
        <MutableChoice
            tag={tag}
            extra={extra}
            widget={widget}
            next={next}
            persist={persist}
            last={last}
        />
    )
}

const MutableChoice = ({
    tag,
    extra,
    widget,
    next,
    persist,
    last
}: MutableChoiceProps): JSX.Element => {
    const { filename } = React.useContext(ChapterContext)
    const { config } = React.useContext(StoryContext)
    const dispatch = useDispatch()

    const choice = useSelector((state: RootState) => {
        return state.choices.present[tag]
    })

    const counter = useSelector((state: RootState) => state.counter.present.value)
    const inventory = useSelector((state: RootState) => state.inventory.present)

    if (choice === undefined || choice.options === undefined) {
        return null
    }
    const handler = (e: React.MouseEvent): void => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        const selection = target.textContent
        const choiceId = uuidv4()
        dispatch(updateInventory({ tag, selection }))
        dispatch(advance({ tag }))
        dispatch(
            logUpdate({
                entry: {
                    id: choiceId,
                    tag,
                    selection,
                    entry: ENTRY_TYPES.Choice,
                    timestamp: new Date().toLocaleDateString()
                }
            })
        )

        if (choice.options.length === 1) {
            if (next === Next.Section) {
                dispatch(incrementSection({ filename }))
            } else if (next === Next.None) {
                // no-op
            } else if (typeof next === 'string') {
                dispatch(gotoChapter({ filename: next }))
            }
        }
        const s = {}
        s[config.identifier] = counter
        window.history.pushState(s, `Turn: ${counter}`, null)

        dispatch(increment())
    }
    if (choice.options) {
        let group: OptionGroup = undefined

        if (choice.options.length === 0) {
            // We've exhausted the choice list, so display the inventory item instead
            group = [inventory[tag]]
        }
        if (choice.options.length > 0) {
            group = choice.options[0].length == 1 && last ? [last] : choice.options[0]
        }
        const W = widget
        return (
            <W
                group={group}
                handler={group.length > 1 || persist ? handler : null}
                tag={tag}
                initialOptions={choice.initialOptions}
                {...extra}
            />
        )
    } else {
        return null
    }
}

export default Choice
